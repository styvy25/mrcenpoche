
import { jsPDF } from "jspdf";
import { Module } from "@/components/modules/types";

interface GenerateCertificateOptions {
  module: Module;
  userName?: string;
  completionDate?: Date;
}

export const generateCertificate = ({
  module,
  userName = "Participant",
  completionDate = new Date(),
}: GenerateCertificateOptions) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Set background color
  doc.setFillColor(248, 250, 252); // Light gray background
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

  // Add decorative border
  doc.setDrawColor(31, 87, 164); // MRC blue
  doc.setLineWidth(3);
  doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20, "S");

  // Add second inner border
  doc.setDrawColor(31, 87, 164, 0.5); // MRC blue with opacity
  doc.setLineWidth(1);
  doc.rect(15, 15, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 30, "S");

  // Add MRC header
  doc.setFontSize(28);
  doc.setTextColor(31, 87, 164); // MRC blue
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICAT DE RÉUSSITE", doc.internal.pageSize.width / 2, 40, { align: "center" });

  // Add MRC subtitle
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("Mouvement pour la Renaissance du Cameroun", doc.internal.pageSize.width / 2, 50, { align: "center" });
  doc.text("Plateforme de Formation en Ligne", doc.internal.pageSize.width / 2, 58, { align: "center" });

  // Add decorative line
  doc.setDrawColor(31, 87, 164);
  doc.setLineWidth(1);
  doc.line(80, 65, doc.internal.pageSize.width - 80, 65);

  // Certificate text
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text("Ce certificat est décerné à", doc.internal.pageSize.width / 2, 80, { align: "center" });

  // Participant name
  doc.setFontSize(24);
  doc.setTextColor(31, 87, 164);
  doc.setFont("helvetica", "bold");
  doc.text(userName, doc.internal.pageSize.width / 2, 95, { align: "center" });

  // Achievement text
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text("pour avoir complété avec succès le module", doc.internal.pageSize.width / 2, 110, { align: "center" });

  // Module title
  doc.setFontSize(20);
  doc.setTextColor(31, 87, 164);
  doc.setFont("helvetica", "bold");
  doc.text(`"${module.title}"`, doc.internal.pageSize.width / 2, 125, { align: "center" });

  // Module details
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.text(`Durée: ${module.duration} | Niveau: ${module.level}`, doc.internal.pageSize.width / 2, 138, { align: "center" });

  // Date
  const formattedDate = completionDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  doc.setFontSize(12);
  doc.text(`Délivré le ${formattedDate}`, doc.internal.pageSize.width / 2, 160, { align: "center" });

  // Signature line
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.line(100, 180, 200, 180);
  
  doc.setFontSize(10);
  doc.text("Signature du responsable de formation", doc.internal.pageSize.width / 2, 188, { align: "center" });

  // Generate a filename for the certificate
  const fileName = `Certificat_${module.title.replace(/\s+/g, '_')}_${userName.replace(/\s+/g, '_')}.pdf`;

  // Return the document and filename
  return { doc, fileName };
};

export const downloadCertificate = (module: Module, userName?: string) => {
  const { doc, fileName } = generateCertificate({
    module,
    userName,
    completionDate: new Date(),
  });

  // Save the PDF
  doc.save(fileName);
};
