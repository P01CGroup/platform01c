// CMS Types and Interfaces for Platform01
// Phase 2.1: TypeScript Types & Interfaces

// ========================================
// DATABASE TABLE INTERFACES
// ========================================

export interface Credential {
  id: string;
  service_tags: string[];
  industry_tags: string[];
  title: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  sort_order: number;
}

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  author: string;
  co_author?: string;
  published_date?: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  slug: string;
  meta_description?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonical_url?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
  };
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
}

export interface CredentialsResponse extends ApiResponse<Credential[]> {}
export interface CredentialResponse extends ApiResponse<Credential> {}
export interface InsightsResponse extends PaginatedResponse<Insight> {}
export interface InsightResponse extends ApiResponse<Insight> {}

// ========================================
// FORM INPUT TYPES
// ========================================

export interface CreateCredentialInput {
  service_tags: string[];
  industry_tags: string[];
  title: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface UpdateCredentialInput extends Partial<CreateCredentialInput> {
  id: string;
}

export interface CreateInsightInput {
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  author: string;
  co_author?: string;
  published_date?: string;
  is_published?: boolean;
  slug?: string;
  meta_description?: string;
  tags?: string[];
}

export interface UpdateInsightInput extends Partial<CreateInsightInput> {
  id: string;
}

// ========================================
// FILTER AND PAGINATION TYPES
// ========================================

export interface CredentialsFilter {
  service_tags?: string[];
  industry_tags?: string[];
  is_active?: boolean;
  search?: string;
}

export interface InsightsFilter {
  author?: string;
  is_published?: boolean;
  tags?: string[];
  search?: string;
  published_date_from?: string;
  published_date_to?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
}

// ========================================
// SERVICE TYPES
// ========================================

export interface CredentialsService {
  getAll: (filters?: CredentialsFilter) => Promise<Credential[]>;
  getById: (id: string) => Promise<Credential | null>;
  create: (data: CreateCredentialInput) => Promise<Credential>;
  update: (id: string, data: UpdateCredentialInput) => Promise<Credential>;
  delete: (id: string) => Promise<boolean>;
  search: (query: string) => Promise<Credential[]>;
}

export interface InsightsService {
  getAll: (filters?: InsightsFilter, pagination?: PaginationParams) => Promise<PaginatedResponse<Insight>>;
  getById: (id: string) => Promise<Insight | null>;
  getBySlug: (slug: string) => Promise<Insight | null>;
  getPublished: (pagination?: PaginationParams) => Promise<PaginatedResponse<Insight>>;
  create: (data: CreateInsightInput) => Promise<Insight>;
  update: (id: string, data: UpdateInsightInput) => Promise<Insight>;
  delete: (id: string) => Promise<boolean>;
  search: (query: string) => Promise<Insight[]>;
  publish: (id: string) => Promise<Insight>;
  unpublish: (id: string) => Promise<Insight>;
}

// ========================================
// ERROR TYPES
// ========================================

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

// ========================================
// UTILITY TYPES
// ========================================

export type SortOrder = 'asc' | 'desc';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} 