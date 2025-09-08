# 🖼️ Complete Image Update Guide

## ✅ **HOME PAGE IMAGE GUIDE**

### **1. Hero Section**
- **Location**: `public/images/hero/`
- **Recommended Size**: 1920x1080px (16:9 ratio)
- **Files**:
  - `main-hero.jpg` - Main hero background
  - `background.jpg` - Secondary background (if applicable)

### **2. Home Intro Section**
- **Location**: `public/images/home/`
- **Video**: `public/video/` (for video content)
  - Recommended format: MP4
  - Max length: 30 seconds
  - Resolution: 1080p (1920x1080)

### **3. About Section**
- **Location**: `public/images/about/`
- **Recommended Sizes**:
  - Team photos: 500x500px (1:1 ratio)
  - Section images: 1200x800px (3:2 ratio)

### **4. Programs Section**
- **Location**: `public/images/programs/`
- **Recommended Size**: 800x600px (4:3 ratio)
- **Naming Convention**: `program-{number}.jpg` (e.g., program-1.jpg)

### **5. News Section**
- **Location**: `public/images/news/`
- **Recommended Size**: 1200x630px (Facebook/Twitter card ratio)
- **Naming**: Use descriptive names (e.g., `summer-campaign-2023.jpg`)

### **6. Testimonials**
- **Location**: `public/images/testimonials/`
- **Recommended Size**: 400x400px (1:1 ratio)
- **Naming**: `person-name.jpg`

## 🚀 **How to Update Images**

### **Step 1: Add Your Images**
1. Navigate to the appropriate folder in `public/images/`
2. Upload your images following the naming conventions
3. For videos, place them in `public/video/`

### **Step 2: Update Image Paths**
All image paths are managed in `src/config/images.ts`. Update the corresponding paths:

```typescript
export const images = {
  hero: {
    main: '/images/content/1.jpeg',
    background: '/images/hero/background.jpg',
  },
  about: {
    main: '/images/about/main.jpg',
    // Add other about section images
  },
  // ... other sections
};
```

## 📝 **Best Practices**
- Use WebP format for better performance
- Optimize images before uploading (recommended: TinyPNG)
- Keep file names lowercase with hyphens
- Maintain consistent aspect ratios as specified
- Maximum file size: 500KB for images, 5MB for videos

## 🛠 **Troubleshooting**
- If an image doesn't appear, check:
  1. File path in `images.ts`
  2. File extension (case-sensitive)
  3. File permissions
- For video issues:
  - Ensure MP4 format with H.264 codec
  - Check browser console for errors

## 📱 **Responsive Considerations**
- Images should look good on all devices
- Test on mobile, tablet, and desktop
- Consider using `srcset` for responsive images if needed

## 🔄 **Version Control**
- Always commit image changes to your repository
- Include descriptive commit messages (e.g., "Update hero section images")
- Consider using Git LFS for large media files

Need help? Contact your developer or refer to the full documentation in `UPLOAD_SYSTEM_GUIDE.md`.
