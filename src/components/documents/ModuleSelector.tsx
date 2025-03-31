
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MODULE_NAMES } from "./pdfUtils";
import { Label } from "@/components/ui/label";
import { Book } from "lucide-react";

interface ModuleSelectorProps {
  selectedModule: string;
  setSelectedModule: (value: string) => void;
}

const ModuleSelector = ({ selectedModule, setSelectedModule }: ModuleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="module-select" className="flex items-center gap-2 text-sm font-medium">
        <Book size={16} className="text-mrc-blue" />
        Sélectionnez un module de formation
      </Label>
      <Select value={selectedModule} onValueChange={setSelectedModule}>
        <SelectTrigger id="module-select" className="w-full">
          <SelectValue placeholder="Choisir un module" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MODULE_NAMES).map(([key, name]) => (
            <SelectItem key={key} value={key} className="cursor-pointer">
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModuleSelector;
