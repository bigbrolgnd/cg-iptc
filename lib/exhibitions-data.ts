export interface Exhibition {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  pdfUrl: string;
  date: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "technologization-of-counterinsurgency",
    title: "The Technologization of Counterinsurgency",
    subtitle: "Exhibition I",
    description: "An examination of how modern surveillance and data technologies have transformed counterinsurgency operations and their implications for civil liberties.",
    pdfUrl: "/exhibitions/CG-IPTC_Exhibit_The_Technologization_of_Counterinsurgency_Final.pdf",
    date: "2025",
  },
];

export function getExhibitionById(id: string): Exhibition | undefined {
  return exhibitions.find((e) => e.id === id);
}

export function getDefaultExhibition(): Exhibition | undefined {
  return exhibitions[0];
}

export function hasExhibitions(): boolean {
  return exhibitions.length > 0;
}
