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
    title: "Real Estate Strategy | Platform01 Consulting",
    description: "Description for Real Estate Strategy page.",
    keywords: "platform01, Real Estate Strategy",
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
      .eq("slug", "/real-estate-consulting")
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
  subheading: "Real Estate Consulting",
  heading: "Unlocking Real Estate Value <br/> with Expertise",
  backgroundImages: {
    mobile: "/services/mobile/real-estate.png",
    tablet: "/services/tablet/real-estate.png",
    desktop: "/services/desktop/real-estate.png",
    ultrawide: "/services/ultrawide/real-estate.png",
  },
  showContactForm: true,
};

const servicesData = [
  {
    title: "Feasibility Studies",
    description: (
      <span>
        Smart real estate investments begin with rigorous feasibility analysis.
        Our real estate feasibility studies go beyond surface-level assessments
        to deeply evaluate financial viability, market demand, competitive
        positioning, regulatory requirements, and investment returns. Whether
        you are launching a residential development, mixed-use project,
        hospitality venture, or retail destination, our studies offer a clear,
        unbiased roadmap.
        <br />
        We provide:
        <ul className="list-disc pl-6 mt-2">
          <li>Comprehensive market research and demand analysis</li>
          <li>Financial modeling and cash flow projections</li>
          <li>Sensitivity and risk analysis to stress-test assumptions</li>
          <li>Actionable recommendations tailored to project success</li>
        </ul>
      </span>
    ),
  },
  {
    title: "HBU Studies",
    description: (
      <span>
        In rapidly evolving markets like Saudi Arabia and the UAE, the highest
        and best use of real estate assets is constantly shifting. Our HBU
        studies identify the most profitable and sustainable development
        scenarios by balancing market potential, zoning regulations, and
        investment objectives. Whether you are optimizing an undeveloped land
        parcel or repositioning an underperforming asset, we guide you to the
        best path forward.
        <br />
        Key features of our HBU studies:
        <ul className="list-disc pl-6 mt-2">
          <li>Site analysis and regulatory review</li>
          <li>Scenario modeling across multiple land-use options</li>
          <li>Financial performance benchmarking</li>
          <li>Strategic guidance on maximizing long-term asset value</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Transaction Support",
    description: (
      <span>
        Real estate transactions are complex and high-stakes — especially in the
        competitive environments of the UAE and KSA. We provide specialized
        Transaction Advisory services for real estate acquisitions,
        divestitures, and joint ventures, ensuring that every transaction is
        strategically sound and financially rewarding. We advise investors,
        developers, family offices, and institutional players across
        residential, commercial, industrial, hospitality, and mixed-use sectors.
        <br />
        Our Real Estate M&A services include:
        <ul className="list-disc pl-6 mt-2">
          <li>Target identification and deal sourcing</li>
          <li>Commercial due diligence</li>
          <li>Transaction structuring and negotiation support</li>
          <li>Post-deal value creation strategies</li>
        </ul>
      </span>
    ),
  },
];

const valuesData = {
  heading: "At Platform01 Consulting, <br /> We differentiate ourselves with",
  values: [
    {
      title: "Practitioner-Driven Insights",
      description:
        "Our team brings real-world investment, development advisory, and transaction experience to every engagement.",
    },
    {
      title: "Bespoke, Unbiased Advice",
      description:
        "We are not brokers or agents. Our sole commitment is to your success.",
    },
    {
      title: "Market Expertise",
      description:
        "Deep understanding of the UAE and Saudi Arabia&apos;s regulatory, cultural, and market landscapes.",
    },
    {
      title: "Data-Driven Rigor",
      description:
        "We combine high-quality primary research with advanced financial modeling and scenario planning.",
    },
  ],
};

const faqData: FAQItem[] = [
  {
    question: "What is a real estate feasibility study, and why do I need one?",
    answer: (
      <span>
        A real estate feasibility study assesses whether a proposed real estate
        project is viable from a financial, market, and regulatory standpoint.
        It helps investors, developers, and landowners make informed decisions
        by analyzing project costs, market demand, expected revenues, risks, and
        ROI. At Platform01 Consulting, our feasibility studies ensure you have a
        clear, data-driven roadmap before committing significant capital.
      </span>
    ),
  },
  {
    question: "What is a Highest and Best Use (HBU) study?",
    answer: (
      <span>
        A Highest and Best Use (HBU) study identifies the most profitable,
        legally permissible, and physically possible use of a property. It
        considers various development scenarios and recommends the optimal use
        based on market trends, financial returns, and zoning regulations. Our
        HBU studies help clients in the UAE and Saudi Arabia maximize land value
        and investment potential with confidence.
      </span>
    ),
  },
  {
    question:
      "When should I conduct a feasibility study for a real estate project?",
    answer: (
      <span>
        You should conduct a feasibility study before acquiring land, before
        starting project design, or before seeking investors or financing. A
        feasibility study provides the necessary validation to proceed or pivot,
        saving time, money, and reducing investment risks.
      </span>
    ),
  },
  {
    question:
      "How long does it take to complete a real estate feasibility study?",
    answer: (
      <span>
        The timeline for a feasibility study depends on project size,
        complexity, and market conditions. Typically, at Platform01 Consulting,
        a standard feasibility study can be completed within 4 to 6 weeks. For
        larger or more complex developments, additional time may be required for
        detailed research and financial modeling.
      </span>
    ),
  },
  {
    question:
      "What information do you need from clients to start a feasibility study or HBU study?",
    answer: (
      <span>
        To begin a study, we generally require:
        <ul className="list-disc pl-6 mt-2">
          <li>Property location and size details</li>
          <li>Intended development concept (if any)</li>
          <li>Access to title deeds or ownership documents</li>
          <li>Budget parameters (if available)</li>
          <li>Any preliminary design layouts or masterplans (optional)</li>
        </ul>
        Our team will guide you through a customized checklist during the
        project kickoff to ensure a smooth process.
      </span>
    ),
  },
  {
    question:
      "What sectors do you cover in real estate feasibility and HBU studies?",
    answer: (
      <span>
        We cover a wide range of sectors including:
        <ul className="list-disc pl-6 mt-2">
          <li>Residential (apartments, villas, communities)</li>
          <li>Commercial (offices, business parks)</li>
          <li>Retail (shopping malls, strip malls)</li>
          <li>Hospitality (hotels, resorts, serviced apartments)</li>
          <li>Industrial (logistics hubs, warehouses)</li>
          <li>Mixed-use developments</li>
        </ul>
        Our expertise extends across the UAE and KSA's dynamic real estate
        markets.
      </span>
    ),
  },
  {
    question:
      "How are your real estate transaction consulting services different from a broker?",
    answer: (
      <span>
        Unlike brokers who mainly facilitate transactions, our Real Estate
        transaction consulting services focus on strategy, valuation, due
        diligence, structuring, and negotiation. We act solely in your best
        interest — whether you are buying, selling, or investing — ensuring that
        transactions align with your long-term financial and strategic goals.
      </span>
    ),
  },
  {
    question:
      "Do you provide independent real estate valuations as part of your advisory services?",
    answer: <span>No.</span>,
  },
  {
    question: "In which regions do you offer real estate consulting services?",
    answer: (
      <span>
        Platform01 Consulting provides real estate consulting services primarily
        across the United Arab Emirates (UAE) and Kingdom of Saudi Arabia (KSA).
        We have in-depth expertise in key cities such as Dubai, Abu Dhabi,
        Riyadh, Jeddah, and other high-growth regions.
      </span>
    ),
  },
  {
    question:
      "How can I get a proposal or quote for a feasibility study, HBU study, or real estate transaction advisory?",
    answer: (
      <span>
        You can contact Platform01 Consulting through our website's [Contact Us]
        page or email us directly. Once we understand your project needs, we
        will provide a tailored proposal outlining scope, timelines,
        deliverables, and pricing.
      </span>
    ),
  },
];

const BrandStrategy = async () => {
  // Get team data for real estate strategy
  const teamData = getTeamDataForPage("real-estate-strategy");

  // Fetch credentials with the relevant industry tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    industry_tags: ["Real Estate"],
    is_active: true,
  });

  // Map to CredentialSlide
  const slides = credentials.map((c: Credential) => ({
    type: "industry",
    category: "Real Estate",
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
      <div className="container pt-5 pb-26">
        <Header text="Feasibility Study" className="mb-26" />
        <h2 className="heading-4 max-w-[1010px]">
          At Platform01 Consulting, we partner with investors, developers,
          corporations, and landowners to deliver strategic real estate
          consulting services tailored to today's dynamic markets in the UAE and
          Saudi Arabia. Whether you are assessing a new development,
          repositioning an existing asset, or seeking transaction advisory
          opportunities in the sector, our practitioner-led team helps you make
          condent, data-driven decisions.
        </h2>
      </div>
      <div className="bg-surface py-16">
        <div className="container">
          <h2 className="heading-2 max-w-[645px] leading-snug">
            Our Senior Real Estate Consulting Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {teamData.map((member, index) => (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <TeamCard member={member} bgSurface={false} />
                <div className="grid grid-cols-1 gap-5 md:max-h-[455px]">
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <h6 className="!font-sans !text-md text-dark">
                      Experience
                    </h6>
                    <p className="text-dark/50 leading-tight max-w-[615px]">
                      {member.background ||
                        "12+ years of experience in Advisory, Corporate Finance, Private Equity and Strategy Consulting"}
                    </p>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <h6 className="!font-sans !text-md text-dark">
                      Credentials
                    </h6>
                    <p className="text-dark/50 leading-tight max-w-[615px]">
                      {member.priorExperience ||
                        "Commercial Real Estate Portfolio Monitoring and Valuations at British International Investments, London, UK"}
                    </p>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <h6 className="!font-sans !text-md text-dark">
                      Recognition
                    </h6>
                    <p className="text-dark/50 leading-tight max-w-[615px]">
                      {member.recognition || "-"}
                    </p>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <h6 className="!font-sans !text-md text-dark">Education</h6>
                    <p className="text-dark/50 leading-tight max-w-[615px]">
                      {member.education || ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ServicesSection services={servicesData} heading="Our Services" />
      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />
      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
      />
      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default BrandStrategy;
