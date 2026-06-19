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
import parse from "html-react-parser";
import { getSeoMetadata } from "@/lib/seo-config";
import { supabaseAdmin } from "@/lib/supabase/admin";
import StrategyCards from "./strategy-card";
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
    title: "Strategic Growth & Advisory Solutions | Platform01 Consulting",
    description:
      "P01Gateway offers strategic advisory, business transformation, and execution support to drive sustainable growth and long-term value.",
    keywords: "platform01, P01SOaaS",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url: "https://www.platform01consulting.com/p01gateway",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/p01gateway")
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
  subheading: "P01Gateway™",
  heading: "GCC Market Entry & Go-To-Market Execution",
  // smallHeading: "For Visionary Businesses, Investors & Leadership Teams",
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
    question: "What is the best strategy for entering the GCC market?",
    answer: (
      <span>
        The best GCC market entry strategy depends on factors such as industry,
        target customers, regulatory environment, commercial objectives, product
        maturity, and operational model.
        <br />
        P01Gateway™ helps organizations develop tailored market entry
        strategies that align with commercial realities and long-term growth
        goals.
      </span>
    ),
  },
  {
    question: "How can a company expand into the UAE market?",
    answer: (
      <span>
        Companies expanding into the GCC market typically require a structured
        approach involving market research, GTM planning, business setup
        advisory, commercial positioning, partnership development, and execution
        support.
        <br />
        Platform01 Consulting supports organizations through end-to-end
        expansion planning and implementation.
      </span>
    ),
  },
  {
    question: "How can foreign companies enter the Saudi Arabia market?",
    answer: (
      <span>
        Entering the Saudi Arabia market often requires strategic localization,
        regulatory understanding, partnership alignment, and long-term
        commercial planning.
        <br />
        P01Gateway™ helps organizations navigate these complexities with
        structured GTM and market entry support.
      </span>
    ),
  },
  {
    question: "Does Platform01 Consulting provide GCC market entry consulting?",
    answer: (
      <span>
        Yes.
        <br />
        Platform01 Consulting provides premium GCC market entry consulting and
        GTM execution support through the P01Gateway™ solution.
      </span>
    ),
  },
  {
    question: "What industries can benefit from GCC expansion?",
    answer: (
      <span>
        Industries including technology, AI, SaaS, fintech, healthcare,
        manufacturing, energy, professional services, infrastructure, logistics,
        retail, and sustainability solutions can benefit significantly from GCC
        market expansion opportunities.
      </span>
    ),
  },
  {
    question: "What is a GCC go-to-market strategy?",
    answer: (
      <span>
        A GCC go-to-market strategy defines how a company positions, launches,
        markets, sells, and scales its products or services across Gulf markets.
        <br />
        This includes commercial strategy, market positioning, customer
        acquisition, partnerships, sales channels, and execution planning.
      </span>
    ),
  },
  {
    question: "Why is local execution support important for GCC expansion?",
    answer: (
      <span>
        Many international companies fail in GCC expansion due to lack of local
        ecosystem understanding, weak commercial positioning, fragmented
        execution, and insufficient strategic alignment.
        <br />
        Local execution support helps organizations accelerate market
        integration and reduce operational risks.
      </span>
    ),
  },
  {
    question:
      "Does Platform01 Consulting support implementation or only strategy?",
    answer: (
      <span>
        Platform01 Consulting focuses on both strategy and implementation
        support.
        <br />
        P01Gateway™ is specifically designed as an execution-focused market
        expansion solution rather than a traditional advisory-only engagement.
      </span>
    ),
  },
  {
    question: "Can startups use P01Gateway™ for GCC expansion?",
    answer: (
      <span>
        Yes.
        <br />
        Startups and growth-stage businesses can use P01Gateway™ to validate
        opportunities, define GTM strategies, build partnerships, and accelerate
        regional expansion.
      </span>
    ),
  },
  {
    question: "Which GCC countries does Platform01 Consulting support?",
    answer: (
      <span>
        Platform01 Consulting primarily supports organizations entering the
        United Arab Emirates and Saudi Arabia markets while also advising on
        broader GCC expansion opportunities.
      </span>
    ),
  },
  {
    question: "Start Your GCC Expansion Journey",
    answer: (
      <span>
        P01Gateway™ is built for organizations that want more than market
        reports and theoretical recommendations.
        <br />
        It is designed for companies seeking a strategic execution partner
        capable of supporting real commercial expansion into the GCC.
        <br />
        If your organization is exploring Gulf expansion opportunities, GTM
        execution support, strategic partnerships, or long-term regional growth,
        Platform01 Consulting can help you build and execute a structured market
        entry strategy.
      </span>
    ),
  },
];

