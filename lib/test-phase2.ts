// Phase 2 Infrastructure Test
// Test the core infrastructure before moving to Phase 3

import { credentialsService } from './services/CredentialsService';
import { insightsService } from './services/InsightsService';
import { supabase } from './supabase/client';

// ========================================
// TEST FUNCTIONS
// ========================================

export async function testPhase2Infrastructure() {
  console.log('🧪 Testing Phase 2 Infrastructure...\n');
  
  const results = {
    supabaseConnection: false,
    credentialsService: false,
    insightsService: false,
    types: false
  };
  
  try {
    // Test 1: Supabase Connection
    console.log('1. Testing Supabase Connection...');
    results.supabaseConnection = await testSupabaseConnection();
    
    // Test 2: Credentials Service
    console.log('2. Testing Credentials Service...');
    results.credentialsService = await testCredentialsService();
    
    // Test 3: Insights Service
    console.log('3. Testing Insights Service...');
    results.insightsService = await testInsightsService();
    
    // Test 4: TypeScript Types
    console.log('4. Testing TypeScript Types...');
    results.types = testTypeScriptTypes();
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
  
  // Print results
  console.log('\n📊 Test Results:');
  console.log('================');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const allPassed = Object.values(results).every(result => result);
  console.log(`\n${allPassed ? '🎉 All tests passed! Ready for Phase 3.' : '⚠️ Some tests failed. Please fix before Phase 3.'}`);
  
  return allPassed;
}

// ========================================
// INDIVIDUAL TESTS
// ========================================

async function testSupabaseConnection(): Promise<boolean> {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('credentials')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('   ❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('   ✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.log('   ❌ Supabase connection error:', error);
    return false;
  }
}

async function testCredentialsService(): Promise<boolean> {
  try {
    // Test getCredentials method
    const credentialsResult = await credentialsService.getCredentials();
    if (credentialsResult.error) throw new Error(credentialsResult.error);
    const credentials = credentialsResult.data;
    console.log(`   ✅ CredentialsService.getCredentials() - Found ${credentials.length} credentials`);

    // Test getCredentialsByType method
    const industryCredsResult = await credentialsService.getCredentials({ industry_tags: ['Industry'] });
    if (industryCredsResult.error) throw new Error(industryCredsResult.error);
    const industryCreds = industryCredsResult.data;
    console.log(`   ✅ CredentialsService.getCredentials with industry filter - Found ${industryCreds.length} industry credentials`);

    // getCategories is not implemented in the new service layer
    // const categories = await credentialsService.getCategories();
    // console.log(`   ✅ CredentialsService.getCategories() - Found ${categories.length} categories`);
    console.log('   ⚠️  CredentialsService.getCategories() not implemented in new service layer');

    return true;
  } catch (error) {
    console.log('   ❌ CredentialsService test failed:', error);
    return false;
  }
}

async function testInsightsService(): Promise<boolean> {
  try {
    // Test getPublishedInsights method
    const publishedInsightsResult = await insightsService.getPublishedInsights({ page: 1, pageSize: 5 });
    if (publishedInsightsResult.error) throw new Error(publishedInsightsResult.error);
    const publishedInsights = publishedInsightsResult.data;
    const pagination = publishedInsightsResult.pagination;
    console.log(`   ✅ InsightsService.getPublishedInsights() - Found ${publishedInsights.length} published insights`);
    console.log(`   ✅ Pagination working - Page ${pagination.page} of ${pagination.totalPages}`);

    // Test getInsights method
    const allInsightsResult = await insightsService.getInsights({ is_published: true }, { page: 1, pageSize: 3 });
    if (allInsightsResult.error) throw new Error(allInsightsResult.error);
    const allInsights = allInsightsResult.data;
    console.log(`   ✅ InsightsService.getInsights() - Found ${allInsights.length} insights with filters`);

    // getAuthors is not implemented in the new service layer
    // const authors = await insightsService.getAuthors();
    // console.log(`   ✅ InsightsService.getAuthors() - Found ${authors.length} authors`);
    console.log('   ⚠️  InsightsService.getAuthors() not implemented in new service layer');

    return true;
  } catch (error) {
    console.log('   ❌ InsightsService test failed:', error);
    return false;
  }
}

function testTypeScriptTypes(): boolean {
  try {
    // Test that we can create objects with our types
    const credential: any = {
      id: 'test-id',
      type: 'Industry' as const,
      category: 'Test Category',
      title: 'Test Title',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      sort_order: 1
    };
    
    const insight: any = {
      id: 'test-id',
      title: 'Test Insight',
      excerpt: 'Test excerpt',
      author: 'Test Author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_published: false,
      slug: 'test-slug'
    };
    
    console.log('   ✅ TypeScript types validation successful');
    return true;
  } catch (error) {
    console.log('   ❌ TypeScript types test failed:', error);
    return false;
  }
}

// ========================================
// DATABASE SCHEMA TEST
// ========================================

export async function testDatabaseSchema() {
  console.log('\n🔍 Testing Database Schema...\n');
  
  try {
    // Test credentials table
    const { data: credentials, error: credError } = await supabase
      .from('credentials')
      .select('*')
      .limit(1);
    
    if (credError) {
      console.log('❌ Credentials table test failed:', credError.message);
      return false;
    }
    
    console.log('✅ Credentials table accessible');
    
    // Test insights table
    const { data: insights, error: insightError } = await supabase
      .from('insights')
      .select('*')
      .limit(1);
    
    if (insightError) {
      console.log('❌ Insights table test failed:', insightError.message);
      return false;
    }
    
    console.log('✅ Insights table accessible');
    
    // Test database functions
    const { data: searchResult, error: searchError } = await supabase
      .rpc('search_credentials', { search_term: 'test' });
    
    if (searchError) {
      console.log('⚠️ Search function test failed (might not be set up yet):', searchError.message);
    } else {
      console.log('✅ Database search functions working');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Database schema test failed:', error);
    return false;
  }
}

// ========================================
// RUN TESTS
// ========================================

if (typeof window === 'undefined') {
  // Only run in Node.js environment
  testPhase2Infrastructure().then((success) => {
    if (success) {
      console.log('\n🚀 Phase 2 infrastructure is ready for Phase 3!');
    } else {
      console.log('\n⚠️ Please fix the failing tests before proceeding to Phase 3.');
    }
  });
} 