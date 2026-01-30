import { PayrunComplianceView } from "@/components/compliance/payrun-compliance-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function CompliancePage({ params }: PageProps) {
  const { id } = await params;
  return <PayrunComplianceView payRunId={id} />;
}
