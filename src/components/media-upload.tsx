"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, FileImage, Video, File, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  preview?: string
  status: 'uploading' | 'success' | 'error'
  progress: number
}

export function MediaUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedTypes = [
    'images/one.png',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm'
  ]

  const maxFileSize = 50 * 1024 * 1024 // 50MB

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Please upload images (JPEG, PNG, GIF, WebP) or videos (MP4, AVI, MOV, WMV, FLV, WebM).'
    }
    if (file.size > maxFileSize) {
      return 'File size too large. Maximum size is 50MB.'
    }
    return null
  }

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 200
          canvas.height = 150
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#f0f0f0'
            ctx.fillRect(0, 0, 200, 150)
            ctx.fillStyle = '#666'
            ctx.font = '16px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('Video', 100, 75)
            ctx.fillText(file.name, 100, 95)
          }
          resolve(canvas.toDataURL())
        }
        video.src = URL.createObjectURL(file)
      } else {
        resolve('')
      }
    })
  }

  const uploadFile = async (file: File): Promise<void> => {
    const fileId = generateId()
    const error = validateFile(file)
    
    if (error) {
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'error',
        progress: 0
      }])
      return
    }

    const preview = await createFilePreview(file)
    
    setUploadedFiles(prev => [...prev, {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      preview,
      status: 'uploading',
      progress: 0
    }])

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 100) }
          : f
      ))
    }, 200)

    try {
      // Create FormData for upload
      const formData = new FormData()
      formData.append('files', file)

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)

      if (response.ok) {
        const result = await response.json()
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'success', 
                progress: 100,
                url: result.files[0]?.url || f.url
              }
            : f
        ))
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
    } catch (error) {
      clearInterval(interval)
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ))
      console.error('Upload error:', error)
    }
  }

  const handleFiles = useCallback((files: FileList) => {
    setIsUploading(true)
    Array.from(files).forEach(uploadFile)
    setIsUploading(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="h-5 w-5" />
    if (type.startsWith('video/')) return <Video className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Media Upload Center
        </h2>
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragOver 
              ? 'border-red-500 bg-red-50 scale-105' 
              : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drop your files here or click to browse
          </h3>
          <p className="text-gray-500 mb-4">
            Supports images (JPEG, PNG, GIF, WebP) and videos (MP4, AVI, MOV, WMV, FLV, WebM)
          </p>
          <p className="text-sm text-gray-400">
            Maximum file size: 50MB
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{file.name}</span>
                          {getStatusIcon(file.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.status === 'uploading' && (
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-blue-700">Uploading files...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 