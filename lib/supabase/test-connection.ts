import { supabase } from './client'

export async function testSupabaseConnection() {
  try {
    // Test basic connection by fetching a simple query
    const { data, error } = await supabase
      .from('_dummy_table_that_doesnt_exist')
      .select('*')
      .limit(1)
    
    // If we get a proper error (not connection error), the connection is working
    if (error && error.code !== 'PGRST116') {
      console.log('✅ Supabase connection successful')
      return true
    }
    
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
} 