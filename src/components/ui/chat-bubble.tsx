
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  className, 
  variant = "received", 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-2 p-2", 
        variant === "sent" ? "flex-row-reverse ml-auto" : "mr-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ChatBubble.displayName = "ChatBubble";

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({ 
  src, 
  fallback, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-full bg-muted overflow-hidden",
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={fallback} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-medium">{fallback}</span>
      )}
    </div>
  );
};

ChatBubbleAvatar.displayName = "ChatBubbleAvatar";

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  isLoading?: boolean;
}

const ChatBubbleMessage: React.FC<ChatBubbleMessageProps> = ({ 
  className, 
  variant = "received", 
  isLoading = false,
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
        variant === "sent" 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex gap-1 py-2">
          <Skeleton className="h-2 w-2 rounded-full animate-bounce" />
          <Skeleton className="h-2 w-2 rounded-full animate-bounce [animation-delay:0.2s]" />
          <Skeleton className="h-2 w-2 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

ChatBubbleMessage.displayName = "ChatBubbleMessage";

export { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage };
