-- Analytics Schema for Platform01 CMS
-- Phase 6.4: Analytics & Monitoring

-- Content views tracking table
CREATE TABLE IF NOT EXISTS content_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('insight', 'credential')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_views_content_id ON content_views(content_id);
CREATE INDEX IF NOT EXISTS idx_content_views_content_type ON content_views(content_type);
CREATE INDEX IF NOT EXISTS idx_content_views_viewed_at ON content_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_content_views_user_id ON content_views(user_id);

-- Search analytics table
CREATE TABLE IF NOT EXISTS search_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('all', 'insights', 'credentials')),
  results_count INTEGER NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for search analytics
CREATE INDEX IF NOT EXISTS idx_search_analytics_query ON search_analytics(query);
CREATE INDEX IF NOT EXISTS idx_search_analytics_content_type ON search_analytics(content_type);
CREATE INDEX IF NOT EXISTS idx_search_analytics_searched_at ON search_analytics(searched_at);

-- Performance metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('api_response_time', 'page_load_time', 'search_response_time')),
  metric_value DECIMAL(10,3) NOT NULL,
  endpoint TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance metrics
CREATE INDEX IF NOT EXISTS idx_performance_metrics_type ON performance_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded_at ON performance_metrics(recorded_at);

-- RLS Policies for analytics tables
ALTER TABLE content_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Public insert access for content views (for tracking)
CREATE POLICY "Allow public insert on content_views" ON content_views
  FOR INSERT WITH CHECK (true);

-- Admin read access for content views
CREATE POLICY "Allow admin read on content_views" ON content_views
  FOR SELECT USING (is_admin());

-- Public insert access for search analytics
CREATE POLICY "Allow public insert on search_analytics" ON search_analytics
  FOR INSERT WITH CHECK (true);

-- Admin read access for search analytics
CREATE POLICY "Allow admin read on search_analytics" ON search_analytics
  FOR SELECT USING (is_admin());

-- Public insert access for performance metrics
CREATE POLICY "Allow public insert on performance_metrics" ON performance_metrics
  FOR INSERT WITH CHECK (true);

-- Admin read access for performance metrics
CREATE POLICY "Allow admin read on performance_metrics" ON performance_metrics
  FOR SELECT USING (is_admin());

-- Analytics helper functions
CREATE OR REPLACE FUNCTION get_content_views_summary(
  days_back INTEGER DEFAULT 30,
  content_type_filter TEXT DEFAULT NULL
) RETURNS TABLE (
  total_views BIGINT,
  views_by_type JSONB,
  views_by_day JSONB,
  top_content JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH view_data AS (
    SELECT 
      cv.content_type,
      cv.content_id,
      DATE(cv.viewed_at) as view_date
    FROM content_views cv
    WHERE cv.viewed_at >= NOW() - INTERVAL '1 day' * days_back
      AND (content_type_filter IS NULL OR cv.content_type = content_type_filter)
  ),
  type_counts AS (
    SELECT 
      content_type,
      COUNT(*) as count
    FROM view_data
    GROUP BY content_type
  ),
  day_counts AS (
    SELECT 
      view_date,
      COUNT(*) as count
    FROM view_data
    GROUP BY view_date
    ORDER BY view_date
  ),
  content_counts AS (
    SELECT 
      content_id,
      COUNT(*) as count
    FROM view_data
    GROUP BY content_id
    ORDER BY count DESC
    LIMIT 20
  )
  SELECT 
    (SELECT COUNT(*) FROM view_data) as total_views,
    (SELECT jsonb_object_agg(content_type, count) FROM type_counts) as views_by_type,
    (SELECT jsonb_object_agg(view_date::text, count) FROM day_counts) as views_by_day,
    (SELECT jsonb_object_agg(content_id::text, count) FROM content_counts) as top_content;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get search analytics summary
CREATE OR REPLACE FUNCTION get_search_analytics_summary(
  days_back INTEGER DEFAULT 30
) RETURNS TABLE (
  total_searches BIGINT,
  popular_queries JSONB,
  searches_by_type JSONB,
  searches_by_day JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH search_data AS (
    SELECT 
      sa.query,
      sa.content_type,
      DATE(sa.searched_at) as search_date
    FROM search_analytics sa
    WHERE sa.searched_at >= NOW() - INTERVAL '1 day' * days_back
  ),
  query_counts AS (
    SELECT 
      query,
      COUNT(*) as count
    FROM search_data
    GROUP BY query
    ORDER BY count DESC
    LIMIT 20
  ),
  type_counts AS (
    SELECT 
      content_type,
      COUNT(*) as count
    FROM search_data
    GROUP BY content_type
  ),
  day_counts AS (
    SELECT 
      search_date,
      COUNT(*) as count
    FROM search_data
    GROUP BY search_date
    ORDER BY search_date
  )
  SELECT 
    (SELECT COUNT(*) FROM search_data) as total_searches,
    (SELECT jsonb_object_agg(query, count) FROM query_counts) as popular_queries,
    (SELECT jsonb_object_agg(content_type, count) FROM type_counts) as searches_by_type,
    (SELECT jsonb_object_agg(search_date::text, count) FROM day_counts) as searches_by_day;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get performance metrics summary
CREATE OR REPLACE FUNCTION get_performance_summary(
  days_back INTEGER DEFAULT 30,
  metric_type_filter TEXT DEFAULT NULL
) RETURNS TABLE (
  avg_response_time DECIMAL(10,3),
  max_response_time DECIMAL(10,3),
  min_response_time DECIMAL(10,3),
  metrics_by_type JSONB,
  metrics_by_endpoint JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH metric_data AS (
    SELECT 
      pm.metric_type,
      pm.metric_value,
      pm.endpoint
    FROM performance_metrics pm
    WHERE pm.recorded_at >= NOW() - INTERVAL '1 day' * days_back
      AND (metric_type_filter IS NULL OR pm.metric_type = metric_type_filter)
  ),
  type_avgs AS (
    SELECT 
      metric_type,
      AVG(metric_value) as avg_value
    FROM metric_data
    GROUP BY metric_type
  ),
  endpoint_avgs AS (
    SELECT 
      endpoint,
      AVG(metric_value) as avg_value
    FROM metric_data
    WHERE endpoint IS NOT NULL
    GROUP BY endpoint
  )
  SELECT 
    (SELECT AVG(metric_value) FROM metric_data) as avg_response_time,
    (SELECT MAX(metric_value) FROM metric_data) as max_response_time,
    (SELECT MIN(metric_value) FROM metric_data) as min_response_time,
    (SELECT jsonb_object_agg(metric_type, avg_value) FROM type_avgs) as metrics_by_type,
    (SELECT jsonb_object_agg(endpoint, avg_value) FROM endpoint_avgs) as metrics_by_endpoint;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 