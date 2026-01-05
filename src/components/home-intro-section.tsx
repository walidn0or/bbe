"use client";

import { PlayCircle } from "lucide-react";
import { images } from "@/config/images";
import { OurWork } from "./our-work";

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HomeIntroSection({ scrollToSection }: HomeIntroSectionProps) {
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
      </div>
      <OurWork />
    </section>
  );
}
