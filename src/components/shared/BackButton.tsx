
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  to = "/",
  label = "Retour",
  className = "",
  onClick
}) => {
  if (onClick) {
    return (
      <Button 
        variant="outline" 
        className={`flex items-center gap-2 ${className}`}
        onClick={onClick}
      >
        <ArrowLeft className="h-4 w-4" /> {label}
      </Button>
    );
  }
  
  return (
    <Link to={to}>
      <Button 
        variant="outline" 
        className={`flex items-center gap-2 ${className}`}
      >
        <ArrowLeft className="h-4 w-4" /> {label}
      </Button>
    </Link>
  );
};

export default BackButton;
