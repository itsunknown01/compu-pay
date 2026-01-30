import { PayrunRisksView } from "@/components/risk/payrun-risks-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function RisksPage({ params }: PageProps) {
  const { id } = await params;
  return <PayrunRisksView payRunId={id} />;
}
