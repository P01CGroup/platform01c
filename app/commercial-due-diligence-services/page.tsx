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
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
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
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Due Diligence | Platform01 Consulting",
    description: "Description for Due Diligence page.",
    keywords: "platform01, Due Diligence",
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
      .eq("slug", "/commercial-due-diligence-services")
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

const DueDiligenceData: ServiceHeroData = {
  subheading: "Invest with Certainty. Backed by Strategic Intelligence.",
  heading: "Empowering Confident Investment Decisions with Deep Market Insight",
  backgroundImages: {
    mobile: "/services/mobile/commercial-due-deligence.png",
    tablet: "/services/tablet/commercial-due-deligence.png",
    desktop: "/services/desktop/commercial-due-deligence.png",
    ultrawide: "/services/ultrawide/commercial-due-deligence.png",
  },
  showContactForm: true,
};

const teamData = {
  heading: "Commercial Due Diligence Team",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every deal",
  team: getTeamDataForPage("due-diligence"),
};

const servicesData = [
  {
    title: "Market Attractiveness",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Market size and growth (TAM, SAM, SOM)</li>
          <li>Competitive dynamics and barriers to entry</li>
          <li>Demand drivers and macroeconomic factors</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Business Model Viability",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Revenue streams, unit economics, customer segmentation</li>
          <li>Pricing strategy, customer retention, and acquisition costs</li>
          <li>Scalability and operational leverage</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Competitive Positioning",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Benchmarking against key competitors</li>
          <li>SWOT and white space analysis</li>
          <li>Brand perception and differentiation</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Management & Execution Capability",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Review of leadership capability</li>
          <li>Organizational structure and governance</li>
          <li>Strategic alignment with market opportunity</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Commercial Risk Assessment",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Key assumptions stress-tested</li>
          <li>Scenario analysis on upside/downside</li>
          <li>Red flags and risk mitigation paths</li>
        </ul>
      </span>
    ),
  },
];

const valuesData = {
  heading: "Tailored Scope for Optimal Value?",
  supportingText:
    'We understand that every project is Unique. There&apos;s NO "One-Size-Fits-All" approach to Business Valuations. We tailor the scope of each study to your Specific Needs, Requirements, and Target Audience, ensuring Efficiency and Precision in the process.',
  values: [
    {
      title: "Detailed Financial Analysis",
      description:
        "Examining historical performance, projected earnings, and financial health.",
    },
    {
      title: "Industry & Market Assessment",
      description:
        "Evaluating sector trends, competitive landscape, and macroeconomic factors.",
    },
    {
      title: "Valuation <br/> Methodologies",
      description:
        "Applying DCF, market multiples, and transaction comparables to ensure a robust valuation.",
    },
    {
      title: "Scenario Analysis & Sensitivities",
      description:
        "Stress-testing assumptions to provide reliable valuation insights and highlight key risks.",
    },
    {
      title: "Comprehensive <br/> Valuation Report",
      description:
        "Delivering a clear, well-documented valuation report with actionable insights.",
    },
  ],
};
const faqData: FAQItem[] = [
  {
    question:
      "What is Commercial Due Diligence and how is it different from financial due diligence?",
    answer: (
      <span>
        Commercial Due Diligence (CDD) assesses the market, competitive
        positioning, and business model viability of a target — while financial
        due diligence focuses on the numbers. CDD is about validating the
        strategic rationale of the investment.
      </span>
    ),
  },
  {
    question:
      "Do you offer standalone CDD or integrated support with financial/legal advisors?",
    answer: (
      <span>
        We offer standalone CDD as well as the ability to collaborate with your
        financial, legal, or technical due diligence teams for an integrated
        approach.
      </span>
    ),
  },
  {
    question: "What sectors do you specialize in for CDD?",
    answer: (
      <span>
        We have strong experience across FMCG, technology, education,
        healthcare, logistics, real estate, and industrials, with insight
        specific to the GCC region.
      </span>
    ),
  },
  {
    question: "How fast can you deliver a CDD report?",
    answer: (
      <span>
        We typically deliver CDD projects in 3 to 5 weeks, depending on the
        complexity and depth of validation required.
      </span>
    ),
  },
  {
    question: "Do you conduct primary market interviews?",
    answer: (
      <span>
        Yes. We regularly conduct customer, competitor, supplier, and expert
        interviews to generate first-hand commercial insights — especially
        important in data-light environments like parts of KSA and UAE.
      </span>
    ),
  },
  {
    question: "Is your team based locally?",
    answer: (
      <span>
        Yes. We have on-ground presence in both Saudi Arabia and the UAE,
        enabling real-time access to market participants and regulators.
      </span>
    ),
  },
  {
    question: "Can you help post-transaction with value creation?",
    answer: (
      <span>
        Absolutely. We offer post-deal strategic advisory to support
        integration, market expansion, and revenue growth planning.
      </span>
    ),
  },
  {
    question: "What level of reporting do you provide?",
    answer: (
      <span>
        We deliver a detailed report that includes qualitative and quantitative
        analysis, management summaries, red flags, and board-level
        recommendations.
      </span>
    ),
  },
  {
    question: "Start Your Due Diligence Journey",
    answer: (
      <span>
        Let's have a conversation about your next transaction. We'll help you
        ask the right questions — and find the right answers.
      </span>
    ),
  },
];

const DueDiligence = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Commercial Due Diligence"],
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
        {...DueDiligenceData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />

      <TeamShowcase
        title="Commercial Due Diligence"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={false}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} />
        ))}
      </TeamShowcase>

      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />

      <ServicesSection
        services={servicesData}
        bgSurface={false}
        heading="Scope of Our Commercial Due Diligence"
      />

      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default DueDiligence;
