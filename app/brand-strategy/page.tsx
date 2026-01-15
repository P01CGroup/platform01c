import { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamText from "@/components/sections/TeamText";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";
import Credentials from "@/components/sections/Credentials";
import ServicesSection from "@/components/sections/ServicesSection";
import OurValuesSlider from "@/components/sections/OurValuesSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { shuffleArray } from "@/lib/utils";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import {
  BarChart3,
  Globe,
  Calculator,
  TrendingUp,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Brand Strategy | Platform01 Consulting",
    description: "Description for Brand Strategy page.",
    keywords: "platform01, Brand Strategy",
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
      .eq("slug", "/brand-strategy")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

const BrandStrategyData: ServiceHeroData = {
  subheading: "Brand Strategy & Marketing",
  heading: "The Architecture <br/> of Meaning",
  backgroundImages: {
    mobile: "/services/mobile/brand-strategy.png",
    tablet: "/services/tablet/brand-strategy.png",
    desktop: "/services/desktop/brand-strategy.png",
    ultrawide: "/services/ultrawide/brand-strategy.png",
  },
  showContactForm: true,
};

const servicesData = [
  {
    title: "Consumer & Customer Insight Development",
    description: (
      <span>
        We uncover deep behavioral and attitudinal insights through market
        research, segmentation analysis, and ethnographic studies — enabling
        brands to tailor strategies that align with real customer motivations
        and decision drivers.
      </span>
    ),
  },
  {
    title: "Brand Identity Creation",
    description: (
      <span>
        We develop comprehensive brand systems from the ground up — including
        name, logo, typography, color systems, and brand voice — designed to
        ensure consistency, differentiation, and recognition across all
        platforms.
      </span>
    ),
  },
  {
    title: "Brand Positioning",
    description: (
      <span>
        We craft clear, compelling positioning strategies that define your value
        proposition, set you apart from competitors, and anchor your messaging
        in a strong strategic narrative aligned with business goals.
      </span>
    ),
  },
  {
    title: "Communication Design & Optimization",
    description: (
      <span>
        We create and refine brand communication frameworks across all channels
        — from core messaging to campaign storytelling — ensuring consistency,
        clarity, and resonance with your audience at every touchpoint.
      </span>
    ),
  },
  {
    title: "Marketing Strategy, Planning & Process Optimization",
    description: (
      <span>
        We build integrated marketing strategies and refine internal marketing
        operations — improving planning cycles, campaign execution, and channel
        performance for better outcomes and ROI.
      </span>
    ),
  },
  {
    title: "Pricing & Sensitivity Analysis",
    description: (
      <span>
        We conduct detailed pricing studies, sensitivity modeling, and market
        benchmarking to help you optimize pricing structures that reflect
        perceived value while maximizing revenue and competitive advantage.
      </span>
    ),
  },
  {
    title: "Customized Workshops & Team Upskilling",
    description: (
      <span>
        We design and deliver custom training programs for marketing teams and
        executives — focused on brand strategy, storytelling, campaign planning,
        and digital marketing to build internal capability and alignment.
      </span>
    ),
  },
  {
    title: "Reputation Management & Enhancement",
    description: (
      <span>
        We guide companies, executives, and boards on managing brand reputation
        — from crisis preparedness to narrative shaping — ensuring trust,
        credibility, and alignment with long-term positioning.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Does Brand Matter?",
  supportingText:
    "Brand isn't just a logo or identity — it's a strategic driver of financial performance, market growth, cultural alignment, and consumer behavior. These perspectives show how a strong brand creates measurable value across your business.",
  values: [
    {
      title: "Financial Perspective",
      description:
        "Stronger brands correlate with better stock performance and investor confidence. Brands are recognized as financial assets on the balance sheet, directly impacting valuation.",
      icon: "dollar",
    },
    {
      title: "Consumer Perspective",
      description:
        "A well-positioned brand influences customer choice, stands out in commoditized categories, commands price premiums, and builds deep loyalty beyond rational product attributes.",
      icon: "users",
    },
    {
      title: "Growth Perspective",
      description:
        "Brand salience helps attract new customers, accelerate market expansion, and unlock new categories — while enabling strategic control over the PR narrative.",
      icon: "trending",
    },
    {
      title: "Cultural Perspective",
      description:
        "Brands shape internal culture and external perception. They drive disproportionate share of voice, enhance employee morale, and reduce partner acquisition costs.",
      icon: "heart",
    },
    {
      title: "Reputational Perspective",
      description:
        "Brands help manage public perception and trust. Proactive reputation management safeguards against volatility and enhances long-term stakeholder relationships.",
      icon: "shield",
    },
    {
      title: "Strategic Asset Perspective",
      description:
        "Beyond communications, a brand is a north star — aligning marketing, operations, and leadership around a unified value system and business thesis.",
      icon: "target",
    },
  ],
};

const BrandStrategy = async () => {
  // Fetch credentials with the relevant service tag
  let credentials: Credential[] = [];
  let error: string | null = null;

  try {
    const result = await credentialsService.getCredentials({
      service_tags: ["Business Strategy", "Business Plan"],
      is_active: true,
    });
    credentials = result.data || [];
    error = result.error;
  } catch (err) {
    console.error("Failed to fetch credentials:", err);
    error = "Failed to load credentials";
  }

  // Map to CredentialSlide
  const slides = credentials.map((c: Credential) => ({
    type: "service",
    category: c.service_tags.join(", "),
    title: c.title,
  }));

  return (
    <>
      <ServiceHero
        {...BrandStrategyData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <TeamText
        teamMember="omar-abedin"
        bgSurface={false}
        className="!justify-between"
      >
        <h4 className="text-dark/50">
          Helping brands maximize sustainable consumer, corporate and
          shareholder value over time through our practitioner-led marketing
          consultation services.
        </h4>
        <div className="flex flex-col">
          <h3 className="relative max-w-[650px]">
            Every action you take is either a deposit into, or a withdrawal
            from, the Bank of Brand Equity
            <div className="text-[220px] leading-[180px] absolute top-0 -left-15 italic opacity-5">
              "
            </div>
          </h3>
          <hr className="border-dark/10 my-5" />
          <h4 className="italic text-right pr-5 text-dark/50 !font-sans !text-xl">
            - Omar Abedin
          </h4>
        </div>
      </TeamText>
      <ServicesSection
        services={servicesData}
        heading="Our Brand Strategy & Marketing Services"
        bgSurface={true}
      />
      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />
      <div className="bg-surface py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between">
            <h3 className="leading-snug">
              The Brand Equity <br /> Cause & Effect Ladder
            </h3>
            <h5 className="text-dark/50">
              Instead of focusing on revenue and shipments, which we measure
              every day, we focus on understanding and driving the consumer
              perceptions necessary to maximize market share through our
              marketing strategy consulting!
            </h5>
          </div>
          <div className="relative aspect-3/2">
            <Image
              src="/ce_ladder.svg"
              fill
              className="object-contain"
              alt="Brand Equity Cause & Effect Ladder"
            />
          </div>
        </div>
      </div>
      <DynamicInsightsSlider />
      <CallToAction />
    </>
  );
};

export default BrandStrategy;
