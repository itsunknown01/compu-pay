import { PayrunDetailsView } from "@/components/payroll/payrun-details-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * PayrunDetailsPage - Payrun detail view
 * Server Component
 */
export default async function PayrunDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <PayrunDetailsView payRunId={id} />;
}
