
export interface PoliticalParty {
  id: string;
  name: string;
  acronym: string;
  color: string;
  isRuling: boolean;
  isOpposition: boolean;
  strongholdRegions: string[];
  leaderName: string;
  founded: number;
}

export interface Region {
  id: string;
  name: string;
  population: number;
  path: string; // SVG path data
  labelX: number;
  labelY: number;
}

export interface HeatmapData {
  regionId: string;
  regionName: string;
  value: number;
}
