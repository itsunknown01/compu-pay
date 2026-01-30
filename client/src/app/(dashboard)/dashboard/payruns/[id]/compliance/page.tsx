import { PayrunComplianceView } from "@/components/compliance/payrun-compliance-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * CompliancePage - Compliance simulation for a payrun
 * Server Component
 */
export default async function CompliancePage({ params }: PageProps) {
  const { id } = await params;
  return <PayrunComplianceView payRunId={id} />;
}
