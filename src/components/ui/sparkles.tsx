
import * as React from "react";
import { cn } from "@/lib/utils";

interface SparklesProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

const Sparkles = React.forwardRef<SVGSVGElement, SparklesProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide lucide-sparkles", className)}
        ref={ref}
        {...props}
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    );
  }
);
Sparkles.displayName = "Sparkles";

export { Sparkles };
