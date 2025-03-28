
import React from "react";
import { cn } from "@/lib/utils";

const ChatMessageList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollRef}
      className={cn("flex flex-col space-y-4 overflow-y-auto p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
