"use client"

export function VideoPlayer({ 
  src,
  className = "",
  poster = ""
}: {
  src: string
  className?: string
  poster?: string
}) {
  return (
    <div className={`relative aspect-video ${className}`}>
      <video
        controls
        playsInline
        preload="metadata"
        controlsList="nodownload"
        className="w-full h-full object-cover bg-black"
        poster={poster}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click download
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/quicktime" />
        <source src={src.replace('.mov', '.mp4')} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  )
}
