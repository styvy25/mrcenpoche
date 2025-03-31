
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PDFHeaderProps {
  moduleName: string;
  onClose: () => void;
}

const PDFHeader = ({ moduleName, onClose }: PDFHeaderProps) => {
  return (
    <div className="p-4 border-b flex justify-between items-center bg-mrc-blue/10">
      <h3 className="text-lg font-semibold text-mrc-blue">Aperçu du PDF - {moduleName}</h3>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PDFHeader;
