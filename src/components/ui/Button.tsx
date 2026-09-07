"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-burgundy-light via-gold to-burgundy-light text-obsidian shadow-lg hover:shadow-gold-glow hover:brightness-110 border border-gold/30",
      secondary:
        "bg-obsidian-surface text-ivory border border-gold/30 hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-gold-glow",
      outline:
        "bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/10",
      ghost:
        "bg-transparent text-ivory-muted hover:text-gold hover:bg-white/5",
      danger:
        "bg-red-950/80 text-red-200 border border-red-500/40 hover:bg-red-900 hover:border-red-400",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-2.5",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={combinedClassName}
        >
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
