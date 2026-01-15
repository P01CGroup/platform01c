// Caching layer for Platform01 CMS
// Phase 3.3: Service Layer Implementation - Caching

// ========================================
// CACHE TYPES
// ========================================

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds (5 minutes)
  maxSize?: number; // Maximum number of items in cache
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  maxSize: number;
  hitRate: number;
}

// ========================================
// IN-MEMORY CACHE IMPLEMENTATION
// ========================================

export class InMemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private stats = { hits: 0, misses: 0 };
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 5 * 60 * 1000, // 5 minutes default
      maxSize: options.maxSize || 1000 // 1000 items default
    };
  }

  // Set a value in the cache
  set<T>(key: string, data: T, ttl?: number): void {
    // Clean expired items before adding new one
    this.cleanup();

    // Remove oldest items if cache is full
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.options.ttl
    };

    this.cache.set(key, item);
  }

  // Get a value from the cache
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.misses++;
      return null;
    }

    // Check if item has expired
    if (this.isExpired(item)) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return item.data;
  }

  // Check if a key exists and is not expired
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  // Delete a specific key
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    this.stats.hits = 0;
    this.stats.misses = 0;
  }

  // Get cache statistics
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? this.stats.hits / total : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: this.cache.size,
      maxSize: this.options.maxSize,
      hitRate
    };
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
      }
    }
  }

  // Evict oldest items when cache is full
  private evictOldest(): void {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    // Remove 10% of oldest items
    const toRemove = Math.ceil(this.options.maxSize * 0.1);
    for (let i = 0; i < toRemove && i < entries.length; i++) {
      this.cache.delete(entries[i][0]);
    }
  }

  // Check if an item has expired
  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }
}

// ========================================
// CACHE MANAGER
// ========================================

export class CacheManager {
  private caches = new Map<string, InMemoryCache>();

  // Get or create a cache instance
  getCache(name: string, options?: CacheOptions): InMemoryCache {
    if (!this.caches.has(name)) {
      this.caches.set(name, new InMemoryCache(options));
    }
    return this.caches.get(name)!;
  }

  // Clear a specific cache
  clearCache(name: string): boolean {
    const cache = this.caches.get(name);
    if (cache) {
      cache.clear();
      return true;
    }
    return false;
  }

  // Clear all caches
  clearAll(): void {
    for (const cache of this.caches.values()) {
      cache.clear();
    }
  }

  // Get statistics for all caches
  getAllStats(): Record<string, CacheStats> {
    const stats: Record<string, CacheStats> = {};
    for (const [name, cache] of this.caches.entries()) {
      stats[name] = cache.getStats();
    }
    return stats;
  }
}

// ========================================
// CACHE KEYS UTILITIES
// ========================================

export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  
  return `${prefix}:${sortedParams}`;
}

export function generateCredentialsCacheKey(filters: any): string {
  return generateCacheKey('credentials', filters);
}

export function generateInsightsCacheKey(filters: any, pagination: any): string {
  return generateCacheKey('insights', { ...filters, ...pagination });
}

export function generateCredentialCacheKey(id: string): string {
  return `credential:${id}`;
}

export function generateInsightCacheKey(id: string): string {
  return `insight:${id}`;
}

// ========================================
// GLOBAL CACHE INSTANCE
// ========================================

// Create a global cache manager instance
export const cacheManager = new CacheManager();

// Pre-configured caches for different data types (reduced TTL for faster updates)
export const credentialsCache = cacheManager.getCache('credentials', { ttl: 2 * 60 * 1000 }); // 2 minutes
export const insightsCache = cacheManager.getCache('insights', { ttl: 2 * 60 * 1000 }); // 2 minutes
export const individualCache = cacheManager.getCache('individual', { ttl: 3 * 60 * 1000 }); // 3 minutes



// ========================================
// CACHE DECORATORS
// ========================================

export function withCache<T extends any[], R>(
  cache: InMemoryCache,
  keyGenerator: (...args: T) => string,
  ttl?: number
) {
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function(...args: T): Promise<R> {
      const key = keyGenerator(...args);
      const cached = cache.get<R>(key);
      
      if (cached !== null) {
        return cached;
      }

      const result = await method.apply(this, args);
      cache.set(key, result, ttl);
      return result;
    };
  };
}

// ========================================
// CACHE INVALIDATION UTILITIES
// ========================================

// Force clear all insights-related caches
export function clearInsightsCache(): void {
  insightsCache.clear();
  individualCache.clear();
  console.log('Insights cache cleared');
}

// Force clear all credentials-related caches
export function clearCredentialsCache(): void {
  credentialsCache.clear();
  console.log('Credentials cache cleared');
}

// Force clear all caches
export function clearAllCaches(): void {
  cacheManager.clearAll();
  console.log('All caches cleared');
} 