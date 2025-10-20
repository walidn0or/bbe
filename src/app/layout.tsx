import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beyond Borders Empowerment (BBE) | Empowering Communities Through Education",
  description: "BBE empowers marginalized communities in Afghanistan and beyond through quality education, healthcare access, economic opportunities, and humanitarian aid. Supporting 400+ students, 110 orphans, and women entrepreneurs.",
  keywords: ["BBE", "Beyond Borders Empowerment", "Afghanistan NGO", "education support", "women empowerment", "healthcare", "humanitarian aid", "orphan support", "virtual education", "coding programs"],
  authors: [{ name: "Beyond Borders Empowerment" }],
  creator: "Beyond Borders Empowerment",
  publisher: "Beyond Borders Empowerment",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#dc2626",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bbe.ngo",
    siteName: "Beyond Borders Empowerment",
    title: "Beyond Borders Empowerment | Empowering Communities",
    description: "Empowering marginalized communities through education, healthcare, economic opportunity, and humanitarian aid in Afghanistan and beyond.",
    images: [
      {
        url: "/images/content/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Beyond Borders Empowerment - Empowering Communities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Borders Empowerment | Empowering Communities",
    description: "Empowering marginalized communities through education, healthcare, and economic opportunity.",
    images: ["/images/content/1.jpeg"],
    creator: "@BBE_NGO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
          <main className="min-h-screen flex flex-col p-0 m-0">
            {children}
          </main>
        </PageTransition>
      </body>
    </html>
  )
}
