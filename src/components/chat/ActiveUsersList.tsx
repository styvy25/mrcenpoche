
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "./hooks/types";
import { Users, Clock } from "lucide-react";

interface ActiveUsersListProps {
  users: User[];
  currentUserId: string;
  formatLastSeen: (date: Date | undefined) => string;
}

const ActiveUsersList = ({ users, currentUserId, formatLastSeen }: ActiveUsersListProps) => {
  // Separate online and offline users
  const onlineUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);
  
  return (
    <Card className="md:col-span-1 bg-gradient-to-br from-gray-900 to-gray-950 border-white/10 shadow-xl">
      <CardHeader className="pb-2 pt-3 border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-850 backdrop-blur-sm">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-full bg-gradient-to-r from-mrc-green to-emerald-600 shadow-md">
            <Users size={18} className="text-white" />
          </div>
          Participants
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-4">
          {/* Online users section */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              En ligne ({onlineUsers.length})
            </h3>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={`bg-gradient-to-br ${
                      user.id === currentUserId 
                        ? 'from-purple-600 to-blue-600' 
                        : 'from-gray-700 to-gray-800'
                    } text-white font-medium`}>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white flex items-center">
                      {user.name}
                      {user.id === currentUserId && (
                        <span className="ml-1 text-xs text-gray-400">(vous)</span>
                      )}
                    </p>
                    <p className="text-xs text-green-400">
                      Actif
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Offline users section */}
          {offlineUsers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
                Hors ligne ({offlineUsers.length})
              </h3>
              <div className="space-y-2">
                {offlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center p-2 rounded-lg hover:bg-gray-800/50 transition-colors opacity-75">
                    <Avatar className="h-9 w-9 mr-3 grayscale">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-white font-medium">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatLastSeen(user.lastSeen)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
