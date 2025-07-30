"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  const { t, isRTL } = useLanguage()

  const navigationItems = [
    { name: t("header.about"), id: "about" },
    { name: t("header.programs"), id: "programs" },
    { name: t("header.news"), id: "news" },
    { name: t("header.impact"), id: "impact" },
    { name: t("header.contact"), id: "contact" },
  ]

  return (
    <footer className="bg-black text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8 ${isRTL ? "text-right" : ""}`}>
          <div className="md:col-span-2">
            <div
              className={`flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 cursor-pointer ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src="/bbe-logo.png"
                alt="Beyond Borders Empowerment"
                width={40}
                height={40}
                className="md:w-[50px] md:h-[50px] rounded-full transition-transform hover:scale-105"
              />
              <div>
                <p className="font-bold text-base md:text-lg">{t("header.orgName")}</p>
                <p className="text-xs md:text-sm opacity-75">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{t("footer.description")}</p>
            <p className="text-xs md:text-sm text-gray-500">{t("header.regNumber")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t("footer.quickLinks")}</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-gray-400 hover:text-white transition-colors ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t("footer.getInvolved")}</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("donate")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("header.donate")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.volunteer")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.partner")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.newsletter")}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div
            className={`flex flex-col md:flex-row items-center justify-between ${isRTL ? "md:flex-row-reverse" : ""}`}
          >
            <p
              className={`text-xs md:text-sm text-gray-500 mb-3 md:mb-0 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
            >
              {t("footer.copyright")}
            </p>
            <div className={`flex flex-wrap gap-3 md:gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs md:text-sm">
                {t("footer.privacy")}
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs md:text-sm">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
