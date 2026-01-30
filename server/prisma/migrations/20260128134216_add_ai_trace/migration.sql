-- AlterTable
ALTER TABLE "simulations" ADD COLUMN     "ai_summary" TEXT;

-- CreateTable
CREATE TABLE "ai_traces" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "prompt_template" TEXT NOT NULL,
    "input_context" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "confidence_score" DOUBLE PRECISION NOT NULL,
    "latency_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_traces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_traces_tenant_id_idx" ON "ai_traces"("tenant_id");
