
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ChatInputProps {
  onSubmit?: () => void;
  placeholder?: string;
}

const ChatInput = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & ChatInputProps
>(({ className, onSubmit, onKeyDown, placeholder, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onKeyDown={handleKeyDown}
      rows={1}
      placeholder={placeholder}
      {...props}
    />
  );
});

ChatInput.displayName = "ChatInput";

export { ChatInput };
