// API Route for clearing caches
import { NextRequest, NextResponse } from 'next/server';
import { clearAllCaches, clearCredentialsCache } from '@/lib/utils/cache';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/base';

// POST /api/cache/clear - Clear all caches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === 'credentials') {
      clearCredentialsCache();
    } else {
      clearAllCaches();
    }

    const response = createSuccessResponse(
      { cleared: type || 'all' }, 
      `Cache cleared successfully`
    );
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return createErrorResponse('Internal server error', 500);
  }
} 