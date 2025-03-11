
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import ActiveUsersList from "./ActiveUsersList";
import { useChatState } from "./hooks/useChatState";

const UserChat = () => {
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
      <Card className="md:col-span-3 flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-800 border-white/10">
        <CardHeader className="pb-3 pt-4 border-b border-white/10">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-full bg-mrc-blue">
              <Users size={18} className="text-white" />
            </div>
            Discussion entre apprenants
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full p-0">
          <MessagesContainer 
            messages={messages} 
            currentUserId={CURRENT_USER_ID}
            formatTime={formatTime}
          />
          <MessageInput onSendMessage={handleSendMessage} />
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

export default UserChat;
