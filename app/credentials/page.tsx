import HeroInner from '@/components/sections/HeroInner';
import CredentialsRealtime from '@/components/sections/CredentialsRealtime';
import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function generateMetadata() {
  let seo = {
    title: 'Credentials | Platform01 Consulting',
    description: 'Discover our credentials and expertise at Platform01.',
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
      .eq('slug', '/credentials')
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

export default function CredentialsPage() {
  return (
    <>
      <HeroInner
        title="Decades of experience.<br/>Billions in advisory value."
        supportingText="Platform01 Consulting's leadership team has successfully delivered 200+ strategic and financial consulting engagements globally in 100+ years of professional experience with globally renowned corporates, investors and services firms."
      />
      <Suspense fallback={<div className='container py-16'>Loading credentials...</div>}>
        <CredentialsRealtime 
          type="browser" 
          filters={{ is_active: true }}
        />
      </Suspense>
    </>
  );
} 