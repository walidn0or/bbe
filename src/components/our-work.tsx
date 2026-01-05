"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import { images, getImage } from "@/config/images"

interface WorkItem {
  key: keyof typeof images.ourWork
  title: string
  description: string
  gallery: string[]
}

const workItems: WorkItem[] = [
  {
    key: "menstrualHygiene",
    title: "Breaking the Stereotypes",
    description:
      "Menstruation is a natural biological process and should never be treated as a taboo. Understanding it is essential for self-care, health, and empowerment. In October 2024, our team delivered comprehensive hygiene education and training for young girls in Qala Fatullah, Kabul, Afghanistan. Alongside the training, we provided essential menstrual hygiene supplies to support their health and well-being. These initiatives were made possible with the generous support of our partners and donors, enabling us to address critical gaps in knowledge and resources while promoting dignity, confidence, and resilience among vulnerable girls in marginalized communities.",
    gallery: images.ourWorkGallery.menstrualHygiene || []
  },
  {
    key: "languageSkills",
    title: "Enhancing Language Skills",
    description:
      "Our free virtual English classes empower young girls and women from over 15 provinces in Afghanistan to strengthen their language abilities, access educational resources and information, and expand their professional and social networks. These classes are designed not only to improve communication skills but also to foster confidence, critical thinking, and opportunities for personal and economic growth in marginalized communities. We also offer a free, virtual IELTS preparation program taught by qualified British instructors. This initiative provides participants with the opportunity to strengthen their English proficiency and prepare for international study or professional opportunities abroad. The program delivers high-quality instruction at no cost, equipping learners with the skills and guidance necessary to achieve a recognized IELTS score upon completion, thereby opening doors to higher education, scholarships, and global career pathways.",
    gallery: images.ourWorkGallery.languageSkills || []
  },
  {
    key: "orphanSupport",
    title: "Orphan Support Program",
    description:
      "Beyond Borders Empowerment is honored to serve children in two orphanages in Qala Fatullah, Kabul, Afghanistan. Our compassionate team provides consistent care and creates a nurturing environment where children can thrive emotionally, socially, and creatively. Through activities such as art workshops, storytelling, and small celebrations during Ramadan, Eid, Children's Day, and other cultural events, we foster joy, laughter, and a sense of belonging. By combining care with opportunities for personal expression and social engagement, our program empowers these young lives to build resilience, confidence, and hope for a brighter future.",
    gallery: images.ourWorkGallery.orphanSupport || []
  },
  {
    key: "scholarshipMentorship",
    title: "Scholarship and Mentorship Programs",
    description:
      "Beyond Borders Empowerment regularly provides scholarship guidance and mentorship sessions for women and girls, equipping them with the knowledge, skills, and confidence to pursue higher education and professional opportunities. Through these sessions, participants gain access to information on scholarship opportunities, receive personalized advice, and engage with mentors and alumni who offer guidance, encouragement, and support. By fostering both knowledge and empowerment, these programs help women and girls navigate educational pathways and realize their full potential.",
    gallery: images.ourWorkGallery.scholarshipMentorship || []
  },
  {
    key: "artClub",
    title: "Our Art Club",
    description:
      "Beyond Borders Empowerment's Art Club offers a vital creative outlet in the restrictive environment of Afghanistan, where opportunities for artistic expression are limited for women, girls, and even men. These classes provide beneficiaries with a safe and supportive space to come together, learn new skills, and connect with peers. Meeting twice a week, participants can explore their artistic talents, express themselves freely, and cultivate confidence and resilience. Through this program, art becomes not only a means of personal development but also a powerful tool for empowerment, self-discovery, and community engagement.",
    gallery: images.ourWorkGallery.artClub || []
  },
  {
    key: "healthSupport",
    title: "Our Health Support Program",
    description:
      "We organize free health camps in partnership with a network of professional doctors, providing critical healthcare services to those who need them most. These camps specifically target vulnerable populations, including women, children, the elderly, and forced returnees from neighboring countries. Participants receive access to quality medical care, essential medications, and health guidance, ensuring that basic healthcare needs are met. By combining professional expertise with community outreach, these health camps play a vital role in promoting well-being, resilience, and improved quality of life among marginalized communities. Our health team also provides critical support to individuals facing severe financial hardship, ensuring access to essential healthcare even when resources are limited. In emergency cases, they assist with hospital visit fees and the purchase of necessary medications, helping vulnerable community members overcome financial barriers and receive timely medical care.",
    gallery: images.ourWorkGallery.healthSupport || []
  }
]

export function OurWork() {
  const [activeKey, setActiveKey] = useState<WorkItem["key"] | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeItem = useMemo(() => workItems.find((w) => w.key === activeKey) || null, [activeKey])
  const activeImages = useMemo(() => {
    if (!activeItem) return []
    const base = getImage(images.ourWork[activeItem.key], images.fallback.placeholder)
    const gallery = activeItem.gallery?.filter(Boolean) || []
    const all = [base, ...gallery]
    return all.length ? all : [images.fallback.placeholder]
  }, [activeItem])

  const closeModal = () => {
    setActiveKey(null)
    setActiveIndex(0)
  }

  const goNext = () => {
    if (!activeImages.length) return
    setActiveIndex((prev) => (prev + 1) % activeImages.length)
  }

  const goPrev = () => {
    if (!activeImages.length) return
    setActiveIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-red-600 font-semibold mb-3">Our Work</p>
          <h2 className="text-2xl md:3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            Programs that move our communities forward
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            From health and dignity to language skills and creative expression, each initiative is built with and for the people we serve.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => {
            const gallery = item.gallery?.filter(Boolean) || []
            const preview = gallery.slice(0, 2)
            const remaining = Math.max(gallery.length - preview.length, 0)

            return (
              <div
                key={String(item.key)}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setActiveKey(item.key)
                  setActiveIndex(0)
                }}
              >
                <div className="relative h-44 md:h-52 lg:h-56 overflow-hidden">
                  <Image
                    src={getImage(images.ourWork[item.key], images.fallback.placeholder)}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    priority={item.key === "menstrualHygiene"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <span className="absolute top-3 right-3 bg-white/85 text-red-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {item.title}
                  </span>
                </div>
                <div className="p-5 md:p-6 space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                  {preview.length > 0 && (
                    <div className="flex items-center gap-2">
                      {preview.map((img, idx) => (
                        <div key={`${item.key}-thumb-${idx}`} className="relative w-16 h-12 rounded-lg overflow-hidden ring-1 ring-gray-200">
                          <Image
                            src={getImage(img, images.fallback.placeholder)}
                            alt={`${item.title} gallery ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ))}
                      {remaining > 0 && (
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                          +{remaining} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden z-10">
            <div className="flex justify-between items-start gap-4 p-4 md:p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-2">Our Work</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{activeItem.title}</h3>
                <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">{activeItem.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="relative h-72 md:h-96 bg-black">
                <Image
                  src={getImage(activeImages[activeIndex], images.fallback.placeholder)}
                  alt={`${activeItem.title} image ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 900px, 100vw"
                />
              </div>
              {activeImages.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {activeImages.length > 1 && (
              <div className="px-4 md:px-6 py-4 flex items-center gap-2 overflow-x-auto">
                {activeImages.map((img, idx) => (
                  <button
                    key={`${String(activeItem.key)}-modal-thumb-${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden ring-2 transition ${
                      idx === activeIndex ? "ring-red-500" : "ring-transparent hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={getImage(img, images.fallback.placeholder)}
                      alt={`${activeItem.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
