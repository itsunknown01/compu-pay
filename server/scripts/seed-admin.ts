import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@compupay.com";
  const password = "Password123!";
  const tenantName = "Demo Corp";

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User ${email} already exists.`);
      return;
    }

    // 2. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Create User, Tenant, and Membership in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: tenantName,
        },
      });

      // Create User
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
        },
      });

      // Create Membership
      await tx.membership.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          role: Role.ADMIN,
        },
      });

      return { user, tenant };
    });

    console.log("Successfully created demo admin user:");
    console.log(`Email: ${result.user.email}`);
    console.log(`Password: ${password}`);
    console.log(`Tenant: ${result.tenant.name}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
