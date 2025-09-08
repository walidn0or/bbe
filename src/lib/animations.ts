"use client"

import { useEffect, useRef, useState } from 'react';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoomIn';

interface UseScrollAnimationProps {
  type?: AnimationType;
  threshold?: number;
  delay?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>({
  type = 'fadeIn',
  threshold = 0.1,
  delay = 0,
  triggerOnce = true,
}: UseScrollAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce && elementRef.current) {
              observer.unobserve(elementRef.current);
              hasAnimated.current = true;
            }
          }, delay);

          return () => clearTimeout(timer);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement && !hasAnimated.current) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, triggerOnce]);

  // Animation classes based on type
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (type) {
      case 'fadeIn':
        return 'animate-fade-in';
      case 'slideUp':
        return 'animate-up';
      case 'slideLeft':
        return 'animate-slide-left';
      case 'slideRight':
        return 'animate-slide-right';
      case 'zoomIn':
        return 'animate-zoom-in';
      default:
        return 'animate-fade-in';
    }
  };

  return {
    ref: elementRef,
    className: `transition-all duration-700 ease-out ${getAnimationClass()}`,
    'data-visible': isVisible,
  };
}

// Animation component for easy usage
interface AnimateOnScrollProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  type?: AnimationType;
  threshold?: number;
  delay?: number;
  triggerOnce?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AnimateOnScroll({
  as: Component = 'div',
  type = 'fadeIn',
  threshold = 0.1,
  delay = 0,
  triggerOnce = true,
  children,
  className = '',
  ...props
}: AnimateOnScrollProps) {
  const animationProps = useScrollAnimation<HTMLDivElement>({
    type,
    threshold,
    delay,
    triggerOnce,
  });

  return (
    <Component
      {...animationProps}
      className={`${animationProps.className} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

// Utility function to add animation classes to elements when they come into view
export function initializeScrollAnimations() {
  if (typeof window === 'undefined') return;

  const animateElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationType = element.getAttribute('data-animate') || 'fadeIn';
          const delay = parseInt(element.getAttribute('data-delay') || '0', 10);
          
          setTimeout(() => {
            element.classList.add('animate-in');
            element.setAttribute('data-animated', 'true');
            
            // If it should only trigger once, unobserve after animation
            if (element.getAttribute('data-trigger-once') !== 'false') {
              observer.unobserve(element);
            }
          }, delay);
        } else if (element.getAttribute('data-trigger-once') === 'false') {
          element.classList.remove('animate-in');
          element.setAttribute('data-animated', 'false');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animateElements.forEach((element) => {
    if (element.getAttribute('data-animated') !== 'true') {
      observer.observe(element);
    }
  });
}
