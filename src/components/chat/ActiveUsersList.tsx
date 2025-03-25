
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "./hooks/types";

interface ActiveUsersListProps {
  users: User[];
  currentUserId: string;
  formatLastSeen: (date?: Date) => string;
}

const ActiveUsersList = ({ users, currentUserId, formatLastSeen }: ActiveUsersListProps) => {
  const activeUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);

  return (
    <Card className="h-full hidden md:flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 border-white/10 shadow-xl">
      <CardHeader className="pb-3 pt-4 border-b border-white/10">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-gradient-to-r from-mrc-green to-emerald-500">
            <Users size={14} className="text-white" />
          </div>
          Utilisateurs connectés
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-3 h-full flex flex-col">
        <div className="mb-2 px-2">
          <p className="text-xs font-medium text-gray-400 flex items-center gap-1 uppercase tracking-wider">
            <Sparkles size={12} className="text-green-400" />
            En ligne ({activeUsers.length})
          </p>
        </div>
        
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors">
                <div className="relative">
                  <Avatar className="border-2 border-gray-800">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-mrc-blue to-purple-600 text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span 
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-500 shadow-lg shadow-green-500/20"
                  ></span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-sm truncate text-white">
                    {user.name}
                    {user.id === currentUserId && " (Vous)"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {offlineUsers.length > 0 && (
            <>
              <div className="mt-4 mb-2">
                <p className="text-xs font-medium text-gray-400 flex items-center gap-1 uppercase tracking-wider">
                  <Clock size={12} className="text-gray-400" />
                  Hors ligne ({offlineUsers.length})
                </p>
              </div>
              
              <div className="space-y-1 opacity-70">
                {offlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors">
                    <div className="relative">
                      <Avatar className="border-2 border-gray-800 opacity-70">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback className="bg-gray-700 text-gray-300">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span 
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 bg-gray-500"
                      ></span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm truncate text-gray-300">
                        {user.name}
                        {user.id === currentUserId && " (Vous)"}
                      </p>
                      {user.lastSeen && (
                        <p className="text-2xs text-gray-500 flex items-center">
                          <Clock size={10} className="mr-1 inline" />
                          Vu {formatLastSeen(user.lastSeen)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
