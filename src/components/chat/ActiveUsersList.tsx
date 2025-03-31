
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Sparkles, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface ActiveUsersListProps {
  users: User[];
  currentUserId: string;
  formatLastSeen: (date?: Date) => string;
}

const ActiveUsersList = ({ users, currentUserId, formatLastSeen }: ActiveUsersListProps) => {
  // Compte le nombre d'utilisateurs en ligne
  const onlineCount = users.filter(user => user.isOnline).length;

  return (
    <Card className="h-full hidden md:flex flex-col bg-gradient-to-br from-gray-900 to-gray-900 border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <CardHeader className="pb-3 pt-4 border-b border-white/10 relative z-10">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="text-mrc-green"
          >
            <Sparkles size={16} />
          </motion.div>
          <span className="bg-gradient-to-r from-mrc-green via-mrc-blue to-mrc-green bg-clip-text text-transparent animate-gradient">
            Utilisateurs actifs
          </span>
          <span className="ml-auto bg-gray-800 text-xs px-2 py-0.5 rounded-full flex items-center text-gray-300">
            <Users size={10} className="mr-1"/> {onlineCount}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-2 py-3 relative z-10 flex-1">
        <ScrollArea className="h-full pr-2">
          <div className="space-y-1">
            {users.map((user) => (
              <motion.div 
                key={user.id} 
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 2 }}
              >
                <div className="relative">
                  <Avatar className="border-2 border-gray-800">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-mrc-blue to-indigo-700 text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <motion.span 
                    animate={user.isOnline ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={user.isOnline ? { 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut" 
                    } : {}}
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 ${
                      user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></motion.span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-sm truncate text-white">
                    {user.name}
                    {user.id === currentUserId && " (Vous)"}
                  </p>
                  {!user.isOnline && user.lastSeen && (
                    <p className="text-xs text-gray-400 flex items-center">
                      <Clock size={10} className="mr-1" />
                      Vu {formatLastSeen(user.lastSeen)}
                    </p>
                  )}
                </div>
                {user.isOnline && user.id !== currentUserId && (
                  <button className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-800/50 hover:bg-gray-800 transition-colors text-mrc-blue">
                    <MessageSquare size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      <div className="px-4 py-3 border-t border-white/10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 text-center"
        >
          Connectez-vous avec d'autres militants du MRC pour échanger des idées et des expériences.
        </motion.div>
      </div>
    </Card>
  );
};

export default ActiveUsersList;
