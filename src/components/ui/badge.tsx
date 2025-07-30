import React from "react"

export function Badge({ children, className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 ${className}`} {...props}>
      {children}
    </span>
  )
} 