-- Insights table schema
-- Phase 1.2: Database Schema Design

CREATE TABLE IF NOT EXISTS insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    author TEXT NOT NULL,
    co_author TEXT,
    published_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT false,
    slug TEXT UNIQUE NOT NULL,
    meta_description TEXT,
    tags TEXT[]
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_insights_is_published ON insights(is_published);
CREATE INDEX IF NOT EXISTS idx_insights_published_date ON insights(published_date);
CREATE INDEX IF NOT EXISTS idx_insights_slug ON insights(slug);
CREATE INDEX IF NOT EXISTS idx_insights_author ON insights(author);
CREATE INDEX IF NOT EXISTS idx_insights_tags ON insights USING GIN(tags);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_insights_search ON insights USING GIN(
    to_tsvector('english', title || ' ' || excerpt || ' ' || COALESCE(content, ''))
);

-- Create updated_at trigger
CREATE TRIGGER update_insights_updated_at 
    BEFORE UPDATE ON insights 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create slug generation function
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
    )) || '-' || extract(epoch from now())::integer;
END;
$$ LANGUAGE plpgsql; 