"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, X, Eye, Newspaper, BookOpen } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export const dynamic = 'force-dynamic'

export default function NewsUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    featured: "",
    article1: "",
    article2: "",
    article3: "",
    article4: "",
    article5: "",
    article6: ""
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const newsSlots = [
    {
      key: "featured",
      title: "Featured Article",
      description: "Virtual Education Project Reaches 200+ Students Across Afghanistan",
      category: "Education",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "600x400px or larger",
      currentImage: uploadedFiles.featured,
      featured: true
    },
    {
      key: "article1",
      title: "Article 1",
      description: "New Partnership with International Education Foundation",
      category: "Partnership",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article1
    },
    {
      key: "article2",
      title: "Article 2",
      description: "Mobile Health Clinics Launch in Remote Areas",
      category: "Healthcare",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article2
    },
    {
      key: "article3",
      title: "Article 3",
      description: "Coding Bootcamp Graduates First Cohort",
      category: "Skills Training",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article3
    },
    {
      key: "article4",
      title: "Article 4",
      description: "Emergency Relief Reaches 500 Families",
      category: "Emergency Aid",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article4
    },
    {
      key: "article5",
      title: "Article 5",
      description: "Women's Entrepreneurship Program Shows Remarkable Success",
      category: "Economic Empowerment",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article5
    },
    {
      key: "article6",
      title: "Article 6",
      description: "Additional news article image",
      category: "General",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "400x250px or larger",
      currentImage: uploadedFiles.article6
    }
  ]

  const featuredArticle = newsSlots.find(slot => slot.featured)
  const otherArticles = newsSlots.filter(slot => !slot.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">News Section Upload</h1>
            <p className="text-gray-600">Upload images for news articles</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {newsSlots.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(uploadedFiles).filter(Boolean).length / newsSlots.length) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <Newspaper className="h-5 w-5 mr-2 text-orange-600" />
                      {featuredArticle.title}
                      <span className="text-red-500 ml-1">*</span>
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{featuredArticle.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  {uploadedFiles[featuredArticle.key] && (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Uploaded</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Image Preview */}
                {uploadedFiles[featuredArticle.key] && (
                  <div className="mb-6">
                    <div className="relative group">
                      <img 
                        src={uploadedFiles[featuredArticle.key]} 
                        alt={featuredArticle.title}
                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(uploadedFiles[featuredArticle.key], '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Component */}
                <MediaUpload
                  onUploaded={(url) => handleFileUploaded(featuredArticle.key, url)}
                  acceptedTypes={featuredArticle.acceptedTypes}
                  maxSize={featuredArticle.maxSize}
                  label={`Upload ${featuredArticle.title} Image`}
                />

                {/* Requirements */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• File types: {featuredArticle.acceptedTypes}</li>
                    <li>• Max size: {featuredArticle.maxSize}</li>
                    <li>• Recommended size: {featuredArticle.recommendedSize}</li>
                    <li>• <span className="text-red-600 font-medium">Required</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <Card key={article.key} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-orange-600" />
                        {article.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                    {uploadedFiles[article.key] && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">Done</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Current Image Preview */}
                  {uploadedFiles[article.key] && (
                    <div className="mb-4">
                      <div className="relative group">
                        <img 
                          src={uploadedFiles[article.key]} 
                          alt={article.title}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            onClick={() => window.open(uploadedFiles[article.key], '_blank')}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload Component */}
                  <MediaUpload
                    onUploaded={(url) => handleFileUploaded(article.key, url)}
                    acceptedTypes={article.acceptedTypes}
                    maxSize={article.maxSize}
                    label={`Upload ${article.title} Image`}
                  />

                  {/* Requirements */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• {article.acceptedTypes}</li>
                      <li>• Max: {article.maxSize}</li>
                      <li>• Size: {article.recommendedSize}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <X className="h-4 w-4 mr-2" />
              Reset All
            </Button>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              disabled={!uploadedFiles.featured}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {uploadedFiles.featured && (
          <Card className="mt-8 border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Live Preview</CardTitle>
              <p className="text-gray-600">How your news section will look on the website</p>
            </CardHeader>
            <CardContent>
              {/* Featured Article Preview */}
              <div className="mb-8">
                <div className="border-0 shadow-2xl bg-white overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={uploadedFiles.featured}
                        alt="Featured article"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                          Featured
                        </span>
                        <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded shadow-lg">
                          Education
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Virtual Education Project Reaches 200+ Students
                      </h3>
                      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                        Our virtual education initiative has successfully expanded to serve over 200 Afghan girls and women across 24 provinces...
                      </p>
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-sm w-fit">
                        Read Full Article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Articles Preview */}
              {Object.values(uploadedFiles).filter(Boolean).length > 1 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Other Articles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherArticles.filter(article => uploadedFiles[article.key]).map((article) => (
                      <div key={article.key} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1">
                        <div className="relative overflow-hidden">
                          <img
                            src={uploadedFiles[article.key]}
                            alt={article.title}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/95 text-gray-700 text-xs px-2 py-1 rounded shadow-lg">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
                            {article.description}
                          </h4>
                          <p className="text-xs text-gray-500">March 10, 2025 • 2 min read</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
