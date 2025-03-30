
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Send, Image, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import { useToast } from "@/hooks/use-toast";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => Promise<boolean> | boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isLoading,
  onSendMessage
}) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { incrementChatMessages } = usePlanLimits();
  const { isMobile, width } = useDeviceDetect();
  
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update input when transcript changes
  React.useEffect(() => {
    if (transcript) {
      setInput(prev => `${prev} ${transcript}`.trim());
    }
  }, [transcript]);
  
  // Mobile keyboard adjustment
  useEffect(() => {
    const handleResize = () => {
      if (isMobile && document.activeElement === textareaRef.current) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  
  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;
    try {
      const success = await onSendMessage(input);
      if (success) {
        incrementChatMessages();
        setInput("");
        resetTranscript();
        setSelectedImage(null);
        
        // Focus back on textarea after sending
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 100);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive"
      });
    }
  };
  
  const toggleRecording = () => {
    if (isListening) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
      toast({
        title: "Enregistrement en cours",
        description: "Parlez clairement..."
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale est de 5 Mo.",
          variant: "destructive"
        });
        return;
      }
      setSelectedImage(file);
    }
  };
  
  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-resize textarea
  const autoResizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, isMobile ? 80 : 150)}px`;
    }
  }, [isMobile]);
  
  React.useEffect(() => {
    autoResizeTextarea();
  }, [input, autoResizeTextarea]);
  
  return (
    <div 
      ref={inputContainerRef}
      className={`relative border-t border-gray-700 bg-gradient-to-b from-black/80 to-gray-900/90 p-3 pb-safe`}
    >
      {selectedImage && (
        <div className="mb-2 relative inline-block">
          <div className="rounded-md bg-gray-800 p-2 flex items-center">
            <span className="text-sm text-gray-300 truncate max-w-[200px]">
              {selectedImage.name}
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={removeSelectedImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Textarea 
          ref={textareaRef} 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Posez votre question ici..." 
          disabled={isLoading} 
          className="min-h-[40px] max-h-[150px] border-gray-700 resize-none focus-visible:ring-blue-600 bg-slate-50 text-base"
          style={{ fontSize: isMobile ? '16px' : undefined }}
        />

        <div className={`flex ${isMobile ? 'flex-col' : 'gap-1'}`}>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          {!isMobile && (
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              disabled={isLoading} 
              onClick={handleImageSelect} 
              className="text-muted-foreground hover:text-primary"
            >
              <Image className="h-5 w-5" />
            </Button>
          )}

          {browserSupportsSpeechRecognition && (
            <Button 
              type="button" 
              size="icon" 
              variant={isRecording ? "default" : "ghost"} 
              disabled={isLoading} 
              onClick={toggleRecording} 
              className={`${isRecording ? "bg-red-600 hover:bg-red-700 text-white" : "text-muted-foreground hover:text-primary"} ${isMobile ? 'mb-1' : ''}`}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}

          <Button 
            type="button" 
            size="icon" 
            disabled={isLoading || (!input.trim() && !selectedImage)} 
            onClick={handleSendMessage} 
            className={`${!input.trim() && !selectedImage ? "text-muted-foreground" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {isMobile && (
        <div className="flex justify-center mt-2 gap-3">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={isLoading}
            onClick={handleImageSelect}
            className="text-muted-foreground hover:text-primary"
          >
            <Image className="h-4 w-4 mr-1" />
            <span className="text-xs">Image</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