const checklistItems1 = [
  "International companies entering the GCC",
  "Technology firms expanding globally",
  "Investors evaluating regional opportunities",
  "Startups entering Gulf markets",
  "Mid-market businesses seeking regional growth",
  "Professional services firms establishing regional operations",
  "Companies launching new products in the GCC",
  "Organizations seeking strategic partnerships in the Gulf",
  "Businesses requiring GTM support for regional expansion",
  "Enterprises looking for fractional strategic support in the GCC",
];

const checklistItems2 = [
  "Strategy",
  "Execution",
  "Ecosystem access",
  "Market intelligence",
  "Commercial acceleration",
  "Operational flexibility",
];

const traditionalVsP01saas = [
  {
    title: "Market expansion strategy",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Commercial growth planning",
    traditional: false,
    p01saas: true,
  },
  { title: "Go-to-market execution", traditional: false, p01saas: true },
  {
    title: "Strategic partnerships",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Market positioning",
    traditional: false,
    p01saas: true,
  },
  { title: "Enterprise engagement", traditional: false, p01saas: true },
  { title: "Commercial acceleration", traditional: false, p01saas: true },
  {
    title: "Fractional strategic leadership",
    traditional: false,
    p01saas: true,
  },
  { title: "Regional growth execution", traditional: false, p01saas: true },
];

