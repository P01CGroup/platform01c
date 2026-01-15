import { getSeoMetadata } from "@/lib/seo-config";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import ServicesSection from "@/components/sections/ServicesSection";
import Accordion from "@/components/ui/accordion";
import { getTeamDataForPage } from "@/lib/data/team-data";
import TeamCard from "@/components/ui/team-card";
import OurValuesSlider from "@/components/sections/OurValuesSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { TrendingUp, Globe, Zap, Layers, Users } from "lucide-react";

const ValueCreationData: ServiceHeroData = {
  subheading: "Accelerating Performance. Unlocking Portfolio Value.",
  heading: "Make Every Investment <br/> Count",
  backgroundImages: {
    mobile: "/services/mobile/value-creation.png",
    tablet: "/services/tablet/value-creation.png",
    desktop: "/services/desktop/value-creation.png",
    ultrawide: "/services/ultrawide/value-creation.png",
  },
  showContactForm: true,
};

const teamData = {
  heading: "Portfolio Valuation Services Team",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every deal",
  team: getTeamDataForPage("value-creation"),
};

const ValueData = [
  {
    title: "Investor Mindset",
    description:
      "We understand how value is created — and lost — in investor-backed companies. Our strategies are aligned with IRR, EBITDA growth, and exit multiples.",
    icon: "trending",
  },
  {
    title: "GCC Market Focus",
    description:
      "Specialized knowledge of Saudi Arabia and UAE markets, including regulatory, cultural, and talent considerations that can impact value creation.",
    icon: "globe",
  },
  {
    title: "Execution-Focused",
    description:
      "We don't stop at strategy. We roll up our sleeves and help implement transformation plans, performance dashboards, and team alignment.",
    icon: "zap",
  },
  {
    title: "Cross-Functional Expertise",
    description:
      "From pricing strategy to working capital improvement, we bring expertise across all the key value levers.",
    icon: "layers",
  },
  {
    title: "Collaborative Approach",
    description:
      "We work with founders, CEOs, and operating teams, creating alignment without disrupting the core business.",
    icon: "users",
  },
];

const servicesData = [
  {
    title: "100-Day & Post-Acquisition Planning",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Rapid diagnostic</li>
          <li>Priority value creation initiatives</li>
          <li>Stakeholder alignment and reporting cadence</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Growth Acceleration",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Revenue growth strategies</li>
          <li>Pricing optimization</li>
          <li>Cross-sell/up-sell opportunities</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Operational Efficiency",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Process optimization</li>
          <li>Procurement savings</li>
          <li>SG&A cost reduction</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Digital & Data Enablement",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Digital maturity assessments</li>
          <li>Tech stack streamlining</li>
          <li>Dashboard and KPI architecture</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Talent & Organizational Effectiveness",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Org design and capability mapping</li>
          <li>Leadership coaching</li>
          <li>Change management for growth</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Exit Readiness & Equity Story Building",
    description: (
      <span>
        <ul className="list-disc pl-6 mt-2">
          <li>Value bridge analysis</li>
          <li>Strategic storytelling for potential buyers</li>
          <li>Pre-exit clean-up and investor materials</li>
        </ul>
      </span>
    ),
  },
];

const faqData: FAQItem[] = [
  {
    question: "Who is this service for?",
    answer: (
      <span>
        We work with private equity investors, family offices, and large private
        businesses looking to unlock or accelerate value in their companies —
        pre or post acquisition.
      </span>
    ),
  },
  {
    question: "Do you only work post-acquisition?",
    answer: (
      <span>
        Not at all. We support throughout the investment lifecycle: pre-deal
        planning, post-deal implementation, ongoing transformation, and pre-exit
        preparation.
      </span>
    ),
  },
  {
    question: 'How do you define "value" in value creation?',
    answer: (
      <span>
        Value depends on the context — we track financial metrics (EBITDA, cash
        flow), strategic metrics (market share, retention), and investor metrics
        (IRR, equity story strength).
      </span>
    ),
  },
  {
    question: "Will you work with our internal teams or take full control?",
    answer: (
      <span>
        We act as co-pilots, not pilots. Our approach is collaborative, designed
        to enable and upskill internal teams while executing at pace.
      </span>
    ),
  },
  {
    question: "Do you provide implementation support?",
    answer: (
      <span>
        Yes. We support full implementation including project management, team
        training, vendor selection, and progress tracking.
      </span>
    ),
  },
  {
    question: "What makes your approach different from other consulting firms?",
    answer: (
      <span>
        We combine investment acumen with operator experience. Our team has
        worked in both boardrooms and control rooms — we understand the reality,
        not just the theory.
      </span>
    ),
  },
  {
    question: "What&apos;s the typical project duration?",
    answer: (
      <span>
        Depending on scope, projects range from 6 weeks (focused sprint) to
        12–24 months (full-scale transformation with embedded support).
      </span>
    ),
  },
  {
    question:
      "Do you support value creation for public companies or only private equity?",
    answer: (
      <span>
        We support public, private, and investor-owned businesses. The focus is
        always on performance improvement and sustainable outcomes.
      </span>
    ),
  },
  {
    question: "Can you assist in defining KPIs and dashboards?",
    answer: (
      <span>
        Absolutely. We help create custom dashboards that align with your
        strategy and drive accountability across the organization.
      </span>
    ),
  },
];

export async function generateMetadata() {
  let seo = {
    title: "Value Creation | Platform01 Consulting",
    description: "Description for Value Creation page.",
    keywords: "platform01, Value Creation",
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
      .eq("slug", "/value-creation-strategy-services")
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

const ValueCreation = () => {
  const teamData = getTeamDataForPage("value-creation");
  return (
    <>
      <ServiceHero
        {...ValueCreationData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5 pb-20">
        <Header text="Value Creation Services" className="mb-26" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
          <h2 className="heading-4 md:col-span-3">
            At Platform01 Consulting, we support investors, private equity
            firms, and business owners with a focused agenda: drive measurable
            value creation across their portfolio and businesses.
          </h2>
          <p className="md:col-span-2 text-dark/50">
            Whether you're entering the post-deal phase after an acquisition in
            Riyadh, optimizing a family office asset in Dubai, or preparing a
            portfolio company for exit, we partner with leadership to deliver
            results — faster and more sustainably.
          </p>
        </div>
      </div>
      <div className="pb-20">
        <div className="container">
          <h2 className="heading-3">
            We&apos;re not generic advisors. We&apos;re growth operators,
            strategic thinkers, and execution partners.
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
                      10+ Successful District Development Advisory Mandates
                      across GCC
                    </p>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <h6 className="!font-sans !text-md text-dark">Education</h6>
                    <p className="text-dark/50 leading-tight max-w-[615px]">
                      {member.education ||
                        "Masters in Finance from London Business School and CFA Charterholder"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OurValuesSlider
        values={ValueData}
        bgSurface={true}
        heading="What Makes Our <br /> Value Creation Model Unique?"
      />
      {/* <div className='w-full'>
          <h2 className="heading-4 mb-8">
          What Makes Our Value Creation Model Unique?
          </h2>
          <Accordion items={items} className="w-full" />
        </div> */}
      <ServicesSection
        services={servicesData}
        bgSurface={false}
        heading="Our Value Creation Services"
      />

      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction
        secondButton="Download Our Value Creation Playbook"
        secondLink="/"
      />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default ValueCreation;
