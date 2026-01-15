import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('value')
    .eq('key', 'robots_txt')
    .single();
  if (error || !data) {
    return NextResponse.json({ value: '' }, { status: 200 });
  }
  return NextResponse.json({ value: data.value });
}

export async function POST(request: NextRequest) {
  const { value } = await request.json();
  if (typeof value !== 'string') {
    return NextResponse.json({ error: 'Invalid value' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert({ key: 'robots_txt', value });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 