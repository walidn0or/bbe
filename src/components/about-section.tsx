"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Lightbulb, BookOpen, Users, Globe, Shield, Award, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { t, isRTL } = useLanguage()

  const coreValues = [
    {
      title: t("about.inclusiveness"),
      description: t("about.inclusivenessDesc"),
      icon: Users,
      color: "red",
      image: "/placeholder.png",
    },
    {
      title: t("about.sustainability"),
      description: t("about.sustainabilityDesc"),
      icon: Globe,
      color: "green",
      image: "/placeholder.png",
    },
    {
      title: t("about.accountability"),
      description: t("about.accountabilityDesc"),
      icon: Shield,
      color: "blue",
      image: "/placeholder.png",
    },
    {
      title: t("about.empowerment"),
      description: t("about.empowermentDesc"),
      icon: Award, // replaced HandHeart with Award
      color: "purple",
      image: "/placeholder.png",
    },
    {
      title: t("about.dignity"),
      description: t("about.dignityDesc"),
      icon: Heart,
      color: "pink",
      image: "/placeholder.png",
    },
  ]

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("about.title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("about.subtitle")}</p>
          </div>

          {/* Story Section */}
          <div
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
          >
            <div className={`relative order-2 lg:order-1 ${isRTL ? "lg:order-2" : ""}`}>
              <Image
                src="/placeholder.png"
                alt="Our team working with communities"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
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
              <div className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`flex ${isRTL ? "-space-x-2 flex-row-reverse" : "-space-x-2"}`}>
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Team member"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Team member"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Team member"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 md:w-10 md:h-10"
                  />
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
                    src={value.image || "/placeholder.png"}
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
