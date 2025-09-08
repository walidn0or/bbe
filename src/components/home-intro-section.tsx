"use client"

import { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heart, PlayCircle, Pause } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HomeIntroSection({ scrollToSection }: HomeIntroSectionProps) {
  const { isRTL } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }

  return (
    <section id="home-intro" className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row items-center gap-8 xl:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className="lg:flex-1 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to BBE
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Beyond Borders Empowerment (BBE) empowers marginalized communities through education, economic
              opportunities, healthcare support, and humanitarian aid — with a special focus on women and girls.
            </p>
            <div className={`flex flex-wrap gap-4 mt-8 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <Button 
                onClick={() => scrollToSection("donate")} 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base"
              >
                <Heart className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                Join our Mission
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 text-base border-gray-300 hover:bg-gray-50"
              >
                Get involved
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 xl:w-1/2 mt-6 lg:mt-0">
            {/* ========== HOME INTRO VIDEO UPLOAD SECTION ========== */}
            {/* 
              To update the home intro video:
              1. Place your video in: public/video/
              2. Recommended format: MP4 with H.264 codec
              3. Recommended resolution: 1080p (1920x1080)
              4. Max length: 60 seconds for optimal engagement
              5. Update the video source below:
                 - Current: src="/video/IMG_3547.mov"
                 - Change to: src="/video/your-video-file.mp4"
              6. For best results, compress the video to under 10MB
              7. Video will autoplay (muted) and loop continuously
            */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate nofullscreen"
                onContextMenu={(e) => e.preventDefault()}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlayPause}
                poster="/images/content/1.jpeg"
              >
                <source src="/video/IMG_3547.mov" type="video/mp4" />
                <source src="/video/IMG_3547.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Interactive Play/Pause Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={togglePlayPause}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === ' ' && togglePlayPause()}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="bg-white/90 hover:bg-white text-red-600 rounded-full p-3 shadow-lg transform transition-all hover:scale-110">
                  {isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <PlayCircle className="h-8 w-8" />
                  )}
                </div>
              </div>

              {/* Video Progress Indicator */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/20 rounded-full h-1 overflow-hidden">
                  <div className="bg-white h-full rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            {/* ========== END HOME INTRO VIDEO UPLOAD SECTION ========== */}
          </div>
        </div>
      </div>
    </section>
  )
}
