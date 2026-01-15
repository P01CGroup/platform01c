import { notFound } from 'next/navigation';
import { Insight as DBInsight } from '@/lib/types/cms';
import Image from 'next/image';
import HeroInsight from '@/components/sections/HeroInsight';
import Header from '@/components/ui/header';
import { supabaseAdmin } from '@/lib/supabase/admin';


async function fetchInsight(slug: string): Promise<DBInsight | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/insights?slug=${slug}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data.data) ? data.data[0] : data.data;
}

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await fetchInsight(slug);
  if (!insight) return notFound();

  return (
    <>
      <HeroInsight 
        title={insight.title} 
        backgroundImage={insight.image_url} 
        excerpt={insight.excerpt} 
        date={insight.published_date}
        updatedDate={insight.updated_at}
      />
      <div className="container py-4">
        <Header text={`Author: <span className="text-dark/50">${insight.author}</span> ${insight.co_author && `, Co-Author: <span className="text-dark/50">${insight.co_author}</span>`}`} />
        <div className="prose prose-md max-w-none mt-20" dangerouslySetInnerHTML={{ __html: insight.content || 'No Content' }} />
        <div className="mt-8 text-xs text-dark/40 py-10">
          Tags: {insight.tags?.join(', ') || 'None'}
        </div>
      </div>
    </>
  );
}

// @ts-expect-error Next.js provides the correct types at runtime
export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Fetch the insight and its SEO data
  let insight = null;
  let seo = {
    title: 'Insight | Platform01 Consulting',
    description: 'Insight details and thought leadership from Platform01.',
    keywords: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
  };
  try {
    const { data } = await supabaseAdmin
      .from('insights')
      .select('title, excerpt, content, tags, image_url, seo')
      .eq('slug', slug)
      .single();
    if (data) {
      insight = data;
      // Autogenerate defaults from the insight if not set in SEO
      seo = {
        title: data.seo?.title || data.title || seo.title,
        description: data.seo?.description || data.excerpt || seo.description,
        keywords: data.seo?.keywords || (data.tags ? data.tags.join(', ') : ''),
        canonical_url: data.seo?.canonical_url || '',
        og_title: data.seo?.og_title || data.seo?.title || data.title || seo.title,
        og_description: data.seo?.og_description || data.seo?.description || data.excerpt || seo.description,
        og_image: data.seo?.og_image || data.image_url || '',
        twitter_title: data.seo?.twitter_title || data.seo?.title || data.title || seo.title,
        twitter_description: data.seo?.twitter_description || data.seo?.description || data.excerpt || seo.description,
        twitter_image: data.seo?.twitter_image || data.image_url || '',
      };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.og_title || seo.title,
      description: seo.og_description || seo.description,
      images: seo.og_image ? [seo.og_image] : [],
      url: seo.canonical_url || undefined,
    },
    twitter: {
      title: seo.twitter_title || seo.title,
      description: seo.twitter_description || seo.description,
      images: seo.twitter_image ? [seo.twitter_image] : [],
      card: 'summary_large_image',
    },
    alternates: {
      canonical: seo.canonical_url || undefined,
    },
  };
} 