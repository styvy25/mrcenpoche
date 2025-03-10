
import { CheckCircle, FileText } from "lucide-react";

const PDFContent = () => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="font-medium mb-2 flex items-center">
        <FileText className="h-4 w-4 mr-2 text-mrc-blue" />
        Contenu du document
      </h3>
      <ul className="text-sm space-y-2">
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
          <span>Présentation complète du module</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
          <span>Points clés et résumés des leçons</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
          <span>Exercices pratiques et questionnaires</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
          <span>Ressources supplémentaires et bibliographie</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
          <span>Certificat de suivi du module (si complété)</span>
        </li>
      </ul>
    </div>
  );
};

export default PDFContent;
