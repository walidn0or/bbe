"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage, type Language } from "@/contexts/language-context"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "fa" as Language, name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
  { code: "ps" as Language, name: "Pashto", nativeName: "پښتو", flag: "🇦🇫" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language)

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.nativeName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50">
          <Card className="border shadow-lg min-w-[200px]">
            <CardContent className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-left ${
                    language === lang.code ? "bg-red-50 text-red-600" : "text-gray-700"
                  } ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lang.nativeName}</div>
                    <div className="text-xs text-gray-500">{lang.name}</div>
                  </div>
                  {language === lang.code && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
