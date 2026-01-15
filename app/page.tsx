import Hero from "@/components/sections/Hero";
import ConsultingServices from "@/components/sections/ConsultingServices";
import CredentialsRealtime from "@/components/sections/CredentialsRealtime";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import OurValuesSlider, { Value } from "@/components/sections/OurValuesSlider";
import { BackgroundImages } from "@/lib/types";
import Seo from "@/components/Seo";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  Users,
  Target,
  Shield,
  DollarSign,
  TrendingUp,
  Award,
} from "lucide-react";

export async function generateMetadata() {
  // Fetch SEO data for homepage
  let seo = {
    title: "Platform01 Consulting - Your Platform for Strategic Success",
    description:
      "Platform01 is providing We serve as consultants to some of the world's fastest-growing companies and renowned investors.",
    keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url: "",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
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
      card: "summary_large_image",
    },
    alternates: {
      canonical: seo.canonical_url || undefined,
    },
  };
}

const HERO_BACKGROUND_IMAGES: BackgroundImages = {
  mobile: "/the_firm-mobile.png",
  tablet: "/the_firm-tablet.png",
  desktop: "/the_firm-desktop.png",
  ultrawide: "/the_firm-ultrawide.png",
};

const VALUES: Value[] = [
  {
    title: "Exceptional Team",
    description:
      "Led by industry experts with global experience and exceptional qualifications from top business schools.",
    icon: "users",
  },
  {
    title: "Depth Over Templates",
    description:
      "Every engagement is grounded in rigorous thinking, deep commercial context, and bespoke deliverables.",
    icon: "target",
  },
  {
    title: "Trust of Market Leaders",
    description:
      "We are a trusted consultant to corporations, institutional investors, and family offices across the region.",
    icon: "shield",
  },
  {
    title: "High Value For Money",
    description:
      "Our business model provides the best value for money to our clients with minimal overhead costs.",
    icon: "dollar",
  },
  {
    title: "Strategy + Finance",
    description:
      "Our proposed strategic solutions are based on strong business and financial fundamentals.",
    icon: "trending",
  },
  {
    title: "Quality > Quantity",
    description:
      "We deliver 'brief' and 'to-the-point' but robust deliverables backed by in-depth strategic analysis.",
    icon: "award",
  },
];

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // Fetch SEO data for homepage
  let seo = {
    title: "Platform01 Consulting - Your Platform for Strategic Success",
    description:
      "Platform01 is providing We serve as consultants to some of the world's fastest-growing companies and renowned investors.",
    keywords: "",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}

  // Tabs for Credentials component
  const tabs = [
    { label: "Industry", value: "industry" },
    { label: "Service", value: "service" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero backgroundImages={HERO_BACKGROUND_IMAGES} />
      <ConsultingServices />
      <CredentialsRealtime
        type="slider"
        filters={{ is_active: true }}
        tabs={tabs}
        bgSurface={true}
        heading="Our Credentials"
        supportingText="We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision."
      />
      <DynamicInsightsSlider />
      <OurValuesSlider values={VALUES} bgSurface={true} />
    </div>
  );
}
