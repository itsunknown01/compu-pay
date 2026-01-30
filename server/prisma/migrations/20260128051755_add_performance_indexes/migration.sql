-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_idx" ON "audit_logs"("tenant_id");

-- CreateIndex
CREATE INDEX "audit_logs_resource_id_idx" ON "audit_logs"("resource_id");

-- CreateIndex
CREATE INDEX "compliance_rules_tenant_id_idx" ON "compliance_rules"("tenant_id");

-- CreateIndex
CREATE INDEX "pay_runs_tenant_id_idx" ON "pay_runs"("tenant_id");

-- CreateIndex
CREATE INDEX "pay_runs_tenant_id_status_idx" ON "pay_runs"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "risks_tenant_id_idx" ON "risks"("tenant_id");

-- CreateIndex
CREATE INDEX "risks_pay_run_id_idx" ON "risks"("pay_run_id");
