-- Database Seeding for Platform01 CMS
-- Phase 3.1: Database Seeding - Migrate existing hardcoded data
-- This script migrates all existing credentials and insights data

-- ========================================
-- CREDENTIALS DATA MIGRATION
-- ========================================

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM credentials;
-- DELETE FROM insights;

-- Insert comprehensive credentials data from all pages
INSERT INTO credentials (type, category, title, sort_order, is_active) VALUES
-- Industry Credentials (from various service pages)
('Industry', 'Manufacturing', 'Feasibility Study for a Steel Manufacturing Plant Expansion', 1, true),
('Industry', 'Energy', 'Market Analysis for Renewable Energy Infrastructure Development', 2, true),
('Industry', 'Technology', 'Business Plan for AI-Powered Logistics Platform', 3, true),
('Industry', 'Healthcare', 'Strategic Assessment for Pharmaceutical Manufacturing Facility', 4, true),
('Industry', 'Automotive', 'Investment Analysis for Electric Vehicle Component Production', 5, true),
('Industry', 'Agriculture', 'Feasibility Study for Smart Farming Technology Implementation', 6, true),
('Industry', 'Construction', 'Market Entry Strategy for Modular Building Solutions', 7, true),
('Industry', 'Real Estate', 'Feasibility Study for a Ductile Iron Pipe manufacturing greenfield project', 8, true),
('Industry', 'Real Estate', 'Commercial Tower Redevelopment Advisory', 9, true),
('Industry', 'Real Estate', 'Luxury Residential Market Analysis', 10, true),
('Industry', 'Fintech', 'Digital Banking Platform Implementation', 11, true),
('Industry', 'Fintech', 'Payment Gateway Market Entry', 12, true),
('Industry', 'Fintech', 'Blockchain Feasibility Study', 13, true),
('Industry', 'Healthcare', 'Hospital Expansion Strategy', 14, true),
('Industry', 'Healthcare', 'Medical Device Market Assessment', 15, true),
('Industry', 'Healthcare', 'Healthcare M&A Due Diligence', 16, true),
('Industry', 'Logistics', 'Supply Chain Optimization', 17, true),
('Industry', 'Logistics', 'Fleet Management Digitalization', 18, true),
('Industry', 'Logistics', 'Cross-border Logistics Feasibility', 19, true),
('Industry', 'Real Estate', 'Retail Mall Performance Review', 20, true),
('Industry', 'Fintech', 'Open Banking Regulatory Analysis', 21, true),
('Industry', 'Healthcare', 'Telemedicine Rollout Plan', 22, true),
('Industry', 'Logistics', 'Warehouse Automation Study', 23, true),
('Industry', 'Real Estate', 'Affordable Housing Feasibility', 24, true),
('Industry', 'Fintech', 'Fintech Sandbox Pilot', 25, true),
('Industry', 'Healthcare', 'Healthcare Digitalization Study', 26, true),
('Industry', 'Logistics', 'Cold Chain Logistics Expansion', 27, true),
('Industry', 'Real Estate', 'Mixed-use Development Feasibility', 28, true),
('Industry', 'Fintech', 'Mobile Payments Rollout', 29, true),
('Industry', 'Healthcare', 'Healthcare Policy Impact Study', 30, true),
('Industry', 'Logistics', 'E-commerce Logistics Optimization', 31, true),

-- Service Credentials (from various service pages)
('Service', 'M&A Advisory', 'Due Diligence for $500M Technology Acquisition', 1, true),
('Service', 'Corporate Finance', 'Valuation Analysis for Private Equity Investment', 2, true),
('Service', 'Strategy Consulting', 'Digital Transformation Strategy for Regional Bank', 3, true),
('Service', 'Restructuring', 'Turnaround Advisory for Manufacturing Conglomerate', 4, true),
('Service', 'Investment Advisory', 'Portfolio Optimization for Family Office', 5, true),
('Service', 'Transaction Support', 'M&A Advisory for Healthcare Services Provider', 6, true),
('Service', 'Business Valuation', 'Fair Value Assessment for Technology Startup', 7, true),
('Service', 'Strategy', 'Market Entry Strategy for Healthcare', 8, true),
('Service', 'Strategy', 'Growth Strategy for Fintech Startup', 9, true),
('Service', 'Strategy', 'Turnaround Strategy for Real Estate Developer', 10, true),
('Service', 'Advisory', 'M&A Advisory for Logistics Firm', 11, true),
('Service', 'Advisory', 'Debt Restructuring Advisory', 12, true),
('Service', 'Advisory', 'IPO Readiness Assessment', 13, true),
('Service', 'Strategy', 'Digital Transformation Roadmap', 14, true),
('Service', 'Advisory', 'Valuation for Healthcare Acquisition', 15, true),
('Service', 'Strategy', 'Sustainability Strategy for Logistics', 16, true),
('Service', 'Advisory', 'Strategic Partnership Advisory', 17, true),
('Service', 'Strategy', 'Brand Positioning Strategy', 18, true),
('Service', 'Advisory', 'Cross-border M&A Advisory', 19, true),
('Service', 'Strategy', 'Customer Experience Strategy', 20, true),
('Service', 'Advisory', 'Financial Due Diligence', 21, true),
('Service', 'Strategy', 'Innovation Strategy for Fintech', 22, true),
('Service', 'DueDiligence', 'Turnaround Advisory for Manufacturing Conglomerate', 23, true),
('Service', 'PortfolioValuation', 'Turnaround Advisory for Manufacturing Conglomerate', 24, true),
('Service', 'ValueCreation', 'Turnaround Advisory for Manufacturing Conglomerate', 25, true),
('Service', 'TransactionSupport', 'Turnaround Advisory for Manufacturing Conglomerate', 26, true),
('Service', 'MaConsulting', 'Turnaround Advisory for Manufacturing Conglomerate', 27, true),
('Service', 'BusinessValuation', 'Turnaround Advisory for Manufacturing Conglomerate', 28, true);

