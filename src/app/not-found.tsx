import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-base text-gray-500">
            The page may have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="text-red-600 hover:text-red-700 font-medium hover:underline">
              About Us
            </Link>
            <Link href="/programs" className="text-red-600 hover:text-red-700 font-medium hover:underline">
              Our Programs
            </Link>
            <Link href="/impact" className="text-red-600 hover:text-red-700 font-medium hover:underline">
              Our Impact
            </Link>
            <Link href="/donate" className="text-red-600 hover:text-red-700 font-medium hover:underline">
              Donate
            </Link>
            <Link href="/contact" className="text-red-600 hover:text-red-700 font-medium hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}