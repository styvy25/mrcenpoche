
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const ModulesHelp = () => {
  return (
    <div className="mt-12 bg-mrc-blue/10 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-mrc-blue mb-2">Besoin d'aide pour votre formation ?</h3>
        <p className="text-gray-600 max-w-2xl">
          Notre équipe de formateurs est disponible pour vous guider dans votre parcours d'apprentissage. 
          N'hésitez pas à les contacter pour toute question ou clarification.
        </p>
      </div>
      <Button className="mt-4 md:mt-0 bg-mrc-blue hover:bg-blue-700">
        Contacter un formateur
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ModulesHelp;
