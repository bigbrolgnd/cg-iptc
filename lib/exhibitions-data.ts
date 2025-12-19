export interface ExhibitionAsset {
  id: string;
  title: string;
  description?: string;
  assetUrl: string;
  assetType: 'pdf' | 'image';
}

export interface ExhibitionSeries {
  id: string;
  title: string;
  description?: string;
  assets: ExhibitionAsset[];
}

export interface CuratorialStatement {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  summary?: string;
  date: string;
  curatorialStatements: CuratorialStatement[];
  series: ExhibitionSeries[];
}

export const exhibitions: Exhibition[] = [
  {
    id: "exhibition-one",
    title: "The Technologization of Counterinsurgency",
    subtitle: "Exhibition I",
    description: "An examination of how modern surveillance and data technologies have transformed counterinsurgency operations and their implications for civil liberties.",
    summary: "\"The works assembled under this exhibition emerge from the CG-IPTC's ongoing inquiry into the algorithmic management of racialized life — a condition in which the logic of counterinsurgency has migrated from the battlefield to the domestic sphere. Through predictive analytics, biometric surveillance, and spatial policing technologies, contemporary cities now enact strategies once reserved for the governance of occupied populations. Our central concern is not simply that artificial intelligence and predictive policing reproduce racial bias, but that they embody the very strategic grammar of militarized population control.\"",
    date: "2025",
    curatorialStatements: [
      {
        id: "curatorial-main",
        title: "First Exhibition Curatorial Statement",
        description: "Primary curatorial statement for Exhibition I",
        pdfUrl: "/exhibitions/CG-IPTC_First_Exhibition_Curatorial_Statement.pdf"
      },
      {
        id: "curatorial-detroit",
        title: "Detroit Facial Recognition Curatorial Statement",
        description: "Curatorial statement on Detroit facial recognition analysis",
        pdfUrl: "/exhibitions/CG-IPTC_Curatorial_Statement_Detroit_Facial_Recognition.pdf"
      }
    ],
    series: [
      {
        id: "series-one",
        title: "Series One",
        description: "Visualizing police violence and GPS tagging surveillance patterns.",
        assets: [
          {
            id: "s1-curatorial",
            title: "Series One Curatorial Statement",
            description: "Curatorial statement for Series One",
            assetUrl: "/exhibitions/series-one/CGIPTC_Curatorial_Statement_Series01_2025.pdf",
            assetType: "pdf"
          },
          {
            id: "s1-police-violence",
            title: "Police Violence Visualization",
            description: "São Paulo police violence data visualization",
            assetUrl: "/exhibitions/series-one/CGIPTC_SP_Police_Violence_Branded_Refined.png",
            assetType: "image"
          },
          {
            id: "s1-gps-tagging",
            title: "GPS Tagging Visualization",
            description: "London GPS tagging surveillance data",
            assetUrl: "/exhibitions/series-one/CGIPTC_LDN_GPS_Tagging_Branded_Refined.png",
            assetType: "image"
          }
        ]
      },
      {
        id: "series-two",
        title: "Series Two",
        description: "Detroit Facial Recognition Probes and Atlanta surveillance analysis.",
        assets: [
          {
            id: "s2-curatorial",
            title: "Series Two Curatorial Statement",
            description: "Curatorial statement for Series Two",
            assetUrl: "/exhibitions/series-two/CGIPTC_Curatorial_Statement_Series02_2025.pdf",
            assetType: "pdf"
          },
          {
            id: "s2-first-visualization",
            title: "First Visualization",
            description: "Initial facial recognition probe visualization",
            assetUrl: "/exhibitions/series-two/First Visualization.pdf",
            assetType: "pdf"
          },
          {
            id: "s2-facial-recognition",
            title: "Facial Recognition Visualizations",
            description: "Comprehensive facial recognition data visualizations",
            assetUrl: "/exhibitions/series-two/CG-IPTC facial recognition visualizations.png",
            assetType: "image"
          },
          {
            id: "s2-frt-target-rates",
            title: "FRT Target Rates",
            description: "Facial recognition technology target rate analysis",
            assetUrl: "/exhibitions/series-two/CG-IPTC FRT Target Rates.png",
            assetType: "image"
          },
          {
            id: "s2-mpv-race-sex",
            title: "MPV Race & Sex Per Capita",
            description: "Mapping police violence by race and sex per capita",
            assetUrl: "/exhibitions/series-two/mpv_race_sex_percapita.png",
            assetType: "image"
          },
          {
            id: "s2-atl-repeat-offenders",
            title: "Atlanta Repeat Offenders",
            description: "Atlanta repeat offenders stacked bar analysis",
            assetUrl: "/exhibitions/series-two/atl_repeat_offenders_stackedbar_updated.png",
            assetType: "image"
          },
          {
            id: "s2-atl-target-rings",
            title: "Atlanta Target Rings",
            description: "Atlanta surveillance target ring visualization",
            assetUrl: "/exhibitions/series-two/atl_target_rings_updated.png",
            assetType: "image"
          },
          {
            id: "s2-atl-target-rings-coin",
            title: "Atlanta Target Rings (Coin Style)",
            description: "Atlanta target ring coin-style visualization",
            assetUrl: "/exhibitions/series-two/atl_target_rings_coin_style.png",
            assetType: "image"
          }
        ]
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
