-- Row Level Security (RLS) Policies for Platform01 CMS
-- Phase 1.3: Row Level Security (RLS) Setup
-- Run this file in your Supabase SQL editor after creating the tables

-- ========================================
-- ENABLE RLS ON TABLES
-- ========================================

-- Enable RLS on credentials table
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Enable RLS on insights table
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREDENTIALS TABLE POLICIES
-- ========================================

-- Public read access for active credentials
CREATE POLICY "Public can view active credentials" ON credentials
    FOR SELECT
    USING (is_active = true);

-- Admin full access (authenticated users with admin role)
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

-- ========================================
-- INSIGHTS TABLE POLICIES
-- ========================================

-- Public read access for published insights
CREATE POLICY "Public can view published insights" ON insights
    FOR SELECT
    USING (is_published = true);

-- Admin full access (authenticated users with admin role)
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
-- ADMIN ROLE SETUP
-- ========================================

-- Create a function to check if user is admin
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
-- ALTERNATIVE SIMPLIFIED POLICIES (if role-based is too complex)
-- ========================================

-- Uncomment these if you want simpler policies without role checking
/*
-- Simple authenticated user access for credentials
CREATE POLICY "Authenticated users can manage credentials" ON credentials
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Simple authenticated user access for insights  
CREATE POLICY "Authenticated users can manage insights" ON insights
    FOR ALL
    USING (auth.role() = 'authenticated');
*/ 