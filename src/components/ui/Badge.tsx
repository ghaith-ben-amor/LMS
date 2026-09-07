"use client";

import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "burgundy" | "obsidian" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gold",
  size = "sm",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center font-semibold uppercase tracking-widest rounded-full border transition-all";

  const variantStyles = {
    gold: "bg-gold/10 text-gold border-gold/30",
    burgundy: "bg-burgundy/20 text-red-300 border-burgundy/40",
    obsidian: "bg-obsidian-surface text-ivory-muted border-obsidian-border",
    outline: "bg-transparent text-gold border-gold/40",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[0.65rem]",
    md: "px-3.5 py-1 text-xs",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
