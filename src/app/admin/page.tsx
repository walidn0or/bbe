"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Image, 
  Video, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Newspaper, 
  Play, 
  MessageSquare,
  Settings,
  Upload
} from "lucide-react"

export default function AdminDashboard() {
  const sections = [
    {
      title: "Hero Section",
      description: "Main hero image and background",
      icon: Image,
      href: "/admin/hero",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      items: ["Main hero image", "Background image"]
    },
    {
      title: "About Section", 
      description: "About images, team photos, and core values",
      icon: Users,
      href: "/admin/about",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      items: ["Main about image", "Team member photos", "Core values images"]
    },
    {
      title: "Programs Section",
      description: "Program images for all 6 programs",
      icon: GraduationCap,
      href: "/admin/programs", 
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      items: ["Education program", "Healthcare program", "Economic program", "Orphans program", "Rights program", "Emergency program"]
    },
    {
      title: "News Section",
      description: "News article images and featured content",
      icon: Newspaper,
      href: "/admin/news",
      color: "bg-gradient-to-r from-orange-500 to-orange-600", 
      items: ["Featured article image", "Article images (6 total)"]
    },
    {
      title: "Videos Section",
      description: "Video thumbnails and video files",
      icon: Play,
      href: "/admin/videos",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      items: ["Featured video thumbnail", "Video thumbnails (6 total)", "Video files"]
    },
    {
      title: "Testimonials Section", 
      description: "Testimonial person photos",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      items: ["Person 1 photo", "Person 2 photo", "Person 3 photo"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <Settings className="h-6 w-6 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload and manage images and videos for each section of your website. 
            Simply click on a section to start uploading content.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <Image className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-600">Sections</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <Upload className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Upload Slots</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Images & Videos</div>
              <div className="text-sm text-gray-600">Supported</div>
            </CardContent>
          </Card>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Link key={index} href={section.href}>
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-2 cursor-pointer">
                <div className={`h-2 ${section.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${section.color} text-white`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${section.color} hover:opacity-90 text-white transition-all duration-300 group-hover:scale-105`}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Content
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            All uploads are automatically optimized and integrated into your website
          </p>
        </div>
      </div>
    </div>
  )
}