const strategicServices = [
  {
    title: "GCC Market Entry Strategy",
    description: `<p  className="text-dark/50 leading-tight">We help organizations evaluate and structure commercially viable expansion strategies aligned with regional opportunities and long-term business objectives.</p>
    <h6 className="heading-5.5 font-semibold">Strategic Scope Includes:</h6>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Market opportunity assessment</li>
      <li>Competitive positioning</li>
      <li>Commercial strategy</li>
      <li>Expansion roadmap development</li>
      <li>Growth prioritization</li>
      <li>Industry analysis</li>
      <li>Revenue opportunity mapping</li>
      <li>Strategic risk assessment</li>
      <li>Enterprise engagement strategy</li>
      <li>Market penetration planning</li>
      <li>Market entry support</li>
    </ul>`,
  },
  {
    title: "Go-To-Market (GTM) Strategy & Execution",
    description: `<p  className="text-dark/50 leading-tight">P01Gateway™ supports organizations in designing and executing high-impact GTM strategies tailored for GCC business environments.</p>
    <h6 className="heading-5.5 font-semibold">GTM Support Areas:</h6>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Market positioning strategy</li>
      <li>Commercial launch strategy</li>
      <li>Sales strategy</li>
      <li>Enterprise engagement planning</li>
      <li>Partnership-led growth strategy </li>
      <li>Customer acquisition planning</li>
      <li>Strategic communications alignment</li>
      <li>Commercial execution support</li>
      <li>Revenue acceleration initiatives</li>
      <li>Regional expansion execution</li>
    </ul>`,
  },
  {
    title: "Strategic Partnerships & Ecosystem Access",
    description: `<p className="text-dark/50 leading-tight">One of the biggest barriers to successful GCC expansion is the lack of access to the right ecosystem stakeholders.</br>Platform01 Consulting supports clients by helping identify and engage with relevant:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Strategic partners</li>
      <li>Distributors</li>
      <li>Channel partners</li>
      <li>Commercial alliances</li>
      <li>Government stakeholders</li>
      <li>Investors</li>
      <li>Enterprise clients</li>
      <li>Family offices</li>
      <li>Industry participants</li>
      <li>Service providers</li>
      <li>Technology collaborators</li>
    </ul>
    <p className="text-dark/50 leading-tight">Our role is to help accelerate commercial access and strategic alignment within the regional ecosystem.</p>`,
  },
  {
    title: "Fractional GCC Strategy Office",
    description: `<p className="text-dark/50 leading-tight">For companies entering the GCC without immediate plans to establish a large local team, Platform01 Consulting can act as a fractional strategic office supporting regional expansion activities.</br>This may include:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Strategic coordination</li>
      <li>GTM execution oversight</li>
      <li>Market expansion support</li>
      <li>Business development coordination</li>
      <li>Stakeholder engagement</li>
      <li>Strategic reporting</li>
      <li>Expansion roadmap monitoring</li>
      <li>Market intelligence support</li>
      <li>Commercial opportunity tracking</li>
    </ul>
    <p className="text-dark/50 leading-tight">This model enables organizations to maintain strategic momentum while optimizing operational costs during the expansion phase.</p>`,
  },
  {
    title: "Commercial Execution Support",
    description: `<p className="text-dark/50 leading-tight">Unlike traditional advisory firms, Platform01 Consulting supports clients during implementation and execution stages.</p>
    <h6 className="heading-5.5 font-semibold">Execution Support Areas:</h6>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Market launch coordination</li>
      <li>Sales enablement guidance</li>
      <li>Commercial introductions</li>
      <li>Strategic outreach support</li>
      <li>Expansion milestone tracking</li>
      <li>Proposal and investor material support</li>
      <li>Strategic communications guidance</li>
      <li>Local market coordination</li>
      <li>Operational advisory support</li>
      <li>Expansion performance monitoring</li>
    </ul>`,
  },
  {
    title: "Investor & Expansion Advisory",
    description: `<p className="text-dark/50 leading-tight">For high-growth companies, startups, and international ventures seeking strategic growth in the GCC, P01Gateway™ can also support:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Expansion investment readiness</li>
      <li>Investor positioning</li>
      <li>Market expansion narratives</li>
      <li>Commercial growth strategy</li>
      <li>Strategic business modelling</li>
      <li>Partnership-led scaling</li>
      <li>Market validation support</li>
      <li>Growth roadmap structuring</li>
    </ul>`,
  },
  // {
  //   title: "Industries We Support",
  //   description: `<p className="text-dark/50 leading-tight">P01Gateway™ is designed to support companies across multiple industries and sectors.</p>
  //    <h6 className="heading-5.5 font-semibold">Technology & Digital Solutions</h6>
  //   <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
  //     <li>AI companies</li>
  //     <li>SaaS businesses</li>
  //     <li>Enterprise software providers</li>
  //     <li>Cybersecurity firms</li>
  //     <li>Cloud solution providers</li>
  //     <li>Digital transformation companies</li>
  //     <li>Data and analytics firms</li>
  //   </ul>
  //    <h6 className="heading-5.5 font-semibold">Industrial & Manufacturing</h6>
  //   <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
  //     <li>Industrial solution providers</li>
  //     <li>Engineering firms</li>
  //     <li>Manufacturing companies</li>
  //     <li>Smart infrastructure businesses</li>
  //     <li>Construction technology providers</li>
  //   </ul>
  //    <h6 className="heading-5.5 font-semibold">Healthcare & Life Sciences</h6>
  //   <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
  //     <li>Healthtech companies</li>
  //     <li>Medical solution providers</li>
  //     <li>Wellness businesses</li>
  //     <li>Digital healthcare platforms</li>
  //   </ul>
  //    <h6 className="heading-5.5 font-semibold">Consumer & Retail</h6>
  //   <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
  //     <li>Consumer brands</li>
  //     <li>Retail operators</li>
  //     <li>E-commerce businesses</li>
  //     <li>Luxury brands</li>
  //     <li>Food and beverage companies</li>
  //   </ul>
  //    <h6 className="heading-5.5 font-semibold">Energy & Sustainability</h6>
  //   <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
  //     <li>Renewable energy firms</li>
  //     <li>ESG solution providers</li>
  //     <li>Sustainability-focused businesses</li>
  //     <li>Climate technology companies</li>
  //   </ul>
  //   `,
  // },
];

