"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CTASectionProps {
  scrollToSection: (sectionId: string) => void
}

export function CTASection({ scrollToSection }: CTASectionProps) {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.png')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 ${isRTL ? "text-right" : ""}`}>
            {t("cta.title")}
          </h2>
          <p className={`text-lg md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed ${isRTL ? "text-right" : ""}`}>
            {t("cta.subtitle")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                <Heart className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-white" />
                <h3 className="font-bold text-base md:text-lg mb-2">{t("cta.donate")}</h3>
                <p className={`text-xs md:text-sm opacity-90 mb-4 ${isRTL ? "text-right" : ""}`}>{t("cta.donateDesc")}</p>
                <Button
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300"
                  onClick={() => scrollToSection("donate")}
                >
                  <Heart className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("cta.makeDonation")}
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                <Users className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-white" />
                <h3 className="font-bold text-base md:text-lg mb-2">{t("cta.volunteer")}</h3>
                <p className={`text-xs md:text-sm opacity-90 mb-4 ${isRTL ? "text-right" : ""}`}>{t("cta.volunteerDesc")}</p>
                <Button
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                >
                  <Users className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("cta.volunteerWith")}
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                <Globe className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-white" />
                <h3 className="font-bold text-base md:text-lg mb-2">{t("cta.partner")}</h3>
                <p className={`text-xs md:text-sm opacity-90 mb-4 ${isRTL ? "text-right" : ""}`}>{t("cta.partnerDesc")}</p>
                <Button
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                >
                  <Globe className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("cta.partnerWith")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
