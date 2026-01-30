-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER', 'VIEWER');

-- CreateEnum
CREATE TYPE "TaxStatus" AS ENUM ('STANDARD', 'EXEMPT');

-- CreateEnum
CREATE TYPE "PayRunStatus" AS ENUM ('DRAFT', 'QUEUED', 'PREVIEWED', 'REVIEWED', 'APPROVED');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "user_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("user_id","tenant_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salary_amount" DECIMAL(10,2) NOT NULL,
    "tax_status" "TaxStatus" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay_runs" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "status" "PayRunStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "pay_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay_run_items" (
    "pay_run_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "gross_pay" DECIMAL(10,2) NOT NULL,
    "tax_deductions" DECIMAL(10,2) NOT NULL,
    "net_pay" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pay_run_items_pkey" PRIMARY KEY ("pay_run_id","employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_runs" ADD CONSTRAINT "pay_runs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_run_items" ADD CONSTRAINT "pay_run_items_pay_run_id_fkey" FOREIGN KEY ("pay_run_id") REFERENCES "pay_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_run_items" ADD CONSTRAINT "pay_run_items_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
