
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { Video, Camera, Users } from "lucide-react";

interface LivestreamingTabIconsProps {
  tab: string;
  label: string;
}

const LivestreamingTabIcons: React.FC<LivestreamingTabIconsProps> = ({ tab, label }) => {
  const getIcon = () => {
    switch (tab) {
      case "browse":
        return <Video className="h-4 w-4" />;
      case "studio":
        return <Camera className="h-4 w-4" />;
      case "community":
        return <Users className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  return (
    <TabsTrigger value={tab} className="flex items-center gap-1">
      {getIcon()} {label}
    </TabsTrigger>
  );
};

export default LivestreamingTabIcons;
