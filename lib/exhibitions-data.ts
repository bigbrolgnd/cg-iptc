export interface ExhibitionSeries {
  id: string;
  title: string;
  description?: string;
  assetUrl: string;
  assetType: 'pdf' | 'image';
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  summary?: string;
  pdfUrl: string;
  date: string;
  series?: ExhibitionSeries[];
}

export const exhibitions: Exhibition[] = [
  {
    id: "technologization-of-counterinsurgency",
    title: "The Technologization of Counterinsurgency",
    subtitle: "Exhibition I",
    description: "An examination of how modern surveillance and data technologies have transformed counterinsurgency operations and their implications for civil liberties.",
    summary: "Detroit Facial Recognition Probes (2022–2023) extends the mission of the Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency (CG-IPTC) to expose the racialized architectures of algorithmic governance that define the modern security state. Using data from the Detroit Police Department’s facial recognition reports, the work visualizes a persistent and structural targeting pattern: over ninety percent of probe photographs identify Black males. This disproportion is not an aberration of technology but the expression of a historical logic that fuses racial surveillance with statecraft. The infographic’s design draws on the chromatic restraint and visual argumentation pioneered by W. E. B. Du Bois in his 1900 Paris Exposition infographics—an aesthetic genealogy of data as resistance.",
    pdfUrl: "/exhibitions/CG-IPTC_Exhibit_The_Technologization_of_Counterinsurgency_Final.pdf",
    date: "2025",
    series: [
      {
        id: "series-one",
        title: "Series One",
        description: "Visualizing police violence and surveillance patterns.",
        assetUrl: "/exhibitions/CGIPTC_SP_Police_Violence_Branded_Refined.png",
        assetType: "image"
      },
      {
        id: "series-two",
        title: "Series Two",
        description: "Curatorial Statement and analysis of Detroit Facial Recognition Probes.",
        assetUrl: "/CG-IPTC_Curatorial_Statement.pdf",
        assetType: "pdf"
      }
    ]
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