-- ========================================
-- INSIGHTS DATA MIGRATION
-- ========================================

-- Insert comprehensive insights data
INSERT INTO insights (title, excerpt, author, co_author, image_url, published_date, is_published, slug, meta_description, tags) VALUES
(
  'The Role of Cultural Insights in Building Authentic Brand Communications',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  '2024-12-20',
  true,
  'cultural-insights-brand-communications-1703123458',
  'Exploring how cultural insights can enhance brand communication strategies and create more authentic connections with audiences.',
  ARRAY['Brand Strategy', 'Cultural Insights', 'Marketing']
),
(
  'Digital Transformation in Financial Services: A Strategic Approach',
  'Understanding the key drivers and implementation strategies for successful digital transformation in the financial services sector.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  '2024-12-20',
  true,
  'digital-transformation-financial-services-1703123459',
  'A comprehensive guide to digital transformation strategies in financial services, covering technology adoption and change management.',
  ARRAY['Digital Transformation', 'Financial Services', 'Strategy']
),
(
  'M&A Market Trends: Navigating the Current Landscape',
  'Analysis of current M&A market trends and strategic considerations for companies looking to engage in mergers and acquisitions.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  '2024-12-20',
  true,
  'ma-market-trends-navigating-landscape-1703123460',
  'Insights into current M&A market dynamics and strategic approaches for successful deal-making in today''s environment.',
  ARRAY['M&A', 'Market Trends', 'Strategy']
),
(
  'Sustainable Business Models: Creating Long-term Value',
  'Exploring how businesses can develop sustainable models that create long-term value while addressing environmental and social challenges.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  '2024-12-19',
  true,
  'sustainable-business-models-long-term-value-1703123461',
  'A strategic framework for developing sustainable business models that balance profitability with environmental and social responsibility.',
  ARRAY['Sustainability', 'Business Strategy', 'Value Creation']
),
(
  'Private Equity Investment Strategies in Emerging Markets',
  'Analysis of private equity investment opportunities and strategies in emerging markets, including risk assessment and value creation approaches.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  '2024-12-19',
  true,
  'private-equity-emerging-markets-1703123462',
  'Comprehensive analysis of private equity investment strategies in emerging markets, covering due diligence and value creation.',
  ARRAY['Private Equity', 'Emerging Markets', 'Investment']
),
(
  'Healthcare Innovation: Strategic Implications for Investors',
  'Examining the strategic implications of healthcare innovation for investors and companies in the healthcare sector.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  '2024-12-18',
  true,
  'healthcare-innovation-strategic-implications-1703123463',
  'Strategic analysis of healthcare innovation trends and their implications for investment decisions and business strategy.',
  ARRAY['Healthcare', 'Innovation', 'Investment Strategy']
),
(
  'Real Estate Investment in the Digital Age',
  'How digital transformation is reshaping real estate investment strategies and creating new opportunities for value creation.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  '2024-12-18',
  true,
  'real-estate-investment-digital-age-1703123464',
  'Exploring the impact of digital transformation on real estate investment strategies and market opportunities.',
  ARRAY['Real Estate', 'Digital Transformation', 'Investment']
),
(
  'Supply Chain Resilience: Building Robust Operations',
  'Strategies for building resilient supply chains that can withstand disruptions and maintain operational excellence.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  '2024-12-17',
  true,
  'supply-chain-resilience-robust-operations-1703123465',
  'Comprehensive guide to building resilient supply chains that can adapt to changing market conditions and disruptions.',
  ARRAY['Supply Chain', 'Operations', 'Resilience']
),
(
  'Fintech Disruption: Strategic Responses for Traditional Banks',
  'How traditional financial institutions can strategically respond to fintech disruption and maintain competitive advantage.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  '2024-12-17',
  true,
  'fintech-disruption-strategic-responses-1703123466',
  'Strategic analysis of fintech disruption and recommended responses for traditional financial institutions.',
  ARRAY['Fintech', 'Banking', 'Digital Strategy']
),
(
  'ESG Integration in Investment Decision Making',
  'Practical approaches to integrating Environmental, Social, and Governance factors into investment decision-making processes.',
  'Mr. Omar Abedin',
  'Hamna Asghar',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  '2024-12-16',
  true,
  'esg-integration-investment-decision-making-1703123467',
  'Framework for integrating ESG considerations into investment analysis and decision-making processes.',
  ARRAY['ESG', 'Investment', 'Sustainability']
);

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Verify credentials migration
SELECT 
  'Credentials Migration Summary' as summary,
  COUNT(*) as total_credentials,
  COUNT(CASE WHEN type = 'Industry' THEN 1 END) as industry_credentials,
  COUNT(CASE WHEN type = 'Service' THEN 1 END) as service_credentials
FROM credentials;

-- Verify insights migration
SELECT 
  'Insights Migration Summary' as summary,
  COUNT(*) as total_insights,
  COUNT(CASE WHEN is_published = true THEN 1 END) as published_insights,
  COUNT(CASE WHEN is_published = false THEN 1 END) as draft_insights
FROM insights;

-- Show sample of migrated data
SELECT 'Sample Credentials' as data_type, type, category, title FROM credentials LIMIT 5;
SELECT 'Sample Insights' as data_type, title, author, published_date FROM insights LIMIT 5; 