
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('bootu123', 10);
    
    let tenant = await prisma.tenant.findFirst({
        where: { name: 'Aryaman Workspace' }
    });
    
    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: { name: 'Aryaman Workspace' }
        });
    }

    const user = await prisma.user.create({
      data: {
        email: 'aryamangohain@gmail.com',
        name: 'Aryaman Gohain',
        passwordHash: hashedPassword,
        tenantId: tenant.id
      }
    });

    console.log('User created:', user.email);
  } catch (e) {
    if (e.code === 'P2002') {
        console.log('User already exists');
    } else {
        console.error(e);
    }
  } finally {
    await prisma.\$disconnect();
  }
}

main();

