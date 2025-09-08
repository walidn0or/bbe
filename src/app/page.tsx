"use client"

import { useState, useEffect, useRef } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeIntroSection } from "@/components/home-intro-section"
import { AboutSection } from "@/components/about-section"
import { ProgramsSection } from "@/components/programs-section"
import { NewsSection } from "@/components/news-section"
import { DonationSection } from "@/components/donation-section"
import { ImpactSection } from "@/components/impact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer, SocialLinks } from "@/components/footer"
import { IntroSection } from "@/components/videos-section"

function HomePage() {
  const [activeSection, setActiveSection] = useState("")
  const isProgrammaticScrollRef = useRef(false)

  // Smooth scroll function with offset for sticky header
  const scrollToSection = (sectionId: string) => {
    // Handle Home/top explicitly
    if (!sectionId || sectionId === "home") {
      setActiveSection("home")
      isProgrammaticScrollRef.current = true
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 700)
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Optimistically set active to reduce flicker on nav during scroll
      setActiveSection(sectionId)

      isProgrammaticScrollRef.current = true
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 700)
    }
  }

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return
      const sections = ["about", "programs", "news", "donate", "impact", "contact"]
      const scrollPosition = window.scrollY + 100

      // If user is above the first section, mark as home
      const firstSection = document.getElementById("about")
      if (firstSection) {
        const top = firstSection.offsetTop
        if (scrollPosition < top) {
          setActiveSection("home")
          return
        }
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }

      // Fallback when no section matched
      setActiveSection("home")
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <HomeIntroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ProgramsSection />
      <IntroSection />
      <NewsSection />
      <DonationSection />
      <ImpactSection />
      <TestimonialsSection />
      <SocialLinks />
      <CTASection scrollToSection={scrollToSection} />
      <ContactSection scrollToSection={scrollToSection} />
      <Footer scrollToSection={scrollToSection} />

      {/* Custom CSS for animations and RTL support */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        /* RTL Support */
        [dir="rtl"] {
          text-align: right;
        }

        [dir="rtl"] .flex-row-reverse {
          flex-direction: row-reverse;
        }

        [dir="rtl"] .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }

        /* Responsive text utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile touch improvements */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Improved mobile scrolling */
        @media (max-width: 768px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Persian and Pashto font support */
        [lang="fa"], [lang="ps"] {
          font-family: 'Vazirmatn', 'Noto Sans Arabic', 'Arial Unicode MS', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  )
}
