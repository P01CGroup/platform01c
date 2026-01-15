-- Database Functions & Triggers for Platform01 CMS
-- Phase 1.4: Database Functions & Triggers
-- Additional functions beyond what's in the main schema

-- ========================================
-- SEARCH FUNCTIONS (Full-text search)
-- ========================================

-- Search insights by text content
CREATE OR REPLACE FUNCTION search_insights(search_term TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    excerpt TEXT,
    author TEXT,
    published_date DATE,
    slug TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.title,
        i.excerpt,
        i.author,
        i.published_date,
        i.slug,
        ts_rank(
            to_tsvector('english', i.title || ' ' || i.excerpt || ' ' || COALESCE(i.content, '')),
            plainto_tsquery('english', search_term)
        ) as rank
    FROM insights i
    WHERE 
        i.is_published = true
        AND to_tsvector('english', i.title || ' ' || i.excerpt || ' ' || COALESCE(i.content, '')) @@ plainto_tsquery('english', search_term)
    ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;

-- Search credentials by title and category
CREATE OR REPLACE FUNCTION search_credentials(search_term TEXT)
RETURNS TABLE (
    id UUID,
    type credential_type,
    category TEXT,
    title TEXT,
    sort_order INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.type,
        c.category,
        c.title,
        c.sort_order
    FROM credentials c
    WHERE 
        c.is_active = true
        AND (
            c.title ILIKE '%' || search_term || '%'
            OR c.category ILIKE '%' || search_term || '%'
        )
    ORDER BY c.sort_order ASC, c.title ASC;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- SLUG GENERATION FUNCTIONS
-- ========================================

-- Generate unique slug for insights
CREATE OR REPLACE FUNCTION generate_unique_slug(title TEXT, table_name TEXT DEFAULT 'insights')
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Generate base slug
    base_slug := lower(regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
    ));
    
    final_slug := base_slug;
    
    -- Check if slug exists and append counter if needed
    WHILE EXISTS (
        SELECT 1 FROM insights 
        WHERE slug = final_slug
    ) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- UTILITY FUNCTIONS
-- ========================================

-- Get credentials by type with proper ordering
CREATE OR REPLACE FUNCTION get_credentials_by_type(cred_type credential_type)
RETURNS TABLE (
    id UUID,
    category TEXT,
    title TEXT,
    sort_order INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.category,
        c.title,
        c.sort_order
    FROM credentials c
    WHERE c.type = cred_type AND c.is_active = true
    ORDER BY c.sort_order ASC, c.title ASC;
END;
$$ LANGUAGE plpgsql;

-- Get published insights with pagination
CREATE OR REPLACE FUNCTION get_published_insights(
    page_size INTEGER DEFAULT 10,
    page_number INTEGER DEFAULT 1
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    excerpt TEXT,
    author TEXT,
    published_date DATE,
    slug TEXT,
    total_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.title,
        i.excerpt,
        i.author,
        i.published_date,
        i.slug,
        COUNT(*) OVER() as total_count
    FROM insights i
    WHERE i.is_published = true
    ORDER BY i.published_date DESC, i.created_at DESC
    LIMIT page_size
    OFFSET (page_number - 1) * page_size;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- TRIGGER FUNCTIONS (Additional)
-- ========================================

-- Auto-generate slug for new insights
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_unique_slug(NEW.title);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto slug generation
CREATE TRIGGER auto_generate_insight_slug
    BEFORE INSERT ON insights
    FOR EACH ROW
    EXECUTE FUNCTION auto_generate_slug();

-- ========================================
-- VALIDATION FUNCTIONS
-- ========================================

-- Validate insight data
CREATE OR REPLACE FUNCTION validate_insight(
    p_title TEXT,
    p_excerpt TEXT,
    p_author TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if required fields are not empty
    IF p_title IS NULL OR trim(p_title) = '' THEN
        RETURN FALSE;
    END IF;
    
    IF p_excerpt IS NULL OR trim(p_excerpt) = '' THEN
        RETURN FALSE;
    END IF;
    
    IF p_author IS NULL OR trim(p_author) = '' THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Validate credential data
CREATE OR REPLACE FUNCTION validate_credential(
    p_type credential_type,
    p_category TEXT,
    p_title TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if required fields are not empty
    IF p_type IS NULL THEN
        RETURN FALSE;
    END IF;
    
    IF p_category IS NULL OR trim(p_category) = '' THEN
        RETURN FALSE;
    END IF;
    
    IF p_title IS NULL OR trim(p_title) = '' THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql; 