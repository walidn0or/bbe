"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, ChevronDown } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { images } from "@/config/images"

interface HeaderProps {
  activeSection: string
  scrollToSection?: (sectionId: string) => void
}

export function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const { t, isRTL } = useLanguage()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setAboutDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    // Add a delay before closing to allow clicking on submenu items
    closeTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false)
    }, 150)
  }

  const navigationItems = [
    { name: t("header.home"), id: "home", href: "/" },
    { 
      name: t("header.about"), 
      id: "about", 
      href: "/about",
      hasDropdown: true,
      subItems: [
        { name: t("header.aboutOverview"), href: "/about" },
        { name: t("header.aboutMissionVision"), href: "/about#mission-vision" },
        { name: t("header.aboutCoreValues"), href: "/about#core-values" },
        { name: t("header.aboutBackground"), href: "/about/background" },
      ]
    },
    { name: t("header.programs"), id: "programs", href: "/programs" },
    { name: t("header.news"), id: "news", href: "/news" },
    { name: t("header.impact"), id: "impact", href: "/impact" },
    { name: t("header.contact"), id: "contact", href: "/contact" },
  ]

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo Section */}
          <Link
            href="/"
            className={`flex items-center space-x-2 md:space-x-4 cursor-pointer flex-shrink-0 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <Image
              src={images.logo}
              alt="Beyond Borders Empowerment Logo"
              width={60}
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div className={`flex flex-col ${isRTL ? "text-right" : ""}`}>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                Beyond Borders Empowerment
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                {t("")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className={`px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 hover:bg-gray-100 flex items-center gap-1 ${
                      activeSection === item.id
                        ? "text-red-600 bg-red-50 border-b-2 border-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      aboutDropdownOpen ? "rotate-180" : ""
                    }`} />
                  </button>
                  {aboutDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.subItems?.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 hover:bg-gray-100 ${
                    activeSection === item.id
                      ? "text-red-600 bg-red-50 border-b-2 border-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right Section - Language Switcher and Donate Button */}
          <div className={`flex items-center space-x-2 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <LanguageSwitcher />
            
            <Link href="/donate">
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 md:px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                leftIcon={<Heart className="h-4 w-4" />}
              >
                <span className="hidden sm:inline">{t("header.donate")}</span>
                <span className="sm:hidden">{t("header.donateShort")}</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              {navigationItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.id}>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className={`w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center justify-between ${
                        activeSection === item.id
                          ? "text-red-600 bg-red-50 border-l-4 border-red-600"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                      } ${isRTL ? "text-right border-r-4 border-l-0 flex-row-reverse" : ""}`}
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        aboutDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </button>
                    {aboutDropdownOpen && (
                      <div className={`ml-4 mt-2 space-y-1 ${isRTL ? "mr-4 ml-0" : ""}`}>
                        {item.subItems?.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.href}
                            onClick={handleMobileMenuClose}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleMobileMenuClose}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-red-600 bg-red-50 border-l-4 border-red-600"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    } ${isRTL ? "text-right border-r-4 border-l-0" : ""}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
