
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { HeatmapData, PoliticalParty, Region } from "./types";
import { politicalParties, regions } from "./politicalData";
import { MapPin, Info } from "lucide-react";

const PoliticalHeatmap = () => {
  const [selectedParty, setSelectedParty] = useState<string>(politicalParties[0].id);
  const [selectedMetric, setSelectedMetric] = useState<string>("presence");
  const [year, setYear] = useState<number>(2025);

  // Simuler les données pour démonstration (mode hors-ligne)
  const getHeatmapData = (): HeatmapData[] => {
    return regions.map(region => {
      const party = politicalParties.find(p => p.id === selectedParty);
      let value = 0;
      
      // Calculer valeurs basées sur des caractéristiques des partis et des régions
      if (party) {
        // Base: présence accrue dans région d'origine
        value = party.strongholdRegions.includes(region.id) ? 
          Math.floor(Math.random() * 30) + 50 : // 50-80% dans les bastions
          Math.floor(Math.random() * 40) + 10;  // 10-50% ailleurs
          
        // Ajustement selon règles spécifiques aux partis
        if (party.id === "mrc") {
          value = region.id === "littoral" || region.id === "west" || region.id === "center" ? 
            value + 15 : value;
        } else if (party.id === "cpdm") {
          value = region.id === "south" || region.id === "east" ? 
            value + 20 : value;
        }
        
        // Ajustement selon la métrique
        if (selectedMetric === "influence") {
          value = Math.min(value + (party.isRuling ? 15 : -5), 100);
        } else if (selectedMetric === "growth") {
          value = Math.min(value + (party.isOpposition ? 10 : -10), 100);
          value = Math.max(value, 0);
        }
        
        // Ajustement selon l'année (tendances)
        if (year > 2023) {
          if (party.isOpposition && party.id === "mrc") {
            value += (year - 2023) * 3;
          } else if (party.isRuling) {
            value -= (year - 2023) * 2;
          }
          
          // Limiter entre 0 et 100
          value = Math.max(0, Math.min(100, value));
        }
      }
      
      return {
        regionId: region.id,
        regionName: region.name,
        value
      };
    });
  };
  
  const heatmapData = getHeatmapData();
  
  const getColorForValue = (value: number): string => {
    // Échelle de couleur du bleu (faible) au rouge (élevé)
    if (value < 20) return "bg-blue-100";
    if (value < 40) return "bg-blue-300";
    if (value < 60) return "bg-yellow-300";
    if (value < 80) return "bg-orange-400";
    return "bg-red-500";
  };
  
  const getLabelForMetric = (): string => {
    switch (selectedMetric) {
      case "presence": return "Présence territoriale";
      case "influence": return "Influence politique";
      case "growth": return "Croissance électorale";
      default: return "Score";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carte politique thermique du Cameroun</CardTitle>
        <CardDescription>
          Visualisation de la répartition des forces politiques au Cameroun
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Parti politique</label>
            <Select defaultValue={selectedParty} onValueChange={setSelectedParty}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un parti" />
              </SelectTrigger>
              <SelectContent>
                {politicalParties.map(party => (
                  <SelectItem key={party.id} value={party.id}>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: party.color }} />
                      <span>{party.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Métrique</label>
            <Select defaultValue={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une métrique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presence">Présence territoriale</SelectItem>
                <SelectItem value="influence">Influence politique</SelectItem>
                <SelectItem value="growth">Croissance électorale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Année: {year}</label>
            <Slider
              defaultValue={[year]}
              min={2020}
              max={2030}
              step={1}
              onValueChange={values => setYear(values[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <Tabs defaultValue="map">
            <TabsList className="mb-4">
              <TabsTrigger value="map">Carte</TabsTrigger>
              <TabsTrigger value="data">Données</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <svg 
                  viewBox="0 0 800 600" 
                  className="w-full h-full"
                >
                  {/* Carte simplifiée du Cameroun par régions */}
                  {regions.map((region) => {
                    const data = heatmapData.find(d => d.regionId === region.id);
                    const selectedPartyObj = politicalParties.find(p => p.id === selectedParty);
                    const fillColor = selectedPartyObj ? 
                      `${selectedPartyObj.color}${Math.round((data?.value || 0) * 0.9)}` : 
                      "#cccccc";
                    
                    return (
                      <path
                        key={region.id}
                        d={region.path}
                        className="transition-all duration-300"
                        style={{ 
                          fill: fillColor,
                          opacity: 0.7 + ((data?.value || 0) / 100) * 0.3,
                          stroke: "#ffffff",
                          strokeWidth: 1
                        }}
                      />
                    );
                  })}
                  
                  {/* Noms des régions */}
                  {regions.map((region) => (
                    <text
                      key={`text-${region.id}`}
                      x={region.labelX}
                      y={region.labelY}
                      fontSize="14"
                      textAnchor="middle"
                      fill="#333"
                      className="text-xs font-medium"
                    >
                      {region.name}
                    </text>
                  ))}
                </svg>
              </div>
            </TabsContent>
            
            <TabsContent value="data">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">
                  {getLabelForMetric()} - {politicalParties.find(p => p.id === selectedParty)?.name} ({year})
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {heatmapData
                    .sort((a, b) => b.value - a.value)
                    .map((data) => (
                    <div 
                      key={data.regionId}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{data.regionName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getColorForValue(data.value)}`} />
                        <span className="font-medium">{data.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-lg flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p>Ces données sont générées en mode hors-ligne à titre d'exemple. Pour des données réelles et actualisées, veuillez vous connecter à Internet ou consulter les sources officielles.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PoliticalHeatmap;
