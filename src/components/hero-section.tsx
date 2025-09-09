"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { InlineImageUpload } from "@/components/inline-image-upload"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Upload } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images, getImage } from "@/config/images"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t, isRTL } = useLanguage()
  const [heroImg, setHeroImg] = useState<string>(images.hero.main)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hero_image_url")
      if (stored) setHeroImg(stored)
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero/background.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"} order-2 lg:order-1`}>
            <div
              className={`inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6 shadow-sm ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Award className={`h-3 w-3 md:h-4 md:w-4 text-red-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span className="text-xs md:text-sm font-medium text-gray-700">{t("hero.badge")}</span>
            </div>
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight ${isRTL ? "text-right" : ""}`}
            >
              <span className="text-red-600">{t("hero.title1")}</span>
              <br />
              <span className="text-blue-600">{t("hero.title2")}</span>
              <br />
              <span className="text-gray-900">{t("hero.title3")}</span>
            </h1>
            <p
              className={`text-base md:text-lg lg:text-xl text-gray-700 mb-5 md:mb-6 max-w-2xl mx-auto lg:mx-0 ${isRTL ? "text-right" : ""}`}
            >
              {t("hero.description")}
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto lg:mx-0 sm:justify-start ${isRTL ? "sm:flex-row-reverse" : ""}`}
            >
              <Button
                size="lg"
                variant="default"
                className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
                onClick={() => scrollToSection("donate")}
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t("hero.supportMission")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
                onClick={() => scrollToSection("about")}
                aria-label="Learn more about our mission"
              >
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>
          <div className={`relative order-1 lg:order-2 ${isRTL ? "lg:order-1" : ""}`}>
            {/* ========== HERO IMAGE UPLOAD SECTION ========== */}
            {/* 
              To update the hero image:
              1. Place your image in: public/images/hero/
              2. Recommended size: 1920x1080px (16:9 ratio)
              3. Update the path in: src/config/images.ts
              4. The image will be automatically cropped to fit the container
            */}
            <div className="relative h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src={heroImg}
                alt={t("hero.imageAlt")}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {isAdmin && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <InlineImageUpload 
                    storageKey="hero_image_url"
                    onUploaded={(url) => {
                      setHeroImg(url);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('hero_image_url', url);
                      }
                    }}
                  >
                    <div className="bg-white/90 hover:bg-white text-red-600 px-4 py-2 rounded-full flex items-center shadow-lg cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      {t('common.changeImage')}
                    </div>
                  </InlineImageUpload>
                </div>
              )}
            </div>
            {/* ========== END HERO IMAGE UPLOAD SECTION ========== */}
            <div
              className={`absolute -bottom-4 ${isRTL ? "-right-4 md:-right-6" : "-left-4 md:-left-6"} md:-bottom-6 bg-white rounded-xl p-3 md:p-4 shadow-lg animate-bounce-gentle`}
            >
              <div
                className={`flex items-center space-x-2 md:space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="font-bold text-lg md:text-2xl text-gray-900">500+</p>
                  <p className="text-xs md:text-sm text-gray-600">{t("hero.livesImpacted")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
