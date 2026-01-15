// Validation utilities for Platform01 CMS
// Phase 3.3: Service Layer Implementation - Validation

import { CreateCredentialInput, UpdateCredentialInput, CreateInsightInput, UpdateInsightInput } from '../types/cms';

// ========================================
// VALIDATION TYPES
// ========================================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ========================================
// CREDENTIALS VALIDATION
// ========================================

export function validateCredentialInput(data: CreateCredentialInput | UpdateCredentialInput): ValidationResult {
  const errors: ValidationError[] = [];

  // Title validation
  if ('title' in data && data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string') {
      errors.push({ field: 'title', message: 'Title is required and must be a string' });
    } else if (data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title cannot be empty' });
    } else if (data.title.length > 500) {
      errors.push({ field: 'title', message: 'Title must be less than 500 characters' });
    }
  }

  // service_tags validation
  if ('service_tags' in data && data.service_tags !== undefined) {
    if (!Array.isArray(data.service_tags) || data.service_tags.length === 0) {
      errors.push({ field: 'service_tags', message: 'At least one service tag is required' });
    } else if (!data.service_tags.every((tag: string) => typeof tag === 'string' && tag.length > 0 && tag.length <= 50)) {
      errors.push({ field: 'service_tags', message: 'Each service tag must be a non-empty string less than 50 characters' });
    }
  }

  // industry_tags validation
  if ('industry_tags' in data && data.industry_tags !== undefined) {
    if (!Array.isArray(data.industry_tags) || data.industry_tags.length === 0) {
      errors.push({ field: 'industry_tags', message: 'At least one industry tag is required' });
    } else if (!data.industry_tags.every((tag: string) => typeof tag === 'string' && tag.length > 0 && tag.length <= 50)) {
      errors.push({ field: 'industry_tags', message: 'Each industry tag must be a non-empty string less than 50 characters' });
    }
  }

  // Sort order validation
  if ('sort_order' in data && data.sort_order !== undefined) {
    if (typeof data.sort_order !== 'number' || data.sort_order < 0) {
      errors.push({ field: 'sort_order', message: 'Sort order must be a non-negative number' });
    }
  }

  // Is active validation
  if ('is_active' in data && data.is_active !== undefined) {
    if (typeof data.is_active !== 'boolean') {
      errors.push({ field: 'is_active', message: 'Is active must be a boolean' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ========================================
// INSIGHTS VALIDATION
// ========================================

export function validateInsightInput(data: CreateInsightInput | UpdateInsightInput): ValidationResult {
  const errors: ValidationError[] = [];

  // Title validation
  if ('title' in data && data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string') {
      errors.push({ field: 'title', message: 'Title is required and must be a string' });
    } else if (data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title cannot be empty' });
    } else if (data.title.length > 200) {
      errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
    }
  }

  // Excerpt validation
  if ('excerpt' in data && data.excerpt !== undefined) {
    if (!data.excerpt || typeof data.excerpt !== 'string') {
      errors.push({ field: 'excerpt', message: 'Excerpt is required and must be a string' });
    } else if (data.excerpt.trim().length === 0) {
      errors.push({ field: 'excerpt', message: 'Excerpt cannot be empty' });
    } else if (data.excerpt.length > 1000) {
      errors.push({ field: 'excerpt', message: 'Excerpt must be less than 1000 characters' });
    }
  }

  // Author validation
  if ('author' in data && data.author !== undefined) {
    if (!data.author || typeof data.author !== 'string') {
      errors.push({ field: 'author', message: 'Author is required and must be a string' });
    } else if (data.author.trim().length === 0) {
      errors.push({ field: 'author', message: 'Author cannot be empty' });
    } else if (data.author.length > 100) {
      errors.push({ field: 'author', message: 'Author must be less than 100 characters' });
    }
  }

  // Co-author validation
  if ('co_author' in data && data.co_author !== undefined) {
    if (data.co_author !== null && (typeof data.co_author !== 'string' || data.co_author.length > 100)) {
      errors.push({ field: 'co_author', message: 'Co-author must be a string less than 100 characters or null' });
    }
  }

  // Image URL validation
  if ('image_url' in data && data.image_url !== undefined) {
    if (data.image_url !== null && (typeof data.image_url !== 'string' || !isValidUrl(data.image_url))) {
      errors.push({ field: 'image_url', message: 'Image URL must be a valid URL or null' });
    }
  }

  // Published date validation
  if ('published_date' in data && data.published_date !== undefined) {
    if (data.published_date !== null && !isValidDate(data.published_date)) {
      errors.push({ field: 'published_date', message: 'Published date must be a valid date in YYYY-MM-DD format or null' });
    }
  }

  // Slug validation
  if ('slug' in data && data.slug !== undefined) {
    if (data.slug && (typeof data.slug !== 'string' || !isValidSlug(data.slug))) {
      errors.push({ field: 'slug', message: 'Slug must be a valid URL-friendly string' });
    }
  }

  // Meta description validation
  if ('meta_description' in data && data.meta_description !== undefined) {
    if (data.meta_description !== null && (typeof data.meta_description !== 'string' || data.meta_description.length > 300)) {
      errors.push({ field: 'meta_description', message: 'Meta description must be a string less than 300 characters or null' });
    }
  }

  // Tags validation
  if ('tags' in data && data.tags !== undefined) {
    if (data.tags !== null && (!Array.isArray(data.tags) || !data.tags.every((tag: string) => typeof tag === 'string' && tag.length > 0 && tag.length <= 50))) {
      errors.push({ field: 'tags', message: 'Tags must be an array of non-empty strings, each less than 50 characters' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ========================================
// UTILITY VALIDATION FUNCTIONS
// ========================================

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime()) && !!dateString.match(/^\d{4}-\d{2}-\d{2}$/);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeArray(arr: string[]): string[] {
  return arr.map((item: string) => sanitizeString(item)).filter(item => item.length > 0);
}

// ========================================
// FILTER VALIDATION
// ========================================

export function validateCredentialsFilter(filters: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (filters.service_tags && (!Array.isArray(filters.service_tags) || !filters.service_tags.every((tag: string) => typeof tag === 'string'))) {
    errors.push({ field: 'service_tags', message: 'Filter service_tags must be an array of strings' });
  }
  if (filters.industry_tags && (!Array.isArray(filters.industry_tags) || !filters.industry_tags.every((tag: string) => typeof tag === 'string'))) {
    errors.push({ field: 'industry_tags', message: 'Filter industry_tags must be an array of strings' });
  }
  if (filters.search && typeof filters.search !== 'string') {
    errors.push({ field: 'search', message: 'Filter search must be a string' });
  }
  if (filters.is_active !== undefined && typeof filters.is_active !== 'boolean') {
    errors.push({ field: 'is_active', message: 'Filter is_active must be a boolean' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateInsightsFilter(filters: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (filters.author && typeof filters.author !== 'string') {
    errors.push({ field: 'author', message: 'Filter author must be a string' });
  }

  if (filters.is_published !== undefined && typeof filters.is_published !== 'boolean') {
    errors.push({ field: 'is_published', message: 'Filter is_published must be a boolean' });
  }

  if (filters.tags && (!Array.isArray(filters.tags) || !filters.tags.every((tag: string) => typeof tag === 'string'))) {
    errors.push({ field: 'tags', message: 'Filter tags must be an array of strings' });
  }

  if (filters.search && typeof filters.search !== 'string') {
    errors.push({ field: 'search', message: 'Filter search must be a string' });
  }

  if (filters.published_date_from && !isValidDate(filters.published_date_from)) {
    errors.push({ field: 'published_date_from', message: 'Filter published_date_from must be a valid date' });
  }

  if (filters.published_date_to && !isValidDate(filters.published_date_to)) {
    errors.push({ field: 'published_date_to', message: 'Filter published_date_to must be a valid date' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
} 