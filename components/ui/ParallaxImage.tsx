"use client";
import React, { useRef, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

interface ResponsiveImages {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  ultrawide?: string;
}

interface ParallaxImageProps {
  intensity?: number; // How strong the parallax effect is
  className?: string;
  src?: string; // Single image (backward compatibility)
  responsiveImages?: ResponsiveImages; // New responsive images option
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

const STATIC_BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9p6k9wAAAABJRU5ErkJggg==";

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  intensity = 0.3,
  className = "",
  src,
  responsiveImages,
  alt,
  fill = true,
  priority = false,
  sizes
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        containerRef.current.style.transform = `translateY(${scrollY * intensity}px)`;
      }
      rafRef.current = 0;
    };
    const handleScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial position
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  // If using responsive images, render multiple images with CSS media queries
  if (responsiveImages) {
    return (
      <div
        ref={containerRef}
        className={`will-change-transform ${className}`}
      >
        {/* Mobile image */}
        {responsiveImages.mobile && (
          <OptimizedImage 
            src={responsiveImages.mobile}
            alt={alt}
            fill={fill}
            sizes="(max-width: 768px) 100vw, 0px"
            className="object-cover object-center md:hidden" 
            priority={true}
            quality={80}
            format="webp"
            placeholder="blur"
            blurDataURL={STATIC_BLUR}
            fetchPriority="high"
          />
        )}
        
        {/* Tablet image */}
        {responsiveImages.tablet && (
          <OptimizedImage 
            src={responsiveImages.tablet}
            alt={alt}
            fill={fill}
            sizes="(min-width: 768px) and (max-width: 1024px) 100vw, 0px"
            className="object-cover object-center hidden md:block lg:hidden" 
            priority={false}
            quality={80}
            format="webp"
            placeholder="blur"
            blurDataURL={STATIC_BLUR}
          />
        )}
        
        {/* Desktop image */}
        {responsiveImages.desktop && (
          <OptimizedImage 
            src={responsiveImages.desktop}
            alt={alt}
            fill={fill}
            sizes="(min-width: 1024px) and (max-width: 1280px) 100vw, 0px"
            className="object-cover object-center hidden lg:block xl:hidden" 
            priority={false}
            quality={80}
            format="webp"
            placeholder="blur"
            blurDataURL={STATIC_BLUR}
          />
        )}
        
        {/* Ultrawide image */}
        {responsiveImages.ultrawide && (
          <OptimizedImage 
            src={responsiveImages.ultrawide}
            alt={alt}
            fill={fill}
            sizes="(min-width: 1280px) 100vw, 0px"
            className="object-cover object-center hidden xl:block" 
            priority={false}
            quality={80}
            format="webp"
            placeholder="blur"
            blurDataURL={STATIC_BLUR}
          />
        )}
        
        {/* Fallback if no specific images provided */}
        {!responsiveImages.mobile && !responsiveImages.tablet && !responsiveImages.desktop && !responsiveImages.ultrawide && (
          <OptimizedImage 
            src={src || ""}
            alt={alt}
            fill={fill}
            sizes={sizes}
            className="object-cover object-center" 
            priority={priority}
            quality={80}
            format="webp"
            placeholder="blur"
            blurDataURL={STATIC_BLUR}
          />
        )}
      </div>
    );
  }

  // Fallback to single image (backward compatibility)
  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
    >
      <OptimizedImage 
        src={src || ""}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className="object-cover object-center" 
        priority={priority}
        quality={80}
        format="webp"
        placeholder="blur"
        blurDataURL={STATIC_BLUR}
      />
    </div>
  );
};

export default ParallaxImage; 