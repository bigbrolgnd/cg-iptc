# Exhibitions Page Structure

This document explains how to add new exhibitions to the CG-IPTC website while maintaining consistent layout and organization.

## Directory Structure

All exhibition assets are stored in `public/exhibitions/`. Each exhibition follows this pattern:

```
public/exhibitions/
├── [Exhibition Root Files]
│   ├── CG-IPTC_First_Exhibition_Curatorial_Statement.pdf    # Main curatorial statement
│   └── CG-IPTC_Curatorial_Statement_Detroit_Facial_Recognition.pdf  # Additional curatorial statements
│
├── series-one/                    # Series subfolder
│   ├── CGIPTC_Curatorial_Statement_Series01_2025.pdf       # Series-specific curatorial statement
│   ├── CGIPTC_SP_Police_Violence_Branded_Refined.png       # Visualization assets
│   └── CGIPTC_LDN_GPS_Tagging_Branded_Refined.png
│
└── series-two/                    # Series subfolder
    ├── CGIPTC_Curatorial_Statement_Series02_2025.pdf
    ├── First Visualization.pdf
    ├── CG-IPTC facial recognition visualizations.png
    ├── CG-IPTC FRT Target Rates.png
    ├── mpv_race_sex_percapita.png
    ├── atl_repeat_offenders_stackedbar_updated.png
    ├── atl_target_rings_updated.png
    └── atl_target_rings_coin_style.png
```

## File Organization Rules

### Curatorial Statements (Root Level)
- Place **main curatorial statement PDFs** in the exhibition root folder
- These appear as prominent cards at the top of the exhibition detail page
- Name format: `CG-IPTC_[Exhibition_Name]_Curatorial_Statement.pdf`

### Series Subfolders
- Create a subfolder for each series: `series-one/`, `series-two/`, etc.
- Each series can contain:
  - **PDFs**: Curatorial statements, visualizations
  - **Images**: PNG files for data visualizations
- Series appear as collapsible sections with all assets listed

## Data Model (`lib/exhibitions-data.ts`)

When adding a new exhibition, update the `exhibitions` array:

```typescript
{
  id: "exhibition-two",                    // URL slug: /exhibitions/exhibition-two
  title: "Exhibition Title",
  subtitle: "Exhibition II",               // Displayed above title
  description: "Short description...",     // Shown on selector page
  summary: "\"Quoted longer description...\"",  // Shown on detail page
  date: "2026",

  // Curatorial statements from root folder
  curatorialStatements: [
    {
      id: "curatorial-main",
      title: "Main Curatorial Statement",
      description: "Description of this statement",
      pdfUrl: "/exhibitions/exhibition-two/Main_Curatorial_Statement.pdf"
    }
  ],

  // Series from subfolders
  series: [
    {
      id: "series-one",
      title: "Series One",
      description: "What this series explores",
      assets: [
        {
          id: "s1-asset-1",
          title: "Asset Title",
          description: "What this visualization shows",
          assetUrl: "/exhibitions/exhibition-two/series-one/filename.png",
          assetType: "image"  // or "pdf"
        }
      ]
    }
  ]
}
```

## Adding a New Exhibition

### Step 1: Create Directory Structure

```bash
mkdir -p public/exhibitions/exhibition-two/series-one
mkdir -p public/exhibitions/exhibition-two/series-two
```

### Step 2: Copy Assets

```bash
# Copy curatorial statements to exhibition root
cp "Source/Curatorial_Statement.pdf" public/exhibitions/exhibition-two/

# Copy series assets to respective folders
cp "Source/Series One/"* public/exhibitions/exhibition-two/series-one/
cp "Source/Series Two/"* public/exhibitions/exhibition-two/series-two/
```

### Step 3: Update Data File

Edit `lib/exhibitions-data.ts` and add a new object to the `exhibitions` array following the structure above.

### Step 4: Build and Deploy

```bash
cd /opt/docker-stack
docker compose build cg-iptc
docker compose up -d cg-iptc
```

## Page Layout Structure

### Selector Page (`/exhibitions`)
- Displays cards for each exhibition
- Shows: subtitle, title, description, date
- Shows count of curatorial statements and series
- Click navigates to detail page

### Detail Page (`/exhibitions/[id]`)
```
┌─────────────────────────────────────────┐
│ ← Back to Exhibitions                   │
├─────────────────────────────────────────┤
│ EXHIBITION I                            │  ← subtitle
│ Exhibition Title                        │  ← title
├─────────────────────────────────────────┤
│ "Summary text in quotes..."             │  ← summary box
├─────────────────────────────────────────┤
│ [Selected Asset Viewer]                 │  ← PDF/Image viewer
├─────────────────────────────────────────┤
│ 📄 Curatorial Statements                │
│ ┌─────────────┐ ┌─────────────┐        │
│ │ Statement 1 │ │ Statement 2 │        │  ← clickable cards
│ └─────────────┘ └─────────────┘        │
├─────────────────────────────────────────┤
│ Series                                  │
│ ┌─────────────────────────────────────┐│
│ │ ▶ Series One (3 assets)             ││  ← collapsible
│ │   ┌───────┐ ┌───────┐ ┌───────┐    ││
│ │   │Asset 1│ │Asset 2│ │Asset 3│    ││  ← asset cards
│ │   └───────┘ └───────┘ └───────┘    ││
│ └─────────────────────────────────────┘│
│ ┌─────────────────────────────────────┐│
│ │ ▶ Series Two (8 assets)             ││
│ │   ...                               ││
│ └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Asset Types

| Type | Extension | Badge Color | Icon |
|------|-----------|-------------|------|
| PDF | `.pdf` | Red | 📄 FileText |
| Image | `.png`, `.jpg` | Blue | 🖼 Image |

## Naming Conventions

- **Exhibition IDs**: `exhibition-one`, `exhibition-two` (kebab-case)
- **Series IDs**: `series-one`, `series-two` (kebab-case)
- **Asset IDs**: `s1-descriptive-name`, `s2-descriptive-name` (prefix with series)
- **File names**: Use descriptive names with underscores or hyphens

## Example: Current Exhibition I Structure

```
public/exhibitions/
├── CG-IPTC_First_Exhibition_Curatorial_Statement.pdf      # Curatorial Statement 1
├── CG-IPTC_Curatorial_Statement_Detroit_Facial_Recognition.pdf  # Curatorial Statement 2
├── series-one/
│   ├── CGIPTC_Curatorial_Statement_Series01_2025.pdf      # PDF asset
│   ├── CGIPTC_SP_Police_Violence_Branded_Refined.png      # Image asset
│   └── CGIPTC_LDN_GPS_Tagging_Branded_Refined.png         # Image asset
└── series-two/
    ├── CGIPTC_Curatorial_Statement_Series02_2025.pdf
    ├── First Visualization.pdf
    ├── CG-IPTC facial recognition visualizations.png
    ├── CG-IPTC FRT Target Rates.png
    ├── mpv_race_sex_percapita.png
    ├── atl_repeat_offenders_stackedbar_updated.png
    ├── atl_target_rings_updated.png
    └── atl_target_rings_coin_style.png
```

This maps to `lib/exhibitions-data.ts` with:
- 2 curatorial statements
- 2 series (Series One: 3 assets, Series Two: 8 assets)
