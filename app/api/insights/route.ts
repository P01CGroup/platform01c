// API Route for Insights
// Phase 3.2: API Routes Development

import { NextRequest, NextResponse } from 'next/server';
import { insightsService } from '@/lib/services/InsightsService';
import { CreateInsightInput, UpdateInsightInput, InsightsFilter, PaginationParams } from '@/lib/types/cms';
import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from '@/lib/api/base';
import { clearInsightsCache } from '@/lib/utils/cache';

// GET /api/insights - Get all insights with optional filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    console.log('API: GET /api/insights - Request URL:', request.url);
    console.log('API: Search params:', Object.fromEntries(searchParams.entries()));
    
    // Handle cache busting
    if (searchParams.has('cache_bust')) {
      clearInsightsCache();
    }
    
    // Handle ID lookup
    if (searchParams.has('id')) {
      const id = searchParams.get('id')!;
      console.log('API: Looking up insight by ID:', id);
      const result = await insightsService.getInsightById(id);
      console.log('API: getInsightById result:', result);
      if (result.error) {
        console.log('API: Insight not found, returning 404');
        return createErrorResponse(result.error, 404);
      }
      const response = createSuccessResponse(result.data);
      // Add cache-busting headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }

    // Handle slug lookup
    if (searchParams.has('slug')) {
      const slug = searchParams.get('slug')!;
      const result = await insightsService.getInsightBySlug(slug);
      if (result.error) {
        return createErrorResponse(result.error, 404);
      }
      const response = createSuccessResponse(result.data);
      // Add cache-busting headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }

    // Parse filters from query parameters
    const filters: InsightsFilter = {};
    
    if (searchParams.has('author')) {
      filters.author = searchParams.get('author')!;
    }
    
    if (searchParams.has('is_published')) {
      const val = searchParams.get('is_published');
      filters.is_published = val === 'true' ? true : val === 'false' ? false : undefined;
    }
    
    if (searchParams.has('tags')) {
      filters.tags = searchParams.getAll('tags');
    }
    
    if (searchParams.has('search')) {
      filters.search = searchParams.get('search')!;
    }
    
    if (searchParams.has('published_date_from')) {
      filters.published_date_from = searchParams.get('published_date_from')!;
    }
    
    if (searchParams.has('published_date_to')) {
      filters.published_date_to = searchParams.get('published_date_to')!;
    }

    // Parse pagination parameters
    const pagination: PaginationParams = {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10'),
      sortBy: searchParams.get('sortBy') || 'published_date',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
    };

    console.log('API: Calling insightsService.getInsights with:', { filters, pagination });

    const result = await insightsService.getInsights(filters, pagination);
    
    console.log('API: insightsService.getInsights result:', {
      dataCount: result.data?.length || 0,
      pagination: result.pagination,
      error: result.error
    });
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    const response = createPaginatedResponse(
      result.data,
      result.pagination.page,
      result.pagination.pageSize,
      result.pagination.total
    );
    
    // Add cache-busting headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    console.log('API: Returning response with:', {
      dataCount: result.data?.length || 0,
      total: result.pagination.total,
      page: result.pagination.page,
      pageSize: result.pagination.pageSize
    });
    
    return response;
  } catch (error) {
    console.error('API: Error fetching insights:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// POST /api/insights - Create a new insight (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin access
    // const user = await getCurrentUser();
    // if (!user || !isAdmin(user)) {
    //   return createErrorResponse('Unauthorized: Admin access required', 401);
    // }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.author) {
      return createErrorResponse('Title, excerpt, and author are required', 400);
    }

    const insightData: CreateInsightInput = {
      title: body.title,
      excerpt: body.excerpt,
      author: body.author,
      content: body.content,
      image_url: body.image_url,
      co_author: body.co_author,
      published_date: body.published_date,
      is_published: body.is_published ?? false,
      slug: body.slug,
      meta_description: body.meta_description,
      tags: body.tags
    };

    const result = await insightsService.createInsight(insightData);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    return createSuccessResponse(result.data, 'Insight created successfully');
  } catch (error) {
    console.error('Error creating insight:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// PUT /api/insights - Update an insight (admin only)
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin access
    // const user = await getCurrentUser();
    // if (!user || !isAdmin(user)) {
    //   return createErrorResponse('Unauthorized: Admin access required', 401);
    // }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    
    const body = await request.json();
    
    console.log('PUT /api/insights - Request body:', body);
    console.log('PUT /api/insights - Query params:', Object.fromEntries(searchParams.entries()));
    console.log('PUT /api/insights - ID from query params:', id);
    
    // Check if ID is in the body (form sends it there)
    if (!id && body.id) {
      id = body.id;
      console.log('PUT /api/insights - Using ID from body:', id);
    }
    
    if (!id) {
      console.log('PUT /api/insights - No ID found in query params or body');
      return createErrorResponse('Insight ID is required', 400);
    }

    // Remove id from body since it's not part of UpdateInsightInput
    const { id: bodyId, ...input } = body;
    const updateData: UpdateInsightInput = input;

    console.log('PUT /api/insights - Updating insight with ID:', id);
    console.log('PUT /api/insights - Update input:', updateData);

    const result = await insightsService.updateInsight(id, updateData);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    return createSuccessResponse(result.data, 'Insight updated successfully');
  } catch (error) {
    console.error('Error updating insight:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// DELETE /api/insights - Delete an insight (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin access
    // const user = await getCurrentUser();
    // if (!user || !isAdmin(user)) {
    //   return createErrorResponse('Unauthorized: Admin access required', 401);
    // }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Insight ID is required', 400);
    }

    const result = await insightsService.deleteInsight(id);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    return createSuccessResponse({ success: true }, 'Insight deleted successfully');
  } catch (error) {
    console.error('Error deleting insight:', error);
    return createErrorResponse('Internal server error', 500);
  }
} 