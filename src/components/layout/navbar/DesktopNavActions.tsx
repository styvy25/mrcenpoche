
import { Button } from "@/components/ui/button";
import { Sun, Moon, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DesktopNavActionsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navEndElement?: React.ReactNode;
}

const DesktopNavActions = ({ isDarkMode, toggleDarkMode, navEndElement }: DesktopNavActionsProps) => {
  const navigate = useNavigate();

  const handleAPIButtonClick = () => {
    navigate('/settings');
  };

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleAPIButtonClick}
        className="flex items-center gap-2 text-mrc-blue border-mrc-blue/30 hover:bg-mrc-blue/10 transition-all duration-300"
      >
        <Key className="h-4 w-4" />
        API
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleDarkMode} 
        className="rounded-full transition-all duration-300 hover:scale-110"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      {navEndElement}
    </div>
  );
};

export default DesktopNavActions;
