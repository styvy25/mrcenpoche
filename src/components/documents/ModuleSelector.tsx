
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MODULE_NAMES } from "./pdfUtils";

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
          {Object.entries(MODULE_NAMES).map(([key, name]) => (
            <SelectItem key={key} value={key}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModuleSelector;