const bespokeItems = [
  {
    title: "Phase 1 – Strategic Assessment",
    description: `<p className="text-dark/50">We begin with understanding the client’s:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Business model</li>
      <li>Expansion objectives</li>
      <li>Commercial priorities</li>
      <li>Industry dynamics</li>
      <li>Product-market fit</li>
      <li>Growth ambitions</li>
      <li>Competitive landscape</li>
    </ul>`,
  },
  {
    title: "Phase 2 – Market Intelligence & GTM Design",
    description: `<p className="text-dark/50">We conduct market analysis and develop:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Entry strategy</li>
      <li>GTM framework</li>
      <li>Expansion roadmap</li>
      <li>Positioning strategy</li>
      <li>Partnership strategy</li>
      <li>Commercial priorities</li>
    </ul>`,
  },
  {
    title: "Phase 3 – Market Access & Execution",
    description: `<p className="text-dark/50">We support implementation through:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Strategic coordination</li>
      <li>Commercial support</li>
      <li>Ecosystem engagement</li>
      <li>Partnership facilitation</li>
      <li>Business development support</li>
      <li>Expansion execution guidance</li>
    </ul>`,
  },
  {
    title: "Phase 4 – Scale & Optimize",
    description: `<p className="text-dark/50">As organizations establish regional presence, we continue supporting:</p>
    <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Strategic optimization</li>
      <li>Expansion scaling</li>
      <li>Commercial growth planning</li>
      <li>Market intelligence</li>
      <li>Stakeholder strategy</li>
      <li>Long-term regional growth</li>
    </ul>`,
  },
];

const supportedIndustries = [
  {
    title: "Technology & Digital Solutions",
    description: `<ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>AI companies</li>
      <li>SaaS businesses</li>
      <li>Enterprise software providers</li>
      <li>Cybersecurity firms</li>
      <li>Cloud solution providers</li>
      <li>Digital transformation companies</li>
      <li>Data and analytics firms</li>
    </ul>`,
  },
  {
    title: "Industrial & Manufacturing",
    description: `<ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Industrial solution providers</li>
      <li>Engineering firms</li>
      <li>Manufacturing companies</li>
      <li>Smart infrastructure businesses</li>
      <li>Construction technology providers</li>
    </ul>`,
  },
  {
    title: "Healthcare & Life Sciences",
    description: `<ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Healthtech companies</li>
      <li>Medical solution providers</li>
      <li>Wellness businesses</li>
      <li>Digital healthcare platforms</li>
    </ul>`,
  },
  {
    title: "Consumer & Retail",
    description: `<ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Consumer brands</li>
      <li>Retail operators</li>
      <li>E-commerce businesses</li>
      <li>Luxury brands</li>
      <li>Food and beverage companies</li>
    </ul>`,
  },
  {
    title: "Energy & Sustainability",
    description: `<ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
      <li>Renewable energy firms</li>
      <li>ESG solution providers</li>
      <li>Sustainability-focused businesses</li>
      <li>Climate technology companies</li>
    </ul>`,
  },
];

const newServiceData = [
  {
    title: "Strategy + Execution Under One Partner",
    description: `<p className="text-dark/50">Most consulting firms stop at presentations.</br>
P01Gateway™ is designed to support organizations from strategic planning to real commercial execution.</br>
We help clients:
</p>
<ul className="list-disc pl-6 mt-2 text-dark/50">
  <li>Define market expansion strategy</li>
  <li>Build GTM frameworks</li>
  <li>Identify growth opportunities</li>
  <li>Establish strategic partnerships</li>
  <li>Accelerate commercial engagement</li>
  <li>Support execution initiatives</li>
  <li>Navigate regional business ecosystems</li>
</ul>`,
  },
  {
    title: "Premium Boutique Consulting Model",
    description: `<p className="text-dark/50">Platform01 Consulting operates as a premium boutique management consulting firm focused on high-value strategic engagements.</br>
Clients work directly with senior leadership and experienced practitioners rather than layered delivery teams.</br>
This enables:

</p>
<ul className="list-disc pl-6 mt-2 text-dark/50">
  <li>Faster execution</li>
  <li>More strategic alignment</li>
  <li>Higher engagement quality</li>
  <li>Greater commercial focus</li>
  <li>Personalized advisory support</li>
</ul>`,
  },
  {
    title: "Award-Winning Consulting Firm",
    description: `<p className="text-dark/50">Platform01 Consulting has been recognized with 9 industry awards by Consultancy Middle East and 2 industry awards by GPMG UK, reinforcing our positioning as a high-impact consulting and advisory firm focused on delivering measurable strategic value.</br>These recognitions strengthen our credibility across strategy, advisory, execution support, and transformation-focused consulting engagements.</p>`,
  },
  {
    title: "P01Gateway™ Value Proposition",
    description: `<h5 className="heading-6 font-semibold">Built for Organizations Expanding Into the GCC</h5><p className="text-dark/50">P01Gateway™ helps companies enter and scale within Gulf markets through a combination of:
</p>
<ul className="list-disc pl-6 mt-2 text-dark/50">
  <li>Strategic market entry advisory</li>
  <li>Go-to-market execution support</li>
  <li>Commercial growth planning</li>
  <li>Strategic partnership development</li>
  <li>Fractional expansion leadership</li>
  <li>Regional ecosystem engagement</li>
</ul>
<p className="text-dark/50">Our focus is not on administrative setup services. Our focus is helping organizations build sustainable commercial presence, strategic positioning, and long-term growth capabilities within the GCC.</p>`,
  },
];

