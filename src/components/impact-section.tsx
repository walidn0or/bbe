"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, Heart, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ImpactSection() {
  const { t, isRTL } = useLanguage()

  const stats = [
    { number: "400+", label: "students benefiting from our English Language Program", icon: Users },
    { number: "500+", label: "community of refugees support in London", icon: Users },
    { number: "150", label: "Online schooling (7-12) for Afghan girls", icon: GraduationCap },
    { number: "110", label: "orphaned children supported", icon: Heart },
    { number: "300+", label: "students in coding & Microsoft Office courses", icon: GraduationCap },
    { number: "20+", label: "families supported with food, clothing, and medicine", icon: Heart },
  ]

  return (
    <section id="impact" className="py-12 md:py-16 lg:py-20 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.png')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("impact.title")}</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{t("impact.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="pt-6 md:pt-8 pb-4 md:pb-6">
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-white/80" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className={`text-sm md:text-lg opacity-90 ${isRTL ? "text-right" : ""}`}>{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
