
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
