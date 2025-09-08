"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type AnimationType = 
  | "fadeIn" 
  | "fadeUp" 
  | "fadeDown" 
  | "fadeLeft" 
  | "fadeRight" 
  | "zoomIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"

interface AnimateProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  type?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Animate({
  children,
  type = "fadeIn",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  className = "",
  as: Component = "div",
  ...props
}: AnimateProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 }
    },
    fadeRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    slideUp: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    slideDown: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    slideLeft: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    slideRight: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    }
  }

  useEffect(() => {
    if (!ref.current || (once && hasAnimated.current)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            hasAnimated.current = true
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold: amount,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(ref.current as Element)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [amount, once])

  const MotionComponent = motion[Component as keyof typeof motion] || motion.div

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[type]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        ...props.transition
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

// Pre-configured animation components
export const FadeIn = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="fadeIn" {...props} />
)

export const FadeUp = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="fadeUp" {...props} />
)

export const FadeDown = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="fadeDown" {...props} />
)

export const FadeLeft = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="fadeLeft" {...props} />
)

export const FadeRight = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="fadeRight" {...props} />
)

export const ZoomIn = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="zoomIn" {...props} />
)

export const SlideUp = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="slideUp" {...props} />
)

export const SlideDown = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="slideDown" {...props} />
)

export const SlideLeft = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="slideLeft" {...props} />
)

export const SlideRight = (props: Omit<AnimateProps, 'type'>) => (
  <Animate type="slideRight" {...props} />
)
