
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFHeaderProps {
  moduleName: string;
  onClose: () => void;
}

const PDFHeader = ({ moduleName, onClose }: PDFHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-2 sm:p-4 border-b">
      <h3 className="text-lg font-semibold truncate pr-4">
        {moduleName}
      </h3>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="ml-auto"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PDFHeader;
