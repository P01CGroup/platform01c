import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  let totalCredentials = 0;
  let activeCredentials = 0;
  let totalInsights = 0;
  let publishedInsights = 0;

  try {
    // Credentials
    const { data: credentials } = await supabaseAdmin
      .from('credentials')
      .select('is_active');
    if (credentials) {
      totalCredentials = credentials.length;
      activeCredentials = credentials.filter((c: any) => c.is_active).length;
    }
    // Insights
    const { data: insights } = await supabaseAdmin
      .from('insights')
      .select('is_published');
    if (insights) {
      totalInsights = insights.length;
      publishedInsights = insights.filter((i: any) => i.is_published).length;
    }
  } catch (e) {}

  return NextResponse.json({
    totalCredentials,
    activeCredentials,
    totalInsights,
    publishedInsights,
  });
} 