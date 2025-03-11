
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppointmentScheduler from "../AppointmentScheduler";

interface SchedulerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const SchedulerDialog: React.FC<SchedulerDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onClose 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full mt-4 text-mrc-blue border-mrc-blue/30 hover:bg-mrc-blue/5"
        >
          Réserver une formation privée
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0">
        <AppointmentScheduler onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
