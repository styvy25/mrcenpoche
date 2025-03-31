
import React from 'react';
import { jsPDF } from 'jspdf';
import { User } from '@/types';

interface CertificateProps {
  moduleName: string;
  completionDate: Date;
  user?: User;
}

const downloadCertificate = async (props: CertificateProps): Promise<void> => {
  const { moduleName, completionDate, user } = props;
  
  // Create new PDF
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Add certificate title
  doc.setFontSize(30);
  doc.setTextColor(31, 87, 164); // MRC blue
  doc.text('Certificat de Réussite', 148, 50, { align: 'center' });
  
  // Add MRC logo/header
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text('Mouvement pour la Renaissance du Cameroun', 148, 30, { align: 'center' });
  
  // Add recipient name
  doc.setFontSize(24);
  doc.text(`${user?.email || 'Participant'}`, 148, 80, { align: 'center' });
  
  // Add certificate text
  doc.setFontSize(16);
  doc.text('a complété avec succès le module de formation', 148, 100, { align: 'center' });
  
  // Add module name
  doc.setFontSize(20);
  doc.setTextColor(46, 125, 50); // Green
  doc.text(`"${moduleName}"`, 148, 120, { align: 'center' });
  
  // Add date
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Date d'achèvement: ${completionDate.toLocaleDateString('fr-FR')}`, 148, 140, { align: 'center' });
  
  // Add signature
  doc.text('Maurice Kamto', 80, 180);
  doc.text('Président du MRC', 80, 188);
  
  // Add certificate ID
  const certId = `MRC-CERT-${Date.now().toString().slice(-8)}`;
  doc.setFontSize(10);
  doc.text(`ID du certificat: ${certId}`, 148, 200, { align: 'center' });
  
  // Save PDF
  doc.save(`Certificat_${moduleName.replace(/\s+/g, '_')}.pdf`);
};

const CertificateGenerator: React.FC<CertificateProps> = (props) => {
  return (
    <button 
      onClick={() => downloadCertificate(props)}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
    >
      Télécharger le certificat
    </button>
  );
};

export { downloadCertificate };
export default CertificateGenerator;
