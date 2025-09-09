"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { InlineImageUpload } from "@/components/inline-image-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Lightbulb, BookOpen, Users, Globe, Shield, Award, Heart, Upload } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { images, getImage } from "@/config/images"

export function AboutSection() {
  const { t, isRTL } = useLanguage()
  const [aboutImg, setAboutImg] = useState<string>(images.about.main)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("about_image_url")
      if (stored) setAboutImg(stored)
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
    }
  }, [])

  const coreValues = [
    {
      title: t("about.inclusiveness"),
      description: t("about.inclusivenessDesc"),
      icon: Users,
      color: "red",
      image: images.about.values.inclusiveness,
    },
    {
      title: t("about.sustainability"),
      description: t("about.sustainabilityDesc"),
      icon: Globe,
      color: "green",
      image: images.about.values.sustainability,
    },
    {
      title: t("about.accountability"),
      description: t("about.accountabilityDesc"),
      icon: Shield,
      color: "blue",
      image: images.about.values.accountability,
    },
    {
      title: t("about.empowerment"),
      description: t("about.empowermentDesc"),
      icon: Award, // replaced HandHeart with Award
      color: "purple",
      image: images.about.values.empowerment,
    },
    {
      title: t("about.dignity"),
      description: t("about.dignityDesc"),
      icon: Heart,
      color: "pink",
      image: images.about.values.dignity,
    },
  ]

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("about.title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-10"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("about.subtitle")}</p>
          </div>

          {/* Story Section */}
          <div
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
          >
            <div className={`relative order-2 lg:order-1 ${isRTL ? "lg:order-2" : ""}`}>
              {/* ========== ABOUT IMAGE UPLOAD SECTION ========== */}
              {/* 
                To update the about section images:
                
                1. Main About Image:
                   - Location: public/images/about/
                   - Recommended size: 1200x800px (3:2 ratio)
                   - Update path in: src/config/images.ts -> about.main

                2. Team Member Images:
                   - Location: public/images/about/team/
                   - Recommended size: 500x500px (1:1 ratio)
                   - Naming: team-member-{number}.jpg (e.g., team-member-1.jpg)

                3. Core Value Icons:
                   - Location: public/images/about/values/
                   - Recommended size: 200x200px (1:1 ratio)
                   - Naming: {value-name}.jpg (e.g., inclusiveness.jpg)
              */}
              <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={getImage(aboutImg)}
                  alt={t("about.imageAlt")}
                  fill
                  className="object-cover object-center"
                />
                {isAdmin && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <InlineImageUpload
                      storageKey="about_image_url"
                      onUploaded={(url) => {
                        setAboutImg(url);
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('about_image_url', url);
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
              {/* ========== END ABOUT IMAGE UPLOAD SECTION ========== */}
              <div
                className={`absolute -top-2 ${isRTL ? "-left-2 md:-left-4" : "-right-2 md:-right-4"} md:-top-4 bg-red-600 text-white p-3 md:p-4 rounded-xl shadow-lg`}
              >
                <BookOpen className="h-6 w-6 md:h-8 md:w-8" />
              </div>
            </div>
            <div className={`order-1 lg:order-2 ${isRTL ? "lg:order-1 text-right" : ""}`}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">{t("about.storyTitle")}</h3>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed">{t("about.storyText1")}</p>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed">{t("about.storyText2")}</p>
              <div className={`${isRTL ? "text-right" : ""}`}>
                <Link href="/about/background">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base px-6 md:px-7 py-3">
                    Learn more about our background
                  </Button>
                </Link>
              </div>
              <div className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""} mt-6`}>
                <div className={`flex ${isRTL ? "-space-x-2 flex-row-reverse" : "-space-x-2"}`}>
                  {/* ========== TEAM MEMBER IMAGES UPLOAD SECTION ========== */}
                  {/* 
                    To update team member images:
                    1. Replace images in: public/images/about/team/
                    2. Recommended size: 500x500px (1:1 ratio - square)
                    3. File names: team-member-1.jpg, team-member-2.jpg, team-member-3.jpg
                    4. Update paths in: src/config/images.ts -> about.team
                    5. For best results: Professional headshots, good lighting
                    6. Format: JPG or PNG, compressed to under 200KB each
                  */}
                  <Image
                    src={images.about.team.member1}
                    alt="Team member 1"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform duration-200"
                  />
                  <Image
                    src={images.about.team.member2}
                    alt="Team member 2"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform duration-200"
                  />
                  <Image
                    src={images.about.team.member3}
                    alt="Team member 3"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform duration-200"
                  />
                  {/* ========== END TEAM MEMBER IMAGES UPLOAD SECTION ========== */}
                </div>
                <p className="text-sm text-gray-600">{t("about.teamText")}</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <CardTitle className={`text-xl md:text-2xl text-red-700 ${isRTL ? "text-right" : ""}`}>
                  {t("about.missionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("about.missionText")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <CardTitle className={`text-xl md:text-2xl text-blue-700 ${isRTL ? "text-right" : ""}`}>
                  {t("about.visionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("about.visionText")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("about.valuesTitle")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600">{t("about.valuesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={getImage(value.image)}
                    alt={value.title}
                    width={300}
                    height={200}
                    className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className={`pt-4 md:pt-6 text-center p-4 ${isRTL ? "text-right" : ""}`}>
                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform ${
                      value.color === "red"
                        ? "bg-red-100"
                        : value.color === "green"
                          ? "bg-green-100"
                          : value.color === "blue"
                            ? "bg-blue-100"
                            : value.color === "purple"
                              ? "bg-purple-100"
                              : value.color === "pink"
                                ? "bg-pink-100"
                                : "bg-gray-100"
                    }`}
                  >
                    <value.icon
                      className={`h-4 w-4 md:h-6 md:w-6 ${
                        value.color === "red"
                          ? "text-red-600"
                          : value.color === "green"
                            ? "text-green-600"
                            : value.color === "blue"
                              ? "text-blue-600"
                              : value.color === "purple"
                                ? "text-purple-600"
                                : value.color === "pink"
                                  ? "text-pink-600"
                                  : "text-gray-600"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{value.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
