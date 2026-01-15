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
    title: "Restructuring Consulting | Platform01 Consulting",
    description: "Description for Restructuring Consulting page.",
    keywords: "platform01, Restructuring Consulting",
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
      .eq("slug", "/restructuring-consulting")
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
  subheading: "Restructuring Consulting",
  heading: "Strategic Restructuring Consulting.",
  backgroundImages: {
    mobile: "/services/mobile/restructuring.png",
    tablet: "/services/tablet/restructuring.png",
    desktop: "/services/desktop/restructuring.png",
    ultrawide: "/services/ultrawide/restructuring.png",
  },
  showContactForm: true,
};

const teamData = {
  heading: "Restructuring <br/> Consulting Team",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every consulting assignment",
  team: getTeamDataForPage("restructuring-consulting"),
};

const servicesData = [
  {
    title: "Distressed Business Valuation",
    description: (
      <span>
        In times of uncertainty, understanding the true, recoverable value of a
        business becomes critical—for negotiations, legal planning, or strategic
        decision-making.
      </span>
    ),
  },
  {
    title: "Turnaround Strategy & Performance Improvement Plans",
    description: (
      <span>
        A struggling business can recover with the right plan. We help companies
        in formulating and implementing strategic turnaround roadmaps.
      </span>
    ),
  },
  {
    title: "Strategic Options Analysis",
    description: (
      <span>
        Every distressed business needs a clear understanding of its strategic
        options—including trade-offs, feasibility, and consequences.
      </span>
    ),
  },
  {
    title: "Support in Drafting Restructuring Plans",
    description: (
      <span>
        We assist in the commercial and financial components of restructuring
        and business plans.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Choose Platform01 for Restructuring?",
  values: [
    {
      title: "Deep Practitioner Experience",
      description:
        "Our team includes former nance directors, investment professionals, and restructuring practitioners—not just consultants. We bring a practical mindset and operational understanding to every project.",
    },
    {
      title: "Independent & Conflict-Free",
      description:
        "We do not provide audit, legal, or court services. Our only focus is delivering honest, independent, and commercially sound consulting to support our clients",
    },
    {
      title: "Familiarity with the GCC Context",
      description:
        "We have advised GCC family businesses, listed companies, and cross-border groups on strategic projects in diverse sectors.",
    },
    {
      title: "Discreet, Trusted, and Commercial",
      description:
        "Restructuring & Turnarounds are sensitive. Our engagements are handled with full confidentiality and respect for internal dynamics and cultural considerations—especially important in family businesses or multi-generational shareholder groups.",
    },
  ],
};
const faqData: FAQItem[] = [
  {
    question:
      "What are the early signs that a company needs restructuring advice?",
    answer: (
      <span>
        Common indicators include:
        <ul className="list-disc pl-6 mt-2">
          <li>Persistent cash flow shortages</li>
          <li>Overdue obligations to lenders or suppliers</li>
          <li>Breach of financial covenants or loan terms</li>
          <li>Rapid decline in margins or revenue</li>
          <li>Management turnover or board disputes</li>
          <li>Dependence on shareholder loans for operations</li>
          <li>Missed payroll or tax obligations</li>
        </ul>
        Engaging a restructuring consultant early gives companies more time,
        more options, and greater control over the outcome.
      </span>
    ),
  },
  {
    question: "What is a turnaround plan and how do you help create one?",
    answer: (
      <span>
        A turnaround plan is a focused strategy to stabilize and restore a
        struggling business. Our approach includes:
        <ul className="list-disc pl-6 mt-2">
          <li>Financial review and liquidity planning</li>
          <li>Cost reduction and margin recovery</li>
          <li>Working capital optimization</li>
          <li>Restructuring of operating model or product lines</li>
          <li>Management alignment and decision support</li>
        </ul>
        We help clients prioritize short-term survival and long-term value
        recovery, ensuring all recommendations are commercially executable.
      </span>
    ),
  },
  {
    question:
      "How is a distressed business valuation different from a standard valuation?",
    answer: (
      <span>
        Distressed valuation considers:
        <ul className="list-disc pl-6 mt-2">
          <li>Limited cash flow visibility</li>
          <li>Fire-sale or liquidation risks</li>
          <li>Working capital shortfalls</li>
          <li>Operational disruptions</li>
          <li>Uncertain turnaround assumptions</li>
        </ul>
        We use scenario modeling, liquidation benchmarks, and risk-weighted cash
        flows to develop realistic, investor-grade valuations suitable for
        negotiation and planning.
      </span>
    ),
  },
  {
    question:
      "Can you help us value our business in the context of a family dispute or potential exit?",
    answer: (
      <span>
        Yes. Many family businesses approach us for valuation support during
        shareholder disputes, succession discussions, or potential buyouts,
        especially when the business is under pressure and traditional valuation
        methods fall short.
      </span>
    ),
  },
  {
    question:
      "What restructuring options do we have if we&apos;re in financial distress?",
    answer: (
      <span>
        Clients can analyse and compare several options such as
        <ul className="list-disc pl-6 mt-2">
          <li>Debt refinancing or restructuring</li>
          <li>Cost-cutting and operational improvement</li>
          <li>Asset or business unit divestment</li>
          <li>Equity injection from shareholders or investors</li>
          <li>Strategic partnerships or mergers</li>
        </ul>
      </span>
    ),
  },
  {
    question:
      "Can you help us prepare presentations or materials for banks or investors?",
    answer: (
      <span>
        Yes. We support in preparing:
        <ul className="list-disc pl-6 mt-2">
          <li>Restructuring proposals</li>
          <li>Business viability plans</li>
          <li>Financial models and stress tests</li>
          <li>Debt servicing capability analysis</li>
          <li>Commercial briefs for creditor engagement</li>
        </ul>
        Our deliverables are built to instill confidence in stakeholders while
        providing transparency and clarity.
        <br />
        <br />
        <i>
          Platform01 Consulting does not manage these procedures directly, but
          we support clients in preparing commercial and financial material to
          pursue them effectively with legal partners.
        </i>
      </span>
    ),
  },
  {
    question: "Is your work confidential?",
    answer: (
      <span>
        Absolutely. All restructuring engagements are treated with strict
        confidentiality and professional discretion, especially when dealing
        with sensitive internal matters or family dynamics.
      </span>
    ),
  },
];

const Restructuring = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Restructuring"],
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
        <Header text="Restructuring Consulting" className="mb-26" />
        <h2 className="heading-2 max-w-[640px] mb-8">
          Guiding Businesses Through Complexity
        </h2>
        <hr className="border-dark/10 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
          <h2 className="heading-4 md:col-span-3">
            In today's volatile business environment, companies may face
            financial distress, operational underperformance, or strategic
            misalignment. Whether driven by market disruption, debt overhang,
            management missteps, or capital inefficiency, distress requires
            swift, intelligent, and independent strategy.
          </h2>
          <p className="md:col-span-2 text-dark/50">
            At Platform01 Consulting, we serve as a Management Consultant to
            business owners, management teams, boards, family offices, and
            shareholders during periods of financial distress. We work
            exclusively in a consultative capacity and help clients gain
            clarity, assess alternatives, and build credible strategies for
            recovery.
          </p>
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

      <ServicesSection
        services={servicesData}
        bgSurface={false}
        heading="Our Restructuring Consulting Services"
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
          "We&apos;ve advised across industries including Infrastructure, Real Estate, Technology, Logistics, and Industrials — covering distressed business valuations, strategic options analysis, business diagnostics and turnaround strategies."
        }
      />

      <DynamicInsightsSlider bgSurface={true} />

      <CallToAction
        heading="Let's Talk <br/> Confidentially"
        description="If your business is facing financial stress, operational challenge, or shareholder uncertainty, our restructuring team is ready to support."
      />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default Restructuring;
