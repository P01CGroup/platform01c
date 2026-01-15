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
import TeamText from "@/components/sections/TeamText";
import TeamShowcase from "@/components/sections/TeamShowcase";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Award, Globe, Layers, Calculator, Shield } from "lucide-react";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Portfolio Valuation | Platform01 Consulting",
    description: "Description for Portfolio Valuation page.",
    keywords: "platform01, Portfolio Valuation",
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
      .eq("slug", "/portfolio-valuation-services")
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

const PortfolioValuationData: ServiceHeroData = {
  subheading: "Portfolio Valuation Services",
  heading: "Gold-Standard Valuations. IPEV-Aligned. Globally Trusted.",
  backgroundImages: {
    mobile: "/services/mobile/portfolio-valuation.png",
    tablet: "/services/tablet/portfolio-valuation.png",
    desktop: "/services/desktop/portfolio-valuation.png",
    ultrawide: "/services/ultrawide/portfolio-valuation.png",
  },
  showContactForm: true,
};

const teamData = {
  heading: "Portfolio Valuation Services Team",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every deal",
  team: getTeamDataForPage("portfolio-valuation"),
};

const servicesData = [
  {
    title: "Periodic NAV Valuation for Funds",
    description: (
      <span>
        Quarterly or annual valuation of unlisted investments in line with IPEV
        Guidelines and investor reporting standards.
      </span>
    ),
  },
  {
    title: "Fair Value Measurement for Financial Reporting",
    description: (
      <span>
        Support for IFRS, GAAP, and audit-facing fair value estimation
        requirements for private assets.
      </span>
    ),
  },
  {
    title: "Internal Portfolio Monitoring",
    description: (
      <span>
        Valuations designed for internal portfolio tracking, benchmarking, and
        performance assessment by investment teams.
      </span>
    ),
  },
  {
    title: "Exit Readiness & Secondary Sale Valuations",
    description: (
      <span>
        Defensible valuations to support partial exits, internal re-caps, or
        secondary transactions in private markets.
      </span>
    ),
  },
  {
    title: "Investor & LP Reporting Support",
    description: (
      <span>
        Valuation memos and backup files designed to satisfy LP queries, fund
        administrator audits, and board-level review.
      </span>
    ),
  },
  {
    title: "Complex Instruments & Hybrid Structures",
    description: (
      <span>
        Support for valuing convertibles, preference shares, earn-outs,
        contingent payouts, and structured deals.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Platform01 for Portfolio Valuation?",
  values: [
    {
      title: "Gold Standard Quality",
      description:
        "Our valuations are audit-ready, IPEV-aligned, and defensible in front of investment committees, auditors, and regulators globally.",
      icon: "award",
    },
    {
      title: "Region-Specific Expertise",
      description:
        "Deep knowledge of GCC markets, valuation norms, investor requirements, and regulatory environments in Saudi Arabia and the UAE.",
      icon: "globe",
    },
    {
      title: "All Stages, All Sectors",
      description:
        "From seed-stage venture investments to multi-asset private equity portfolios, we support diverse investor types and deal structures.",
      icon: "layers",
    },
    {
      title: "Robust Methodologies",
      description:
        "We use DCF, market comparables, precedent transactions, option pricing models, and scenario analysis — customized per asset.",
      icon: "calculator",
    },
    {
      title: "Strict Confidentiality",
      description:
        "Our work is governed by the highest standards of professionalism, objectivity, and discretion.",
      icon: "shield",
    },
  ],
};
const faqData: FAQItem[] = [
  {
    question: "What is the IPEV framework and why is it important?",
    answer: (
      <span>
        The International Private Equity and Venture Capital Valuation (IPEV)
        Guidelines provide globally accepted standards for valuing private
        investments. Following them ensures audit defensibility, consistency,
        and investor confidence.
      </span>
    ),
  },
  {
    question: "Are your valuations audit-compliant?",
    answer: (
      <span>
        Yes. Our valuations are designed for audit readiness, using
        methodologies and assumptions that hold up under scrutiny from top-tier
        auditors globally.
      </span>
    ),
  },
  {
    question:
      "Can you handle complex capital structures like convertibles or preference shares?",
    answer: (
      <span>
        Absolutely. We build fully diluted cap tables, waterfall models, and use
        OPM/backsolve methods for pricing hybrid or structured instruments.
      </span>
    ),
  },
  {
    question: "Do you offer recurring quarterly valuations?",
    answer: (
      <span>
        Yes. We support funds and family offices with quarterly or semi-annual
        NAV updates, complete with valuation memos and summary dashboards.
      </span>
    ),
  },
  {
    question: "What formats do you deliver?",
    answer: (
      <span>
        We provide full models (Excel), detailed valuation memos (Word or PDF),
        and summary packs for internal and investor communication.
      </span>
    ),
  },
  {
    question: "Can you help us prepare for a fund audit or LP inspection?",
    answer: (
      <span>
        Absolutely. We offer valuation defensibility reviews, audit preparation,
        and LP presentation support as part of our engagement.
      </span>
    ),
  },
  {
    question: "How are you different from big audit or fund admin firms?",
    answer: (
      <span>
        We offer tailored, investor-centric service, with senior team
        involvement and full flexibility — unlike automated or black-box
        valuations.
      </span>
    ),
  },
];

const PortfolioValuation = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Portfolio Valuation"],
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
        {...PortfolioValuationData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <TeamText bgSurface={false} header="Portfolio Valuation Services">
        <div>
          <h2 className="heading-3  ">
            Valuations That Withstand <br />
            Global Scrutiny
          </h2>
          <hr className="border-dark/10 my-8" />
          <p className="text-dark/50 max-w-[620px]">
            Portfolio valuation isn&apos;t just about numbers — it&apos;s about
            defending those numbers with logic, methodology, and credibility.
            <br />
            <br />
            At Platform01 Consulting, we specialize in providing independent,
            high-integrity portfolio valuations for investors, private equity
            funds, venture capital rms, sovereign wealth entities, and family
            oces operating in the UAE and Saudi Arabia.
            <br />
            <br />
            Our valuation approach is anchored in the globally accepted
            International Private Equity and Venture Capital Valuation (IPEV)
            Guidelines, ensuring transparency, consistency, and defensibility —
            whether you&apos;re reporting to LPs, auditors, or regulators.
            <br />
            <br />
            We go beyond templates. We deliver institutional-grade valuation
            insights, tailored to the complexity of your portfolio — from
            high-growth startups to late-stage private companies and illiquid
            assets.{" "}
          </p>
        </div>
      </TeamText>

      <TeamShowcase
        title="Portfolio Valuation Services Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={true}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} bgSurface={false} />
        ))}
      </TeamShowcase>
      <ServicesSection
        services={servicesData}
        bgSurface={false}
        heading="Our Portfolio Valuation Services"
      />

      <OurValuesSlider
        values={valuesData.values}
        bgSurface={true}
        {...(valuesData.heading && { heading: valuesData.heading })}
      />

      <Credentials
        slides={slides}
        bgSurface={false}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />
      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default PortfolioValuation;
