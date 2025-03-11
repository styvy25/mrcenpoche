
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";

interface APIKeyDialogProps {
  showDialog: boolean;
  onClose: () => void;
}

const APIKeyDialog = ({ showDialog, onClose }: APIKeyDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clés API requises</DialogTitle>
          <DialogDescription>
            Pour générer des PDF avec l'IA, vous devez configurer vos clés API
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Veuillez configurer vos clés API YouTube et Perplexity dans les paramètres pour utiliser toutes les fonctionnalités.
        </p>
        <DialogFooter>
          <Button onClick={onClose}>
            Compris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyDialog;
