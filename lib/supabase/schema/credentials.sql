-- Credentials table schema
-- Phase 1.2: Database Schema Design

CREATE TABLE IF NOT EXISTS credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    service_tags TEXT[] NOT NULL,
    industry_tags TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_credentials_service_tags ON credentials USING GIN(service_tags);
CREATE INDEX IF NOT EXISTS idx_credentials_industry_tags ON credentials USING GIN(industry_tags);
CREATE INDEX IF NOT EXISTS idx_credentials_is_active ON credentials(is_active);
CREATE INDEX IF NOT EXISTS idx_credentials_sort_order ON credentials(sort_order);
CREATE INDEX IF NOT EXISTS idx_credentials_created_at ON credentials(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_credentials_updated_at 
    BEFORE UPDATE ON credentials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 
 