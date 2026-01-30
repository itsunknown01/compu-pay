import { PayrunRisksView } from "@/components/risk/payrun-risks-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * RisksPage - Risk analysis for a payrun
 * Server Component
 */
export default async function RisksPage({ params }: PageProps) {
  const { id } = await params;
  return <PayrunRisksView payRunId={id} />;
}
