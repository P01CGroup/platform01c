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
import StrategyCards from "@/components/ui/strategy-card";
import {
  Building2,
  Check,
  RefreshCw,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import ServicesSlider from "./ServicesSlider";
import ComparisonTable from "./ComparisonTable";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "P01SOaaS | Strategy Office as a Service | Platform01 Consulting",
    description:
      "Access a fully embedded strategy office with P01SOaaS by Platform01 Consulting. Ongoing support across strategy, M&A, corporate finance, restructuring, and execution for ambitious organizations.",
    keywords: "platform01, P01SOaaS",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url: "https://www.platform01consulting.com/p01soaas",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/p01soaas")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url,
    },
  };
}

const TurnaroundAdvisoryData: ServiceHeroData = {
  subheading: "P01SOaaS",
  heading: "Performance-Driven Strategic Solutions",
  smallHeading: "For Visionary Businesses, Investors & Leadership Teams",
  backgroundImages: {
    mobile: "/services/mobile/turnaround-advisory.png",
    tablet: "/services/tablet/turnaround-advisory.png",
    desktop: "/services/desktop/turnaround-advisory.png",
    ultrawide: "/services/ultrawide/turnaround-advisory.png",
  },
  awards: [
    {
      image: "/awards/top-consulting-firm-middle-east.png",
      text: "Top Consulting Firm <br/> ConsultancyME",
      alt: "Top Consulting Firm 2025 Middle East 2025",
    },
    {
      image: "/awards/strategist-award.png",
      text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
      alt: "Top Strategist - 2026",
    },
    {
      image: "/awards/ma-award-1.png",
      text: "Top M&A Advisory <br/> Boutique 2025",
      alt: "Top M&A Advisory Boutique 2025",
    },
  ],
  showContactForm: true,
};

const teamData = {
  heading: "Consultants and Industry Practitioners",
  supportingText:
    "With a team of former investment bankers, corporate strategists, and private equity professionals, we bring a practitioner&apos;s mindset to every deal",
  team: getTeamDataForPage("turnaround-advisory"),
};

