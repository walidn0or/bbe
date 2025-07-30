"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

interface HeaderProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  const navigationItems = [
    { name: t("header.about"), id: "about" },
    { name: t("header.programs"), id: "programs" },
    { name: t("header.news"), id: "news" },
    { name: t("header.impact"), id: "impact" },
    { name: t("header.contact"), id: "contact" },
  ]

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo Section */}
          <div
            className={`flex items-center space-x-2 md:space-x-4 cursor-pointer flex-shrink-0 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/bbe-logo.png"
              alt="Beyond Borders Empowerment Logo"
              width={50}
              height={50}
              className="md:w-[60px] md:h-[60px] rounded-full shadow-md transition-transform hover:scale-105"
            />
            <div className="min-w-0">
              <h1 className={`text-sm md:text-xl font-bold text-gray-900 truncate ${isRTL ? "text-right" : ""}`}>
                {t("header.orgName")}
              </h1>
              <p className={`text-xs md:text-sm text-gray-600 ${isRTL ? "text-right" : ""}`}>{t("header.regNumber")}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex space-x-6 xl:space-x-8 ${isRTL ? "space-x-reverse" : ""}`}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative group text-sm xl:text-base focus:outline-none ${
                  activeSection === item.id ? "text-red-600" : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 ${isRTL ? "right-0" : "left-0"} w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? "w-full" : ""
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* Language Switcher, Mobile Menu Button and Donate Button */}
          <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Donate Button - Always visible but responsive */}
            <Button
              className="hidden sm:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transition-all duration-300 hover:scale-105 text-xs md:text-sm px-3 md:px-4 py-2 focus:outline-none"
              onClick={() => scrollToSection("donate")}
            >
              <Heart className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1 md:ml-2" : "mr-1 md:mr-2"}`} />
              <span className="hidden md:inline">{t("header.donate")}</span>
              <span className="md:hidden">{t("header.donate").split(" ")[0]}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-3 py-4 border-t border-gray-200">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`${isRTL ? "text-right" : "text-left"} text-gray-700 hover:text-red-600 transition-colors font-medium py-2 px-2 rounded-lg hover:bg-gray-50 focus:outline-none ${
                  activeSection === item.id ? "text-red-600 bg-red-50" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
            {/* Mobile Donate Button */}
            <Button
              className="sm:hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg mt-2 focus:outline-none"
              onClick={() => handleNavClick("donate")}
            >
              <Heart className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("header.donate")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
