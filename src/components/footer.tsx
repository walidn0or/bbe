"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Building2, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  const { t, isRTL } = useLanguage()

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "News", href: "/news" },
    { name: "Impact", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/beyondbordersempowerment",
      icon: Facebook,
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bbe_foundation",
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/beyondbordersempowerment",
      icon: Instagram,
      color: "hover:text-pink-600"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/beyond-borders-empowerment",
      icon: Linkedin,
      color: "hover:text-blue-700"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@beyondbordersempowerment",
      icon: Youtube,
      color: "hover:text-red-600"
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Organization Info */}
            <div className="lg:col-span-2">
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Image
                  src="/images/Beyond-Borders-Empowerment-logo-PNG.svg"
                  alt="Beyond Borders Empowerment Logo"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Beyond Borders Empowerment
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Registered UK Charity - Companies House: 15570506
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Empowering marginalized communities through education, economic opportunities, 
                healthcare support, and humanitarian aid — with a special focus on women and girls.
              </p>

              {/* Registration Details */}
              <div className="space-y-3 mb-6">
                <div className={`flex items-center gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Building2 className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">Companies House Registration: 15570506</span>
                </div>
                <div className={`flex items-center gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <MapPin className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <span className="text-sm">London, United Kingdom</span>
                </div>
                <div className={`flex items-center gap-3 text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:info@beyondbordersempowerment.org" className="text-sm hover:text-white transition-colors">
                    info@bbe.ngo
                  </a>
                </div>
              </div>

              {/* Donation CTA */}
              <Link href="/donate">
                <Button className="gradient-bg text-white shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:scale-105">
                  <Heart className="h-5 w-5 mr-2" />
                  Support Our Mission
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Programs & Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Our Programs</h4>
              <div className="space-y-3">
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">Virtual Education</div>
                  <div>400+ students across Afghanistan</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">Orphan Support</div>
                  <div>110 children in Kabul orphanages</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">Women Empowerment</div>
                  <div>11 women startups supported</div>
                </div>
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-1">Emergency Relief</div>
                  <div>20+ families assisted</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 text-center md:text-left">
                Follow Our Journey
              </h4>
              <div className="flex items-center justify-center md:justify-start gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-gray-600 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright & Legal */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                &copy; 2025 Beyond Borders Empowerment Foundation
              </p>
              <p className="text-gray-500 text-xs">
                Registered in England and Wales | Charity Registration: 15570506
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4 mt-2 text-xs">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/15570506"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Companies House
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Enhanced Social Links Component for use in other sections
export function SocialLinks() {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/beyondbordersempowerment",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/bbe_foundation",
      icon: Twitter,
      color: "bg-blue-400 hover:bg-blue-500"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/beyondbordersempowerment",
      icon: Instagram,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/beyond-borders-empowerment",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@beyondbordersempowerment",
      icon: Youtube,
      color: "bg-red-600 hover:bg-red-700"
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Connected
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow our journey and stay updated on our latest programs, success stories, and impact
          </p>
          
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Join our community of supporters making a difference
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
