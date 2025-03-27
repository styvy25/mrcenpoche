
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import AlertForm from "./form/AlertForm";
import MediaCapture from "../chat/MediaCapture";

interface FraudAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FraudAlertModal: React.FC<FraudAlertModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [mediaFile, setMediaFile] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);
  const [showMediaCapture, setShowMediaCapture] = useState(false);

  const handleOpenMediaCapture = () => {
    setShowMediaCapture(true);
  };

  const handleCloseMediaCapture = () => {
    setShowMediaCapture(false);
  };

  const handleMediaCapture = async (
    capturedMedia: Blob,
    capturedMediaType: 'photo' | 'audio'
  ) => {
    setMediaFile(capturedMedia);
    setMediaType(capturedMediaType);
    setShowMediaCapture(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Signaler une fraude électorale
          </DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour signaler une fraude électorale dont vous êtes témoin.
          </DialogDescription>
        </DialogHeader>

        {showMediaCapture ? (
          <MediaCapture
            onClose={handleCloseMediaCapture}
            onCapture={handleMediaCapture}
          />
        ) : (
          <AlertForm
            onClose={onClose}
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
            mediaType={mediaType}
            setMediaType={setMediaType}
            onCaptureMedia={handleOpenMediaCapture}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FraudAlertModal;
