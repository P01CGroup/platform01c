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
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Business Plan | Platform01 Consulting",
    description: "Description for Business Plan page.",
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
      .eq("slug", "/best-business-plan-consultants")
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

const BusinessPlanData: ServiceHeroData = {
  subheading: "Business Plan Development Services ",
  heading: "Strategy. Structure. <br/> Success.",
  backgroundImages: {
    mobile: "/services/mobile/business-plan.png",
    tablet: "/services/tablet/business-plan.png",
    desktop: "/services/desktop/business-plan.png",
    ultrawide: "/services/ultrawide/business-plan.png",
  },
  showContactForm: true,
};

const teamData = getTeamDataForPage("business-plan");

const servicesData = [
  {
    title: "Executive Summary",
    description: (
      <span>
        Your vision, clearly articulated: the business, the opportunity, and the
        ask — all in 1–2 pages.
      </span>
    ),
  },
  {
    title: "Business Model & Strategy",
    description: (
      <span>
        We go beyond the basics to map out:
        <ul className="list-disc pl-6 mt-2">
          <li>Revenue model(s)</li>
          <li>Unit economics and pricing strategy</li>
          <li>Scalability and growth levers</li>
          <li>Value proposition and differentiation</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Market Analysis",
    description: (
      <span>
        Our team blends primary research, databases, and market intelligence to
        build:
        <ul className="list-disc pl-6 mt-2">
          <li>TAM/SAM/SOM calculations</li>
          <li>Customer segmentation</li>
          <li>Competitive landscape and positioning</li>
          <li>Key market trends (with KSA & UAE specifics)</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Go-to-Market (GTM) Strategy",
    description: (
      <span>
        We develop clear, actionable GTM plans including:
        <ul className="list-disc pl-6 mt-2">
          <li>Customer acquisition channels</li>
          <li>Strategic partnerships</li>
          <li>Marketing funnel and sales approach</li>
          <li>Localization strategies for UAE and KSA</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Organization & Team",
    description: (
      <span>
        Investors back teams. We highlight:
        <ul className="list-disc pl-6 mt-2">
          <li>Founders' credentials</li>
          <li>Key hires and org structure</li>
          <li>Talent roadmap and culture strategy</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Financial Forecasts & Assumptions",
    description: (
      <span>
        We provide detailed 3–5 year forecasts, including:
        <ul className="list-disc pl-6 mt-2">
          <li>P&L, cash flow, and balance sheet</li>
          <li>Scenario/sensitivity analysis</li>
          <li>Cap table and funding requirements</li>
          <li>KPI dashboards and benchmarking</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Risk & Mitigation Plan",
    description: (
      <span>
        We outline credible risks — market, regulatory, operational — and
        provide smart mitigation strategies.
      </span>
    ),
  },
  {
    title: "Funding Ask & Use of Funds",
    description: (
      <span>
        Clear articulation of how much you need, how it will be used, and what
        investors get in return.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Clients Choose Platform01",
  supportingText:
    "With a team of seasoned professionals and a holistic approach to advisory, Platform01 delivers tailored, precision-driven solutions — combining deep financial expertise with strategic execution across KSA and UAE.",
  values: [
    {
      title: "Regional Expertise",
      description: "Licensed firm with presence in KSA and UAE.",
    },
    {
      title: "Seasoned Team",
      description:
        "Team includes ex-investors, ex-practitioners and strategy consultants.",
    },
    {
      title: "Bespoke Plans",
      description: "Business plans built from scratch—no templates.",
    },
    {
      title: "Deep Insights",
      description:
        "Deep understanding of fundraising, feasibility, and execution.",
    },
    {
      title: "Integrated Services",
      description:
        "Integration with our Financial Modelling, Valuation, and Transaction Advisory teams.",
    },
  ],
};

const faqData: FAQItem[] = [
  {
    question: "What is a business plan, and why is it important?",
    answer: (
      <span>
        A business plan is a structured document that outlines your business
        vision, strategy, market opportunity, and financials. It's essential for
        raising funds, aligning stakeholders, and planning operations. It helps
        validate whether your idea is executable, scalable, and fundable.
      </span>
    ),
  },
  {
    question:
      "How is a Platform01 business plan different from a freelancer or template-based version?",
    answer: (
      <span>
        Unlike off-the-shelf templates, we create custom, investor-grade
        business plans grounded in regional context, strategic logic, and
        financial depth. Our team includes professionals who have worked in VC,
        strategy, and operations—not just writers.
      </span>
    ),
  },
  {
    question: "How long does it take to complete a business plan?",
    answer: (
      <span>
        Typically, 3–5 weeks depending on the complexity and responsiveness.
        Fast-track timelines are available upon request for urgent fundraising
        or board deadlines.
      </span>
    ),
  },
  {
    question: "What financials are included in the business plan?",
    answer: (
      <span>
        Our plans include detailed 3–5 year forecasts:
        <ul className="list-disc pl-6 mt-2">
          <li>Profit and loss (P&L) statement</li>
          <li>Cash flow statement</li>
          <li>Balance sheet</li>
          <li>Sensitivity/scenario analysis</li>
          <li>KPI dashboards</li>
          <li>Cap table and investor returns (if applicable)</li>
        </ul>
      </span>
    ),
  },
  {
    question: "Can you help if we don&apos;t have all the information ready?",
    answer: (
      <span>
        Yes. We guide you through key assumptions, conduct necessary market
        research, and build the plan collaboratively—even if you&apos;re
        starting from a conceptual stage.
      </span>
    ),
  },
  {
    question: "Is the business plan suitable for investors in the UAE and KSA?",
    answer: (
      <span>
        Absolutely. We tailor language, data points, and format to meet investor
        preferences in both KSA and UAE, aligning with the expectations of VCs,
        family offices, and banks in the region.
      </span>
    ),
  },
  {
    question: "Do you support pitch deck preparation as well?",
    answer: (
      <span>
        Yes. We often bundle the business plan + financial model + pitch deck
        into a single engagement to help you present a complete investor
        package.
      </span>
    ),
  },
  {
    question: "Will you update the plan in the future?",
    answer: (
      <span>
        We offer ongoing support packages for updates, reforecasting, or
        adapting the plan for new audiences or funding rounds.
      </span>
    ),
  },
  {
    question: "Is my information confidential?",
    answer: (
      <span>
        Yes. All client data is treated with strict confidentiality. NDAs are
        signed prior to project commencement upon request.
      </span>
    ),
  },
];

const BusinessPlan = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Business Strategy", "Business Plan"],
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
        {...BusinessPlanData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5">
        <Header text="Business Plan Development Services" className="mb-26" />
        <h2 className="heading-4 max-w-[1010px]">
          At Platform01 Consulting, we craft investor-ready, insight-rich
          Business Plans that empower founders, boards, and corporate leaders to
          pursue growth, raise capital, and align internal strategy. Whether
          you're a startup seeking Seed or Series A funding, or a corporation
          evaluating a new business line in the GCC, we bring strategic clarity
          and financial depth to your vision.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-20">
          <div className="md:col-start-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
            {teamData.map((item, index) => (
              <TeamCard key={index} member={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-surface py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-16">
          <div>
            <h2 className="heading-4">
              Why Does Strategic Business Plan Matter?
            </h2>
            <hr className="border-dark/10 my-3" />
            <p className="text-md text-dark/50 mt-4">
              A great idea is not enough. In the UAE and Saudi Arabia's
              competitive and capital-intensive ecosystems, a compelling and
              credible business plan can make the difference between attracting
              investment—or missing the opportunity.{" "}
            </p>
          </div>
          <div>
            <h2 className="heading-4">
              What Makes a High-Quality Business Plan?
            </h2>
            <hr className="border-dark/10 my-3" />
            <p className="text-md text-dark/50 mt-4">
              Many plans are templated. Ours are tailored. We believe a business
              plan must combine strategic insight, grounded assumptions, and
              data-backed projections. It should demonstrate that the business
              model is not only exciting, but executable.
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="heading-5">Our plans are:</h3>
            <hr className="border-dark/10 my-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ChecklistItem
                text="Deeply contextualized for the GCC market"
                className="py-1.5"
              />
              <ChecklistItem
                text="Aligned with investor and lender expectations"
                className="py-1.5"
              />
              <ChecklistItem
                text="Rooted in real-world operational and financial assumptions"
                className="py-1.5"
              />
              <ChecklistItem
                text="Structured for both clarity and persuasion"
                className="py-1.5"
              />
            </div>
          </div>
        </div>
      </div>
      <ServicesSection services={servicesData} />
      <div className="bg-surface py-20">
        <div className="container">
          <h2 className="heading-2 max-w-[1010px]">Our Process</h2>
          <p className="text-dark/50 mt-4 max-w-[490px]">
            Our Feasibility Study practice is based on our unique model of
            "Practitioner-Driven" approach that brings together Relevant Sector
            Experience from Global Fortune 500 Corporations and Global Financial
            Institutions with years of Financial Expertise of consulting in the
            region.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
            <div className="md:col-start-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-8 bg-white flex flex-col gap-15">
                <div>
                  <h3 className="heading-3 text-dark/20">01.</h3>
                  <h2 className="heading-5 max-w-[177px]">
                    Discovery Workshop
                  </h2>
                </div>
                <p className="text-dark/50">
                  We understand your business inside-out
                </p>
              </div>
              <div className="p-8 bg-white flex flex-col gap-15">
                <div>
                  <h3 className="heading-3 text-dark/20">02.</h3>
                  <h2 className="heading-5 max-w-[177px]">
                    Market and Strategic Research
                  </h2>
                </div>
                <p className="text-dark/50">
                  We In-house and secondary research
                </p>
              </div>
              <div className="p-8 bg-white flex flex-col gap-15">
                <div>
                  <h3 className="heading-3 text-dark/20">03.</h3>
                  <h2 className="heading-5 max-w-[177px]">
                    Financial Modelling
                  </h2>
                </div>
                <p className="text-dark/50">
                  Custom models grounded in commercial logic
                </p>
              </div>
              <div className="p-8 bg-white flex flex-col gap-15">
                <div>
                  <h3 className="heading-3 text-dark/20">04.</h3>
                  <h2 className="heading-5 max-w-[177px]">
                    Drafting and Iteration
                  </h2>
                </div>
                <p className="text-dark/50">
                  Structured narrative development with client feedback
                </p>
              </div>
              <div className="p-8 bg-white flex flex-col gap-15">
                <div>
                  <h3 className="heading-3 text-dark/20">05.</h3>
                  <h2 className="heading-5 max-w-[177px]">
                    Investor Readiness Review
                  </h2>
                </div>
                <p className="text-dark/50">
                  Final check for investor alignment and credibility
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />
      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />
      <DynamicInsightsSlider bgSurface={false} />
      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default BusinessPlan;
