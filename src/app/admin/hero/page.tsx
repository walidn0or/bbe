"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, X, Eye } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export default function HeroUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    mainHero: "",
    background: ""
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const uploadSlots = [
    {
      key: "mainHero",
      title: "Main Hero Image",
      description: "The main image displayed in the hero section",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "800x600px or larger",
      currentImage: uploadedFiles.mainHero
    },
    {
      key: "background", 
      title: "Background Image",
      description: "Background image for the hero section",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB", 
      recommendedSize: "1200x800px or larger",
      currentImage: uploadedFiles.background
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Hero Section Upload</h1>
            <p className="text-gray-600">Upload images for your hero section</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {uploadSlots.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(uploadedFiles).filter(Boolean).length / uploadSlots.length) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {uploadSlots.map((slot) => (
            <Card key={slot.key} className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <Image className="h-5 w-5 mr-2 text-blue-600" />
                      {slot.title}
                      {slot.required && <span className="text-red-500 ml-1">*</span>}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{slot.description}</p>
                  </div>
                  {uploadedFiles[slot.key] && (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Uploaded</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Image Preview */}
                {uploadedFiles[slot.key] && (
                  <div className="mb-6">
                    <div className="relative group">
                      <img 
                        src={uploadedFiles[slot.key]} 
                        alt={slot.title}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(uploadedFiles[slot.key], '_blank')}
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
                  onUploaded={(url) => handleFileUploaded(slot.key, url)}
                  acceptedTypes={slot.acceptedTypes}
                  maxSize={slot.maxSize}
                  label={`Upload ${slot.title}`}
                />

                {/* Requirements */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• File types: {slot.acceptedTypes}</li>
                    <li>• Max size: {slot.maxSize}</li>
                    <li>• Recommended size: {slot.recommendedSize}</li>
                    {slot.required && <li>• <span className="text-red-600 font-medium">Required</span></li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              disabled={!uploadedFiles.mainHero}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {uploadedFiles.mainHero && (
          <Card className="mt-8 border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Live Preview</CardTitle>
              <p className="text-gray-600">How your hero section will look on the website</p>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 rounded-lg overflow-hidden">
                {uploadedFiles.background && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5"
                    style={{ backgroundImage: `url(${uploadedFiles.background})` }}
                  ></div>
                )}
                <div className="relative p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left">
                      <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-red-600">Beyond</span>
                        <br />
                        <span className="text-blue-600">Borders</span>
                        <br />
                        <span className="text-gray-900">Empowerment</span>
                      </h1>
                      <p className="text-lg text-gray-700 mb-6">
                        Empowering communities through education, healthcare, and economic opportunity.
                      </p>
                    </div>
                    <div className="relative">
                      <img 
                        src={uploadedFiles.mainHero} 
                        alt="Hero preview"
                        className="w-full h-64 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
