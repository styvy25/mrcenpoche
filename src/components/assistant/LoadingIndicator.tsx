
import { Card } from "@/components/ui/card";

const LoadingIndicator = () => {
  return (
    <Card className="p-4 max-w-[85%] bg-mrc-blue/20 backdrop-blur-sm border border-mrc-blue/30">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </Card>
  );
};

export default LoadingIndicator;
