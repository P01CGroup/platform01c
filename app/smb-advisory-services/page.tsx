import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamCard from "@/components/ui/team-card";
import Credentials, {
  CredentialSlide,
} from "@/components/sections/Credentials";
import OurValuesSlider, { Value } from "@/components/sections/OurValuesSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamShowcase from "@/components/sections/TeamShowcase";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "SMB Advisory Services | Platform01 Consulting",
    description:
      "At Platform01 Consulting, we specialize in empowering Small and Medium Businesses (SMBs) in the UK with bespoke consulting solutions that unlock growth, improve financial clarity, and drive strategic decision-making. Whether you're a startup founder in London, a growth-stage enterprise in Manchester, or a family business in Birmingham, we bring world-class advisory support to help you scale with confidence.",
    keywords:
      "platform01, SMB Advisory Services, small business consulting, SME consulting, business growth, operational improvement, financial advisory, strategy consulting, Platform01 Consulting",
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
      .eq("slug", "/smb-advisory-services")
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

const RestructuringData: ServiceHeroData = {
  subheading: "SMB Advisory Services",
  heading:
    "Professional grade financial modeling services for Small and Medium Businesses in the UK.",
  backgroundImages: {
    mobile: "/services/mobile/smb-advisory.png",
    tablet: "/services/tablet/smb-advisory.png",
    desktop: "/services/desktop/smb-advisory.png",
    ultrawide: "/services/ultrawide/smb-advisory.png",
  },
  showContactForm: true,
  useUKPhoneFormat: true,
};

const teamData = {
  heading: "Our Consulting <br/> Team",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every consulting assignment",
  team: getTeamDataForPage("smb-advisory-services"),
};

