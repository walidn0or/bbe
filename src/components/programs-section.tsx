"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Stethoscope, Users, Heart, Globe, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ProgramsSection() {
  const { t, isRTL } = useLanguage()

  const programs = [
    {
      title: t("programs.education"),
      description: t("programs.educationDesc"),
      icon: GraduationCap,
      color: "blue",
      image: "/placeholder.png",
      features: [
        t("programs.virtualClasses"),
        t("programs.onGroundSchools"),
        t("programs.stemEducation"),
        t("programs.certifiedPrograms"),
      ],
    },
    {
      title: t("programs.healthcare"),
      description: t("programs.healthcareDesc"),
      icon: Stethoscope,
      color: "green",
      image: "/placeholder.png",
      features: [
        t("programs.mobileHealthClinics"),
        t("programs.mentalHealthCounseling"),
        t("programs.healthcareCapacity"),
        t("programs.emergencyMedical"),
      ],
    },
    {
      title: t("programs.economic"),
      description: t("programs.economicDesc"),
      icon: Users,
      color: "purple",
      image: "/placeholder.png",
      features: [
        t("programs.businessTraining"),
        t("programs.microfinanceAccess"),
        t("programs.freelancePlatforms"),
        t("programs.technicalSkills"),
      ],
    },
    {
      title: t("programs.orphans"),
      description: t("programs.orphansDesc"),
      icon: Heart,
      color: "red",
      image: "/placeholder.png",
      features: [
        t("programs.educationalSupport"),
        t("programs.nutritionalPrograms"),
        t("programs.skillsTraining"),
        t("programs.emotionalSupport"),
      ],
    },
    {
      title: t("programs.rights"),
      description: t("programs.rightsDesc"),
      icon: Globe,
      color: "orange",
      image: "/placeholder.png",
      features: [
        t("programs.rightsWorkshops"),
        t("programs.documentationEfforts"),
        t("programs.communityAdvocacy"),
        t("programs.policyResearch"),
      ],
    },
    {
      title: t("programs.emergency"),
      description: t("programs.emergencyDesc"),
      icon: Award, // replaced HandHeart with Award
      color: "yellow",
      image: "/placeholder.png",
      features: [
        t("programs.foodShelter"),
        t("programs.medicalSupplies"),
        t("programs.disasterResponse"),
        t("programs.recoveryPlanning"),
      ],
    },
  ]

  return (
    <section id="programs" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("programs.title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("programs.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={program.image || "/placeholder.png"}
                  alt={program.title}
                  width={400}
                  height={250}
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div
                  className={`absolute top-3 ${isRTL ? "right-3 md:right-4" : "left-3 md:left-4"} md:top-4 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    program.color === "blue"
                      ? "bg-blue-600"
                      : program.color === "green"
                        ? "bg-green-600"
                        : program.color === "purple"
                          ? "bg-purple-600"
                          : program.color === "red"
                            ? "bg-red-600"
                            : program.color === "orange"
                              ? "bg-orange-600"
                              : program.color === "yellow"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                  }`}
                >
                  <program.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle
                  className={`text-lg md:text-xl ${isRTL ? "text-right" : ""} ${
                    program.color === "blue"
                      ? "text-blue-700"
                      : program.color === "green"
                        ? "text-green-700"
                        : program.color === "purple"
                          ? "text-purple-700"
                          : program.color === "red"
                            ? "text-red-700"
                            : program.color === "orange"
                              ? "text-orange-700"
                              : program.color === "yellow"
                                ? "text-yellow-700"
                                : "text-gray-700"
                  }`}
                >
                  {program.title}
                </CardTitle>
                <CardDescription className={`text-gray-600 text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${isRTL ? "ml-3" : "mr-3"} flex-shrink-0 ${
                          program.color === "blue"
                            ? "bg-blue-500"
                            : program.color === "green"
                              ? "bg-green-500"
                              : program.color === "purple"
                                ? "bg-purple-500"
                                : program.color === "red"
                                  ? "bg-red-500"
                                  : program.color === "orange"
                                    ? "bg-orange-500"
                                    : program.color === "yellow"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                        }`}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
