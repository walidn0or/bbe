"use client";

import { useEffect, useRef, useState } from "react";
import { PlayCircle } from "lucide-react";
import { images } from "@/config/images";
import { OurWork } from "./our-work";

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// Video gallery - All videos are MP4 format
const videoGallery: VideoItem[] = [
  {
    id: "1",
    title: "Welcome to BBE",
    url: images.impactStories.welcome,
    thumbnail: "/images/content/1.jpeg"
  },
  {
    id: "2",
    title: "Orphanage Support",
    url: images.impactStories.orphanageSupport,
    thumbnail: "/images/content/Orphaned Children Support + Accountability_.jpg"
  },
  {
    id: "3",
    title: "Education Program",
    url: images.impactStories.educationProgram,
    thumbnail: "/images/content/Education Support.jpeg"
  },
  {
    id: "4",
    title: "Community Impact",
    url: images.impactStories.communityImpact,
    thumbnail: "/images/content/Economic Empowerment1.jpeg"
  }
];

export function HomeIntroSection({ scrollToSection }: HomeIntroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoGallery[0]);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Reset video when selection changes
    const el = videoRef.current;
    if (el) {
      el.load();
    }
  }, [selectedVideo]);

  const togglePlayPause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => {
        // Video play failed - user interaction may be required
      });
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoSelect = (video: VideoItem) => {
    setIsPlaying(false);
    setIsLoading(true);
    setSelectedVideo(video);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  // Mix of photos and videos for the gallery under tagline
  const mediaGallery = [
    { type: 'image', src: '/images/content/1.jpeg', alt: 'Education Program' },
    { type: 'video', src: images.impactStories.welcome, thumbnail: '/images/content/Education Support.jpeg', alt: 'Welcome Video' },
    { type: 'image', src: '/images/content/Economic Empowerment1.jpeg', alt: 'Economic Empowerment' },
    { type: 'video', src: images.impactStories.orphanageSupport, thumbnail: '/images/content/Orphaned Children Support + Accountability_.jpg', alt: 'Orphanage Support' },
    { type: 'image', src: '/images/content/Community Empowerment .jpeg', alt: 'Community Empowerment' },
    { type: 'video', src: images.impactStories.educationProgram, thumbnail: '/images/content/Education Programs_.jpg', alt: 'Education Program Video' },
  ]

  return (
    <section id="home-intro" className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Photos and Videos Mix Gallery */}
        <div className="mb-12 md:mb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
            {mediaGallery.map((media, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {media.type === 'video' ? (
                  <>
                    <img
                      src={media.thumbnail}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                ) : (
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Gallery Selector */}
        <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Our Impact Stories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {videoGallery.map((video) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`group relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedVideo.id === video.id
                    ? 'ring-4 ring-red-600 shadow-xl scale-105'
                    : 'ring-2 ring-gray-200 hover:ring-red-400 hover:shadow-lg hover:scale-102'
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <PlayCircle className="h-8 w-8 md:h-10 md:w-10 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                {selectedVideo.id === video.id && (
                  <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-red-600 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-semibold">
                    Now Playing
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-1.5 md:p-2">
                  <p className="text-white text-[10px] md:text-xs font-semibold truncate">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg md:rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ maxHeight: '600px' }}>
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg md:rounded-2xl z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-white mx-auto mb-3 md:mb-4"></div>
                  <p className="text-white text-xs md:text-sm">Loading video...</p>
                </div>
              </div>
            )}
            
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg md:rounded-2xl"
              controls
              playsInline
              preload="metadata"
              onPlay={() => {
                setIsPlaying(true);
                setIsLoading(false);
              }}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={() => {
                setIsLoading(false);
              }}
              onCanPlay={() => {
                setIsLoading(false);
              }}
              onError={(e) => {
                console.error('Video error:', selectedVideo.url, e);
                setIsLoading(false);
              }}
              style={{ 
                width: '100%', 
                maxHeight: '500px',
                objectFit: 'contain',
                display: 'block', 
                backgroundColor: '#000' 
              }}
            >
              <source src={selectedVideo.url} type="video/mp4" key={selectedVideo.url} />
              <p className="text-white text-center p-4">Your browser does not support the video tag.</p>
            </video>
          </div>
        </div>
      </div>
      <OurWork />
    </section>
  );
}