const servicesData = [
  {
    title: "Financial Modelling for UK SMBs",
    description: (
      <span>
        Delivering clarity, investor-readiness, and control over your business
        performance.
        <br />
        <br />
        Our financial models are tailored to your business model, stage, and
        goals. Whether you're preparing for your next investment round in the
        UK, expanding to new regions, or exploring exit strategies, our models
        help you make informed decisions.
        <br />
        <br />
        <strong>Our financial modelling services include:</strong>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Three-statement financial models (Profit & Loss, Balance Sheet, Cash
            Flow)
          </li>
          <li>Forecasting and scenario analysis</li>
          <li>DCF and market-based valuations</li>
          <li>Unit economics and breakeven analysis</li>
          <li>Investor-facing financial narratives and pitch support</li>
        </ul>
        We align our models with expectations of UK-based VCs, investors, and
        international funding platforms.
      </span>
    ),
  },
  {
    title: "Market Sizing & Opportunity Assessment in the UK",
    description: (
      <span>
        Understand your total addressable market and identify where to grow.
        Market sizing is critical for business planning, investor engagement,
        and product prioritisation.
        <br />
        <br />
        We support UK SMBs in assessing real market potential using both primary
        and secondary data, delivered with clear and actionable insight.
        <br />
        <br />
        <strong>What we offer:</strong>
        <ul className="list-disc pl-6 mt-2">
          <li>TAM, SAM, and SOM analysis</li>
          <li>Market demand trends by geography and segment</li>
          <li>Consumer behavior and buyer persona research</li>
          <li>Competitive benchmarking</li>
          <li>Opportunity mapping in regional or sector-specific niches</li>
        </ul>
        Our market assessments are especially valuable for SMBs entering new
        verticals or expanding beyond their home city.
      </span>
    ),
  },
  {
    title: "Business Strategy for UK SMBs",
    description: (
      <span>
        Define the path forward with confidence and clarity.
        <br />
        <br />
        We work with founders and leadership teams to co-develop business
        strategies grounded in operational realities and long-term value
        creation. Whether you're launching a new product, building a
        go-to-market strategy, or formalizing a business plan for investors, we
        bring rigour, insight, and execution support.
        <br />
        <br />
        <strong>Strategic services include:</strong>
        <ul className="list-disc pl-6 mt-2">
          <li>Business model validation and pivot strategy</li>
          <li>Go-to-market planning (B2C, B2B, D2C)</li>
          <li>Fundraising strategy and investor positioning</li>
          <li>KPI frameworks and performance dashboards</li>
          <li>
            Strategic plans aligned with VC, PE, or family office expectations
          </li>
        </ul>
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Platform01 for UK SMBs?",
  values: [
    {
      title: "High Value <br/>for Money",
      description:
        "We offer institutional grade quality of work with exceptional value.",
      icon: "dollar",
    },
    {
      title: "Global Experience, <br/>Local Insight",
      description:
        "We blend international consulting standards with a strong understanding of UK business contexts and regional markets.",
      icon: "globe", // This will use the Globe icon
    },
    {
      title: "Investor-Aware <br/>Advisory",
      description:
        "We know what investors, banks, and partners look for. We help you build business cases and narratives that resonate.",
    },
    {
      title: "Custom-Tailored <br/> Delivery",
      description:
        "No one-size-fits-all templates. Every engagement is tailored to your industry, stage, and ambition.",
    },
  ],
};
const faqData: FAQItem[] = [
  {
    question: "What is SMB advisory and why is it important in the UK?",
    answer: (
      <span>
        SMB advisory services help businesses navigate growth, funding, and
        operational decisions. In dynamic markets like the UK, where startups
        and SMBs face intense competition and complex regulations, having access
        to experienced advisors can be the difference between scaling and
        stagnating.
      </span>
    ),
  },
  {
    question: "What types of financial models do you create for UK businesses?",
    answer: (
      <span>
        We build investor-grade financial models including:
        <ul className="list-disc pl-6 mt-2">
          <li>P&L forecasts</li>
          <li>Cash flow projections</li>
          <li>Valuation models</li>
          <li>Unit economics</li>
        </ul>
        All models are tailored to funding rounds, board reviews, and
        operational planning in UK business contexts.
      </span>
    ),
  },
  {
    question: "Can you help UK startups prepare for VC fundraising?",
    answer: (
      <span>
        Yes. We specialize in:
        <ul className="list-disc pl-6 mt-2">
          <li>Pitch deck preparation</li>
          <li>Financial storytelling</li>
          <li>Fundraising strategy</li>
        </ul>
        We align your materials with what UK VCs and international investors
        look for at each stage of the funding lifecycle.
      </span>
    ),
  },
  {
    question: "How do you conduct market sizing for UK SMBs?",
    answer: (
      <span>
        We combine:
        <ul className="list-disc pl-6 mt-2">
          <li>Secondary research</li>
          <li>Local datasets</li>
          <li>Industry reports</li>
          <li>Competitor analysis</li>
        </ul>
        This delivers TAM/SAM/SOM insights, consumer trends, and whitespace
        mapping, with a focus on UK cities like London, Manchester, Birmingham,
        and Edinburgh.
      </span>
    ),
  },
  {
    question: "What industries do you serve in the UK?",
    answer: (
      <span>
        We work across sectors including but not limited to:
        <ul className="list-disc pl-6 mt-2">
          <li>Fintech and SaaS</li>
          <li>Consumer goods and D2C</li>
          <li>Health and wellness</li>
          <li>Food & Beverage</li>
          <li>Professional services</li>
          <li>Retail and e-commerce</li>
        </ul>
      </span>
    ),
  },
  {
    question: "Do you work with remote or international clients from the UK?",
    answer: (
      <span>
        Yes. Most of our UK clients are supported remotely through:
        <ul className="list-disc pl-6 mt-2">
          <li>Virtual sessions</li>
          <li>Collaborative tools</li>
          <li>Flexible scheduling</li>
        </ul>
        This ensures seamless delivery and support across the UK and
        internationally.
      </span>
    ),
  },
];

const Restructuring = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    // service_tags: ['Restructuring'],
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
        {...RestructuringData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5 pb-20">
        <Header text="SMB Advisory Services" className="mb-26" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <h2 className="heading-4 md:col-span-2">
            At Platform01 Consulting, We specialize in empowering Small and
            Medium Businesses (SMBs) with bespoke consulting solutions that
            unlock growth, improve financial clarity, and drive strategic
            decision-making. Whether you're a startup founder, a growth-stage
            enterprise, or a family business, we bring world-class consulting to
            help you scale with confidence.
          </h2>
          <div>
            <p className="heading-5 md:col-span-2 text-dark/50 mb-4">
              Our team of experienced consultants, former operators, and finance
              professionals work closely with SMBs across sectors to deliver
              actionable solutions in three core areas:{" "}
            </p>
            <ChecklistItem
              text="Financial Modelling"
              className="py-3.5 border-b border-dark/10"
            />
            <ChecklistItem
              text="Market Sizing"
              className="py-3.5 border-b border-dark/10"
            />
            <ChecklistItem text="Business Strategy" className="py-3.5 " />
          </div>
        </div>
      </div>
      <TeamShowcase
        title="Our Consulting Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={true}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} bgSurface={false} />
        ))}
      </TeamShowcase>

      <div className="py-16">
        <div className="container grid grid-cols-1 gap-8 gap-y-16">
          <div>
            <h2 className="heading-3">Who We Work With</h2>
            <hr className="border-dark/10 my-3" />
            <p className="text-md text-dark/50 mt-4">
              We understand the nuances of doing business in UK cities such as
              London, Birmingham, Manchester, and Edinburgh, while applying
              globally recognised best practices. We serve:
            </p>
          </div>
          <div className="">
            <h3 className="heading-5">Our plans are:</h3>
            <hr className="border-dark/10 my-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ChecklistItem
                text="Early-stage startups preparing to raise capital"
                className="py-1.5"
              />
              <ChecklistItem
                text="Family-owned businesses professionalizing operations"
                className="py-1.5"
              />
              <ChecklistItem
                text="Growth-stage companies expanding to new markets"
                className="py-1.5"
              />
              <ChecklistItem
                text="SMBs navigating transformation or M&A events"
                className="py-1.5"
              />
              <ChecklistItem
                text="VC-backed startups seeking financial and strategic support"
                className="py-1.5"
              />
            </div>
          </div>
        </div>
      </div>
      <ServicesSection
        services={servicesData}
        bgSurface={true}
        heading="Our Core SMB Services"
      />

      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
      />

      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We&apos;ve advised across industries including Infrastructure, Real Estate, Technology, Logistics, and Industrials — covering distressed business valuations, strategic options analysis, business diagnostics and turnaround strategies."
        }
      />
      {/* 
     <DynamicInsightsSlider bgSurface={true} /> */}

      <CallToAction
        heading="Ready to Transform Your SMB's Trajectory?"
        description="Whether you need a robust financial model, a market entry plan, or strategic guidance to grow your business—Platform01 Consulting is your partner for growth."
      />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default Restructuring;
