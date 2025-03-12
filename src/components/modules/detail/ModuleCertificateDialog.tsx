
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCertificate } from "../../documents/CertificateGenerator";
import { Module } from "../types";

interface ModuleCertificateDialogProps {
  module: Module;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModuleCertificateDialog = ({ module, open, onOpenChange }: ModuleCertificateDialogProps) => {
  const [userName, setUserName] = useState("");

  const handleDownloadCertificate = () => {
    downloadCertificate(module, userName || undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Télécharger votre certificat</DialogTitle>
          <DialogDescription>
            Votre certificat sera personnalisé avec votre nom et les détails du module.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Votre nom
            </Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Entrez votre nom complet"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleDownloadCertificate} className="bg-mrc-blue hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleCertificateDialog;
