
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Search, 
  Phone, 
  Video, 
  Trash2, 
  Users, 
  Check,
  Bell,
  BellOff,
  UserPlus
} from 'lucide-react';
import { User } from './hooks/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface ChatHeaderProps {
  currentUser: User;
  activeUsers: User[];
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ currentUser, activeUsers, onClearChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  
  const onlineCount = activeUsers.filter(user => user.isOnline).length;
  
  const handleClearChat = () => {
    onClearChat();
    toast({
      title: "Conversation effacée",
      description: "Toutes les messages ont été supprimés de cet appareil",
    });
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Notifications activées" : "Notifications désactivées",
      description: isMuted 
        ? "Vous recevrez des notifications pour les nouveaux messages" 
        : "Vous ne recevrez plus de notifications pour les nouveaux messages",
    });
  };
  
  const handleStartCall = (isVideo: boolean) => {
    toast({
      title: `Appel ${isVideo ? 'vidéo' : 'audio'} initié`,
      description: "Cette fonctionnalité sera disponible prochainement",
    });
  };
  
  return (
    <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-blue-500">
          <AvatarImage src="/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png" />
          <AvatarFallback className="bg-blue-500 text-white">MRC</AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-semibold">Chat MRC 237</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <Badge variant="outline" className="px-1.5 h-5">
                {onlineCount} en ligne
              </Badge>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {isSearchOpen ? (
          <div className="relative flex items-center">
            <Input
              className="h-8 w-[150px] rounded-full pl-8 text-xs pr-3"
              placeholder="Rechercher dans le chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 ml-1" 
              onClick={() => setIsSearchOpen(false)}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleStartCall(false)}
            >
              <Phone className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleStartCall(true)}
            >
              <Video className="h-4 w-4" />
            </Button>
            
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Inviter des membres
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem onClick={handleToggleMute}>
                    {isMuted ? (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Activer les notifications
                      </>
                    ) : (
                      <>
                        <BellOff className="h-4 w-4 mr-2" />
                        Désactiver les notifications
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleClearChat}
                    className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer la conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inviter des membres</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input 
                    placeholder="Rechercher des utilisateurs..." 
                    className="mb-4"
                  />
                  <ScrollArea className="h-60">
                    <div className="space-y-2">
                      {Array.from({length: 5}, (_, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>U{i+1}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Utilisateur {i+1}</p>
                              <p className="text-xs text-muted-foreground">user{i+1}@example.com</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Inviter</Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
