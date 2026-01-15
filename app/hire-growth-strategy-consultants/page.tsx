import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import TeamCard from "@/components/ui/team-card";
import Credentials, {
  CredentialSlide,
} from "@/components/sections/Credentials";
import OurValuesSlider, { Value } from "@/components/sections/OurValuesSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamText from "@/components/sections/TeamText";
import Image from "next/image";
import ArrowRight from "@/components/icons/ArrowRight";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Growth Strategy | Platform01 Consulting",
    description: "Description for Growth Strategy page.",
    keywords: "platform01, Growth Strategy",
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
      .eq("slug", "/hire-growth-strategy-consultants")
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

const GrowthStrategyData: ServiceHeroData = {
  subheading: "Growth Strategy Consulting",
  heading: "Unlock Sustainable Business Growth",
  backgroundImages: {
    mobile: "/services/mobile/growth-strategy.png",
    tablet: "/services/tablet/growth-strategy.png",
    desktop: "/services/desktop/growth-strategy.png",
    ultrawide: "/services/ultrawide/growth-strategy.png",
  },
  showContactForm: true,
};

const teamData = getTeamDataForPage("growth-strategy");

const servicesData = [
  {
    title: "Regionally Relevant Insight",
    description: (
      <span>
        Deep understanding of the economic, regulatory, and cultural nuances in
        Saudi Arabia and the UAE.
      </span>
    ),
  },
  {
    title: "Practitioner Approach",
    description: (
      <span>
        Our strategies are rooted in decades of hands-on experience scaling
        businesses across sectors.
      </span>
    ),
  },
  {
    title: "Execution-Oriented Planning",
    description: (
      <span>
        We don't stop at PowerPoints — we build detailed growth roadmaps with
        action plans, KPIs, and resource plans.
      </span>
    ),
  },
  {
    title: "Data-Driven Decision Making",
    description: (
      <span>
        From TAM analysis to pricing levers, we ground every recommendation in
        quantifiable insights.
      </span>
    ),
  },
  {
    title: "Cross-Border Expertise",
    description: (
      <span>
        For UAE and KSA clients looking to expand into new GCC markets or
        globally, we build viable go-to-market pathways.
      </span>
    ),
  },
];

const faqData: FAQItem[] = [
  {
    question:
      "What industries do you specialize in for growth strategy consulting?",
    answer: (
      <span>
        We serve clients across all sectors including but not limited to
        consumer goods, real estate, F&B, logistics, financial services, and
        technology. Our sector knowledge is tailored to both UAE and Saudi
        Arabia markets.
      </span>
    ),
  },
  {
    question: "Do you help with implementation or just strategy?",
    answer: (
      <span>
        We go beyond strategy. Platform01 builds execution plans and can support
        ongoing implementation, PMO setup, and performance tracking.
      </span>
    ),
  },
  {
    question: "What makes Platform01 different from other consulting firms?",
    answer: (
      <span>
        Unlike traditional firms, we adopt a practitioner mindset. Our
        consultants are former operators and industry professionals, not just
        advisors.
      </span>
    ),
  },
  {
    question:
      "Can you help a startup or SME, or do you only work with large corporations?",
    answer: (
      <span>
        Absolutely. We work with startups, family offices, and mid-sized
        enterprises. Our advice is tailored to your stage, resources, and
        ambition.
      </span>
    ),
  },
  {
    question: "How long does a typical growth strategy engagement take?",
    answer: (
      <span>
        It depends on the complexity, but most projects take 6 to 12 weeks —
        from diagnosis to full strategy delivery.
      </span>
    ),
  },
  {
    question: "Is your service available in Arabic?",
    answer: (
      <span>
        Yes. We provide bilingual support in both English and Arabic to ensure
        stakeholder alignment across the organization.
      </span>
    ),
  },
  {
    question: "Do you help with market entry into Saudi Arabia or the UAE?",
    answer: (
      <span>
        Yes. We design and validate market entry strategies for international
        clients entering the GCC, as well as local businesses expanding
        regionally.
      </span>
    ),
  },
  {
    question: "Will I get a presentation or a full strategy report?",
    answer: (
      <span>
        We deliver a comprehensive strategy document with financial modeling, a
        growth roadmap, and execution tools — not just a slide deck.
      </span>
    ),
  },
  {
    question: "Can you work with internal teams during the engagement?",
    answer: (
      <span>
        Yes. We actively collaborate with marketing, operations, and finance
        teams to ensure knowledge transfer and alignment throughout the process.
      </span>
    ),
  },
  {
    question: "How do we get started?",
    answer: (
      <span>
        Contact us for a free consultation. We'll assess your current situation,
        growth objectives, and how we can help you achieve them.
      </span>
    ),
  },
];

