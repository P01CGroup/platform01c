import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('value')
    .eq('key', 'sitemap_exclude')
    .single();
  if (error || !data) {
    return NextResponse.json({ value: [] }, { status: 200 });
  }
  try {
    const value = JSON.parse(data.value);
    return NextResponse.json({ value });
  } catch {
    return NextResponse.json({ value: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const { value } = await request.json();
  if (!Array.isArray(value)) {
    return NextResponse.json({ error: 'Invalid value' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert({ key: 'sitemap_exclude', value: JSON.stringify(value) });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 