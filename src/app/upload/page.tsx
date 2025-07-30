import { MediaUpload } from "@/components/media-upload"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Media Upload Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your images and videos to the BBE NGO website. 
            All files will be stored securely and can be used throughout the website.
          </p>
        </div>
        
        <MediaUpload />
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Upload Guidelines
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Supported File Types
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Images: JPEG, PNG, GIF, WebP</li>
                  <li>• Videos: MP4, AVI, MOV, WMV, FLV, WebM</li>
                  <li>• Maximum file size: 50MB per file</li>
                  <li>• Multiple files can be uploaded at once</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Drag and drop support</li>
                  <li>• File preview for images</li>
                  <li>• Progress tracking</li>
                  <li>• File validation</li>
                  <li>• Secure file storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 