const servicesData = [
  {
    title: "Rapid Business Assessment",
    description: (
      <span>
        We quickly identify the core issues—cash pressures, cost imbalances,
        structural inefficiencies, or declining demand. Our diagnostic approach
        combines data-driven insights with real-world business judgment.
      </span>
    ),
  },
  {
    title: "Cash Flow & Liquidity Management",
    description: (
      <span>
        We take immediate action to stabilize short-term liquidity, optimize
        working capital, and create breathing room. Our team builds 13-week cash
        flow forecasts, identifies funding options, and negotiates with
        creditors where needed.
      </span>
    ),
  },
  {
    title: "Turnaround Strategy & Execution",
    description: (
      <span>
        Once stability is achieved, we co-develop a realistic, executable
        turnaround plan. This includes rightsizing operations, rethinking the
        business model, realigning leadership, and restoring growth levers.
      </span>
    ),
  },
  {
    title: "Stakeholder Management",
    description: (
      <span>
        We manage complex dynamics between owners, banks, employees, and
        regulators with transparency and resolve—preserving trust while
        delivering hard decisions.
      </span>
    ),
  },
  {
    title: "Interim Leadership Support",
    description: (
      <span>
        Where needed, we step in with interim C-level support or hands-on
        program management to ensure momentum and accountability throughout the
        turnaround phase.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Platform01 Consulting?",
  values: [
    {
      title: "Deep Practitioner Experience",
      description:
        "Our team includes former business leaders who&apos;ve led businesses through real turnarounds—not just advised on them. We understand the urgency, complexity, and emotional weight of business distress.",
      icon: "users",
    },
    {
      title: "Strategy Meets Execution",
      description:
        "We bridge boardroom strategy with operational execution. Our work is not just a plan—it&apos;s a path to performance that we help drive from inside the business.",
      icon: "zap",
    },
    {
      title: "Bespoke Solutions",
      description:
        "No two crises are the same. We reject off-the-shelf fixes. Every recommendation is customized, aligned with shareholder priorities and market realities.",
      icon: "target",
    },
    {
      title: "Trusted by Business Leaders",
      description:
        "Our turnaround work spans family-owned businesses, PE-backed portfolio companies, and listed entities—across sectors including retail, industrials, healthcare, and logistics.",
      icon: "award",
    },
  ],
};

const faqData: FAQItem[] = [
  {
    question: "What is P01SOaaS™?",
    answer: (
      <span>
        Businesses today require agile strategic support that can adapt quickly
        to changing priorities, investor expectations, market conditions,
        operational challenges, and growth opportunities. Leadership teams need
        execution partners, not just slide decks.
        <br />
        P01SOaaS™ is a fully integrated Strategy Office as a Service platform
        that gives organizations access to Platform01 Consulting’s
        multidisciplinary consulting capabilities under one strategic delivery
        framework.
        <br />
        Clients gain access to strategic execution support across Corporate
        Strategy, Business Transformation, PMO & Project Management Support,
        Financial Modelling & Business Analytics, Corporate Finance Support,
        Market Research & Commercial Intelligence, Investment Evaluation
        Support, Business Planning & Strategic Planning, Brand & Commercial
        Strategy, Investor Readiness Support, Operational Performance Tracking,
        Growth Strategy and Fractional Strategic Leadership Support.
      </span>
    ),
  },
  {
    question:
      "What are the best Strategy Office as a Service solutions in the UAE?",
    answer: (
      <span>
        P01SOaaS™ by Platform01 Consulting is designed as a premium Strategy
        Office as a Service solution for businesses in the UAE requiring
        strategy implementation, PMO support, strategy analysts, management
        reporting, financial analysis, and executionfocused strategic
        consulting.
      </span>
    ),
  },
  {
    question:
      "Which firms provide PMO and strategy implementation services in Dubai and Abu Dhabi?",
    answer: (
      <span>
        Platform01 Consulting provides PMO support, strategic execution support,
        project management office services, transformation coordination,
        executive reporting support, and strategy implementation services for
        businesses operating in Dubai, Abu Dhabi, and across the UAE.
      </span>
    ),
  },
  {
    question:
      "Are analysts and fractional strategic support services available in Saudi Arabia?",
    answer: (
      <span>
        Yes. P01SOaaS™ supports businesses in Saudi Arabia with strategy
        analysts, PMO support, strategic execution capabilities, management
        reporting, business analysis, financial analysis, and flexible strategic
        support solutions.
      </span>
    ),
  },
  {
    question:
      "Can businesses in the UK opt for strategy execution and PMO support?",
    answer: (
      <span>
        Yes. Platform01 Consulting supports UK-based businesses through Strategy
        Office as a Service engagemwent that include strategic implementation
        support, strategic associates, PMO coordination, business planning,
        reporting support, and performance management capabilities.
      </span>
    ),
  },
  {
    question: "What is Strategy Office as a Service?",
    answer: (
      <span>
        Strategy Office as a Service is a strategic support model where
        businesses outsource ongoing strategy execution, PMO coordination,
        analytical support, management reporting, and strategic implementation
        capabilities through an external strategic partner. <br />
        P01SOaaS™ provides businesses with access to an integrated strategy
        office without the cost and complexity of building large internal
        strategic teams.
      </span>
    ),
  },
  {
    question: "How is P01SOaaS™ different from traditional consulting firms?",
    answer: (
      <span>
        Traditional consulting firms typically operate using billable-hour
        models and short-term project engagements. <br />
        P01SOaaS™ is designed as a long-term execution-focused strategic
        partnership model emphasizing implementation support, business
        priorities, and operational value creation rather than simply delivering
        presentations or charging for consultant hours.
      </span>
    ),
  },
  {
    question: "Does P01SOaaS™ include PMO and project management support?",
    answer: (
      <span>
        Yes. P01SOaaS™ includes PMO support, project tracking support,
        initiative coordination, strategic execution monitoring, management
        reporting, and governance support as part of the broader strategic
        delivery framework.
      </span>
    ),
  },
  {
    question:
      "Can businesses use P01SOaaS™ instead of hiring a fractional CFO or strategy team?",
    answer: (
      <span>
        Yes. Many organizations use P01SOaaS™ as an alternative to building
        large internal strategy, finance, analytics, or transformation teams.
        <br />
        The model provides access to multidisciplinary strategic support
        capabilities under one integrated engagement structure.
      </span>
    ),
  },
  {
    question:
      "Does Platform01 Consulting provide analysts and strategic associates?",
    answer: (
      <span>
        Yes. P01SOaaS™ can support businesses with strategic analysis
        capabilities including financial analysis, market research, commercial
        analysis, reporting support, business intelligence, and strategic
        execution support.
      </span>
    ),
  },
  {
    question: "Who should use P01SOaaS™?",
    answer: (
      <span>
        P01SOaaS™ is suitable for:
        <ul className="list-disc pl-6 mt-2">
          <li>SMEs</li>
          <li>Mid-market businesses</li>
          <li>Growth-stage companies</li>
          <li>Founder-led organizations</li>
          <li>Corporates undergoing transformation</li>
          <li>Investors</li>
          <li>Family offices</li>
          <li>Investment platforms</li>
          <li>Businesses requiring strategic execution support</li>
        </ul>
      </span>
    ),
  },
  {
    question: "Is P01SOaaS™ available in the UAE?",
    answer: (
      <span>
        Yes. Platform01 Consulting supports businesses and investors across the
        UAE through P01SOaaS™ engagements focused on strategy execution, PMO
        support, business planning, financial analysis, and strategic
        transformation support.
      </span>
    ),
  },
  {
    question: "Is P01SOaaS™ available in Saudi Arabia (KSA)?",
    answer: (
      <span>
        Yes. Platform01 Consulting supports businesses and investors in Saudi
        Arabia through strategic execution support, PMO advisory support,
        outsourced strategic analysis, business transformation support, and
        management consulting capabilities.
      </span>
    ),
  },
  {
    question: "Is P01SOaaS™ available in the United Kingdom (UK)?",
    answer: (
      <span>
        Yes. Platform01 Consulting supports UK-based businesses, investors, and
        leadership teams requiring flexible strategic execution support, PMO
        coordination, financial analysis, and outsourced strategic office
        capabilities.
      </span>
    ),
  },
  {
    question: "Can P01SOaaS™ support strategy implementation services?",
    answer: (
      <span>
        Yes. Strategy implementation is one of the core focus areas of
        P01SOaaS™.
        <br />
        The model is specifically designed to help businesses bridge the gap
        between strategic planning and execution through structured monitoring,
        reporting, accountability, and coordination support.
      </span>
    ),
  },
  {
    question: "What industries does Platform01 Consulting support?",
    answer: (
      <span>
        Platform01 Consulting supports businesses across multiple sectors
        including healthcare, manufacturing, industrials, technology, retail,
        construction, logistics, professional services, hospitality, real
        estate, energy, and investment platforms.
      </span>
    ),
  },
  {
    question: "What Industries does P01SOaaS support in? ",
    answer: (
      <span>
        P01SOaaS™ can support businesses and investors across multiple sectors
        including:
        <ul className="list-disc pl-6 mt-2">
          <li>Healthcare</li>
          <li>Pharmaceuticals</li>
          <li>Manufacturing</li>
          <li>Industrial Services</li>
          <li>Construction</li>
          <li>Real Estate</li>
          <li>Retail & Consumer</li>
          <li>Technology</li>
          <li>Logistics</li>
          <li>Education</li>
          <li>Hospitality</li>
          <li>Energy</li>
          <li>Professional Services</li>
          <li>Investment Platforms</li>
          <li>Family Offices</li>
          <li>Food & Beverage</li>
          <li>Trading Businesses</li>
          <li>Distribution Businesses</li>
        </ul>
      </span>
    ),
  },
];

const checklistItems = [
  "This is not a one-off advisory engagement.",
  "This is not a static consulting retainer.",
  "This is not outsourced administration.",
];

const traditionalConsultingItems = [
  "Focused on billable hours",
  "Short-term projects",
  "Presentation-driven",
  "Siloed service delivery",
  "Reactive engagement structure",
  "Limited continuity",
  "High dependency on internal coordination",
  "Expensive internal hiring alternatives",
];

const p01saasItems = [
  "Focused on strategic value creation",
  "Long-term strategic partnership",
  "Execution-driven",
  "Integrated multidisciplinary support",
  "Proactive strategic involvement",
  "Ongoing strategic oversight",
  "Embedded coordination support",
  "Flexible strategic capability access",
];

const traditionalVsP01saas = [
  {
    title: "Focused on strategic value creation",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Long-term strategic partnership",
    traditional: false,
    p01saas: true,
  },
  { title: "Execution-driven", traditional: false, p01saas: true },
  {
    title: "Integrated multidisciplinary support",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Proactive strategic involvement",
    traditional: false,
    p01saas: true,
  },
  { title: "Ongoing strategic oversight", traditional: false, p01saas: true },
  { title: "Embedded coordination support", traditional: false, p01saas: true },
  {
    title: "Flexible strategic capability access",
    traditional: false,
    p01saas: true,
  },
  { title: "Focused on billable hours", traditional: true, p01saas: false },
  { title: "Short-term projects", traditional: true, p01saas: false },
  { title: "Presentation-driven", traditional: true, p01saas: false },
  { title: "Siloed service delivery", traditional: true, p01saas: false },
  { title: "Reactive engagement structure", traditional: true, p01saas: false },
  { title: "Limited continuity", traditional: true, p01saas: false },
  {
    title: "High dependency on internal coordination",
    traditional: true,
    p01saas: false,
  },
  {
    title: "Expensive internal hiring alternatives",
    traditional: true,
    p01saas: false,
  },
];

const strategicServices = [
  {
    title: "Strategy Implementation Services",
    description:
      "Many companies develop strategies that never get effectively implemented. <br/>P01SOaaS™ bridges the gap between strategy development and execution by supporting:",
    services: [
      "Strategic roadmap implementation",
      "Initiative tracking",
      "Cross-functional coordination",
      "Strategic KPI monitoring",
      "Executive reporting",
      "Management accountability frameworks",
      "Transformation office support",
      "Performance review structures",
      "Decision-support analytics",
    ],
  },

  {
    title: "Project Management Office Support",
    description:
      "Organizations frequently struggle with fragmented execution, delayed initiatives, and lack of operational visibility.<br/>Our PMO and project management support services help businesses establish stronger execution discipline. <br/>Support areas include:",
    services: [
      "PMO setup and support",
      "Project tracking dashboards",
      "Management reporting",
      "Initiative prioritization",
      "Execution monitoring",
      "Stakeholder coordination",
      "Governance support",
      "Program management support",
      "Strategic initiative oversight",
      "Executive reporting structures",
    ],
  },

  {
    title: "Fractional Strategic Leadership Support",
    description:
      "P01SOaaS™ can function as a strategic extension of leadership teams through embedded strategic support capabilities. <br/>This model is ideal for organizations seeking support similar to:",
    services: [
      "Fractional CFO support",
      "Fractional Strategy Office support",
      "Fractional business advisory support",
      "Financial analysis support teams",
      "Strategic management support",
      "Commercial planning support",
      "Corporate Finance Support",
      "Growth strategy support",
    ],
    additionalText:
      "Rather than hiring multiple senior executives internally, businesses can access integrated strategic capabilities through one centralized engagement.",
  },

  {
    title: "Strategic Analysts & Associates",
    description:
      "Many businesses require analytical and strategic execution support but face challenges recruiting and retaining experienced resources. P01SOaaS™ provides access to experienced analysts and strategic associates that support:",
    services: [
      "Financial modelling",
      "Market research",
      "Business analysis",
      "Commercial analysis",
      "Competitive benchmarking",
      "Investor presentations",
      "Strategic reports",
      "Dashboard preparation",
      "Business case development",
      "Corporate presentations",
      "Industry intelligence",
    ],
  },

  {
    title: "Corporate Finance & Strategic Financial Support",
    description:
      "Businesses require ongoing strategic financial support beyond accounting and compliance. Our support capabilities include:",
    services: [
      "Financial analysis",
      "Strategic financial modelling",
      "Business performance reviews",
      "Scenario analysis",
      "Budgeting support",
      "Forecasting support",
      "Investment analysis",
      "Capital planning support",
      "Management reporting",
      "Investor readiness preparation",
    ],
  },
];

const bespokeItems = [
  {
    title: "Cost Efficiency",
    description:
      "Access multidisciplinary strategic capabilities without incurring significant costs.",
  },
  {
    title: "Faster Access to Strategic Resources",
    description:
      "Avoid lengthy recruitment cycles and immediately strengthen strategic execution capabilities.",
  },
  {
    title: "Flexible Cross-Functional Support",
    description:
      "Leverage strategic support dynamically across finance, strategy, operations, commercial priorities, and transformation initiatives.",
  },
  {
    title: "Long-Term Strategic Continuity",
    description:
      "Create consistency in strategic oversight, reporting, and implementation tracking.",
  },
];

const newServiceData = [
  {
    title: "Growth Companies",
    description:
      "Businesses experiencing rapid expansion often struggle with strategic alignment, project prioritization, reporting structures, and execution capacity. <br /> P01SOaaS™ provides structured strategic support to help management teams scale effectively.",
  },
  {
    title: "SMEs & Mid-Market Businesses",
    description:
      "Many SMEs require sophisticated strategic and financial capabilities but do not require or cannot justify multiple full-time senior hires. <br /> Our model allows businesses to access enterprise-grade strategic support flexibly.",
  },
  {
    title: "Investors & Family Offices",
    description:
      "Investors frequently require ongoing support across portfolio monitoring, investment evaluation, strategic oversight, financial analysis, management reporting, and growth planning.<br /> P01SOaaS™ acts as an extension of the investor’s strategic and analytical capabilities.",
  },
  {
    title: "Founder-Led Businesses",
    description:
      "Founders often become overwhelmed managing operations, growth initiatives, strategic planning, reporting, fundraising preparation, and project execution simultaneously. <br />P01SOaaS™ creates structure, accountability, and execution support around management priorities.",
  },
  {
    title: "Corporates Undergoing Transformation",
    description:
      "Organizations implementing restructuring, operational improvements, expansion initiatives, new market entry, digitization, or strategic transformation require coordinated execution support.<br />P01SOaaS™ helps management teams drive momentum and maintain visibility across strategic initiatives.",
  },
];

const TurnaroundAdvisory = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: [],
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
        {...TurnaroundAdvisoryData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5 pb-20">
        <Header
          text="P01SOaaS (Platform01 Strategy Office as a Service)"
          className="mb-26"
        />
        <div className="grid grid-cols-1 gap-4">
          <h2 className="heading-4 ">
            Most businesses have a vision. Few have the structural capacity to
            execute it consistently across every initiative, every quarter,
            without losing momentum.
          </h2>
          <p className=" text-dark/50">
            P01SOaaS™ (Platform01 Strategy Office as a Service) bridges that
            gap. It is a continuously embedded, performance-driven strategic
            model that gives companies, investors, family offices, and founders
            access to a fully integrated strategy office without the cost,
            complexity, or commitment of building one inhouse.
          </p>
          <p className=" text-dark/50">
            From strategic planning and PMO support to financial analysis,
            fractional leadership, and execution oversight P01SOaaS™ operates
            as a seamless extension of your leadership team, aligned to your
            goals, accountable to your outcomes.
          </p>
        </div>
      </div>
      {/* <div className="container pt-5 pb-20">
        <Header
          text="P01SOaaS (Platform01 Strategy Office as a Service)"
          className="mb-26"
        />
        <div className="grid grid-cols-1 gap-4">
          <h2 className="heading-4 ">
            Move Beyond Traditional Consulting Retainers
          </h2>
          <p className=" text-dark/50">
            Most consulting firms sell hours. Platform01 Consulting Group
            delivers outcomes. P01SOaaS™ (Platform01 Strategy Office as a
            Service) is a performance-driven strategic execution model designed
            for companies, investors, family offices, founders, and leadership
            teams that require continuous strategic support without the
            inefficiencies of traditional consulting structures.
          </p>
          {checklistItems.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              className="last:border-b-0 border-b border-dark/10 py-6"
            />
          ))}
          <p className=" text-dark/50">
            P01SOaaS™ is a long-term strategic partnership built around
            implementation, accountability, business priorities, and measurable
            value creation.
          </p>
        </div>
      </div> */}
      {/* <TeamText>
        <div>
          <h2 className="heading-3  ">
            A Note from Our Managing Director, Consulting
          </h2>
          <hr className="border-dark/10 my-8" />
          <h2 className="heading-4 text-dark/50 max-w-[810px]">
            Turnarounds demand more than models and presentations—they require
            decisive action, credible leadership, and the courage to make hard
            calls. At Platform01, our team brings all three. We don't just
            consult—we roll up our sleeves and lead from the front. Having
            advised and led turnaround programs in the region and globally, we
            understand the nuances of the GCC market, its capital structures,
            and stakeholder environments.
          </h2>
        </div>
        <p>
          Whether the challenge is financial distress, strategic failure, or
          operational breakdown, we bring clarity under pressure and execution
          that delivers. That's the Platform01 difference.
        </p>
      </TeamText> */}
      <TeamText>
        <div>
          <h2 className="heading-3 max-w-[450px]">
            Move Beyond Traditional Consulting Retainers
          </h2>
          <hr className="border-dark/10 my-8" />
          <p className="text-dark/50 max-w-[620px]">
            Most consulting firms sell hours. Platform01 Consulting Group
            delivers outcomes. P01SOaaS™ (Platform01 Strategy Office as a
            Service) is a performance-driven strategic execution model designed
            for companies, investors, family offices, founders, and leadership
            teams that require continuous strategic support without the
            inefficiencies of traditional consulting structures.
          </p>
          <p className="text-dark/50 max-w-[620px]">
            P01SOaaS™ is a long-term strategic partnership built around
            implementation, accountability, business priorities, and measurable
            value creation.
          </p>
        </div>
        <div>
          {/* <h4 className="heading-5 mb-4">
            These Key Strategic Choices for Feasibility Study Specialist
            include:
          </h4> */}
          {/* <hr className="border-dark/10 my-4" /> */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {checklistItems.map((item, index) => (
              <ChecklistItem key={index} text={item} className=" py-3.5" />
            ))}
            {/* <ChecklistItem
              text="Business Model & Strategy"
              className="py-3.5"
            />
            <ChecklistItem text="Target Market" className="py-3.5" />
            <ChecklistItem
              text="Value Proposition and USP"
              className="py-3.5"
            />
            <ChecklistItem text="Competitive Positioning" className="py-3.5" /> */}
          </div>
        </div>
      </TeamText>
      {/* <TeamText>
        <div>
          <Header
            text="P01SOaaS (Platform01 Strategy Office as a Service)"
            className="mb-12"
          />
          <h2 className="heading-3 max-w-[450px]">
            A Strategic Foundation for Feasibility Study Saudi Arabia, Not Just
            an Evaluation
          </h2>
          <hr className="border-dark/10 my-8" />
          <p className="text-dark/50 max-w-[620px]">
            A Feasibility Study is more than just Assessing Economic
            Viability—it&apos;s the Bedrock of your Project&apos;s Strategy.
            It&apos;s where Critical Strategic Choices are made, ensuring your
            project is built on Solid Foundations to Maximize chances of Success
            and Avoid Costly Mistakes. Engaging a trusted feasibility study
            consultant ensures these choices are guided by real market and
            financial insights.
          </p>
        </div>
        <div>
          <h4 className="heading-5 mb-4">
            These Key Strategic Choices for Feasibility Study Specialist
            include:
          </h4>
          <hr className="border-dark/10 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ChecklistItem
              text="Business Model & Strategy"
              className="py-3.5"
            />
            <ChecklistItem text="Target Market" className="py-3.5" />
            <ChecklistItem
              text="Value Proposition and USP"
              className="py-3.5"
            />
            <ChecklistItem text="Competitive Positioning" className="py-3.5" />
          </div>
        </div>
      </TeamText> */}
      <div className=" py-16">
        <div className="container grid grid-cols-1 gap-8 gap-y-16">
          <div>
            <h2 className="heading-4">The P01SOaaS™ Difference</h2>
            <hr className="border-dark/10 my-3" />
            <h3 className="heading-5">
              Performance-Driven Strategic Partnership
            </h3>
            <p className="text-md text-dark/50 mt-4">
              P01SOaaS™ is designed around long-term value creation and
              strategic execution. <br />
              Our model integrates consulting, execution support, project
              management coordination, strategic analysis, and operational
              follow-through into one unified engagement structure.
            </p>
          </div>
          {/* <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-surface p-7">
                <h5 className="heading-5.5">Traditional Consulting</h5>
                <hr className="border-dark/10 my-4" />
                <div>
                  {traditionalConsultingItems.map((item, index) => (
                    <ChecklistItem
                      key={index + 1}
                      text={item}
                      className="py-1.5"
                    />
                  ))}
                </div>
              </div>
              <div className="bg-surface p-7">
                <h5 className="heading-5.5">P01SOaaS™</h5>
                <hr className="border-dark/10 my-4" />
                <div>
                  {p01saasItems.map((item, index) => (
                    <ChecklistItem
                      key={index + 1}
                      text={item}
                      className="py-1.5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          {/* <table>
            <thead>
              <tr>
                <th></th>
                <th>P01SOaaS™</th>
                <th>Traditional Consulting</th>
              </tr>
            </thead>
            <tbody>
              {traditionalVsP01saas.map((row, index) => (
                <tr key={index}>
                  <td>{row.title}</td>
                  <td>{row.p01saas ? <Check /> : <X />}</td>
                  <td>{row.traditional ? <Check /> : <X />}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className=" overflow-x-auto">
            <table className="w-full border-collapse border border-dark/10">
              <thead>
                <tr>
                  <th className="border border-dark/10 bg-white p-6"></th>

                  <th className="border border-dark/10 bg-white p-6 text-center heading-5">
                    P01SOaaS™
                  </th>

                  <th className="border border-dark/10 bg-white p-6 text-center heading-5">
                    Traditional Consulting
                  </th>
                </tr>
              </thead>

              <tbody>
                {traditionalVsP01saas.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-dark/10 bg-white p-3 font-medium">
                      {row.title}
                    </td>

                    <td className="border border-dark/10 bg-white p-3 text-center">
                      {row.p01saas ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        <X className="mx-auto text-red-500" />
                      )}
                    </td>

                    <td className="border border-dark/10 bg-white p-3 text-center">
                      {row.traditional ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        <X className="mx-auto text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="bg-surface py-20">
        <div className="container">
          <h2 className="heading-4   max-w-[1010px]">
            Who is P01SOaaS™ Designed For?
          </h2>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="p-8 bg-white flex flex-col gap-6">
              <div>
                <h3 className="heading-3 text-dark/20">01.</h3>
                <h2 className="heading-5 max-w-[177px]">Growth Companies</h2>
              </div>
              <p className="text-dark/50">
                Businesses experiencing rapid expansion often struggle with
                strategic alignment, project prioritization, reporting
                structures, and execution capacity.
                <br /> P01SOaaS™ provides structured strategic support to help
                management teams scale effectively.
              </p>
            </div>
            <div className="p-8 bg-white flex flex-col gap-6">
              <div>
                <h3 className="heading-3 text-dark/20">02.</h3>
                <h2 className="heading-5 max-w-[177px]">
                  SMEs & Mid-Market Businesses
                </h2>
              </div>
              <p className="text-dark/50">
                Many SMEs require sophisticated strategic and financial
                capabilities but do not require or cannot justify multiple
                full-time senior hires. <br />
                Our model allows businesses to access enterprise-grade strategic
                support flexibly.
              </p>
            </div>
            <div className="p-8 bg-white flex flex-col gap-6">
              <div>
                <h3 className="heading-3 text-dark/20">03.</h3>
                <h2 className="heading-5 max-w-[177px]">
                  Investors & Family Offices
                </h2>
              </div>
              <p className="text-dark/50">
                Investors frequently require ongoing support across portfolio
                monitoring, investment evaluation, strategic oversight,
                financial analysis, management reporting, and growth planning.{" "}
                <br />
                P01SOaaS™ acts as an extension of the investor’s strategic and
                analytical capabilities.
              </p>
            </div>
            <div className="p-8 bg-white flex flex-col gap-6">
              <div>
                <h3 className="heading-3 text-dark/20">04.</h3>
                <h2 className="heading-5 max-w-[177px]">
                  Founder-Led Businesses
                </h2>
              </div>
              <p className="text-dark/50">
                Founders often become overwhelmed managing operations, growth
                initiatives, strategic planning, reporting, fundraising
                preparation, and project execution simultaneously. <br />
                P01SOaaS™ creates structure, accountability, and execution
                support around management priorities.
              </p>
            </div>
            <div className="p-8 bg-white flex flex-col gap-6">
              <div>
                <h3 className="heading-3 text-dark/20">05.</h3>
                <h2 className="heading-5 max-w-[200px]">
                  Corporates Undergoing Transformation
                </h2>
              </div>
              <p className="text-dark/50">
                Organizations implementing restructuring, operational
                improvements, expansion initiatives, new market entry,
                digitization, or strategic transformation require coordinated
                execution support.
                <br />
                P01SOaaS™ helps management teams drive momentum and maintain
                visibility across strategic initiatives.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <ServicesSlider
        heading="Who is P01SOaaS™ Designed For?"
        displayServiceData={newServiceData}
      />
      <div className=" py-20">
        <div className="container">
          <h2 className="heading-3 max-w-[1010px]">
            Included Strategic Support Areas{" "}
          </h2>
          <div className="grid md:grid-cols-5 gap-3 mt-10">
            {strategicServices.map((service, index) => (
              <StrategyCards key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-surface py-20">
        <div className="container pt-5">
          <h2 className="heading-4 max-w-[1010px] ">
            Key Benefits of P01SOaaS™{" "}
          </h2>
          <hr className="border-dark/10 my-4" />

          <div className="gap-4 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-12 mb-8">
            {bespokeItems.map((item, index) => (
              <div
                key={index + 1}
                className={`relative p-6 text-left transition-all duration-200 group border border-dark/10 ${"bg-white text-dark"}`}
              >
                <div
                  className={`w-12 h-12 mb-8 flex items-center justify-center text-dark ${"bg-surface"} group-hover:text-primary transition-colors duration-200`}
                >
                  {index === 0 && <TrendingUp size={24} />}
                  {index === 1 && <Building2 size={24} />}
                  {index === 2 && <Target size={24} />}
                  {index === 3 && <RefreshCw size={24} />}
                  {index === 4 && <Target size={24} />}
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <h5 className="leading-tight min-h-[55px]">{item?.title}</h5>
                  <p className="text-dark/50">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQSection
        fullWidthAnswers={true}
        headingFullWidth={true}
        leftAligned={true}
        calendlyButtonVisibility={false}
        faqs={faqData}
      />
    </>
  );
};

export default TurnaroundAdvisory;
