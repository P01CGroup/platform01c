-- Complete Database Schema for Platform01 CMS
-- Phase 1.2: Database Schema Design
-- Run this file in your Supabase SQL editor to set up the complete schema

-- ========================================
-- CREDENTIALS TABLE
-- ========================================

-- Create credential type enum
CREATE TYPE credential_type AS ENUM ('Industry', 'Service');

-- Create credentials table
CREATE TABLE IF NOT EXISTS credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type credential_type NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- Create credentials indexes
CREATE INDEX IF NOT EXISTS idx_credentials_type ON credentials(type);
CREATE INDEX IF NOT EXISTS idx_credentials_category ON credentials(category);
CREATE INDEX IF NOT EXISTS idx_credentials_is_active ON credentials(is_active);
CREATE INDEX IF NOT EXISTS idx_credentials_sort_order ON credentials(sort_order);

-- ========================================
-- INSIGHTS TABLE
-- ========================================

-- Create insights table
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

-- Create insights indexes
CREATE INDEX IF NOT EXISTS idx_insights_is_published ON insights(is_published);
CREATE INDEX IF NOT EXISTS idx_insights_published_date ON insights(published_date);
CREATE INDEX IF NOT EXISTS idx_insights_slug ON insights(slug);
CREATE INDEX IF NOT EXISTS idx_insights_author ON insights(author);
CREATE INDEX IF NOT EXISTS idx_insights_tags ON insights USING GIN(tags);

-- Create full-text search index for insights
CREATE INDEX IF NOT EXISTS idx_insights_search ON insights USING GIN(
    to_tsvector('english', title || ' ' || excerpt || ' ' || COALESCE(content, ''))
);

-- ========================================
-- UTILITY FUNCTIONS
-- ========================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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

-- ========================================
-- TRIGGERS
-- ========================================

-- Create triggers for updated_at
CREATE TRIGGER update_credentials_updated_at 
    BEFORE UPDATE ON credentials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at 
    BEFORE UPDATE ON insights 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA (Optional - for testing)
-- ========================================

-- Insert sample credentials
INSERT INTO credentials (type, category, title, sort_order) VALUES
('Industry', 'Technology', 'Software Development', 1),
('Industry', 'Finance', 'Investment Banking', 2),
('Service', 'Consulting', 'Business Strategy', 1),
('Service', 'Valuation', 'Company Valuation', 2)
ON CONFLICT DO NOTHING;

-- Insert sample insights
INSERT INTO insights (title, excerpt, author, slug, is_published, published_date) VALUES
('Digital Transformation in 2024', 'Exploring the latest trends in digital transformation and their impact on business strategy.', 'John Smith', 'digital-transformation-2024-1703123456', true, '2024-01-15'),
('M&A Market Outlook', 'Analysis of the current M&A landscape and predictions for the coming year.', 'Jane Doe', 'ma-market-outlook-1703123457', true, '2024-01-20')
ON CONFLICT DO NOTHING; 