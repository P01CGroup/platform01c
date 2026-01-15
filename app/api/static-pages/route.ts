import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getServerAdminUser } from '@/lib/auth/admin-auth';

// GET: List all static pages or fetch by slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const adminUser = await getServerAdminUser(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (slug) {
    // Fetch by slug
    const { data, error } = await supabaseAdmin
      .from('static_pages')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ data });
  } else {
    // List all
    const { data, error } = await supabaseAdmin
      .from('static_pages')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  }
}

// POST: Create new static page SEO entry
export async function POST(request: NextRequest) {
  const adminUser = await getServerAdminUser(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const { slug, seo } = body;
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('static_pages')
    .insert([{ slug, seo: seo || {} }])
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

// PUT: Update SEO for a static page by slug
export async function PUT(request: NextRequest) {
  const adminUser = await getServerAdminUser(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const { slug, seo } = body;
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('static_pages')
    .update({ seo, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

// DELETE: Remove a static page SEO entry by slug
export async function DELETE(request: NextRequest) {
  const adminUser = await getServerAdminUser(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('static_pages')
    .delete()
    .eq('slug', slug);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
} 