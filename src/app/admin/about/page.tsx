"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Image, Check, X, Eye, Users, Heart, Globe, Shield, Award } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export default function AboutUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    mainAbout: "",
    teamMember1: "",
    teamMember2: "",
    teamMember3: "",
    inclusiveness: "",
    sustainability: "",
    accountability: "",
    empowerment: "",
    dignity: ""
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const uploadSlots = [
    {
      key: "mainAbout",
      title: "Main About Image",
      description: "The main image displayed in the about section",
      required: true,
      acceptedTypes: "image/*",
      maxSize: "5MB",
      recommendedSize: "600x500px or larger",
      currentImage: uploadedFiles.mainAbout
    },
    {
      key: "teamMember1",
      title: "Team Member 1",
      description: "First team member photo (circular display)",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "2MB",
      recommendedSize: "200x200px (square)",
      currentImage: uploadedFiles.teamMember1
    },
    {
      key: "teamMember2", 
      title: "Team Member 2",
      description: "Second team member photo (circular display)",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "2MB",
      recommendedSize: "200x200px (square)",
      currentImage: uploadedFiles.teamMember2
    },
    {
      key: "teamMember3",
      title: "Team Member 3", 
      description: "Third team member photo (circular display)",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "2MB",
      recommendedSize: "200x200px (square)",
      currentImage: uploadedFiles.teamMember3
    },
    {
      key: "inclusiveness",
      title: "Inclusiveness Value",
      description: "Image for the inclusiveness core value",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "300x200px",
      currentImage: uploadedFiles.inclusiveness,
      icon: Users
    },
    {
      key: "sustainability",
      title: "Sustainability Value",
      description: "Image for the sustainability core value", 
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "300x200px",
      currentImage: uploadedFiles.sustainability,
      icon: Globe
    },
    {
      key: "accountability",
      title: "Accountability Value",
      description: "Image for the accountability core value",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB", 
      recommendedSize: "300x200px",
      currentImage: uploadedFiles.accountability,
      icon: Shield
    },
    {
      key: "empowerment",
      title: "Empowerment Value",
      description: "Image for the empowerment core value",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "300x200px", 
      currentImage: uploadedFiles.empowerment,
      icon: Award
    },
    {
      key: "dignity",
      title: "Dignity Value",
      description: "Image for the dignity core value",
      required: false,
      acceptedTypes: "image/*",
      maxSize: "3MB",
      recommendedSize: "300x200px",
      currentImage: uploadedFiles.dignity,
      icon: Heart
    }
  ]

  const requiredSlots = uploadSlots.filter(slot => slot.required)
  const optionalSlots = uploadSlots.filter(slot => !slot.required)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">About Section Upload</h1>
            <p className="text-gray-600">Upload images for your about section</p>
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
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(uploadedFiles).filter(Boolean).length / uploadSlots.length) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Required Uploads */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Images</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {requiredSlots.map((slot) => (
              <Card key={slot.key} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <Image className="h-5 w-5 mr-2 text-green-600" />
                        {slot.title}
                        <span className="text-red-500 ml-1">*</span>
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
                      <li>• <span className="text-red-600 font-medium">Required</span></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Optional Uploads */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Optional Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {optionalSlots.map((slot) => (
              <Card key={slot.key} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                        {slot.icon && <slot.icon className="h-4 w-4 mr-2 text-green-600" />}
                        {slot.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1 text-sm">{slot.description}</p>
                    </div>
                    {uploadedFiles[slot.key] && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">Done</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Current Image Preview */}
                  {uploadedFiles[slot.key] && (
                    <div className="mb-4">
                      <div className="relative group">
                        <img 
                          src={uploadedFiles[slot.key]} 
                          alt={slot.title}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            onClick={() => window.open(uploadedFiles[slot.key], '_blank')}
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
                    onUploaded={(url) => handleFileUploaded(slot.key, url)}
                    acceptedTypes={slot.acceptedTypes}
                    maxSize={slot.maxSize}
                    label={`Upload ${slot.title}`}
                  />

                  {/* Requirements */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• {slot.acceptedTypes}</li>
                      <li>• Max: {slot.maxSize}</li>
                      <li>• Size: {slot.recommendedSize}</li>
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
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              disabled={!uploadedFiles.mainAbout}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {uploadedFiles.mainAbout && (
          <Card className="mt-8 border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Live Preview</CardTitle>
              <p className="text-gray-600">How your about section will look on the website</p>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
                  <div className="relative">
                    <img 
                      src={uploadedFiles.mainAbout} 
                      alt="About preview"
                      className="w-full h-64 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                    <p className="text-gray-700 mb-4">
                      Beyond Borders Empowerment is dedicated to creating lasting change in communities...
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {uploadedFiles.teamMember1 && (
                          <img 
                            src={uploadedFiles.teamMember1} 
                            alt="Team member"
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        )}
                        {uploadedFiles.teamMember2 && (
                          <img 
                            src={uploadedFiles.teamMember2} 
                            alt="Team member"
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        )}
                        {uploadedFiles.teamMember3 && (
                          <img 
                            src={uploadedFiles.teamMember3} 
                            alt="Team member"
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Our dedicated team</p>
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
