import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamText from "@/components/sections/TeamText";
import Credentials from "@/components/sections/Credentials";
// import OurValuesSlider, { Value } from '@/components/sections/OurValuesSlider'
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
// import { getSeoMetadata } from '@/lib/seo-config';
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ServicesSection from "@/components/sections/ServicesSection";
import ConsultingServices from "@/components/sections/ConsultingServices";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Contact Us | Platform01 Consulting",
    description: "Description for Contact Us page.",
    keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url: "https://www.platform01consulting.com/contact-us",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/contact-us")
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

const feasibilityStudyData: ServiceHeroData = {
  subheading: "",
  heading: "Contact Us",
  smallHeading: "Award Winning Strategy and Advisory Firm",
  backgroundImages: {
    mobile: "/services/mobile/feasibility-study.png",
    tablet: "/services/tablet/feasibility-study.png",
    desktop: "/services/desktop/feasibility-study.png",
    ultrawide: "/services/ultrawide/feasibility-study.png",
  },
  // awards: [
  //   {
  //     image: "/awards/strategist-award.png",
  //     text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
  //     alt: "Top M&A Boutique UAE - 2025",
  //   },
  // ],
  awards: [
    {
      image: "/awards/top-consulting-firm-middle-east.png",
      text: "Top Consulting Firm <br/> ConsultancyME",
      alt: "Top Consulting Firm 2025 Middle East 2025",
    },
    {
      image: "/awards/strategist-award.png",
      text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
      alt: "Top Strategist - 2026",
    },
    {
      image: "/awards/ma-award-1.png",
      text: "Top M&A Advisory <br/> Boutique 2025",
      alt: "Top M&A Advisory Boutique 2025",
    },
  ],
  showContactForm: true,
};

const ContactUs = async () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Contact Us | Platform01 Consulting",
            description: "Description for Contact Us page.",
            url: "https://www.platform01consulting.com/feasibility-study-ksa",
            provider: {
              "@type": "Organization",
              name: "Platform01 Consulting",
              award: [
                "Top Consulting Firm ConsultancyME 2025",
                "Top Strategist GCC 2026",
                "Top M&A Advisory Boutique 2025",
              ],
            },
            areaServed: [
              "Saudi Arabia",
              "United Arab Emirates",
              "United Kingdom",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.platform01consulting.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact Us",
                item: "https://www.platform01consulting.com/contact-us",
              },
            ],
          }),
        }}
      />
      <ServiceHero
        {...feasibilityStudyData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <ConsultingServices />
    </>
  );
};

export default ContactUs;
