
import React, { useState, useEffect } from 'react';
import { Award, Download, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModuleCertificate } from '@/components/training/types';
import { useToast } from '@/hooks/use-toast';
import { downloadCertificate } from '@/components/documents/CertificateGenerator';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for certificates
const mockCertificates: ModuleCertificate[] = [
  {
    id: 'cert1',
    title: 'Fondamentaux du MRC',
    description: 'Maîtrise des principes et valeurs du parti',
    moduleId: 'mod1',
    issuedAt: '2024-06-10',
    pdfUrl: '/certificates/certificate-mod1.pdf'
  },
  {
    id: 'cert2',
    title: 'Communication Politique',
    description: 'Techniques avancées de communication efficace',
    moduleId: 'mod2',
    issuedAt: '2024-06-15'
  }
];

const EmptyCertificatesState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
      <Award className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-white mb-2">Aucun certificat disponible</h3>
    <p className="text-gray-400 max-w-md">
      Complétez les modules de formation pour obtenir des certificats. 
      Votre progression sera enregistrée automatiquement.
    </p>
    <Button className="mt-6 bg-mrc-blue hover:bg-blue-700">
      Explorer les modules
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const CertificateCard = ({ certificate }: { certificate: ModuleCertificate }) => {
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const handleDownload = () => {
    if (certificate.pdfUrl) {
      // In a real app, this would download the actual certificate PDF
      // Mock implementation for now
      toast({
        title: "Certificat téléchargé",
        description: `Le certificat pour "${certificate.title}" a été téléchargé.`
      });
      
      // Use the certificate generator from documents module
      downloadCertificate({
        id: certificate.moduleId,
        title: certificate.title,
        description: certificate.description,
        duration: "3 heures",
        level: "Intermédiaire"
      } as any);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="bg-mrc-blue/20 p-2 rounded-lg">
            <Award className="h-6 w-6 text-mrc-blue" />
          </div>
          <div className="bg-green-900/20 px-3 py-1 rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">Validé</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-white mt-4">{certificate.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{certificate.description}</p>
        
        <div className="flex items-center mt-4 text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-xs">Délivré le {formatDate(certificate.issuedAt)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <Button 
          onClick={handleDownload}
          className="w-full bg-gray-700 hover:bg-gray-600"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger le certificat
        </Button>
      </div>
    </motion.div>
  );
};

const CertificatesView: React.FC = () => {
  const [certificates, setCertificates] = useState<ModuleCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch certificates
    const timer = setTimeout(() => {
      setCertificates(mockCertificates);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4 bg-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-56 w-full bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Award className="h-5 w-5 mr-2 text-mrc-blue" />
        Mes certificats
      </h2>
      
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      ) : (
        <EmptyCertificatesState />
      )}
    </div>
  );
};

export default CertificatesView;
