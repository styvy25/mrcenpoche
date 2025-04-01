
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from './EmptyState';

interface CertificateTabContentProps {
  certificates: any[];
}

const CertificateTabContent: React.FC<CertificateTabContentProps> = ({ certificates }) => {
  if (certificates.length === 0) {
    return (
      <EmptyState 
        icon={<Award className="h-10 w-10" />} 
        title="Aucun certificat disponible" 
        description="Terminez ce module pour obtenir votre certificat."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((certificate, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-green-900/30 via-yellow-900/30 to-red-900/30 p-6 rounded-lg border border-gray-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{certificate.title}</h3>
              <p className="text-sm text-gray-400">{certificate.description}</p>
            </div>
            <div className="h-10 w-10 bg-yellow-600 flex items-center justify-center p-1 rounded-full">
              <Award className="h-6 w-6" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Obtenu le {new Date(certificate.issuedAt).toLocaleDateString()}
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1.5" />
              Télécharger
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateTabContent;
