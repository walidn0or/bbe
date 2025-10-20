"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PlayCircle, Pause } from "lucide-react";
import { images } from "@/config/images";

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// Video gallery - Add or modify videos here
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

function getMimeTypeFromUrl(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "mov":
      return "video/quicktime";
    default:
      return "video/mp4";
  }
}

export function HomeIntroSection({ scrollToSection }: HomeIntroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoGallery[0]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mimeType = useMemo(() => getMimeTypeFromUrl(selectedVideo.url), [selectedVideo.url]);

  const tryAutoplay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    tryAutoplay();
  }, []);

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
    setSelectedVideo(video);
    if (videoRef.current) {
      videoRef.current.load();
      tryAutoplay();
    }
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  return (
    <section id="home-intro" className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Video Gallery Selector */}
        <div className="mb-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Impact Stories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <PlayCircle className="h-10 w-10 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                {selectedVideo.id === video.id && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Now Playing
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                  <p className="text-white text-xs font-semibold truncate">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Video Player */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              key={selectedVideo.url}
              ref={videoRef}
              className="w-full rounded-2xl"
              controls
              controlsList="nodownload"
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                // Video failed to load - silently handle
              }}
              onLoadedMetadata={() => {
                // Video metadata loaded
              }}
              onCanPlay={() => {
                // Video ready to play
              }}
              style={{ maxHeight: '600px', width: '100%', display: 'block', backgroundColor: '#000' }}
            >
              <source src={selectedVideo.url} type="video/quicktime" />
              <source src={selectedVideo.url} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
