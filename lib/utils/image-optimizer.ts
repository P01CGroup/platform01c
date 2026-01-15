/**
 * Client-Side Image Optimization Utilities
 * Provides image optimization without relying on Vercel's image optimization service
 */

import sharp from 'sharp';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export class ImageOptimizer {
  /**
   * Optimize an image buffer with Sharp
   */
  static async optimizeBuffer(
    buffer: Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<Buffer> {
    const {
      width,
      height,
      quality = 80,
      format = 'webp',
      fit = 'cover'
    } = options;

    let pipeline = sharp(buffer);

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit });
    }

    // Convert to specified format with quality
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality });
        break;
      case 'png':
        pipeline = pipeline.png({ quality });
        break;
    }

    return await pipeline.toBuffer();
  }

  /**
   * Generate multiple sizes for responsive images
   */
  static async generateResponsiveSizes(
    buffer: Buffer,
    sizes: number[] = [640, 750, 828, 1080, 1200, 1920],
    format: 'webp' | 'avif' = 'webp'
  ): Promise<{ [key: string]: Buffer }> {
    const results: { [key: string]: Buffer } = {};

    for (const size of sizes) {
      const optimized = await this.optimizeBuffer(buffer, {
        width: size,
        quality: 80,
        format
      });
      results[size.toString()] = optimized;
    }

    return results;
  }

  /**
   * Create a blur placeholder for lazy loading
   */
  static async createBlurPlaceholder(buffer: Buffer): Promise<string> {
    const placeholder = await sharp(buffer)
      .resize(20, 20, { fit: 'cover' })
      .blur(2)
      .webp({ quality: 20 })
      .toBuffer();

    return `data:image/webp;base64,${placeholder.toString('base64')}`;
  }

  /**
   * Get optimal format based on browser support
   */
  static getOptimalFormat(userAgent?: string): 'webp' | 'avif' | 'jpeg' {
    if (!userAgent) return 'webp';
    
    // Check for AVIF support
    if (userAgent.includes('Chrome/85') || userAgent.includes('Firefox/93')) {
      return 'avif';
    }
    
    // Check for WebP support
    if (userAgent.includes('Chrome') || userAgent.includes('Firefox') || userAgent.includes('Safari')) {
      return 'webp';
    }
    
    return 'jpeg';
  }
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: number[],
  format: string = 'webp'
): string {
  return sizes
    .map(size => `${baseUrl}?w=${size}&f=${format} ${size}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: { [key: string]: string }): string {
  return Object.entries(breakpoints)
    .map(([query, size]) => `(${query}) ${size}`)
    .join(', ');
}
