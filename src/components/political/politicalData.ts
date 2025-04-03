
import { PoliticalParty, Region } from "./types";

// Données des partis politiques du Cameroun
export const politicalParties: PoliticalParty[] = [
  {
    id: "mrc", 
    name: "Mouvement pour la Renaissance du Cameroun",
    acronym: "MRC",
    color: "#3366cc",
    isRuling: false,
    isOpposition: true,
    strongholdRegions: ["west", "littoral", "center"],
    leaderName: "Maurice Kamto",
    founded: 2012
  },
  {
    id: "cpdm",
    name: "Rassemblement Démocratique du Peuple Camerounais",
    acronym: "RDPC",
    color: "#cc3333",
    isRuling: true,
    isOpposition: false,
    strongholdRegions: ["south", "east", "far-north"],
    leaderName: "Paul Biya",
    founded: 1985
  },
  {
    id: "sdf",
    name: "Social Democratic Front",
    acronym: "SDF",
    color: "#339933",
    isRuling: false,
    isOpposition: true,
    strongholdRegions: ["north-west", "south-west"],
    leaderName: "John Fru Ndi",
    founded: 1990
  },
  {
    id: "upc",
    name: "Union des Populations du Cameroun",
    acronym: "UPC",
    color: "#ffcc00",
    isRuling: false,
    isOpposition: true,
    strongholdRegions: ["littoral"],
    leaderName: "Divers",
    founded: 1948
  },
  {
    id: "undp",
    name: "Union Nationale pour la Démocratie et le Progrès",
    acronym: "UNDP",
    color: "#996633",
    isRuling: false,
    isOpposition: false,
    strongholdRegions: ["north", "adamawa"],
    leaderName: "Maïgari Bello Bouba",
    founded: 1991
  }
];

// Données simplifiées des régions du Cameroun avec chemins SVG stylisés
export const regions: Region[] = [
  {
    id: "adamawa",
    name: "Adamaoua",
    population: 1200000,
    path: "M400,250 L450,220 L500,250 L470,300 L410,310 Z",
    labelX: 450,
    labelY: 260
  },
  {
    id: "center",
    name: "Centre",
    population: 4200000,
    path: "M350,350 L420,310 L470,320 L490,380 L430,410 L380,400 Z",
    labelX: 420,
    labelY: 360
  },
  {
    id: "east",
    name: "Est",
    population: 800000,
    path: "M490,380 L550,390 L600,350 L620,420 L580,470 L520,460 L480,430 Z",
    labelX: 550,
    labelY: 410
  },
  {
    id: "far-north",
    name: "Extrême-Nord",
    population: 3900000,
    path: "M430,140 L480,130 L520,160 L490,210 L450,220 L410,200 Z",
    labelX: 460,
    labelY: 170
  },
  {
    id: "littoral",
    name: "Littoral",
    population: 3100000,
    path: "M300,370 L350,350 L380,400 L350,440 L310,430 Z",
    labelX: 330,
    labelY: 400
  },
  {
    id: "north",
    name: "Nord",
    population: 2400000,
    path: "M410,200 L450,220 L500,250 L470,300 L410,310 L380,280 L390,230 Z",
    labelX: 430,
    labelY: 240
  },
  {
    id: "north-west",
    name: "Nord-Ouest",
    population: 1800000,
    path: "M320,280 L360,270 L390,230 L380,280 L350,310 L330,300 Z",
    labelX: 350,
    labelY: 280
  },
  {
    id: "west",
    name: "Ouest",
    population: 1900000,
    path: "M330,300 L350,310 L380,280 L410,310 L420,310 L350,350 L320,340 Z",
    labelX: 370,
    labelY: 320
  },
  {
    id: "south",
    name: "Sud",
    population: 700000,
    path: "M380,400 L430,410 L480,430 L450,490 L380,480 L350,440 Z",
    labelX: 420,
    labelY: 440
  },
  {
    id: "south-west",
    name: "Sud-Ouest",
    population: 1400000,
    path: "M300,370 L320,340 L350,350 L380,400 L350,440 L290,410 Z",
    labelX: 330,
    labelY: 380
  }
];
