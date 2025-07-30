"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, MapPin, MessageCircle, Facebook, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ContactSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function ContactSection({ scrollToSection }: ContactSectionProps) {
  const { t, isRTL } = useLanguage()

  const socialLinks = [
    { icon: MessageCircle, color: "bg-green-600" },
    { icon: Facebook, color: "bg-blue-600" },
    { icon: Linkedin, color: "bg-blue-700" },
    { icon: Instagram, color: "bg-pink-600" },
  ]

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-gray-900 text-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-lg md:text-xl opacity-90">{t("contact.subtitle")}</p>
        </div>
        <div
          className={`grid lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
        >
          <div className={`lg:col-span-1 ${isRTL ? "text-right" : ""}`}>
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">{t("contact.info")}</h3>
            <div className="space-y-4 md:space-y-6">
              <div
                className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.phone")}</p>
                  <p className="opacity-90 text-sm md:text-base">+44 7386 049334</p>
                </div>
              </div>
              <div
                className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.email")}</p>
                  <p className="opacity-90 text-sm md:text-base break-all">beyondbordersempowerment@outlook.com</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg md:text-xl font-bold mt-8 md:mt-12 mb-4 md:mb-6">{t("contact.offices")}</h4>
            <div className="space-y-4 md:space-y-6">
              <div
                className={`flex items-start space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.mainOffice")}</p>
                  <p className="opacity-90 text-xs md:text-sm">21 Swallow Close, London SE14 5LZ, United Kingdom</p>
                </div>
              </div>
              <div
                className={`flex items-start space-x-3 md:space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">{t("contact.countryOffice")}</p>
                  <p className="opacity-90 text-xs md:text-sm">
                    Home 21, street 4, 3rd Phase of Khair Khana, District 11, Kabul, Afghanistan
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8 ${isRTL ? "flex-row-reverse" : ""}`}>
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  size="sm"
                  className={`${social.color} hover:opacity-80 transition-all duration-300 hover:scale-110 w-10 h-10 md:w-12 md:h-12 p-0`}
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className={`text-xl md:text-2xl text-white ${isRTL ? "text-right" : ""}`}>
                  {t("contact.sendMessage")}
                </CardTitle>
                <p className={`text-gray-400 text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("contact.messageDesc")}
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                        {t("donate.firstName")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                        {t("donate.lastName")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("donate.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? "text-right" : ""}`}>
                      {t("contact.message")}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none transition-colors text-sm md:text-base"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 hover:scale-105 text-sm md:text-base py-2 md:py-3"
                  >
                    <Mail className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("contact.sendBtn")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
