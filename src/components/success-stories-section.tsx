"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

interface SuccessStory {
  name: string
  title: string
  quote: string
  image?: string
  video?: string
}

const successStories: SuccessStory[] = [
  {
    name: "Barin Jebran",
    title: "11th-grade student and participant in BBE-Advance English language course",
    quote: "My name is Barin Jebran. I am an 11th-grade student and a participant in the English language course (BBE-Advance). Unfortunately, the recent developments in our country have deprived girls of their fundamental right to education. My mother, who was a government employee, lost her job. Amid economic hardships and social pressures, after consulting with my mother and other family members, we decided—despite all difficulties to pursue education through migration, which forced us to leave our homeland. My sister, Beshetta Jebran, who was in 7th grade, my mother, and I spent two years in Iran, where we successfully completed two academic years. However, difficult conditions, lack of educational resources, and changes in Iranian government policies toward migrants forced us to return. Even though hope seemed lost and we faced many hardships, we did not give up. Our efforts were focused on finding even a small opportunity to continue our education. During this time, one of my mother's colleagues, who lives in the UK, introduced us to this online English language course. This program became a valuable opportunity and a light in the darkness for us. Today, we are doing our best to make the most of this chance. I never imagined that even a small pathway to continue my education could exist, and now I am deeply grateful that this course has brought new hope for my sister and me. I am confident that the path to progress is opening before us, and with perseverance, a bright future awaits. With sincere gratitude, Barin Jebran",
    image: "/images/success stories/person-1.jpg"
  },
  {
    name: "Wasiya Safi",
    title: "Student",
    quote: "One memorable part of the online class was how quickly it started to feel like a real community, even though we were all behind screens. I still remember the time when my mic was accidentally unmuted and my little sister shouted something ridiculous during a lecture—it definitely lightened the mood and made the class feel more human. Also, the flexibility of learning at my own pace really helped me improve. I used to be nervous about asking questions, but in the online setup, I felt more comfortable messaging or speaking up. It has been a fun and rewarding experience, and I'm truly grateful for the support from both you and my classmates. Wasiya Safi",
    video: "/images/videos/feedback.mp4"
  },
  {
    name: "Moheba Karimi",
    title: "Student",
    quote: "",
    video: "/images/videos/feedback.mp4"
  },
  {
    name: "Ozra Penhan",
    title: "Student",
    quote: "",
    video: "/images/videos/feedback.mp4"
  }
]

export function SuccessStoriesSection() {
  const { t, isRTL } = useLanguage()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Feedback and Success Stories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from students and beneficiaries whose lives have been transformed through our programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {successStories.map((story, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white"
            >
              <CardContent className="p-6 md:p-8">
                {story.video ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black group cursor-pointer"
                    onClick={() => setSelectedVideo(story.video || null)}
                  >
                    <video
                      src={story.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">Meet {story.name}</h3>
                      {story.title && (
                        <p className="text-white/90 text-sm mt-1">{story.title}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {story.image && (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-red-100">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <Quote className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Meet {story.name}</h3>
                      {story.title && (
                        <p className="text-gray-600 text-sm mb-4">{story.title}</p>
                      )}
                    </div>
                  </>
                )}
                
                {story.quote && (
                  <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                    "{story.quote}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              ✕
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  )
}
