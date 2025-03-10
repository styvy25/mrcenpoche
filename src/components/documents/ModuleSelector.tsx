
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModuleSelectorProps {
  selectedModule: string;
  setSelectedModule: (value: string) => void;
}

const ModuleSelector = ({ selectedModule, setSelectedModule }: ModuleSelectorProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="module-select" className="text-sm font-medium">
        Sélectionnez un module
      </label>
      <Select value={selectedModule} onValueChange={setSelectedModule}>
        <SelectTrigger id="module-select" className="w-full">
          <SelectValue placeholder="Choisir un module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="histoire">Histoire et Valeurs du MRC</SelectItem>
          <SelectItem value="mobilisation">Techniques de Mobilisation</SelectItem>
          <SelectItem value="communication">Communication Politique</SelectItem>
          <SelectItem value="enjeux">Enjeux Politiques au Cameroun</SelectItem>
          <SelectItem value="campagne">Organisation de Campagne</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModuleSelector;
