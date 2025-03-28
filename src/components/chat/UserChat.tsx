
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, PanelRightOpen, PanelRightClose, MessageCircle } from "lucide-react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import ActiveUsersList from "./ActiveUsersList";
import { useChatState } from "./hooks/useChatState";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FraudAlertModal from "../electoral/FraudAlertModal";

interface UserChatProps {
  isInDialog?: boolean;
}

const UserChat = ({ isInDialog = false }: UserChatProps) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isFraudAlertOpen, setFraudAlertOpen] = useState(false);
  
  const { 
    messages, 
    activeUsers, 
    CURRENT_USER_ID, 
    handleSendMessage, 
    formatTime, 
    formatLastSeen,
    chatSettings
  } = useChatState();

  // If chat is configured to be hidden, don't render it
  if (chatSettings && !chatSettings.isVisible) return null;

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`grid grid-cols-1 ${isSidebarVisible ? 'md:grid-cols-4' : 'md:grid-cols-1'} gap-4 ${isInDialog ? 'h-full' : 'h-[calc(100vh-12rem)]'} relative`}>
      <Card className={`${isSidebarVisible ? 'md:col-span-3' : 'md:col-span-1'} flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-950 border-white/10 shadow-xl relative overflow-hidden`}>
        <CardHeader className="pb-2 pt-3 border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-850 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-mrc-blue to-purple-600 shadow-md">
                <MessageCircle size={18} className="text-white" />
              </div>
              Discussion entre apprenants
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-white hover:bg-white/10"
                onClick={toggleSidebar}
              >
                {isSidebarVisible ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-full p-0 relative">
          <MessagesContainer 
            messages={messages} 
            currentUserId={CURRENT_USER_ID}
            formatTime={formatTime}
          />
          <MessageInput 
            onSendMessage={handleSendMessage} 
          />
          
          {/* Bouton flottant de signalement de fraude */}
          <Button
            variant="destructive"
            size="sm"
            className="absolute bottom-20 right-4 z-10 rounded-full shadow-lg p-3 bg-gradient-to-r from-mrc-red to-rose-600 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105"
            onClick={() => setFraudAlertOpen(true)}
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="sr-only">Signaler une fraude</span>
          </Button>
        </CardContent>
      </Card>

      {!isInDialog && isSidebarVisible && (
        <ActiveUsersList 
          users={activeUsers}
          currentUserId={CURRENT_USER_ID}
          formatLastSeen={formatLastSeen}
        />
      )}
      
      {!isInDialog && (
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 h-12 w-6 rounded-l-none rounded-r-md bg-gray-800 border-gray-700 border-l-0 p-0 hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </Button>
      )}
      
      <FraudAlertModal
        isOpen={isFraudAlertOpen}
        onOpenChange={setFraudAlertOpen}
      />
    </div>
  );
};

export default UserChat;
