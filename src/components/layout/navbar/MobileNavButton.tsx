
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileNavButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavButton = ({ isOpen, setIsOpen }: MobileNavButtonProps) => {
  return (
    <div className="-mr-2 flex items-center sm:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="transition-all duration-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default MobileNavButton;
