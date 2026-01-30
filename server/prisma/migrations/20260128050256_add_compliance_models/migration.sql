-- CreateTable
CREATE TABLE "compliance_rules" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "changes" JSONB NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compliance_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulations" (
    "id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "pay_run_id" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "simulations" ADD CONSTRAINT "simulations_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "compliance_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
