import { supabaseAdmin } from '@/lib/supabase/admin';
export async function generateMetadata() {
  let seo = {
    title: 'Insights | Platform01 Consulting',
    description: 'Explore the latest insights and thought leadership from Platform01.',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
  };
  try {
    const { data } = await supabaseAdmin
      .from('static_pages')
      .select('seo')
      .eq('slug', '/insights')
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || '' };
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
import InsightsClientPage from './client-page';

// Use client-side rendering for better real-time updates
export default function InsightsPage() {
  return <InsightsClientPage />;
} 