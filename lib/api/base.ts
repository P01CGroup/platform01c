// Base API utilities for Platform01 CMS
// Phase 2.3: API Layer Architecture

import { NextRequest, NextResponse } from 'next/server';
import { ApiError, ApiResponse } from '../types/cms';

// ========================================
// RESPONSE FORMATTING UTILITIES
// ========================================

export function createSuccessResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    data,
    error: null,
    message
  });
}

export function createErrorResponse(error: string, status: number = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json({
    data: null,
    error,
    message: error
  }, { status });
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): NextResponse<ApiResponse<{
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}>> {
  const totalPages = Math.ceil(total / pageSize);
  
  return NextResponse.json({
    data: {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    },
    error: null
  });
}

// ========================================
// ERROR HANDLING MIDDLEWARE
// ========================================

export function handleApiError(error: unknown): NextResponse<ApiResponse<null>> {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return createErrorResponse(error.message, 500);
  }
  
  if (typeof error === 'string') {
    return createErrorResponse(error, 500);
  }
  
  return createErrorResponse('An unexpected error occurred', 500);
}

export function validateRequest<T>(
  request: NextRequest,
  validator: (body: any) => T
): T | NextResponse<ApiResponse<null>> {
  try {
    const body = request.json();
    return validator(body);
  } catch (error) {
    return createErrorResponse('Invalid request body', 400);
  }
}

// ========================================
// AUTHENTICATION UTILITIES
// ========================================

export async function requireAuth(request: NextRequest): Promise<boolean> {
  // This will be implemented with Supabase Auth in Phase 5
  // For now, return true to allow development
  return true;
}

export async function requireAdmin(request: NextRequest): Promise<boolean> {
  // This will be implemented with role-based auth in Phase 5
  // For now, return true to allow development
  return true;
}

// ========================================
// QUERY PARAMETER UTILITIES
// ========================================

export function parsePaginationParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  return {
    page: parseInt(searchParams.get('page') || '1'),
    pageSize: parseInt(searchParams.get('pageSize') || '10'),
    sortBy: searchParams.get('sortBy') || 'created_at',
    sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
  };
}

export function parseFilters(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters: Record<string, any> = {};
  
  // Parse common filter parameters
  for (const [key, value] of searchParams.entries()) {
    if (key !== 'page' && key !== 'pageSize' && key !== 'sortBy' && key !== 'sortOrder') {
      filters[key] = value;
    }
  }
  
  return filters;
}

// ========================================
// VALIDATION UTILITIES
// ========================================

export function validatePaginationParams(params: any) {
  const { page, pageSize } = params;
  
  if (page < 1) {
    throw new Error('Page must be greater than 0');
  }
  
  if (pageSize < 1 || pageSize > 100) {
    throw new Error('Page size must be between 1 and 100');
  }
  
  return params;
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateRequiredFields(data: any, requiredFields: string[]): void {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      throw new Error(`${field} is required`);
    }
  }
} 