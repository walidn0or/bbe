// Centralized image configuration
// Update image paths here to change images across all sections

export const images = {
  // Hero Section
  hero: {
    main: "/images/content/1.jpeg",
    background: "/images/hero/background.jpg"
  },

  // About Section
  about: {
    main: "/images/content/Education + Human Rights Advocacy_.jpg",
    team: {
      member1: "/images/members/Sosan Hashimi.jpeg",
      member2: "/images/members/Imran Fazal(Board of Trustees).jpeg", 
      member3: "/images/members/Khatira Fikrat(HR and Admin Manager).jpeg"
    },
    values: {
      inclusiveness: "/images/content/Inclusiveness.jpeg",
      sustainability: "/images/content/",
      accountability: "/images/content/",
      empowerment: "/images/content/Economic Empowerment(1).jpeg",
      dignity: "/images/content/"
    }
  },

  // Programs Section
  programs: {
    education: "/images/content/Education Support.jpeg",
    healthcare: "/images/content/Healthcare Support(Emergency Medical Support).jpeg",
    economic: "/images/content/Economic Empowerment1.jpeg",
    orphans: "/images/content/Orphaned Children Support + Accountability_.jpg",
    rights: "/images/content/Human Rights Advocacy_.jpg",
    emergency: "/images/content/Healthcare Support(Emergency Medical Support)(1).jpeg"
  },

  // News Section
  news: {
    featured: "/images/news/featured-article.jpg",
    article1: "/images/news/article-1.jpg",
    article2: "/images/news/article-2.jpg",
    article3: "/images/news/article-3.jpg",
    article4: "/images/news/article-4.jpg",
    article5: "/images/news/article-5.jpg",
    article6: "/images/news/article-6.jpg"
  },

  // Videos Section
  videos: {
    featured: "/images/videos/",
    video1: "/video/Orphanage(2).mp4",
    video2: "/videos/Orphanage.mp4",
    video3: "/images/videos/video-3.jpg",
    video4: "/images/videos/video-4.jpg",
    video5: "/images/videos/video-5.jpg",
    video6: "/images/videos/video-6.jpg"
  },

  // Testimonials Section
  testimonials: {
    person1: "/images/testimonials/person-1.jpg",
    person2: "/images/testimonials/person-2.jpg",
    person3: "/images/testimonials/person-3.jpg"
  },

  // Impact Section
  impact: {
    background: "/images/impact/background.jpg"
  },

  // Fallback images
  fallback: {
    placeholder: "/placeholder.png",
    placeholderSvg: "/placeholder.svg"
  }
}

// Helper function to get image with fallback
export const getImage = (imagePath: string, fallback: string = images.fallback.placeholder): string => {
  return imagePath || fallback
}