const GrowthStrategy = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Growth Strategy", "Business Strategy"],
    is_active: true,
  });

  // Map to CredentialSlide
  const slides = credentials.map((c: Credential) => ({
    type: "service",
    category: c.service_tags.join(", "),
    title: c.title,
  }));

  return (
    <>
      <ServiceHero
        {...GrowthStrategyData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5">
        <Header text="Growth Strategy Consulting" className="mb-26" />
        <TeamText parentClasses="pt-0" bgSurface={false}>
          <div>
            <h2 className="heading-3 max-w-[450px]">
              Drive Scalable Growth with a Bespoke Strategy
            </h2>
            <hr className="border-dark/10 my-8" />
            <h2 className="heading-4 text-dark/50">
              At Platform01 Consulting, we specialize in crafting bespoke growth
              strategies that align with your vision, capabilities, and market
              dynamics. Whether you're a founder-led startup in Riyadh, a family
              business in Jeddah, or a conglomerate in Dubai, we bring
              real-world commercial acumen and strategic clarity to accelerate
              your business.
            </h2>
          </div>
          <div>
            <p>
              We don&apos;t deliver off-the-shelf playbooks. We partner with
              clients to develop ambitious yet realistic growth strategies,
              based on rigorous analysis, stakeholder input, and practical
              execution levers.
            </p>
          </div>
        </TeamText>
      </div>
      <div className="bg-surface py-16">
        <div className="container">
          <h2 className="heading-3 max-w-[1010px]">
            Our SMEs and Senior Practitioners bring deep Industry Expertise from
            reputable Global Corporations and Financial Institutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-20">
            {teamData.map((item, index) => (
              <TeamCard key={index} member={item} bgSurface={false} />
            ))}
          </div>
        </div>
      </div>
      <ServicesSection services={servicesData} />
      <div className="bg-surface py-20">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="md:col-span-3 flex flex-col justify-center">
            <h2 className="heading-2 max-w-[1010px]">
              Download Our <br /> Free Guide
            </h2>
            <h4 className="text-dark/50 mt-4 max-w-[700px]">
              Explore actionable insights and proven frameworks for shaping a
              successful growth strategy in Saudi Arabia and the UAE. This guide
              covers market dynamics, entry strategies, and best practices for
              achieving sustainable, long‑term expansion in the region.
            </h4>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <div className="bg-white relative aspect-[2.3/3] overflow-hidden">
                <OptimizedImage
                  src="/book-cover.png"
                  alt="Growth Strategy"
                  fill
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  priority
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9p6k9wAAAABJRU5ErkJggg=="
                />
              </div>
              <div>
                <h5 className="leading-tight">
                  Strategic Growth Guide for Businesses in Saudi Arabia & UAE
                </h5>
              </div>
              <button className="flex justify-between items-center gap-5 border-t border-dark/10 py-2 text-left w-full cursor-pointer">
                <span>Download PDF</span>
                <ArrowRight className="w-4 h-4 stroke-dark/50" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Credentials
        slides={slides}
        bgSurface={false}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />
      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction buttonText="Talk to an expert" />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default GrowthStrategy;
