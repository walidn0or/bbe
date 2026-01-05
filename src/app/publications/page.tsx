"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Users, Download } from "lucide-react"

export default function PublicationsPage() {
  const handleNavigation = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        window.location.href = "/"
        break
      case "about":
        window.location.href = "/about"
        break
      case "programs":
        window.location.href = "/programs"
        break
      case "news":
        window.location.href = "/news"
        break
      case "impact":
        window.location.href = "/impact"
        break
      case "contact":
        window.location.href = "/contact"
        break
      default:
        window.location.href = "/"
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection="" scrollToSection={handleNavigation} />
        <main className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Publications</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our annual reports, student library, and narratives from our community
              </p>
            </div>

            {/* Annual Reports Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="h-8 w-8 text-red-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Annual Reports</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Financial Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Comprehensive financial statements and transparency reports detailing our use of funds and resources.
                    </p>
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
                      <Download className="h-4 w-4" />
                      Download Reports
                    </button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      Narrative Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Detailed accounts of our programs, impact stories, and achievements throughout the year.
                    </p>
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
                      <Download className="h-4 w-4" />
                      Download Reports
                    </button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Books/Student Library Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Books/Student Library</h2>
              </div>
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our student library provides access to educational resources, books, and learning materials to support 
                    students in their academic journey. We curate collections that are relevant to our programs and 
                    accessible to students across different regions.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Library resources are available to all enrolled students. Contact us for access information.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Students' Narratives Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-purple-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Students' Narratives</h2>
              </div>
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Read powerful stories from our students sharing their journeys, challenges, achievements, and how 
                    our programs have impacted their lives. These narratives reflect the resilience, determination, and 
                    hope that drive our community forward.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Student narratives are shared with permission and celebrate the voices of our community members.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
