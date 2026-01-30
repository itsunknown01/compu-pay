-- CreateTable
CREATE TABLE "risks" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "pay_run_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "suggested_action" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_pay_run_id_fkey" FOREIGN KEY ("pay_run_id") REFERENCES "pay_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
