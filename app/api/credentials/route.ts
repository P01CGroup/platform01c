// API Route for Credentials
// Phase 3.2: API Routes Development

import { NextRequest, NextResponse } from 'next/server';
import { credentialsService } from '@/lib/services/CredentialsService';
import { CreateCredentialInput, UpdateCredentialInput, CredentialsFilter } from '@/lib/types/cms';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/base';
import { clearCredentialsCache } from '@/lib/utils/cache';

// GET /api/credentials - Get all credentials with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters from query parameters
    const filters: CredentialsFilter = {};
    let limit: number | undefined = undefined;
    
    if (searchParams.has('service_tags')) {
      filters.service_tags = searchParams.get('service_tags')!.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    if (searchParams.has('industry_tags')) {
      filters.industry_tags = searchParams.get('industry_tags')!.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    
    if (searchParams.has('is_active')) {
      filters.is_active = searchParams.get('is_active') === 'true';
    }
    
    if (searchParams.has('search')) {
      filters.search = searchParams.get('search')!;
    }
    
    if (searchParams.has('limit')) {
      const parsed = parseInt(searchParams.get('limit')!);
      if (!isNaN(parsed) && parsed > 0) limit = parsed;
    }

    const result = await credentialsService.getCredentials(filters);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    // Apply limit if specified
    const data = limit ? result.data.slice(0, limit) : result.data;

    // Add cache control headers to prevent stale data
    const response = createSuccessResponse(data, 'Credentials retrieved successfully');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// POST /api/credentials - Create a new credential
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input: CreateCredentialInput = body;

    const result = await credentialsService.createCredential(input);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    // Clear all caches after creation
    clearCredentialsCache();

    const response = createSuccessResponse(result.data, 'Credential created successfully');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
  } catch (error) {
    console.error('Error creating credential:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// PUT /api/credentials - Update an existing credential
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    
    const body = await request.json();
    
    console.log('PUT /api/credentials - Request body:', body);
    console.log('PUT /api/credentials - Query params:', Object.fromEntries(searchParams.entries()));
    
    // Check if ID is in the body (form sends it there)
    if (!id && body.id) {
      id = body.id;
      console.log('PUT /api/credentials - Using ID from body:', id);
    }
    
    if (!id) {
      console.log('PUT /api/credentials - No ID found in query params or body');
      return createErrorResponse('Credential ID is required', 400);
    }

    // Remove id from body since it's not part of UpdateCredentialInput
    const { id: bodyId, ...input } = body;
    const updateInput: UpdateCredentialInput = input;

    console.log('PUT /api/credentials - Updating credential with ID:', id);
    console.log('PUT /api/credentials - Update input:', updateInput);

    const result = await credentialsService.updateCredential(id, updateInput);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    // Clear all caches after update
    clearCredentialsCache();

    const response = createSuccessResponse(result.data, 'Credential updated successfully');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
  } catch (error) {
    console.error('Error updating credential:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// DELETE /api/credentials - Delete a credential
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Credential ID is required', 400);
    }

    const result = await credentialsService.deleteCredential(id);
    
    if (result.error) {
      return createErrorResponse(result.error, 400);
    }

    // Clear all caches after deletion
    clearCredentialsCache();

    const response = createSuccessResponse(null, 'Credential deleted successfully');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
  } catch (error) {
    console.error('Error deleting credential:', error);
    return createErrorResponse('Internal server error', 500);
  }
} 