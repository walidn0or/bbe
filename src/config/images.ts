// Centralized image configuration
// Update image paths here to change images across all sections


export const images: any = {
  // Logo
  // To upload a new logo:
  // 1. Add your logo file to: public/images/
  // 2. Update the path below
  // 3. Recommended: SVG or PNG with transparent background
  // 4. Size: 200x200px or larger (square)
  logo: "/images/Beyond-Borders-Empowerment-logo-PNG.svg",

  // Hero Section
  hero: {
    main: "/images/content/1.jpeg",
    background: "/images/videos/Orphanage(1).mov"
  },

  // Videos Section - The 4 uploaded videos
  videos: {
    featured: "/images/videos/Business.mov",
    video1: "/images/videos/Business.mov",
    video2: "/images/videos/Orphanage(1).mov",
    video3: "/images/videos/Orphanage(2).mov",
    video4: "/images/videos/feedback.mp4",
    video5: "/images/videos/Business.mov" // Fallback to first video
  },

  // Impact Stories Videos - Same 4 videos for home page
  impactStories: {
    welcome: "/images/videos/Business.mov",
    orphanageSupport: "/images/videos/Orphanage(1).mov",
    educationProgram: "/images/videos/Orphanage(2).mov",
    communityImpact: "/images/videos/feedback.mp4",
  },

  // About Section
  about: {
    main: "/images/content/Education + Human Rights Advocacy_.jpg",
    team: {
      // Board of Trustees
      sosan: "/images/members/Sosan Hashimi.jpeg",
      farangis: "/images/members/Farangis Fariwar(Board of Trustees).jpeg", 
      imran: "/images/members/Imran Fazal(Board of Trustees).jpeg",
      kaihan: "/images/members/Kaihan Alambye(Board of Trustees).jpeg",
      waheed: "/images/members/male.png",
      
      // Staff Members
      khatira: "/images/members/Khatira Fikrat(HR and Admin Manager).jpeg",
      sadaf: "/images/members/Sadaf Ghawsi(Program & Technical Lead + Project Management).jpeg",
      
      // Educators
      adeeba: "/images/members/Adeeba Bareen(Educator).jpeg",
      malika: "/images/members/Malika Hail (Educator).jpeg",
      hamasa: "/images/members/female.png",
      zarghona: "/images/members/female.png",
      
      // Researchers
      hasina: "/images/members/Hasina Zmarai(Researcher).jpeg",
      geety: "/images/members/female.png",
    },
    values: {
      inclusiveness: "/images/content/Inclusiveness.jpeg",
      sustainability: "/images/content/Sustainability.jpeg",
      accountability: "/images/content/accountability.jpeg",
      empowerment: "/images/content/Economic Empowerment(2).jpeg",
      dignity: "/images/content/dignity.jpeg"
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
  // Using content images as placeholders until news images are uploaded
  news: {
    featured: "/images/news/News & Updates.jpeg",
    article1: "/images/news/News & Updates (1).jpeg",
    article2: "/images/news/News & Updates (2).jpeg",
    article3: "/images/news/News & Updates (4).jpeg",
    article4: "/images/news/News & Updates (5).jpeg",
    article5: "/images/news/News & Updates (6).jpeg",
    article6: "/images/news/article-6.jpg"
  },

  // Testimonials Section (Success Stories)
  // To upload testimonial images:
  // 1. Create folder: public/images/testimonials/
  // 2. Add square images (300x300px recommended) named: person-1.jpg, person-2.jpg, person-3.jpg
  // 3. Images will display as circular profile photos
  // 4. If no image exists, will show icon instead
  testimonials: {
    person1: "/images/success stories/Fatima.png",
    person2: "/images/success stories/Mariam.png",
    person3: "/images/success stories/Ahmad.png",
    person4: "/images/success stories/person-4.jpg",
    person5: "/images/success stories/person-5.jpg",
    person6: "/images/success stories/person-6.jpg",
    // Testimonial videos
    video1: "/images/testimonials/video-1.mp4",
    video2: "/images/testimonials/video-2.mp4",
    video3: "/images/testimonials/video-3.mp4"
  },

  // Impact Section
  impact: {
    background: "/images/impact/background.jpg",
    students: "/images/impact/students.jpg",
    orphans: "/images/impact/orphans.jpg",
    healthcare: "/images/impact/healthcare.jpg",
    emergency: "/images/impact/emergency.jpg",
    women: "/images/impact/women-empowerment.jpg",
    coding: "/images/impact/coding-students.jpg"
  },

  // Gallery Section
  gallery: {
    education: [
      "/images/gallery/education-1.jpg",
      "/images/gallery/education-2.jpg",
      "/images/gallery/education-3.jpg",
      "/images/gallery/education-4.jpg",
      "/images/gallery/education-5.jpg",
      "/images/gallery/education-6.jpg"
    ],
    healthcare: [
      "/images/gallery/healthcare-1.jpg",
      "/images/gallery/healthcare-2.jpg",
      "/images/gallery/healthcare-3.jpg",
      "/images/gallery/healthcare-4.jpg"
    ],
    orphanage: [
      "/images/gallery/orphanage-1.jpg",
      "/images/gallery/orphanage-2.jpg",
      "/images/gallery/orphanage-3.jpg",
      "/images/gallery/orphanage-4.jpg",
      "/images/gallery/orphanage-5.jpg"
    ],
    community: [
      "/images/gallery/community-1.jpg",
      "/images/gallery/community-2.jpg",
      "/images/gallery/community-3.jpg",
      "/images/gallery/community-4.jpg",
      "/images/gallery/community-5.jpg",
      "/images/gallery/community-6.jpg"
    ],
    events: [
      "/images/gallery/event-1.jpg",
      "/images/gallery/event-2.jpg",
      "/images/gallery/event-3.jpg",
      "/images/gallery/event-4.jpg"
    ]
  },

  // Partners & Donors Section
  partners: {
    logo1: "/images/partners/partner-1.png",
    logo2: "/images/partners/partner-2.png",
    logo3: "/images/partners/partner-3.png",
    logo4: "/images/partners/partner-4.png",
    logo5: "/images/partners/partner-5.png",
    logo6: "/images/partners/partner-6.png"
  },

  // Social Media & Blog
  social: {
    facebook: "/images/social/facebook-cover.jpg",
    twitter: "/images/social/twitter-cover.jpg",
    instagram: "/images/social/instagram-story.jpg",
    linkedin: "/images/social/linkedin-banner.jpg"
  },

  // Banners & Promotional
  banners: {
    donation: "/images/banners/donation-banner.jpg",
    volunteer: "/images/banners/volunteer-banner.jpg",
    campaign: "/images/banners/campaign-banner.jpg",
    event: "/images/banners/event-banner.jpg"
  },

  // Fallback images
  fallback: {
    placeholder: "/placeholder.png",
    placeholderSvg: "/placeholder.svg"
  }
}

// Helper function to get image with fallback
export const getImage = (imagePath: any, fallback: any = images.fallback.placeholder): any => {
  return imagePath || fallback
}