const newConsultingData = [
  {
    title: "Trusted Strategic Advisory Partner",
    description: `<p className="text-dark/50">Platform01 Consulting is a premium boutique management consulting firm serving corporations, investors, founders, and growth-focused organizations.</br>
Our consulting philosophy is built around delivering practical strategic value rather than theoretical recommendations.</p>`,
  },
  {
    title: "Execution-Focused Consulting",
    description: `<p className="text-dark/50">Unlike traditional firms that conclude engagements after strategy development, Platform01 Consulting supports clients through execution, commercial acceleration, and long-term growth alignment.</br>This execution-oriented approach is a core differentiator behind P01Gateway™.</p>`,
  },
  {
    title: "Senior-Level Involvement",
    description: `<p className="text-dark/50">Clients benefit from direct engagement with senior consulting leadership throughout the project lifecycle.</br>
This enables:
</p>
<ul className="list-disc pl-6 mt-2 text-dark/50">
  <li>Faster decision-making</li>
  <li>Strategic consistency</li>
  <li>Better execution alignment</li>
  <li>Agile engagement management </li>
  <li>High-value advisory support</li>
</ul>`,
  },
];

const TurnaroundAdvisory = async () => {
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: [],
    is_active: true,
  });

  const slides = credentials.map((c: Credential) => ({
    type: "service",
    category: c.service_tags.join(", "),
    title: c.title,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "P01Gateway GCC Market Entry Services",
            description:
              "End-to-end GCC market entry and go-to-market execution solution for international companies, investors, and growth-stage businesses expanding into the Gulf region.",
            url: "https://www.platform01consulting.com/p01gateway",
            provider: {
              "@type": "Organization",
              name: "Platform01 Consulting",
            },
            areaServed: ["United Arab Emirates", "Saudi Arabia"],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.platform01consulting.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "P01Gateway",
                item: "https://www.platform01consulting.com/p01gateway",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best strategy for entering the GCC market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The best GCC market entry strategy depends on industry, target customers, regulatory environment, and commercial objectives. P01Gateway helps organizations develop tailored entry strategies aligned with long-term growth goals.",
                },
              },
              {
                "@type": "Question",
                name: "How can a company expand into the UAE market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Expansion typically requires market research, GTM planning, business setup advisory, commercial positioning, and partnership development, supported end-to-end by Platform01 Consulting.",
                },
              },
              {
                "@type": "Question",
                name: "How can foreign companies enter the Saudi Arabia market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entering Saudi Arabia requires strategic localization, regulatory understanding, partnership alignment, and long-term commercial planning, supported through structured GTM and market entry support.",
                },
              },
              {
                "@type": "Question",
                name: "Does Platform01 Consulting provide GCC market entry consulting?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Platform01 Consulting provides premium GCC market entry consulting and GTM execution support through the P01Gateway solution.",
                },
              },
              {
                "@type": "Question",
                name: "What industries can benefit from GCC expansion?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Industries including technology, AI, SaaS, fintech, healthcare, manufacturing, energy, professional services, infrastructure, logistics, and retail can benefit significantly.",
                },
              },
              {
                "@type": "Question",
                name: "What is a GCC go-to-market strategy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A GCC go-to-market strategy defines how a company positions, launches, markets, sells, and scales its products across Gulf markets, including partnerships and execution planning.",
                },
              },
              {
                "@type": "Question",
                name: "Why is local execution support important for GCC expansion?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Many international companies fail in GCC expansion due to lack of local ecosystem understanding; local execution support helps accelerate integration and reduce operational risks.",
                },
              },
              {
                "@type": "Question",
                name: "Does Platform01 Consulting support implementation or only strategy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Platform01 Consulting focuses on both strategy and implementation, with P01Gateway designed as an execution-focused market expansion solution.",
                },
              },
              {
                "@type": "Question",
                name: "Can startups use P01Gateway for GCC expansion?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, startups and growth-stage businesses can use P01Gateway to validate opportunities, define GTM strategies, build partnerships, and accelerate regional expansion.",
                },
              },
              {
                "@type": "Question",
                name: "Which GCC countries does Platform01 Consulting support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Platform01 Consulting primarily supports organizations entering the United Arab Emirates and Saudi Arabia while advising on broader GCC expansion opportunities.",
                },
              },
            ],
          }),
        }}
      />
      <ServiceHero
        {...TurnaroundAdvisoryData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5 pb-20">
        <Header text="P01Gateway™" className="mb-26" />
        <div className="grid grid-cols-1 gap-4">
          <h2 className="heading-4 ">
            Enter the GCC Market With Confidence, Speed, and Strategic Precision
          </h2>
          <p className=" text-dark/50">
            P01Gateway™ by Platform01 Consulting is a premium end-to-end GCC
            market entry and go-to-market execution solution designed for
            international companies, investors, technology firms, manufacturers,
            professional services providers, startups, and growth-stage
            businesses looking to establish, expand, and scale their presence in
            the Gulf region.
          </p>
          {/* <p className=" text-dark/50"></p> */}
          <p className=" text-dark/50">
            Whether you are exploring regional expansion opportunities,
            launching a new product, entering a regulated sector, identifying
            strategic partnerships, or building a commercial footprint in the
            Gulf, Platform01 Consulting acts as your strategic and execution
            partner throughout the journey.
          </p>
        </div>
      </div>
      <TeamText>
        <div>
          <h2 className="heading-3 max-w-[450px]">
            Move Beyond Traditional Consulting Retainers
          </h2>
          <hr className="border-dark/10 my-8" />
          <p className="text-dark/50 max-w-[620px]">
            Unlike traditional consulting engagements that stop at strategy
            presentations, P01Gateway™ is built to bridge the gap between
            strategy and execution. We work alongside organizations to design
            market entry strategy, validate commercial opportunities, build
            partnerships, establish operating structures, support market
            positioning, and execute go-to-market initiatives across the GCC
            ecosystem.
          </p>
          {/* <p className="text-dark/50 max-w-[620px]">
            P01SOaaS™ is a long-term strategic partnership built around
            implementation, accountability, business priorities, and measurable
            value creation.
          </p> */}
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="py-3.5">
              <ChecklistItem text={"UAE — Access & activation:"} />
              <p className="text-dark/50 md:pl-[45px] pl-[24px] ">
                Entity setup, free zone navigation, and direct access to Dubai
                and Abu Dhabi commercial networks.
              </p>
            </div>
            <div className="py-3.5">
              <ChecklistItem text={"KSA — Vision 2030 aligned:"} />
              <p className="text-dark/50 md:pl-[45px] pl-[24px] ">
                On-the-ground presence in Riyadh with access to the right
                partners and decisionmakers.
              </p>
            </div>
            <div className="py-3.5">
              <ChecklistItem text={"Dual-market, one strategy:"} />
              <p className="text-dark/50 md:pl-[45px] pl-[24px] ">
                Integrated GTM across both markets — no duplication, no gaps,
                full regional coverage.
              </p>
            </div>
            <div className="py-3.5">
              <ChecklistItem text={"Strategy through execution:"} />
              <p className="text-dark/50 md:pl-[45px] pl-[24px] ">
                From first conversation to market activation — we stay involved
                beyond the strategy deck.
              </p>
            </div>
          </div>
        </div>
      </TeamText>
      <div className=" py-16">
        <div className="container grid grid-cols-1 gap-8 gap-y-16">
          <div>
            <h2 className="heading-4">What is P01Gateway™?</h2>
            <hr className="border-dark/10 my-3" />
            {/* <h3 className="heading-5">
              Performance-Driven Strategic Partnership
            </h3> */}
            <p className="text-md text-dark/50 mt-4">
              P01Gateway™ is a premium GCC market expansion and go-to-market
              execution solution developed by Platform01 Consulting for
              international companies, investors, technology firms, industrial
              businesses, and growth-stage organizations seeking strategic
              expansion into Gulf markets.
            </p>
            <p className="text-md text-dark/50 mt-4">
              Unlike traditional consulting firms that focus on research reports
              or low-value operational support, P01Gateway™ is positioned as a
              high-impact strategic and execution partnership model.
            </p>
            <p className="text-md text-dark/50 mt-4">
              The solution is specifically designed for organizations that
              require:
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-dark/10">
              <thead>
                <tr>
                  <th className="border border-dark/10 bg-white p-6"></th>

                  <th className="border border-dark/10 bg-white p-6 text-center heading-5">
                    P01Gateway™
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
          <p className="text-md text-dark/50 mt-4">
            P01Gateway™ does not focus on transactional or administrative setup
            activities. Instead, the engagement model is centered around
            strategic growth, commercial execution, and long-term market
            positioning.
          </p>
        </div>
      </div>
      <ServicesSlider
        heading="Why Companies Choose P01Gateway™"
        displayServiceData={newServiceData}
      />
      <div className=" py-20">
        <div className="container">
          <h2 className="heading-3 max-w-[1010px]">P01Gateway™ Solutions</h2>
          <div className="grid md:grid-cols-4 gap-3 mt-10">
            {strategicServices.map((service, index) => (
              <StrategyCards key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
      <ServicesSlider
        heading="Why Platform01 Consulting?"
        displayServiceData={newConsultingData}
      />
      <div className=" md:py-20 py-10">
        <div className="container pt-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <h2 className="heading-4 max-w-[1010px] ">Industries We Support</h2>
            <p className="text-dark/50">
              P01Gateway™ is designed to support companies across multiple
              industries and sectors.
            </p>
          </div>
          <hr className="border-dark/10 my-4" />

          <div className="gap-2 grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 mt-12">
            {supportedIndustries.map((item, index) => (
              <div
                key={index + 1}
                className={`relative py-6 px-4 text-left transition-all duration-200 group border border-dark/10 ${"bg-white text-dark"}`}
              >
                {/* <div
                  className={`w-12 h-12 mb-8 flex items-center justify-center text-dark ${"bg-surface"} group-hover:text-primary transition-colors duration-200`}
                >
                  {index === 0 && <TrendingUp size={24} />}
                  {index === 1 && <Building2 size={24} />}
                  {index === 2 && <Target size={24} />}
                  {index === 3 && <RefreshCw size={24} />}
                  {index === 4 && <Target size={24} />}
                </div> */}
                <div className="flex flex-col justify-between gap-6">
                  <h5 className="leading-tight min-h-[55px]">{item?.title}</h5>
                  <div className="text-dark/50">
                    {/* <p className="text-dark/50"> */}
                    {item?.description && parse(item?.description)}
                    {/* </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-surface py-20">
        <div className="container pt-5">
          <h2 className="heading-4 max-w-[1010px] ">Our Engagement Approach</h2>
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
                  <div className="text-dark/50">
                    {/* <p className="text-dark/50"> */}
                    {item?.description && parse(item?.description)}
                    {/* </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container pt-5">
        <h2 className="heading-4 max-w-[1010px]">
          Who Should Consider P01Gateway™?
        </h2>
        <h2 className="heading-5 max-w-[1010px]">P01Gateway™ is ideal for:</h2>

        <div className="flex flex-col gap-0 mt-12 mb-16">
          {checklistItems1.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              className="last:border-b-0 border-b border-dark/10 py-6"
            />
          ))}
        </div>
      </div>

      <div className=" bg-surface">
        <div className=" container py-5">
          <h2 className="heading-4 max-w-[1010px]">
            Built for Modern Global Expansion
          </h2>
          <p className="text-md text-dark/50 mt-4">
            Global expansion strategies are evolving.
            <br />
            Organizations today require agile market entry models that combine:
          </p>

          <div className="flex flex-col gap-0 mt-12 mb-16">
            {checklistItems2.map((item, index) => (
              <ChecklistItem
                key={index}
                text={item}
                className="last:border-b-0 border-b border-dark/10 py-6"
              />
            ))}
          </div>
          <p className="text-md text-dark/50 mt-4">
            P01Gateway™ is designed to address these evolving requirements
            through a premium, execution-focused GCC expansion platform.
          </p>
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
