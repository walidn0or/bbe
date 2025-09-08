import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beyond Borders Empowerment (BBE)",
  description: "Empowering communities through education, economic opportunity, healthcare, and humanitarian aid.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
