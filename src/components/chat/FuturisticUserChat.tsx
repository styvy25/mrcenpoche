
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatState } from "./hooks/useChatState";
import { AnimatedBackground } from "@/components/ui/animated-background";
import ActiveUsersList from "./ActiveUsersList";
import MessagesContainer from "./components/MessagesContainer";
import ChatInputForm from "./components/ChatInputForm";
import ChatHeader from "./components/ChatHeader";

const FuturisticUserChat = () => {
  const { 
    messages, 
    activeUsers, 
    CURRENT_USER_ID, 
    handleSendMessage, 
    formatTime, 
    formatLastSeen 
  } = useChatState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-3 flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-900 border-white/10 overflow-hidden relative">
        {/* Background animé pour la discussion */}
        <div className="absolute inset-0 z-0">
          <AnimatedBackground 
            numberOfOrbs={6}
            blur={90}
            intensity={0.5}
          />
        </div>
        
        <CardHeader className="pb-3 pt-4 border-b border-white/10 relative z-10">
          <CardTitle>
            <ChatHeader />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 relative z-10">
          <MessagesContainer 
            messages={messages}
            currentUserId={CURRENT_USER_ID}
            formatTime={formatTime}
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg">
            <ChatInputForm onSendMessage={handleSendMessage} />
          </div>
        </CardContent>
      </Card>

      <ActiveUsersList 
        users={activeUsers}
        currentUserId={CURRENT_USER_ID}
        formatLastSeen={formatLastSeen}
      />
    </div>
  );
};

export default FuturisticUserChat;
