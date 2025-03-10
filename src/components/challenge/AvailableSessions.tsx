
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const AvailableSessions = () => {
  return (
    <div className="w-full flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
      <p className="text-xs text-gray-500 text-center">Sessions publiques disponibles</p>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs h-14 flex flex-col items-center justify-center">
          <Video className="h-4 w-4 mb-1" />
          <span>Formation Mobilisation</span>
          <span className="text-[10px] text-gray-500">Demain, 15h</span>
        </Button>
        <Button variant="outline" size="sm" className="text-xs h-14 flex flex-col items-center justify-center">
          <Video className="h-4 w-4 mb-1" />
          <span>Histoire du MRC</span>
          <span className="text-[10px] text-gray-500">Jeudi, 18h</span>
        </Button>
      </div>
    </div>
  );
};

export default AvailableSessions;
