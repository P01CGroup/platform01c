'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = '',
  priority = false,
  quality = 80,
  format = 'webp',
  placeholder = 'empty',
  blurDataURL,
  fetchPriority = 'auto',
  onLoad,
  onError
}) => {
  // For local images, use Next.js Image with optimization
  if (src && src.startsWith('/') && !src.startsWith('http')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        fetchPriority={fetchPriority}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  // For external images, use Next.js Image directly (it will handle optimization)
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      fetchPriority={fetchPriority}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
