
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Download, Award } from "lucide-react";
import { Module } from "../types";

interface ModuleDetailFooterProps {
  module: Module;
  onOpenPdf: () => void;
  onOpenCertificate: () => void;
}

const ModuleDetailFooter = ({ module, onOpenPdf, onOpenCertificate }: ModuleDetailFooterProps) => {
  const { toast } = useToast();

  const handleMarkComplete = () => {
    toast({
      title: module.isCompleted ? "Module déjà terminé" : "Module marqué comme terminé",
      description: module.isCompleted ? "Vous avez déjà terminé ce module." : "Votre progression a été enregistrée.",
    });
  };

  return (
    <CardFooter className="flex flex-wrap gap-3 sm:flex-row justify-between">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleMarkComplete}
          disabled={module.isCompleted}
        >
          <BookOpen className="h-4 w-4 mr-1" />
          {module.isCompleted ? "Terminé" : "Marquer comme terminé"}
        </Button>
        
        {module.isPdfAvailable && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOpenPdf}
          >
            <Download className="h-4 w-4 mr-1" />
            Support PDF
          </Button>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onOpenCertificate}
        className={module.isCompleted ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" : ""}
      >
        <Award className="h-4 w-4 mr-1" />
        Certificat
      </Button>
    </CardFooter>
  );
};

export default ModuleDetailFooter;
