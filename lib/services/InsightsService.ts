// Insights Service with comprehensive validation, caching, and logging
// Phase 3.3: Service Layer Implementation - Enhanced

import { supabase } from '../supabase/client';
import { supabaseAdmin } from '../supabase/admin';
import {
  Insight,
  InsightsFilter,
  CreateInsightInput,
  UpdateInsightInput,
  PaginationParams,
  PaginatedResponse,
  ApiResponse
} from '../types/cms';
import { validateInsightInput, validateInsightsFilter } from '../utils/validation';
import { insightsCache, generateInsightsCacheKey, generateInsightCacheKey } from '../utils/cache';
import { insightsLogger, logPerformance } from '../utils/logger';

export class InsightsService {
  private tableName = 'insights';
  private defaultPageSize = 10;
  
  // ========================================
  // READ OPERATIONS
  // ========================================
  
  async getInsights(filters: InsightsFilter = {}, pagination: PaginationParams = {}): Promise<PaginatedResponse<Insight>> {
    try {
      // Validate filters
      const filterValidation = validateInsightsFilter(filters);
      if (!filterValidation.isValid) {
        insightsLogger.logError('getInsights', new Error('Invalid filters'), { filters, errors: filterValidation.errors });
        return {
          data: [],
          pagination: { page: 1, pageSize: this.defaultPageSize, total: 0, totalPages: 0 },
          error: 'Invalid filter parameters'
        };
      }

      // Set default pagination
      const page = pagination.page || 1;
      const pageSize = pagination.pageSize || this.defaultPageSize;

      // Check cache first
      const cacheKey = generateInsightsCacheKey(filters, { page, pageSize });
      const cached = insightsCache.get<PaginatedResponse<Insight>>(cacheKey);
      if (cached) {
        insightsLogger.debug('Insights retrieved from cache', { filters, pagination, count: cached.data.length });
        return cached;
      }

      // Debug log for filters and pagination
      console.log('DEBUG: filters', filters, 'pagination', { page, pageSize });

      // First, get the total count without pagination
      let countQuery = supabaseAdmin
        .from(this.tableName)
        .select('*', { count: 'exact', head: true });

      // Apply filters to count query
      if (filters.author) {
        countQuery = countQuery.eq('author', filters.author);
        console.log('DEBUG: Applied author filter:', filters.author);
      }

      if (filters.is_published !== undefined) {
        countQuery = countQuery.eq('is_published', filters.is_published);
        console.log('DEBUG: Applied is_published filter:', filters.is_published);
      }

      if (filters.tags && filters.tags.length > 0) {
        countQuery = countQuery.overlaps('tags', filters.tags);
        console.log('DEBUG: Applied tags filter:', filters.tags);
      }

      if (filters.search) {
        countQuery = countQuery.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        console.log('DEBUG: Applied search filter:', filters.search);
      }

      if (filters.published_date_from) {
        countQuery = countQuery.gte('published_date', filters.published_date_from);
        console.log('DEBUG: Applied published_date_from filter:', filters.published_date_from);
      }

      if (filters.published_date_to) {
        countQuery = countQuery.lte('published_date', filters.published_date_to);
        console.log('DEBUG: Applied published_date_to filter:', filters.published_date_to);
      }

      // Get total count
      const { count: totalCount, error: countError } = await countQuery;
      
      if (countError) {
        console.error('DEBUG: Count query error:', countError);
        insightsLogger.logError('getInsights', countError, { filters, pagination });
        return {
          data: [],
          pagination: { page: 1, pageSize, total: 0, totalPages: 0 },
          error: 'Failed to count insights'
        };
      }

      const total = totalCount || 0;
      const totalPages = Math.ceil(total / pageSize);
      
      console.log('DEBUG: Total count:', total, 'Total pages:', totalPages);

      // Adjust page if it's beyond the available data
      let adjustedPage = page;
      if (page > totalPages && totalPages > 0) {
        adjustedPage = totalPages;
        console.log('DEBUG: Adjusted page from', page, 'to', adjustedPage);
      }

      const offset = (adjustedPage - 1) * pageSize;

      // Build data query
      let query = supabaseAdmin
        .from(this.tableName)
        .select('*')
        .order('published_date', { ascending: false })
        .order('created_at', { ascending: false });

      // Apply filters to data query
      if (filters.author) {
        query = query.eq('author', filters.author);
      }

      if (filters.is_published !== undefined) {
        query = query.eq('is_published', filters.is_published);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      if (filters.published_date_from) {
        query = query.gte('published_date', filters.published_date_from);
      }

      if (filters.published_date_to) {
        query = query.lte('published_date', filters.published_date_to);
      }

      // Apply pagination
      query = query.range(offset, offset + pageSize - 1);
      console.log('DEBUG: Applied pagination range:', { offset, limit: pageSize });

      // Execute query with performance logging
      const result = await logPerformance('getInsights', async () => {
        const startTime = Date.now();
        const { data, error } = await query;
        const duration = Date.now() - startTime;
        insightsLogger.debug('Database query executed', {
          filters,
          pagination,
          duration: `${duration}ms`,
          resultCount: data?.length || 0,
          totalCount: total
        });
        // Extra debug log for full result
        console.log('DEBUG: Supabase query result:', { 
          data: data?.length || 0, 
          error: error?.message || null, 
          sampleData: data?.slice(0, 2) || []
        });
        return { data, error };
      });

      if (result.error) {
        console.error('DEBUG: Supabase error:', result.error);
        insightsLogger.logError('getInsights', result.error, { filters, pagination });
        return {
          data: [],
          pagination: { page: adjustedPage, pageSize, total: 0, totalPages: 0 },
          error: result.error.message || JSON.stringify(result.error) || 'Failed to fetch insights'
        };
      }

      console.log('DEBUG: Final result:', {
        dataCount: result.data?.length || 0,
        total,
        totalPages,
        currentPage: adjustedPage,
        pageSize
      });

      const response: PaginatedResponse<Insight> = {
        data: result.data || [],
        pagination: {
          page: adjustedPage,
          pageSize,
          total,
          totalPages
        },
        error: null
      };

      // Cache the result (reduced from 10 minutes to 2 minutes for faster updates)
      insightsCache.set(cacheKey, response, 2 * 60 * 1000);

      insightsLogger.info('Insights retrieved successfully', { 
        filters, 
        pagination,
        count: result.data?.length || 0,
        total
      });

      return response;

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      console.error('DEBUG: Exception in getInsights:', err);
      insightsLogger.logError('getInsights', err, { filters, pagination });
      return {
        data: [],
        pagination: { page: 1, pageSize: this.defaultPageSize, total: 0, totalPages: 0 },
        error: 'Failed to fetch insights'
      };
    }
  }
  
  async getInsightById(id: string): Promise<ApiResponse<Insight>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Insight ID is required'
        };
      }

      // Check cache first
      const cacheKey = generateInsightCacheKey(id);
      const cached = insightsCache.get<Insight>(cacheKey);
      if (cached) {
        insightsLogger.debug('Insight retrieved from cache', { id });
        return { data: cached, error: null };
      }

      // Execute query with performance logging
      const result = await logPerformance('getInsightById', async () => {
        console.log('Service: Querying insight with ID:', id);
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .select('*')
          .eq('id', id)
          .single();

        console.log('Service: Query result:', { data, error });
        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          insightsLogger.warn('Insight not found', { id });
          return {
            data: null as any,
            error: 'Insight not found'
          };
        }
        
        insightsLogger.logError('getInsightById', result.error, { id });
        return {
          data: null as any,
          error: 'Failed to fetch insight'
        };
      }

      // Cache the result (reduced from 15 minutes to 3 minutes for faster updates)
      insightsCache.set(cacheKey, result.data, 3 * 60 * 1000);

      insightsLogger.info('Insight retrieved successfully', { id });

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('getInsightById', err, { id });
      return {
        data: null as any,
        error: 'Failed to fetch insight'
      };
    }
  }
  
  async getInsightBySlug(slug: string): Promise<ApiResponse<Insight>> {
    try {
      if (!slug) {
        return {
          data: null as any,
          error: 'Slug is required'
        };
      }

      // Check cache first
      const cacheKey = `insight:slug:${slug}`;
      const cached = insightsCache.get<Insight>(cacheKey);
      if (cached) {
        insightsLogger.debug('Insight retrieved from cache by slug', { slug });
        return { data: cached, error: null };
      }

      // Execute query with performance logging
      const result = await logPerformance('getInsightBySlug', async () => {
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          insightsLogger.warn('Insight not found by slug', { slug });
          return {
            data: null as any,
            error: 'Insight not found'
          };
        }
        
        insightsLogger.logError('getInsightBySlug', result.error, { slug });
        return {
          data: null as any,
          error: 'Failed to fetch insight'
        };
      }

      // Cache the result (reduced from 15 minutes to 3 minutes for faster updates)
      insightsCache.set(cacheKey, result.data, 3 * 60 * 1000);

      insightsLogger.info('Insight retrieved successfully by slug', { slug });

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('getInsightBySlug', err, { slug });
      return {
        data: null as any,
        error: 'Failed to fetch insight'
      };
    }
  }
  
  async getPublishedInsights(pagination: PaginationParams = {}): Promise<PaginatedResponse<Insight>> {
    return this.getInsights({ is_published: true }, pagination);
  }
  
  async searchInsights(query: string, pagination: PaginationParams = {}): Promise<PaginatedResponse<Insight>> {
    return this.getInsights({ search: query }, pagination);
  }
  
  // ========================================
  // WRITE OPERATIONS (Admin only)
  // ========================================
  
  async createInsight(input: CreateInsightInput, userId?: string): Promise<ApiResponse<Insight>> {
    try {
      // Validate input
      const validation = validateInsightInput(input);
      if (!validation.isValid) {
        insightsLogger.logError('createInsight', new Error('Validation failed'), { 
          input, 
          errors: validation.errors 
        });
        return {
          data: null as any,
          error: 'Invalid input data'
        };
      }

      // Execute insert with performance logging
      const result = await logPerformance('createInsight', async () => {
        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .insert([input])
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        insightsLogger.logError('createInsight', result.error, { input, userId });
        return {
          data: null as any,
          error: 'Failed to create insight'
        };
      }

      // Clear related caches
      insightsCache.clear();

      // Log the creation
      insightsLogger.logCreate(result.data, userId);

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('createInsight', err, { input, userId });
      return {
        data: null as any,
        error: 'Failed to create insight'
      };
    }
  }
  
  async updateInsight(id: string, input: UpdateInsightInput, userId?: string): Promise<ApiResponse<Insight>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Insight ID is required'
        };
      }

      // Validate input
      const validation = validateInsightInput(input);
      if (!validation.isValid) {
        insightsLogger.logError('updateInsight', new Error('Validation failed'), { 
          id, 
          input, 
          errors: validation.errors 
        });
        return {
          data: null as any,
          error: 'Invalid input data'
        };
      }

      // Execute update with performance logging
      const result = await logPerformance('updateInsight', async () => {
        // Ensure updated_at is set explicitly as backup to trigger
        const updateData = {
          ...input,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
          .from(this.tableName)
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          insightsLogger.warn('Insight not found for update', { id });
          return {
            data: null as any,
            error: 'Insight not found'
          };
        }
        
        insightsLogger.logError('updateInsight', result.error, { id, input, userId });
        return {
          data: null as any,
          error: 'Failed to update insight'
        };
      }

      // Clear related caches
      insightsCache.clear();
      insightsCache.delete(generateInsightCacheKey(id));

      // Log the update
      insightsLogger.logUpdate(id, input, userId);

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('updateInsight', err, { id, input, userId });
      return {
        data: null as any,
        error: 'Failed to update insight'
      };
    }
  }
  
  async deleteInsight(id: string, userId?: string): Promise<ApiResponse<void>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Insight ID is required'
        };
      }

      // Execute delete with performance logging
      const result = await logPerformance('deleteInsight', async () => {
        const { error } = await supabaseAdmin
          .from(this.tableName)
          .delete()
          .eq('id', id);

        return { error };
      });

      if (result.error) {
        insightsLogger.logError('deleteInsight', result.error, { id, userId });
        return {
          data: null as any,
          error: 'Failed to delete insight'
        };
      }

      // Clear related caches
      insightsCache.clear();
      insightsCache.delete(generateInsightCacheKey(id));

      // Log the deletion
      insightsLogger.logDelete(id, userId);

      return {
        data: undefined as any,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('deleteInsight', err, { id, userId });
      return {
        data: null as any,
        error: 'Failed to delete insight'
      };
    }
  }
  
  async publishInsight(id: string, userId?: string): Promise<ApiResponse<Insight>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Insight ID is required'
        };
      }

      // Execute update with performance logging
      const result = await logPerformance('publishInsight', async () => {
        const { data, error } = await supabase
          .from(this.tableName)
          .update({ 
            is_published: true,
            published_date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
          })
          .eq('id', id)
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          insightsLogger.warn('Insight not found for publishing', { id });
          return {
            data: null as any,
            error: 'Insight not found'
          };
        }
        
        insightsLogger.logError('publishInsight', result.error, { id, userId });
        return {
          data: null as any,
          error: 'Failed to publish insight'
        };
      }

      // Clear related caches
      insightsCache.clear();
      insightsCache.delete(generateInsightCacheKey(id));

      // Log the publication
      insightsLogger.logPublish(id, userId);

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('publishInsight', err, { id, userId });
      return {
        data: null as any,
        error: 'Failed to publish insight'
      };
    }
  }
  
  async unpublishInsight(id: string, userId?: string): Promise<ApiResponse<Insight>> {
    try {
      if (!id) {
        return {
          data: null as any,
          error: 'Insight ID is required'
        };
      }

      // Execute update with performance logging
      const result = await logPerformance('unpublishInsight', async () => {
        const { data, error } = await supabase
          .from(this.tableName)
          .update({ is_published: false })
          .eq('id', id)
          .select()
          .single();

        return { data, error };
      });

      if (result.error) {
        if (result.error.code === 'PGRST116') {
          insightsLogger.warn('Insight not found for unpublishing', { id });
          return {
            data: null as any,
            error: 'Insight not found'
          };
        }
        
        insightsLogger.logError('unpublishInsight', result.error, { id, userId });
        return {
          data: null as any,
          error: 'Failed to unpublish insight'
        };
      }

      // Clear related caches
      insightsCache.clear();
      insightsCache.delete(generateInsightCacheKey(id));

      // Log the unpublishing
      insightsLogger.info('Insight unpublished', { id, userId });

      return {
        data: result.data,
        error: null
      };

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      insightsLogger.logError('unpublishInsight', err, { id, userId });
      return {
        data: null as any,
        error: 'Failed to unpublish insight'
      };
    }
  }
  
  // ========================================
  // UTILITY METHODS
  // ========================================
  
  private async generateSlug(title: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('generate_unique_slug', { title });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error generating slug:', error);
      // Fallback to simple slug generation
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  }
  
  async getAuthors(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('author');
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Extract unique authors
      const authors = [...new Set(data?.map(item => item.author) || [])];
      return authors.sort();
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  }
  
  async getTags(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('tags');
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Extract unique tags from all insights
      const allTags = data?.flatMap(item => item.tags || []) || [];
      const uniqueTags = [...new Set(allTags)];
      return uniqueTags.sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const insightsService = new InsightsService(); 