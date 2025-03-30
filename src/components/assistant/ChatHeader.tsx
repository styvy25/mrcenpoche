
import { Button } from "@/components/ui/button";
import {
  RefreshCcw,
  MoreHorizontal,
  Trash2,
  FileText,
  Copy,
  Wifi,
  WifiOff
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import PDFExportButton from "./PDFExportButton";
import { useChatHeader } from "./hooks/useChatHeader";
import { useMessageHandler } from "./hooks/useMessageHandler";

// Refactored: Extracted the clear conversation dialog into a separate component
interface ClearConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ClearConversationDialog: React.FC<ClearConversationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Effacer la conversation</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir effacer toute la conversation? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Effacer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Refactored: Extracted the online status indicator into a separate component
interface OnlineStatusProps {
  isOnline: boolean;
}

const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline }) => {
  return (
    <p className="text-xs text-muted-foreground flex items-center">
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3 mr-1 text-green-500" />
          Assistant IA connecté
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-1 text-amber-500" />
          Mode hors-ligne
        </>
      )}
    </p>
  );
};

// Main ChatHeader component
interface ChatHeaderProps {
  onGeneratePDF?: () => void;
  onClearConversation: () => void;
  onRefresh: () => Promise<boolean>;
  isOnline: boolean;
}

const ChatHeader = ({
  onGeneratePDF,
  onClearConversation,
  onRefresh,
  isOnline
}: ChatHeaderProps) => {
  const { messages } = useMessageHandler();
  const { canUseFeature } = usePlanLimits();
  
  const {
    isClearDialogOpen,
    setIsClearDialogOpen,
    isRefreshing,
    handleClearConfirm,
    handleRefresh,
    handleCopyConversation
  } = useChatHeader({
    messages,
    onClearConversation,
    onRefresh
  });

  const canExportPDF = canUseFeature('pdfExport');

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Styvy237</h3>
            <OnlineStatus isOnline={isOnline} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="relative"
            title="Rafraîchir la discussion"
          >
            <RefreshCcw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>

          {messages.length > 1 && (
            <PDFExportButton 
              messages={messages}
              variant="ghost"
              size="icon"
              className="relative"
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyConversation}>
                <Copy className="h-4 w-4 mr-2" />
                Copier la conversation
              </DropdownMenuItem>
              
              {canExportPDF && onGeneratePDF && (
                <DropdownMenuItem onClick={onGeneratePDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter en PDF
                </DropdownMenuItem>
              )}
              
              <DropdownMenuItem onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Rafraîchir
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem
                onClick={() => setIsClearDialogOpen(true)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Effacer la conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ClearConversationDialog 
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}
        onConfirm={handleClearConfirm}
      />
    </>
  );
};

export default ChatHeader;
