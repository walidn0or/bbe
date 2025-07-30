import React from "react"

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-lg border bg-white p-4 shadow ${props.className ?? ''}`}>{children}</div>
}

export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`p-2 ${props.className ?? ''}`}>{children}</div>
}

export function CardHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`mb-2 font-bold text-lg ${props.className ?? ''}`}>{children}</div>
}

export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <h3 {...props} className={`text-xl font-semibold ${props.className ?? ''}`}>{children}</h3>
}

export function CardDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={`text-gray-500 text-sm ${props.className ?? ''}`}>{children}</p>
} 