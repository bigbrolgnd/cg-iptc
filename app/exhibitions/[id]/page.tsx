import { notFound } from "next/navigation";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { ExhibitionDetailView } from "@/components/features/ExhibitionDetailView";
import { exhibitions, getExhibitionById } from "@/lib/exhibitions-data";

// Generate static paths for all exhibitions
export function generateStaticParams() {
  return exhibitions.map((exhibition) => ({
    id: exhibition.id,
  }));
}

interface ExhibitionPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { id } = await params;
  const exhibition = getExhibitionById(id);

  if (!exhibition) {
    notFound();
  }

  return (
    <LayoutShell>
      <ExhibitionDetailView exhibition={exhibition} />
    </LayoutShell>
  );
}
