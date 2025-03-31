
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatState } from "./hooks/useChatState";
import { AnimatedBackground } from "@/components/ui/animated-background";
import ActiveUsersList from "./ActiveUsersList";
import MessagesContainer from "./components/MessagesContainer";
import ChatInputForm from "./components/ChatInputForm";
import ChatHeader from "./components/ChatHeader";
import { motion } from "framer-motion";
import { useSubscription } from "@/hooks/useSubscription";
import { Sparkles } from "lucide-react";

const FuturisticUserChat = () => {
  const { 
    messages, 
    activeUsers, 
    CURRENT_USER_ID, 
    handleSendMessage, 
    formatTime, 
    formatLastSeen 
  } = useChatState();
  
  const { isPremium } = useSubscription();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-12rem)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="md:col-span-3 flex flex-col h-full relative"
        variants={itemVariants}
      >
        <Card className="flex-1 flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-900 border-white/10 overflow-hidden relative">
          {/* Background animé pour la discussion */}
          <div className="absolute inset-0 z-0">
            <AnimatedBackground 
              numberOfOrbs={6}
              blur={90}
              intensity={0.5}
            />
          </div>
          
          {isPremium && (
            <motion.div 
              className="absolute top-4 right-4 z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900">
                <Sparkles size={12} className="mr-1" />
                Premium
              </span>
            </motion.div>
          )}
          
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
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <ChatInputForm onSendMessage={handleSendMessage} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="h-full"
      >
        <ActiveUsersList 
          users={activeUsers}
          currentUserId={CURRENT_USER_ID}
          formatLastSeen={formatLastSeen}
        />
      </motion.div>
    </motion.div>
  );
};

export default FuturisticUserChat;
