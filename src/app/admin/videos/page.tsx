"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Video, Check, X, Eye, Play, Clock } from "lucide-react"
import { MediaUpload } from "@/components/media-upload"

export default function VideosUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({
    featured: "",
    video1: "",
    video2: "",
    video3: "",
    video4: "",
    video5: "",
    video6: ""
  })

  const [uploadedVideos, setUploadedVideos] = useState<{[key: string]: string}>({
    featuredVideo: "",
    video1File: "",
    video2File: "",
    video3File: "",
    video4File: "",
    video5File: "",
    video6File: ""
  })

  const handleFileUploaded = (key: string, url: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const handleVideoUploaded = (key: string, url: string) => {
    setUploadedVideos(prev => ({
      ...prev,
      [key]: url
    }))
  }

  const videoSlots = [
    {
      key: "featured",
      videoKey: "featuredVideo",
      title: "Featured Video",
      description: "Virtual Education Project Launch Event - London 2025",
      duration: "15:32",
      views: "2.1K",
      required: true,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "800x450px or larger",
      currentImage: uploadedFiles.featured,
      currentVideo: uploadedVideos.featuredVideo,
      featured: true
    },
    {
      key: "video1",
      videoKey: "video1File",
      title: "Student Success Stories",
      description: "Fatima's Journey - From virtual classes to remote job",
      duration: "8:45",
      views: "1.8K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video1,
      currentVideo: uploadedVideos.video1File
    },
    {
      key: "video2",
      videoKey: "video2File",
      title: "On-Ground Schools",
      description: "Hope, Commitment & Change - Documentary",
      duration: "12:20",
      views: "3.2K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video2,
      currentVideo: uploadedVideos.video2File
    },
    {
      key: "video3",
      videoKey: "video3File",
      title: "Orphanage Visit",
      description: "Bringing Joy and Education to children",
      duration: "6:15",
      views: "1.5K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video3,
      currentVideo: uploadedVideos.video3File
    },
    {
      key: "video4",
      videoKey: "video4File",
      title: "Women's Entrepreneurship",
      description: "Training Program success stories",
      duration: "10:30",
      views: "2.7K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video4,
      currentVideo: uploadedVideos.video4File
    },
    {
      key: "video5",
      videoKey: "video5File",
      title: "Mobile Health Clinic",
      description: "In Action - Providing care in remote communities",
      duration: "7:55",
      views: "1.9K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video5,
      currentVideo: uploadedVideos.video5File
    },
    {
      key: "video6",
      videoKey: "video6File",
      title: "Additional Video",
      description: "Extra video content slot",
      duration: "5:00",
      views: "1.2K",
      required: false,
      acceptedTypes: "image/*",
      videoTypes: "video/*",
      maxSize: "5MB",
      videoMaxSize: "100MB",
      recommendedSize: "350x200px or larger",
      currentImage: uploadedFiles.video6,
      currentVideo: uploadedVideos.video6File
    }
  ]

  const featuredVideo = videoSlots.find(slot => slot.featured)
  const otherVideos = videoSlots.filter(slot => !slot.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Videos Section Upload</h1>
            <p className="text-gray-600">Upload video thumbnails and video files</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {videoSlots.length} thumbnails • 
                {Object.values(uploadedVideos).filter(Boolean).length} / {videoSlots.length} videos
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((Object.values(uploadedFiles).filter(Boolean).length + Object.values(uploadedVideos).filter(Boolean).length) / (videoSlots.length * 2)) * 100}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Video */}
        {featuredVideo && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Video</h2>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <Video className="h-5 w-5 mr-2 text-red-600" />
                      {featuredVideo.title}
                      <span className="text-red-500 ml-1">*</span>
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{featuredVideo.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredVideo.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredVideo.views} views
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadedFiles[featuredVideo.key] && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">Thumbnail</span>
                      </div>
                    )}
                    {uploadedVideos[featuredVideo.videoKey] && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">Video</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Thumbnail Preview */}
                {uploadedFiles[featuredVideo.key] && (
                  <div className="mb-6">
                    <div className="relative group">
                      <img 
                        src={uploadedFiles[featuredVideo.key]} 
                        alt={featuredVideo.title}
                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {featuredVideo.duration}
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Components */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Video Thumbnail</h4>
                    <MediaUpload
                      onUploaded={(url) => handleFileUploaded(featuredVideo.key, url)}
                      acceptedTypes={featuredVideo.acceptedTypes}
                      maxSize={featuredVideo.maxSize}
                      label="Upload Thumbnail Image"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Video File</h4>
                    <MediaUpload
                      onUploaded={(url) => handleVideoUploaded(featuredVideo.videoKey, url)}
                      acceptedTypes={featuredVideo.videoTypes}
                      maxSize={featuredVideo.videoMaxSize}
                      label="Upload Video File"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Thumbnail: {featuredVideo.acceptedTypes}, max {featuredVideo.maxSize}</li>
                    <li>• Video: {featuredVideo.videoTypes}, max {featuredVideo.videoMaxSize}</li>
                    <li>• Recommended thumbnail size: {featuredVideo.recommendedSize}</li>
                    <li>• <span className="text-red-600 font-medium">Required</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Videos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVideos.map((video) => (
              <Card key={video.key} className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                        <Play className="h-4 w-4 mr-2 text-red-600" />
                        {video.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{video.description}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="h-3 w-3 mr-1" />
                          {video.views}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {uploadedFiles[video.key] && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">Thumb</span>
                        </div>
                      )}
                      {uploadedVideos[video.videoKey] && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">Video</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Current Thumbnail Preview */}
                  {uploadedFiles[video.key] && (
                    <div className="mb-4">
                      <div className="relative group">
                        <img 
                          src={uploadedFiles[video.key]} 
                          alt={video.title}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="h-4 w-4 text-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload Components */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">Thumbnail</h4>
                      <MediaUpload
                        onUploaded={(url) => handleFileUploaded(video.key, url)}
                        acceptedTypes={video.acceptedTypes}
                        maxSize={video.maxSize}
                        label="Upload Thumbnail"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">Video File</h4>
                      <MediaUpload
                        onUploaded={(url) => handleVideoUploaded(video.videoKey, url)}
                        acceptedTypes={video.videoTypes}
                        maxSize={video.videoMaxSize}
                        label="Upload Video"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Thumbnail: {video.acceptedTypes}</li>
                      <li>• Video: {video.videoTypes}</li>
                      <li>• Thumbnail size: {video.recommendedSize}</li>
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
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
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
              <p className="text-gray-600">How your videos section will look on the website</p>
            </CardHeader>
            <CardContent>
              {/* Featured Video Preview */}
              <div className="mb-8">
                <div className="border-0 shadow-2xl bg-white overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-2 relative group cursor-pointer">
                      <img
                        src={uploadedFiles.featured}
                        alt="Featured video"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {featuredVideo?.duration}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <span className="bg-red-600 text-white w-fit mb-4 text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{featuredVideo?.title}</h3>
                      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                        {featuredVideo?.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-6">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {featuredVideo?.views} views
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {featuredVideo?.duration}
                        </div>
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-sm w-fit">
                        <Play className="h-3 w-3 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Videos Preview */}
              {Object.values(uploadedFiles).filter(Boolean).length > 1 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Other Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherVideos.filter(video => uploadedFiles[video.key]).map((video) => (
                      <div key={video.key} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1 cursor-pointer">
                        <div className="relative overflow-hidden">
                          <img
                            src={uploadedFiles[video.key]}
                            alt={video.title}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                              <Play className="h-4 w-4 text-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {video.views} views
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {video.duration}
                            </div>
                          </div>
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
