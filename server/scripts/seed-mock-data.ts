import { PrismaClient, Role, PayRunStatus, TaxStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const RANDOM_NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
];
const RANDOM_SURNAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];
const TENANT_NAMES = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Umbrella Corp",
  "Stark Ind",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // 1. Create multiple Tenants
    const tenants = [];
    for (const name of TENANT_NAMES) {
      const tenant = await prisma.tenant.create({
        data: { name },
      });
      tenants.push(tenant);
      console.log(`Created tenant: ${tenant.name}`);
    }

    // 2. Create Users and Memberships
    // Default admin user for all tenants
    const passwordHash = await bcrypt.hash("Password123!", 10);
    const adminEmail = `admin-${getRandomInt(1000, 9999)}@compupay.com`;

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
      },
    });
    console.log(`Created global admin: ${adminUser.email}`);

    for (const tenant of tenants) {
      // Add admin to tenant
      await prisma.membership.create({
        data: {
          userId: adminUser.id,
          tenantId: tenant.id,
          role: Role.ADMIN,
        },
      });

      // Create some random members
      for (let i = 0; i < 3; i++) {
        const email = `user-${tenant.name.replace(/\s/g, "").toLowerCase()}-${i}@example.com`;
        const user = await prisma.user.create({
          data: {
            email,
            passwordHash,
          },
        });
        await prisma.membership.create({
          data: {
            userId: user.id,
            tenantId: tenant.id,
            role: Math.random() > 0.5 ? Role.MEMBER : Role.VIEWER,
          },
        });
      }
    }

    // 3. Create Employees, PayRuns, and other data for each tenant
    for (const tenant of tenants) {
      // Create Employees
      const employees = [];
      for (let i = 0; i < 10; i++) {
        const firstName = getRandomItem(RANDOM_NAMES);
        const lastName = getRandomItem(RANDOM_SURNAMES);
        const employee = await prisma.employee.create({
          data: {
            tenantId: tenant.id,
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${tenant.name.replace(/\s/g, "").toLowerCase()}.com`,
            salaryAmount: getRandomInt(50000, 150000),
            taxStatus:
              Math.random() > 0.8 ? TaxStatus.EXEMPT : TaxStatus.STANDARD,
          },
        });
        employees.push(employee);
      }
      console.log(`Created ${employees.length} employees for ${tenant.name}`);

      // Create PayRuns
      const payRunStatuses = [
        PayRunStatus.DRAFT,
        PayRunStatus.APPROVED,
        PayRunStatus.REVIEWED,
      ];
      for (const status of payRunStatuses) {
        const payRun = await prisma.payRun.create({
          data: {
            tenantId: tenant.id,
            periodStart: new Date(),
            periodEnd: new Date(new Date().setDate(new Date().getDate() + 14)),
            status,
          },
        });

        // Create PayRunItems
        for (const emp of employees) {
          const grossPay = Number(emp.salaryAmount) / 26; // Bi-weekly rough calc
          const tax = grossPay * 0.2;
          const net = grossPay - tax;

          await prisma.payRunItem.create({
            data: {
              payRunId: payRun.id,
              employeeId: emp.id,
              grossPay,
              taxDeductions: tax,
              netPay: net,
            },
          });
        }

        // Create Risks
        if (status === PayRunStatus.DRAFT || status === PayRunStatus.REVIEWED) {
          await prisma.risk.create({
            data: {
              tenantId: tenant.id,
              payRunId: payRun.id,
              type: "Salary Spike",
              severity: "HIGH",
              explanation:
                "Projected salary reflects a 15% increase from previous run.",
              suggestedAction: "Review overtime hours for Department A",
            },
          });
          await prisma.risk.create({
            data: {
              tenantId: tenant.id,
              payRunId: payRun.id,
              type: "Unusual Deduction",
              severity: "MEDIUM",
              explanation: "Employee #123 has a new, large deduction.",
            },
          });
        }
      }

      // Create Compliance Rules
      const rule = await prisma.complianceRule.create({
        data: {
          tenantId: tenant.id,
          name: "2024 Tax Reform",
          description: "New tax brackets for 2024 fiscal year",
          changes: { tax_rate: "increased_by_2_percent", brackets: "adjusted" },
          effectiveDate: new Date("2024-01-01"),
          status: "ACTIVE",
        },
      });

      // Create Simulation
      // Check if we have a valid pay run to attach to
      const existingPayRun = await prisma.payRun.findFirst({
        where: { tenantId: tenant.id },
      });
      if (existingPayRun) {
        await prisma.simulation.create({
          data: {
            ruleId: rule.id,
            payRunId: existingPayRun.id,
            results: { impact: "high", extra_cost: 5000 },
            aiSummary:
              "The new tax reform will increase payroll costs by approximately 2.5%.",
          },
        });
      }

      // Create Job/Audit/AI Logs
      await prisma.auditLog.create({
        data: {
          tenantId: tenant.id,
          userId: adminUser.id,
          action: "CREATE_PAYRUN",
          resourceType: "PayRun",
          resourceId: "generic-id",
          details: { status: "DRAFT" },
          ipAddress: "127.0.0.1",
        },
      });

      await prisma.aITrace.create({
        data: {
          tenantId: tenant.id,
          modelName: "gpt-4",
          promptTemplate: "Analyze risk for payrun {id}",
          inputContext: { payRunId: "sample-id", totalAmount: 50000 },
          output: { riskLevel: "LOW" },
          confidenceScore: 0.98,
          latencyMs: 450,
        },
      });
    }

    console.log("✅ Seeding complete!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
