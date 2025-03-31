
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Module } from "../types";
import { downloadCertificate } from "../../documents/CertificateGenerator";

interface CertificateDialogProps {
  module: Module;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
  module,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [userName, setUserName] = useState("");

  const handleDownloadCertificate = () => {
    downloadCertificate(module, userName || undefined);
    onClose();
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button type="button" variant="secondary" onClick={onClose}>
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

export default CertificateDialog;
