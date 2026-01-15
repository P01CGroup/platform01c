-- Complete Database Setup for Platform01 CMS
-- Phase 1.2 & 1.3: Database Schema + RLS Setup
-- Run this file in your Supabase SQL editor to set up everything

-- ========================================
-- STEP 1: CREATE TABLES
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

-- ========================================
-- STEP 2: CREATE INDEXES
-- ========================================

-- Credentials indexes
CREATE INDEX IF NOT EXISTS idx_credentials_type ON credentials(type);
CREATE INDEX IF NOT EXISTS idx_credentials_category ON credentials(category);
CREATE INDEX IF NOT EXISTS idx_credentials_is_active ON credentials(is_active);
CREATE INDEX IF NOT EXISTS idx_credentials_sort_order ON credentials(sort_order);

-- Insights indexes
CREATE INDEX IF NOT EXISTS idx_insights_is_published ON insights(is_published);
CREATE INDEX IF NOT EXISTS idx_insights_published_date ON insights(published_date);
CREATE INDEX IF NOT EXISTS idx_insights_slug ON insights(slug);
CREATE INDEX IF NOT EXISTS idx_insights_author ON insights(author);
CREATE INDEX IF NOT EXISTS idx_insights_tags ON insights USING GIN(tags);

-- Full-text search index for insights
CREATE INDEX IF NOT EXISTS idx_insights_search ON insights USING GIN(
    to_tsvector('english', title || ' ' || excerpt || ' ' || COALESCE(content, ''))
);

-- ========================================
-- STEP 3: CREATE FUNCTIONS
-- ========================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Slug generation function
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
    )) || '-' || extract(epoch from now())::integer;
END;
$$ LANGUAGE plpgsql;

-- Admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = auth.uid() 
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- STEP 4: CREATE TRIGGERS
-- ========================================

-- Updated_at triggers
CREATE TRIGGER update_credentials_updated_at 
    BEFORE UPDATE ON credentials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insights_updated_at 
    BEFORE UPDATE ON insights 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- STEP 5: ENABLE RLS
-- ========================================

-- Enable RLS on both tables
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- ========================================
-- STEP 6: CREATE RLS POLICIES
-- ========================================

-- Credentials policies
CREATE POLICY "Public can view active credentials" ON credentials
    FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage all credentials" ON credentials
    FOR ALL
    USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Insights policies
CREATE POLICY "Public can view published insights" ON insights
    FOR SELECT
    USING (is_published = true);

CREATE POLICY "Admins can manage all insights" ON insights
    FOR ALL
    USING (
        auth.role() = 'authenticated' AND 
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- ========================================
-- STEP 7: INSERT SAMPLE DATA
-- ========================================

-- Sample credentials
INSERT INTO credentials (type, category, title, sort_order) VALUES
('Industry', 'Technology', 'Software Development', 1),
('Industry', 'Finance', 'Investment Banking', 2),
('Service', 'Consulting', 'Business Strategy', 1),
('Service', 'Valuation', 'Company Valuation', 2)
ON CONFLICT DO NOTHING;

-- Sample insights
INSERT INTO insights (title, excerpt, author, slug, is_published, published_date) VALUES
('Digital Transformation in 2024', 'Exploring the latest trends in digital transformation and their impact on business strategy.', 'John Smith', 'digital-transformation-2024-1703123456', true, '2024-01-15'),
('M&A Market Outlook', 'Analysis of the current M&A landscape and predictions for the coming year.', 'Jane Doe', 'ma-market-outlook-1703123457', true, '2024-01-20')
ON CONFLICT DO NOTHING;

-- ========================================
-- SUCCESS MESSAGE
-- ========================================

SELECT 'Database setup completed successfully!' as status; 