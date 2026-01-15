// Credentials Service with comprehensive validation, caching, and logging
// Phase 3.3: Service Layer Implementation - Enhanced

import { supabaseAdmin } from '../supabase/admin';
import {
  Credential,
  CredentialsFilter,
  CreateCredentialInput,
  UpdateCredentialInput,
  ApiResponse
} from '../types/cms';
import { validateCredentialInput, validateCredentialsFilter } from '../utils/validation';
import { credentialsCache, generateCredentialsCacheKey, generateCredentialCacheKey } from '../utils/cache';
import { credentialsLogger, logPerformance } from '../utils/logger';

export class CredentialsService {
  private tableName = 'credentials';

  /**
   * Get all credentials with optional filtering
   */
  async getCredentials(filters: CredentialsFilter = {}): Promise<ApiResponse<Credential[]>> {
    try {
      // Validate filters
      const filterValidation = validateCredentialsFilter(filters);
      if (!filterValidation.isValid) {
        credentialsLogger.logError('getCredentials', new Error('Invalid filters'), { filters, errors: filterValidation.errors });
        return {
          data: [],
          error: 'Invalid filter parameters'
        };
      }

      // Check cache first
      const cacheKey = generateCredentialsCacheKey(filters);
      const cached = credentialsCache.get<Credential[]>(cacheKey);
      if (cached) {
        credentialsLogger.debug('Credentials retrieved from cache', { filters, count: cached.length });
        return { data: cached, error: null };
      }

      // Build query
      let query = supabaseAdmin
        .from(this.tableName)
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.service_tags && filters.service_tags.length > 0) {
        query = query.overlaps('service_tags', filters.service_tags);
      }
      if (filters.industry_tags && filters.industry_tags.length > 0) {
        query = query.overlaps('industry_tags', filters.industry_tags);
      }
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%`);
      }

      // Execute query with performance logging
      const result = await logPerformance('getCredentials', async () => {
        const startTime = Date.now();
        const { data, error } = await query;
        const duration = Date.now() - startTime;
        credentialsLogger.debug('Database query executed', {
          filters,
          duration: `${duration}ms`,
          resultCount: data?.length || 0
        });
        return { data, error };
      });

      if (result.error) {
        credentialsLogger.logError('getCredentials', result.error, { filters, fullError: result.error });
        return {
          data: [],
          error: result.error.message || JSON.stringify(result.error) || 'Failed to fetch credentials'
        };
      }

      // Cache the result
      credentialsCache.set(cacheKey, result.data || [], 5 * 60 * 1000); // 5 minutes

      credentialsLogger.info('Credentials retrieved successfully', { 
        filters, 
        count: result.data?.length || 0 
      });

      return {
        data: result.data || [],
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      credentialsLogger.logError('getCredentials', err, { filters });
      return {
        data: [],
        error: 'Failed to fetch credentials'
      };
    }
  }

  /**
   * Get a single credential by ID
   */
  async getCredentialById(id: string): Promise<ApiResponse<Credential>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Credential ID is required'
        };
      }

      // Check cache first
      const cacheKey = generateCredentialCacheKey(id);
      const cached = credentialsCache.get<Credential>(cacheKey);
      if (cached) {
        credentialsLogger.debug('Credential retrieved from cache', { id });
        return { data: cached, error: null };
      }

      // Execute query with performance logging
      const result = await logPerformance('getCredentialById', async () => {
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .select('*')
          .eq('id', id)
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          credentialsLogger.warn('Credential not found', { id });
          return {
            data: null as any,
            error: 'Credential not found'
          };
        }
        
        credentialsLogger.logError('getCredentialById', result.error, { id });
        return {
          data: null as any,
          error: 'Failed to fetch credential'
        };
      }

      // Cache the result
      credentialsCache.set(cacheKey, result.data, 15 * 60 * 1000); // 15 minutes

      credentialsLogger.info('Credential retrieved successfully', { id });

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      credentialsLogger.logError('getCredentialById', err, { id });
      return {
        data: null as any,
        error: 'Failed to fetch credential'
      };
    }
  }

  /**
   * Create a new credential
   */
  async createCredential(input: CreateCredentialInput, userId?: string): Promise<ApiResponse<Credential>> {
    try {
      // Validate input
      const validation = validateCredentialInput(input);
      if (!validation.isValid) {
        credentialsLogger.logError('createCredential', new Error('Validation failed'), { 
          input, 
          errors: validation.errors 
        });
        return {
          data: null as any,
          error: 'Invalid input data'
        };
      }

      // Input already matches database schema
      const dbInput = {
        title: input.title,
        service_tags: input.service_tags,
        industry_tags: input.industry_tags,
        is_active: input.is_active ?? true,
        sort_order: input.sort_order ?? 0
      };

      // Execute insert with performance logging
      const result = await logPerformance('createCredential', async () => {
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .insert([dbInput])
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        credentialsLogger.logError('createCredential', result.error, { input, userId });
        return {
          data: null as any,
          error: 'Failed to create credential'
        };
      }

      // Clear related caches
      credentialsCache.clear();

      // Log the creation
      credentialsLogger.logCreate(result.data, userId);

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      credentialsLogger.logError('createCredential', err, { input, userId });
      return {
        data: null as any,
        error: 'Failed to create credential'
      };
    }
  }

  /**
   * Update an existing credential
   */
  async updateCredential(id: string, input: UpdateCredentialInput, userId?: string): Promise<ApiResponse<Credential>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Credential ID is required'
        };
      }

      // Validate input
      const validation = validateCredentialInput(input);
      if (!validation.isValid) {
        credentialsLogger.logError('updateCredential', new Error('Validation failed'), { 
          id, 
          input, 
          errors: validation.errors 
        });
        return {
          data: null as any,
          error: 'Invalid input data'
        };
      }

      // Input already matches database schema
      const dbInput: any = {};
      if (input.title !== undefined) dbInput.title = input.title;
      if (input.service_tags !== undefined) dbInput.service_tags = input.service_tags;
      if (input.industry_tags !== undefined) dbInput.industry_tags = input.industry_tags;
      if (input.is_active !== undefined) dbInput.is_active = input.is_active;
      if (input.sort_order !== undefined) dbInput.sort_order = input.sort_order;

      // Execute update with performance logging
      const result = await logPerformance('updateCredential', async () => {
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .update(dbInput)
          .eq('id', id)
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          credentialsLogger.warn('Credential not found for update', { id });
          return {
            data: null as any,
            error: 'Credential not found'
          };
        }
        
        credentialsLogger.logError('updateCredential', result.error, { id, input, userId });
        return {
          data: null as any,
          error: 'Failed to update credential'
        };
      }

      // Clear all related caches aggressively
      credentialsCache.clear();
      credentialsCache.delete(generateCredentialCacheKey(id));
      
      // Also clear any cached data in the service layer
      try {
        // Force a fresh fetch by clearing any in-memory data
        await this.getCredentials({}); // This will refresh the cache
      } catch (error) {
        console.error('Error refreshing cache after update:', error);
      }

      // Log the update
      credentialsLogger.logUpdate(id, input, userId);

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      credentialsLogger.logError('updateCredential', err, { id, input, userId });
      return {
        data: null as any,
        error: 'Failed to update credential'
      };
    }
  }

  /**
   * Delete a credential
   */
  async deleteCredential(id: string, userId?: string): Promise<ApiResponse<void>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Credential ID is required'
        };
      }

      // Execute delete with performance logging
      const result = await logPerformance('deleteCredential', async () => {
        const { error } = await supabaseAdmin
          .from(this.tableName)
          .delete()
          .eq('id', id);

        return { error };
      });

      if (result.error) {
        credentialsLogger.logError('deleteCredential', result.error, { id, userId });
        return {
          data: null as any,
          error: 'Failed to delete credential'
        };
      }

      // Clear related caches
      credentialsCache.clear();
      credentialsCache.delete(generateCredentialCacheKey(id));

      // Log the deletion
      credentialsLogger.logDelete(id, userId);

      return {
        data: undefined as any,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      credentialsLogger.logError('deleteCredential', err, { id, userId });
      return {
        data: null as any,
        error: 'Failed to delete credential'
      };
    }
  }

  /**
   * Get active credentials
   */
  async getActiveCredentials(): Promise<ApiResponse<Credential[]>> {
    return this.getCredentials({ is_active: true });
  }

  /**
   * Search credentials
   */
  async searchCredentials(searchTerm: string): Promise<ApiResponse<Credential[]>> {
    return this.getCredentials({ search: searchTerm });
  }

  // ========================================
  // UTILITY METHODS
  // ========================================
  
  async reorderCredentials(ids: string[]): Promise<Credential[]> {
    try {
      const updates = ids.map((id, index) => ({
        id,
        sort_order: index + 1
      }));
      
      const { data, error } = await supabaseAdmin
        .from('credentials')
        .upsert(updates)
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    } catch (error) {
      console.error('Error reordering credentials:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const credentialsService = new CredentialsService(); 