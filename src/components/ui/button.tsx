
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90 hover:scale-105 active:scale-95 after:content-[''] after:absolute after:w-full after:h-0 after:left-0 after:bottom-0 after:bg-white/20 after:opacity-0 hover:after:h-full hover:after:opacity-100 after:transition-all after:duration-300",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90 hover:scale-105 active:scale-95",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80 hover:scale-105 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "bg-gradient-to-r from-mrc-blue to-mrc-green text-white hover:shadow-lg hover:shadow-mrc-blue/30 hover:scale-105 active:scale-95 transition-all duration-500",
        glow: "bg-mrc-blue text-white hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95",
        "3d": "bg-primary text-primary-foreground shadow-[0_4px_0_0_#0005] hover:shadow-[0_2px_0_0_#0005] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all transform-gpu",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        wiggle: "hover:animate-[wiggle_1s_ease-in-out_infinite]",
        glow: "hover:animate-[glow_1.5s_ease-in-out_infinite_alternate]",
        shine: "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-[200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animation?: "none" | "pulse" | "bounce" | "wiggle" | "glow" | "shine";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, animation, className }))} 
        ref={ref} 
        {...props} 
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
