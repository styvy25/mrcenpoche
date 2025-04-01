
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigation } from "../navigation/NavigationContext";

interface MobileNavButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileNavButton = ({ isOpen, toggleMenu }: MobileNavButtonProps) => {
  return (
    <div className="-mr-2 flex items-center sm:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        className="transition-all duration-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default MobileNavButton;
