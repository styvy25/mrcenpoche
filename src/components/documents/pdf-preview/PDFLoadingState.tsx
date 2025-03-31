
import { Loader2 } from "lucide-react";

const PDFLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Chargement du document...</p>
    </div>
  );
};

export default PDFLoadingState;
