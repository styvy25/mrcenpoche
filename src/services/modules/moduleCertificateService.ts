
import { Badge } from '@/components/training/types';

/**
 * Get certificates for a specific module
 */
export const getModuleCertificates = async (moduleId: string): Promise<any[]> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock certificates
    return [
      {
        id: 'cert1',
        title: 'Certificat de Réussite',
        description: 'A complété avec succès le module Fondamentaux du MRC',
        moduleId,
        issuedAt: new Date().toISOString(),
        pdfUrl: '#'
      }
    ];
  } catch (error) {
    console.error("Error getting certificates:", error);
    throw error;
  }
};
