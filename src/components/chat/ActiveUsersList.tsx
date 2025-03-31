
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="h-full hidden md:flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 border-white/10">
      <CardHeader className="pb-3 pt-4 border-b border-white/10">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Sparkles size={16} className="text-mrc-green" />
          Utilisateurs actifs
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-3">
        <ScrollArea className="h-full">
          <div className="space-y-1 px-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors">
                <div className="relative">
                  <Avatar className="border-2 border-gray-800">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-mrc-blue text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 ${
                      user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></span>
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
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
