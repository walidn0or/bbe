import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "ghost"
  size?: "lg" | "sm"
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, className = "", ...props }) => {
  let base = "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors focus:outline-none"
  let variantClass = variant === "outline" ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100" : variant === "ghost" ? "bg-transparent hover:bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"
  let sizeClass = size === "lg" ? "text-base py-3 px-6" : size === "sm" ? "text-xs py-1 px-2" : "text-sm"
  return (
    <button className={`${base} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  )
} 