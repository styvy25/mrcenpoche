
import { Module } from "@/components/modules/types";
import { Award, Calendar, User } from "lucide-react";

interface CertificatePreviewProps {
  module: Module;
  userName?: string;
}

const CertificatePreview = ({ module, userName = "Participant" }: CertificatePreviewProps) => {
  return (
    <div className="border-4 border-mrc-blue rounded-lg p-6 bg-blue-50 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-mrc-blue">CERTIFICAT DE RÉUSSITE</h2>
        <p className="text-gray-600">Mouvement pour la Renaissance du Cameroun</p>
        <p className="text-gray-600">Plateforme de Formation en Ligne</p>
        
        <div className="border-t-2 border-mrc-blue/30 pt-4 my-6" />
        
        <p className="text-gray-700">Ce certificat est décerné à</p>
        
        <div className="flex items-center justify-center gap-2 text-xl font-semibold text-mrc-blue">
          <User className="h-5 w-5" />
          <span>{userName}</span>
        </div>
        
        <p className="text-gray-700">pour avoir complété avec succès le module</p>
        
        <div className="text-lg font-semibold text-mrc-blue">
          "{module.title}"
        </div>
        
        <div className="text-sm text-gray-600">
          Durée: {module.duration} | Niveau: {module.level}
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mt-6">
          <Calendar className="h-4 w-4" />
          <span>Délivré le {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
        
        <div className="border-t border-gray-300 w-40 mx-auto mt-8 pt-2">
          <p className="text-xs text-gray-500">Signature du responsable</p>
        </div>
        
        <div className="absolute -z-10 opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Award className="h-40 w-40 text-mrc-blue" />
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
