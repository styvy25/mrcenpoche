
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserChat from "./UserChat";
import { useUISettings } from '@/hooks/useUISettings';
import { useScreenSize } from '@/hooks/useScreenSize';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getComponentSettings } = useUISettings();
  const { isMobile } = useScreenSize();
  
  const buttonSettings = getComponentSettings('ChatButton');
  
  // If button is configured to be hidden, don't render it
  if (!buttonSettings.isVisible) return null;
  
  const colorClass = buttonSettings.color || 'mrc-blue';
  
  return (
    <>
      <Button
        variant="default"
        size={isMobile ? "sm" : "default"}
        className={`font-semibold fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg bg-${colorClass} hover:bg-${colorClass}/80 transition-all`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
        <span className="sr-only">Ouvrir le chat</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] h-[80vh]">
          <div className="flex flex-col h-full overflow-hidden">
            <UserChat />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatButton;
