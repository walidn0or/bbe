"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ChevronRight, X, Share2, BookOpen, Eye, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { images, getImage } from "@/config/images"
import { InlineImageUpload } from "@/components/inline-image-upload"

export function NewsSection() {
  const { t, isRTL } = useLanguage()

  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [showAllArticles, setShowAllArticles] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newsImages, setNewsImages] = useState<Record<number, string>>({
    1: images.news.featured,
    2: images.news.article1,
    3: images.news.article2,
    4: images.news.article3,
    5: images.news.article4,
    6: images.news.article5,
  })

  // Trigger card animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
      setNewsImages((prev) => ({
        1: localStorage.getItem("news_image_1") || prev[1],
        2: localStorage.getItem("news_image_2") || prev[2],
        3: localStorage.getItem("news_image_3") || prev[3],
        4: localStorage.getItem("news_image_4") || prev[4],
        5: localStorage.getItem("news_image_5") || prev[5],
        6: localStorage.getItem("news_image_6") || prev[6],
      }))
    }
  }, [])

  const newsArticles = [
    {
      id: 1,
      title: "Virtual Education Project Reaches 200+ Students Across Afghanistan",
      excerpt:
        "Our virtual education initiative has successfully expanded to serve over 200 Afghan girls and women across 24 provinces, providing them with essential English and computer skills.",
      image: newsImages[1],
      date: "March 15, 2025",
      category: t("news.education"),
      readTime: "3",
      featured: true,
      views: "2.1K",
      likes: 156,
      tags: ["Education", "Virtual Learning", "Women Empowerment"],
    },
    {
      id: 2,
      title: "New Partnership with International Education Foundation",
      excerpt:
        "BBE announces strategic partnership to provide certified high school education and university preparation programs for Afghan students.",
      image: newsImages[2],
      date: "March 10, 2025",
      category: t("news.partnership"),
      readTime: "2",
      featured: false,
      views: "1.8K",
      likes: 124,
      tags: ["Partnership", "Higher Education", "Certification"],
    },
    {
      id: 3,
      title: "Mobile Health Clinics Launch in Remote Areas",
      excerpt:
        "Our first mobile health clinic begins operations in underserved communities, providing essential medical care and mental health support.",
      image: newsImages[3],
      date: "March 8, 2025",
      category: t("news.healthcare"),
      readTime: "4",
      featured: false,
      views: "3.2K",
      likes: 198,
      tags: ["Healthcare", "Mobile Clinics", "Mental Health"],
    },
    {
      id: 4,
      title: "Coding Bootcamp Graduates First Cohort",
      excerpt:
        "25 young women complete our intensive coding and cybersecurity program, with 80% securing remote work opportunities.",
      image: newsImages[4],
      date: "March 5, 2025",
      category: t("news.skillsTraining"),
      readTime: "3",
      featured: false,
      views: "2.7K",
      likes: 203,
      tags: ["Skills Training", "Technology", "Employment"],
    },
    {
      id: 5,
      title: "Emergency Relief Reaches 500 Families",
      excerpt:
        "BBE's emergency response team provides food, shelter, and medical supplies to families affected by recent natural disasters.",
      image: newsImages[5],
      date: "March 1, 2025",
      category: t("news.emergencyAid"),
      readTime: "2",
      featured: false,
      views: "1.9K",
      likes: 167,
      tags: ["Emergency Aid", "Disaster Relief", "Humanitarian"],
    },
    {
      id: 6,
      title: "Women's Entrepreneurship Program Shows Remarkable Success",
      excerpt:
        "Over 100 women have started their own businesses through our entrepreneurship training, generating sustainable income for their families.",
      image: newsImages[6],
      date: "February 28, 2025",
      category: t("news.economicEmpowerment"),
      readTime: "5",
      featured: false,
      views: "2.4K",
      likes: 189,
      tags: ["Entrepreneurship", "Women's Rights", "Economic Growth"],
    },
  ]

  const featuredArticle = newsArticles[0]
  const otherArticles = newsArticles.slice(1)

  const handleViewAll = () => {
    setIsLoading(true)
    setTimeout(() => {
      setShowAllArticles(!showAllArticles)
      setIsLoading(false)
    }, 500)
  }

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article)
    document.body.style.overflow = "hidden"
  }

  const handleCloseModal = () => {
    setSelectedArticle(null)
    document.body.style.overflow = "unset"
  }

  return (
    <section
      id="news"
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[url('/placeholder.png')] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[url('/placeholder.png')] rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with enhanced animation */}
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""} animate-fade-in-up`}>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-sm">
            <BookOpen className={`h-4 w-4 text-red-600 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span className="text-sm font-medium text-gray-700">{t("news.latest")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            {t("news.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6 animate-scale-x"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("news.subtitle")}</p>
        </div>

        {/* Featured Article with enhanced design */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16">
          <Card className="border-0 shadow-2xl bg-white overflow-hidden group hover:shadow-3xl transition-all duration-500 animate-slide-up">
            <div className={`grid lg:grid-cols-2 gap-0 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={`relative order-2 lg:order-1 ${isRTL ? "lg:order-2" : ""} overflow-hidden`}>
                <Image
                  src={getImage(featuredArticle.image)}
                  alt={featuredArticle.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {isAdmin && (
                  <div className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}>
                    <InlineImageUpload
                      label="Change featured image"
                      storageKey={`news_image_${featuredArticle.id}`}
                      onUploaded={(url) => setNewsImages((prev) => ({ ...prev, [featuredArticle.id]: url }))}
                    />
                  </div>
                )}

                {/* Floating badges */}
                <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} flex flex-col gap-2`}>
                  <Badge className="bg-red-600 text-white text-xs md:text-sm shadow-lg animate-bounce-gentle">
                    {t("news.featured")}
                  </Badge>
                  <Badge  className="bg-white/90 text-gray-700 text-xs shadow-lg">
                    {featuredArticle.category}
                  </Badge>
                </div>

                {/* Stats overlay */}
                <div
                  className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} flex items-center gap-4 text-white text-sm`}
                >
                  <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                    <Eye className="h-3 w-3" />
                    {featuredArticle.views}
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                    <Heart className="h-3 w-3" />
                    {featuredArticle.likes}
                  </div>
                </div>
              </div>

              <div
                className={`p-6 md:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 ${isRTL ? "lg:order-1 text-right" : ""}`}
              >
                <div className={`flex flex-wrap items-center gap-2 md:gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Calendar className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    {featuredArticle.date}
                  </div>
                  <div
                    className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Clock className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    {featuredArticle.readTime} {t("news.minRead")}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-600 transition-colors cursor-pointer">
                  {featuredArticle.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base lg:text-lg">
                  {featuredArticle.excerpt}
                </p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {featuredArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Button
                    variant="destructive"
                    onClick={() => handleArticleClick(featuredArticle)}
                    rightIcon={<ArrowRight className="h-3 w-3 md:h-4 md:w-4" />}
                  >
                    {t("news.readFull")}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-700"
                  >
                    <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Other Articles Grid with staggered animations */}
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full"></div>
              {t("news.moreNews")}
            </h3>
            <Button
              variant="ghost"
              onClick={handleViewAll}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-700"
              rightIcon={
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    showAllArticles ? (isRTL ? "rotate-180" : "rotate-180") : isRTL ? "rotate-180" : ""
                  }`}
                />
              }
            >
              {showAllArticles ? t("common.showLess") : t("common.viewAll")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherArticles.slice(0, showAllArticles ? otherArticles.length : 3).map((article, index) => (
              <Card
                key={article.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-2 cursor-pointer ${
                  animateCards ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={getImage(article.image)}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isAdmin && (
                    <div className={`absolute bottom-3 ${isRTL ? "right-3" : "left-3"}`}>
                      <InlineImageUpload
                        label="Change image"
                        storageKey={`news_image_${article.id}`}
                        onUploaded={(url) => setNewsImages((prev) => ({ ...prev, [article.id]: url }))}
                      />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"}`}>
                    <Badge className="bg-white/95 text-gray-700 text-xs shadow-lg">
                      {article.category}
                    </Badge>
                  </div>

                  {/* Stats overlay */}
                  <div
                    className={`absolute bottom-3 ${isRTL ? "right-3" : "left-3"} flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs">
                      <Eye className="h-3 w-3" />
                      {article.views}
                    </div>
                    <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs">
                      <Heart className="h-3 w-3 text-red-500" />
                      {article.likes}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 md:p-6">
                  <div
                    className={`flex flex-wrap items-center gap-2 md:gap-4 mb-3 text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Calendar className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {article.date}
                    </div>
                    <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Clock className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {article.readTime} {t("news.minRead")}
                    </div>
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 ${isRTL ? "text-right" : ""}`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-gray-600 mb-4 leading-relaxed text-sm md:text-base line-clamp-3 ${isRTL ? "text-right" : ""}`}
                  >
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-1 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {article.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 hover:no-underline group-hover:translate-x-1 transition-transform"
                      onClick={() => handleArticleClick(article)}
                    >
                      {t("news.readMore")}
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in shadow-2xl">
              {/* Modal Header */}
              <div
                className={`flex items-center justify-between p-4 md:p-6 border-b bg-gradient-to-r from-red-50 to-blue-50 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Badge  className="text-xs md:text-sm">
                      {selectedArticle.category}
                    </Badge>
                    <div className={`flex items-center gap-4 text-xs text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Eye className="h-3 w-3" />
                        {selectedArticle.views}
                      </div>
                      <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Heart className="h-3 w-3 text-red-500" />
                        {selectedArticle.likes}
                      </div>
                    </div>
                  </div>
                  <h2 className={`text-lg md:text-xl font-bold text-gray-900 ${isRTL ? "text-right" : ""}`}>
                    {selectedArticle.title}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0 ml-4 hover:bg-red-50"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="relative">
                  <Image
                    src={getImage(selectedArticle.image)}
                    alt={selectedArticle.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="p-4 md:p-6">
                  {/* Article meta */}
                  <div className={`flex flex-wrap items-center gap-2 md:gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Calendar className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {selectedArticle.date}
                    </div>
                    <div
                      className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Clock className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {selectedArticle.readTime} {t("news.minRead")}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {selectedArticle.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-red-100 to-blue-100 text-gray-700 text-sm rounded-full hover:from-red-200 hover:to-blue-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Article content */}
                  <div className={`prose prose-lg max-w-none ${isRTL ? "text-right" : ""}`}>
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base font-medium">
                      {selectedArticle.excerpt}
                    </p>

                    <div className="space-y-4 text-sm md:text-base leading-relaxed">
                      {selectedArticle.id === 1 && (
                        <>
                          <p>
                            Our Virtual Education Project has achieved a remarkable milestone, successfully expanding to
                            serve over 200 Afghan girls and women across 24 provinces. This comprehensive initiative
                            provides essential English language skills and computer literacy training through innovative
                            online platforms.
                          </p>

                          <p>
                            The program has been particularly impactful in remote areas where traditional educational
                            opportunities are limited. Students participate in interactive virtual classrooms, receiving
                            personalized instruction from qualified teachers and mentors.
                          </p>

                          <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-600 bg-red-50 p-4 rounded-r-lg">
                            "The virtual classes have opened new doors for me. I can now communicate with people from
                            around the world and have gained confidence in using technology." - Fatima, Student
                          </blockquote>

                          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Achievements:</h4>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>200+ active students enrolled across 24 provinces</li>
                            <li>95% completion rate for English language courses</li>
                            <li>80% of graduates have secured remote work opportunities</li>
                            <li>Partnerships with international education platforms</li>
                          </ul>

                          <p>
                            Looking ahead, we plan to expand the program to reach 500 students by the end of 2025,
                            introducing new courses in digital marketing, graphic design, and entrepreneurship.
                          </p>
                        </>
                      )}

                      {selectedArticle.id === 2 && (
                        <>
                          <p>
                            Beyond Borders Empowerment is proud to announce a strategic partnership with the
                            International Education Foundation, marking a significant step forward in our mission to
                            provide quality education to Afghan students.
                          </p>

                          <p>
                            This collaboration will enable us to offer certified high school education and university
                            preparation programs, giving our students internationally recognized qualifications.
                          </p>

                          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Partnership Benefits:</h4>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Accredited high school diploma programs</li>
                            <li>University preparation courses</li>
                            <li>Scholarship opportunities for higher education</li>
                            <li>Career counseling and guidance services</li>
                          </ul>

                          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-blue-50 p-4 rounded-r-lg">
                            "This partnership represents hope for thousands of young people who dream of continuing
                            their education. We're breaking down barriers and creating pathways to success." - Education
                            Director
                          </blockquote>
                        </>
                      )}

                      {/* Add similar content for other articles */}
                      {selectedArticle.id === 3 && (
                        <>
                          <p>
                            Our first mobile health clinic has officially begun operations, bringing essential medical
                            care and mental health support directly to underserved communities across Afghanistan.
                          </p>

                          <p>
                            The mobile clinic is equipped with modern medical equipment and staffed by qualified
                            healthcare professionals, including doctors, nurses, and mental health counselors.
                          </p>

                          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Services Provided:</h4>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Primary healthcare consultations</li>
                            <li>Maternal and child health services</li>
                            <li>Mental health counseling and support</li>
                            <li>Health education and awareness programs</li>
                            <li>Emergency medical assistance</li>
                          </ul>

                          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <p className="text-green-800 font-medium">Impact in Numbers:</p>
                            <p className="text-green-700">
                              In its first month of operation, the mobile clinic has served over 300 patients and
                              conducted health education sessions for more than 500 community members.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className={`flex gap-3 mt-8 pt-6 border-t ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Button
                      variant="destructive"
                      leftIcon={<Heart className="h-4 w-4" />}
                    >
                      {t("news.likeArticle")}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                      leftIcon={<Share2 className="h-4 w-4" />}
                    >
                      {t("news.shareArticle")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-scale-x {
          animation: scale-x 0.8s ease-out 0.5s both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}
