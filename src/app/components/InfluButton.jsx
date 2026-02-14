import React from "react";
import { cn } from "../components/ui/utils";
function InfluButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
    success: "bg-[#10b981] text-white hover:bg-[#059669]",
    danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
    warning: "bg-[#f59e0b] text-white hover:bg-[#d97706]",
    secondary: "bg-[#6b7280] text-white hover:bg-[#4b5563]",
    outline: "border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#eff6ff]"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      className: cn(baseStyles, variants[variant], sizes[size], className),
      ...props
    },
    children
  );
}
export {
  InfluButton
};
