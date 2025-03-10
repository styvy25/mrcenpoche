
import { CheckCircle, FileText, Award, BookOpen, Calendar } from "lucide-react";

const PDFContent = () => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="font-medium mb-3 flex items-center">
        <FileText className="h-4 w-4 mr-2 text-mrc-blue" />
        Contenu du document
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-mrc-blue flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Contenu pédagogique
          </h4>
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
          </ul>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-mrc-green flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Outils et ressources
          </h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Fiches pratiques téléchargeables</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Modèles de documents personnalisables</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Guides d'action terrain</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Certificat de suivi du module (si complété)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
          <Calendar className="h-4 w-4 mr-2 text-mrc-blue" />
          Mises à jour et versions
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">Les documents sont mis à jour trimestriellement pour refléter les dernières évolutions politiques et stratégiques.</p>
      </div>
    </div>
  );
};

export default PDFContent;
