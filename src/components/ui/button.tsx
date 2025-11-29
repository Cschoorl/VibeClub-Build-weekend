"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger" | "primary";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg",
          {
            "bg-[#E53935] text-white hover:bg-[#EF5350]": variant === "default" || variant === "primary",
            "bg-transparent text-[#FAFAFA] border border-[#262626] hover:bg-[#161616] hover:border-[#363636]": variant === "outline",
            "bg-transparent text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#161616]": variant === "ghost",
            "bg-[#161616] text-[#FAFAFA] hover:bg-[#1C1C1C]": variant === "secondary",
            "bg-[#E53935]/10 text-[#E53935] hover:bg-[#E53935]/20": variant === "danger",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
            "p-2": size === "icon",
          },
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
