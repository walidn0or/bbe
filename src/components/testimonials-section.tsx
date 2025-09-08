"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images, getImage } from "@/config/images"

export function TestimonialsSection() {
  const { t, isRTL } = useLanguage()

  const testimonials = [
    {
      quote: t("testimonials.quote1"),
      name: t("testimonials.name1"),
      role: t("testimonials.role1"),
      image: images.testimonials.person1,
    },
    {
      quote: t("testimonials.quote2"),
      name: t("testimonials.name2"),
      role: t("testimonials.role2"),
      image: images.testimonials.person2,
    },
    {
      quote: t("testimonials.quote3"),
      name: t("testimonials.name3"),
      role: t("testimonials.role3"),
      image: images.testimonials.person3,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("testimonials.title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600">{t("testimonials.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((story, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl bg-white relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="pt-6 md:pt-8">
                <Quote className={`h-6 w-6 md:h-8 md:w-8 text-red-600 mb-4 ${isRTL ? "ml-auto" : ""}`} />
                <p
                  className={`text-gray-700 mb-4 md:mb-6 italic leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}
                >
                  "{story.quote}"
                </p>
                <div
                  className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Image
                    src={getImage(story.image)}
                    alt={story.name}
                    width={60}
                    height={60}
                    className="rounded-full w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{story.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">{story.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
