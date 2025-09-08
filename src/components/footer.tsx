"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1BgHmLx9PT/?mibextid=wwXIfr",
    icon: Facebook,
    color: "#1877F2",
    hoverColor: "#166FE5"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/beyondbordersempowerment?igsh=MTdmOGgyazY4MG02eg%3D%3D&utm_source=qr",
    icon: Instagram,
    color: "#E4405F",
    hoverColor: "#D42D6D"
  },
  {
    name: "WhatsApp",
    url: "https://chat.whatsapp.com/F05juiisyoi0S99QRf40I7",
    icon: MessageCircle,
    color: "#25D366",
    hoverColor: "#128C7E"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/beyond-borders-empowerment/",
    icon: Linkedin,
    color: "#0A66C2",
    hoverColor: "#004182"
  },
  {
    name: "YouTube",
    url: "#",
    icon: Youtube,
    color: "#FF0000",
    hoverColor: "#CC0000"
  }
]

export function SocialLinks() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <Button 
                asChild 
                variant="ghost" 
                className="p-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: `${social.color}15`,
                  color: social.color,
                }}
              >
                <a 
                  href={social.url} 
                  aria-label={social.name} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-transparent"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

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
    <motion.footer 
      className="bg-black text-white py-8 md:py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8 ${isRTL ? "text-right" : ""}`}>
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div
              className={`flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 cursor-pointer ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/bbe-logo.png"
                  alt="Beyond Borders Empowerment"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </motion.div>
              <div>
                <p className="font-bold text-base md:text-lg">{t("header.orgName")}</p>
                <p className="text-xs md:text-sm opacity-75">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
              {t("footer.description")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t("footer.quickLinks")}</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {navigationItems.map((item, index) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                  whileHover={{ x: 5 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-gray-400 hover:text-white transition-colors ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t("footer.contact")}</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:info@beyondborders.org" className="hover:text-white transition-colors">
                  info@beyondborders.org
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {t("header.orgName")}. {t("footer.rights")}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
