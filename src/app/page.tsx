"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeIntroSection } from "@/components/home-intro-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  // Navigation handler for separate pages
  const handleNavigation = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        window.location.href = "/"
        break
      case "about":
        window.location.href = "/about"
        break
      case "programs":
        window.location.href = "/programs"
        break
      case "news":
        window.location.href = "/news"
        break
      case "impact":
        window.location.href = "/impact"
        break
      case "contact":
        window.location.href = "/contact"
        break
      case "donate":
        window.location.href = "/donate"
        break
      default:
        window.location.href = "/"
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header activeSection="home" scrollToSection={handleNavigation} />
        <main className="flex-grow">
          <HeroSection scrollToSection={handleNavigation} />
          <HomeIntroSection scrollToSection={handleNavigation} />
          <CTASection scrollToSection={handleNavigation} />
        </main>
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
