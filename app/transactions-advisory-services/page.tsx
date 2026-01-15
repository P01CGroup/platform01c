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

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Transaction Support | Platform01 Consulting",
    description: "Description for Transaction Support page.",
    keywords: "platform01, Transaction Support",
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
      .eq("slug", "/transaction-support")
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

const TransactionSupportData: ServiceHeroData = {
  subheading: "Transaction Support Services",
  heading: "Strategic Financial Insights. Seamless Execution.",
  backgroundImages: {
    mobile: "/services/mobile/transaction-support.png",
    tablet: "/services/tablet/transaction-support.png",
    desktop: "/services/desktop/transaction-support.png",
    ultrawide: "/services/ultrawide/transaction-support.png",
  },
  showContactForm: true,
};

const teamData = {
  team: getTeamDataForPage("transaction-support"),
};

const servicesData = [
  {
    title: "Financial Modeling",
    description: (
      <span>
        Robust, flexible, and investor-grade financial models that enable
        decision-making. We build:
        <ul className="list-disc pl-6 mt-2">
          <li>3-statement financial models</li>
          <li>Scenario and sensitivity analysis</li>
          <li>Cap tables and investor waterfall models</li>
          <li>Unit economics and KPI dashboards</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Investor Documents Preparation",
    description: (
      <span>
        We support in preparing compelling, data-driven documents that resonate
        with investors:
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Information Memorandums (IM):</strong> Comprehensive
            narrative + analytics
          </li>
          <li>
            <strong>Teasers:</strong> Short-form overviews for initial investor
            interest
          </li>
          <li>Pitch decks and Executive summaries</li>
          <li>Supporting slides for board/investor presentations</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Transaction Advisory Support",
    description: (
      <span>
        We help you navigate complexity with confidence:
        <ul className="list-disc pl-6 mt-2">
          <li>Deal strategy and process design</li>
          <li>Investor targeting strategy and preparation</li>
          <li>Data room setup support and management</li>
          <li>
            Value enhancement for sellers via world-class negotiation support
          </li>
        </ul>
      </span>
    ),
  },
];

const faqData: FAQItem[] = [
  {
    question: "What is transaction support in consulting?",
    answer: (
      <span>
        Transaction support includes all services that help companies prepare
        for and execute M&A, fundraising, or strategic transactions. It
        typically covers financial modelling, preparation of investor documents,
        and management consulting through the transaction process.
      </span>
    ),
  },
  {
    question: "Who needs transaction support?",
    answer: (
      <span>
        Any business planning to raise funds, sell a stake, acquire another
        company, or undergo a strategic partnership will benefit from
        transaction support.
      </span>
    ),
  },
  {
    question: "How does financial modelling support a transaction?",
    answer: (
      <span>
        A well-built financial model helps stakeholders understand the company's
        past performance, current position, and future projections. It also
        enables sensitivity testing, valuation scenarios, and negotiation
        preparation.
      </span>
    ),
  },
  {
    question: "What makes a good Information Memorandum (IM)?",
    answer: (
      <span>
        An effective IM tells the company's story in a structured,
        investor-friendly way. It covers company background, market opportunity,
        financials, team, risks, and transaction rationale—supported by data and
        strategic clarity.
      </span>
    ),
  },
  {
    question: "What&apos;s the difference between a teaser and an IM?",
    answer: (
      <span>
        A teaser is a 1–2 page summary used for initial investor
        outreach—typically anonymized and high-level. The IM is a detailed,
        confidential document shared with interested parties under NDA.
      </span>
    ),
  },
  {
    question: "How long does it take to prepare for a transaction?",
    answer: (
      <span>
        On average, 4–8 weeks. This includes building the model, drafting
        documents, setting up a data room, and preparing for investor meetings.
        Complex transactions may take longer.
      </span>
    ),
  },
  {
    question: "Do you help with investor introductions?",
    answer: (
      <span>
        We may support investor targeting and introductions as part of our
        transaction advisory, depending on the client mandate and geography.
      </span>
    ),
  },
  {
    question: "Are you registered in the KSA and UAE?",
    answer: (
      <span>
        Absolutely. We are a licensed management consultancy in the UAE and KSA.
      </span>
    ),
  },
  {
    question: "Can you work with startups or only large businesses?",
    answer: (
      <span>
        We work across all sizes. Other than large corporations and investors,
        many of our clients are fast-growing scale-ups preparing for Seed to
        Series B rounds.
      </span>
    ),
  },
  {
    question: "Do you provide post-transaction support?",
    answer: (
      <span>
        Yes. We offer post-deal management consulting services to ensure the
        business transitions smoothly after the transaction.
      </span>
    ),
  },
];

const TransactionSupport = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Transaction Support", "Transaction Advisory"],
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
        {...TransactionSupportData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5 pb-20">
        <Header text="Transaction Support Services" className="mb-26" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
          <h2 className="heading-4 md:col-span-3">
            At Platform01 Consulting, we empower visionary corporations,
            investors, and business owners in the UAE and Saudi Arabia with
            world-class Transaction Support Services. Whether you're preparing
            for an investment round, exploring a strategic sale, or entering
            into a joint venture, our expert team delivers end-to-end advisory
            across financial modeling, investor documentation, and deal
            execution.
          </h2>
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="heading-3">Why Transaction Support Matters</h2>
            <p className="text-dark/50">
              In today's fast-paced deal environment, investors demand clarity,
              professionalism, and credibility. Our transaction support services
              ensure you're not just deal-ready, but strategically positioned
              for maximum valuation and seamless execution.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {teamData.team.map((item, index) => (
            <TeamCard key={index} member={item} bgSurface={true} />
          ))}
        </div>
      </div>

      <ServicesSection
        services={servicesData}
        bgSurface={true}
        heading="Our Transaction Support Services"
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

      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default TransactionSupport;
