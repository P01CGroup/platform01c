import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamText from "@/components/sections/TeamText";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";
import Credentials from "@/components/sections/Credentials";

// import OurValuesSlider, { Value } from '@/components/sections/OurValuesSlider'
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
// import { getSeoMetadata } from '@/lib/seo-config';
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ServicesSection from "@/components/sections/ServicesSection";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Financial Modelling Services | Platform01 Consulting",
    description: "Description for Financial Modelling Services page.",
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
      .eq("slug", "/financial-modelling-and-analysis")
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

const feasibilityStudyData: ServiceHeroData = {
  subheading: "Financial Modelling Services",
  heading:
    "Bespoke and Investor-Grade Financial Modelling for Visionary Business Leaders in UAE and Saudi Arabia",
  backgroundImages: {
    mobile: "/services/mobile/feasibility-study.png",
    tablet: "/services/tablet/feasibility-study.png",
    desktop: "/services/desktop/feasibility-study.png",
    ultrawide: "/services/ultrawide/feasibility-study.png",
  },
  // awards: [
  //   {
  //     image: "/awards/strategist-award.png",
  //     text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
  //     alt: "Top Strategist - 2026",
  //   },
  //   {
  //     image: "/awards/ma-award-1.png",
  //     text: "Top M&A Advisory <br/> Boutique 2026",
  //     alt: "Top M&A Advisory Boutique 2026",
  //   },
  //   {
  //     image: "/awards/top-consulting-firm-middle-east.png",
  //     text: "Top Consulting Firm <br/> ConsultancyME",
  //     alt: "Top Consulting Firm 2025 Middle East 2025",
  //   },
  // ],
  showContactForm: true,
};

const checklistItems = [
  "3-Statement Financial Models",
  "Business Plan Financial Projections",
  "Project Finance Models",
  "Feasibility Study Financial Models",
  "Startup Investor Forecast Models",
  "Real Estate Development Models",
  "Valuation & Investment Analysis Models",
  "Leveraged Buy-Out (LBO) Models",
  "M&A Financial Models ",
  "Restructuring Financial Models ",
];

const bespokeItems = [
  "Bank financing approval",
  "Investor fundraising",
  "Strategic expansion",
  "Government projects",
  "Vision-aligned initiatives",
];

const consultingItems = [
  "Financial modelling consultants with Global and GCC experience",
  "Structured investor-ready outputs",
  "Assumption-driven and scenario-flexible models",
  "Fast turnaround time",
  "Confidential and secure engagement",
];

const teamData = {
  heading: 'Our Unique "Practitioner-Driven" Approach',
  // supportingText:
  //   'Our Feasibility Study practice is based on our unique model of "Practitioner-Driven" approach that brings together Relevant Sector Experience from Global Fortune 500 Corporations and Global Financial Institutions with years of Financial Expertise of consulting in the region.',
  team: getTeamDataForPage("financial-modelling-and-analysis"),
};

const faqData: FAQItem[] = [
  {
    question: "Do you use any software for financial modelling?",
    answer: (
      <span>
        Yes. All financial models are built exclusively using Microsoft Excel.
        We develop fully bespoke, assumption-driven financial models tailored to
        each client’s business structure, industry, and strategic objectives. No
        template-based or third-party modelling software is used. This ensures:
        <ul className="list-disc pl-6 mt-2">
          <li>Full transparency of formulas and logic</li>
          <li>Flexibility for future updates</li>
          <li>Compatibility with banks and investors</li>
          <li>Institutional-grade formatting and controls</li>
        </ul>
        Excel remains the global standard for professional financial modelling
        across banks, private equity firms, and advisory institutions.
      </span>
    ),
  },
  {
    question:
      "Who offers professional financial modelling services in UAE and KSA?",
    answer: (
      <span>
        Professional financial modelling services in the United Arab Emirates
        and Saudi Arabia are typically provided by specialized consulting firms
        with experience in:
        <ul className="list-disc pl-6 mt-2">
          <li>Investment analysis</li>
          <li>Project finance</li>
          <li>Bank funding requirements</li>
          <li>Feasibility studies</li>
          <li>Strategic planning</li>
        </ul>
        Platform01 Consulting delivers structured, investor-aligned financial
        models designed to meet regional banking standards and institutional
        investor expectations.
      </span>
    ),
  },
  {
    question:
      "What is the cost of financial modelling services in Dubai or Riyadh?",
    answer: (
      <span>
        The cost of financial modelling services in Dubai or Riyadh depends on:
        <ul className="list-disc pl-6 mt-2">
          <li>Business complexity</li>
          <li>Industry dynamics</li>
          <li>Forecast duration (3–10 years)</li>
          <li>Level of scenario and sensitivity analysis</li>
          <li>Requirement for valuation modelling</li>
          <li>Debt structuring components</li>
        </ul>
        SME financial projection models are typically more cost-efficient, while
        project finance and institutional investment models require advanced
        structuring and deeper financial analytics. For accurate pricing, a
        short scoping discussion is recommended.
      </span>
    ),
  },
  {
    question: "Do I need financial projections for bank loans?",
    answer: (
      <span>
        Each bank may have specific documentation standards. We recommend
        confirming requirements directly with your bank and consulting with our
        advisory team to ensure full alignment.
      </span>
    ),
  },
  {
    question:
      "What financial model is required for investor funding in the UAE and Saudi Arabia?",
    answer: (
      <span>
        Most institutional and sophisticated investors expect:
        <ul className="list-disc pl-6 mt-2">
          <li>Integrated 3-statement financial model</li>
          <li>Revenue forecast by segment</li>
          <li>Operating expense breakdown</li>
          <li>Cash flow projection</li>
          <li>IRR (Internal Rate of Return) analysis</li>
          <li>NPV (Net Present Value) calculation</li>
          <li>Sensitivity and scenario modelling</li>
          <li>Ratio analysis (profitability, liquidity, leverage)</li>
        </ul>
        Investors evaluate scalability, capital efficiency, and exit potential —
        a professionally structured financial model significantly strengthens
        funding discussions.
      </span>
    ),
  },
  {
    question: "How long does it take to build a financial model?",
    answer: (
      <span>
        Timelines vary depending on complexity:
        <ul className="list-disc pl-6 mt-2">
          <li>Standard SME financial models: 1–3 weeks</li>
          <li>Multi-entity or multi-scenario models: 2–4 weeks</li>
          <li>Complex project finance models: 3–6 weeks</li>
        </ul>
        Clear and timely data availability significantly accelerates delivery.
      </span>
    ),
  },
  {
    question:
      "Can professional financial modelling help startups raise capital?",
    answer: (
      <span>
        For startups in early and growth stages, financial modelling is often a
        prerequisite for angel investment, venture capital, or strategic
        partnerships. A structured financial model enhances:
        <ul className="list-disc pl-6 mt-2">
          <li>Investor confidence</li>
          <li>Valuation credibility</li>
          <li>Capital requirement clarity</li>
          <li>Burn rate forecasting</li>
          <li>Growth scalability demonstration</li>
        </ul>
      </span>
    ),
  },
  {
    question:
      "What is the difference between financial modelling and financial forecasting?",
    answer: (
      <span>
        Financial forecasting focuses primarily on revenue and cost projections.
        <br />
        Financial modelling is more comprehensive — it integrates financial
        statements, valuation metrics, capital structure, and scenario analysis
        to create a complete decision-making framework.
      </span>
    ),
  },
  {
    question: "Are your financial models suitable for bank submission?",
    answer: (
      <span>
        Yes. Our financial models are structured in formats typically accepted
        by banks and financial institutions, including clear assumptions,
        supporting schedules, and debt servicing analysis.
        <br />
        However, final documentation requirements should always be verified with
        your specific bank.
      </span>
    ),
  },
  {
    question: "Can you update or review an existing financial model?",
    answer: (
      <span>
        Yes. We can:
        <ul className="list-disc pl-6 mt-2">
          <li>Audit and stress-test existing models</li>
          <li>Improve structural integrity</li>
          <li>Enhance scenario modelling</li>
          <li>Correct formula errors</li>
          <li>Rebuild models for institutional presentation</li>
          <li>
            Many businesses seek independent validation before presenting to
            banks or investors.
          </li>
        </ul>
      </span>
    ),
  },
  {
    question: "How accurate are financial models?",
    answer: (
      <span>
        Financial models are projection tools based on assumptions and available
        data. Their reliability depends on:
        <ul className="list-disc pl-6 mt-2">
          <li>Quality of input data</li>
          <li>Realistic market assumptions</li>
          <li>Industry benchmarking</li>
          <li>Sensitivity testing</li>
        </ul>
        While no model predicts the future with certainty, structured modelling
        significantly improves strategic decision-making and risk assessment.
      </span>
    ),
  },
  {
    question:
      "Is financial modelling mandatory for business expansion in UAE or KSA?",
    answer: (
      <span>
        It may not always be legally mandatory, but it is often commercially
        necessary when:
        <ul className="list-disc pl-6 mt-2">
          <li>Seeking bank financing</li>
          <li>Raising investor capital</li>
          <li>Entering joint ventures</li>
          <li>Launching large-scale projects</li>
          <li>Applying for institutional funding</li>
        </ul>
        Professional financial modelling reduces risk and improves funding
        success rates.
      </span>
    ),
  },
];

// const servicesData = [
//   {
//     title: "Market Research & Assessment",
//     description: (
//       <span>
//         Comprehensive analysis of market dynamics, trends, and competitive
//         landscape.
//       </span>
//     ),
//   },
//   {
//     title: "Business Model & Strategy",
//     description: (
//       <span>
//         Development of a robust business model and strategic roadmap for project
//         success.
//       </span>
//     ),
//   },
//   {
//     title: "Financial Modelling & Analysis",
//     description: (
//       <span>
//         Detailed financial projections with estimation of project NPV, IRR &
//         Payback Period.
//       </span>
//     ),
//   },
//   {
//     title: "Business Risks & Mitigation",
//     description: (
//       <span>
//         Identification and assessment of potential risks by sensitivity and
//         scenario analysis.
//       </span>
//     ),
//   },
//   {
//     title: "Implementation Plan",
//     description: (
//       <span>
//         A practical plan outlining the steps required to bring the project to
//         fruition.
//       </span>
//     ),
//   },
// ];
const FeasibilityStudyGeneric = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Healthcare"],
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
        {...feasibilityStudyData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5">
        <Header text="Financial Modelling Services " className="mb-26" />
        <h2 className="heading-4 max-w-[1010px] ">
          At Platform01 Consulting, we offer professional financial modelling
          services for businesses, investors and leaders in the United Arab
          Emirates, Kingdom of Saudi Arabia and wider EMEA region. We develop:
        </h2>

        <div className="flex flex-col gap-0 mt-12 mb-16">
          {checklistItems.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              className="last:border-b-0 border-b border-dark/10 py-6"
            />
          ))}
        </div>
      </div>
      {/* <TeamText>
        <div>
          <h2 className="heading-3 max-w-[450px]">
            A Strategic Foundation, Not Just an Evaluation
          </h2>
          <hr className="border-dark/10 my-8" />
          <p className="text-dark/50 max-w-[620px]">
            A Feasibility Study is more than just Assessing Economic
            Viability—it&apos;s the Bedrock of your Project&apos;s Strategy.
            It&apos;s where Critical Strategic Choices are made, ensuring your
            project is built on Solid Foundations to Maximize chances of Success
            and Avoid Costly Mistakes. With the guidance of an experienced{" "}
            <strong>feasibility study consultant</strong>, you gain not just
            analysis but actionable strategies tailored to your business vision.
          </p>
        </div>
        <div>
          <h4 className="heading-5 mb-4">
            These Key Strategic Choices include:
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
      <TeamShowcase
        title="Our Consulting Team"
        heading={teamData.heading}
        supportingText={""}
        FourColumn={true}
      >
        {teamData.team.map((item, index) =>
          item ? <TeamCard key={item.id || index} member={item} /> : null,
        )}
      </TeamShowcase>
      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Transaction Advisory, Investor Documentation"}
        supportingText={""}
      />
      <div className="container pt-5">
        <Header text="Financial Modelling Services " className="mb-26" />
        <h2 className="heading-4 max-w-[1010px] ">
          Our Bespoke and Investor Grade Financial Models are designed for:
        </h2>

        <div className="flex flex-col gap-0 mt-12 mb-8">
          {bespokeItems.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              className="last:border-b-0 border-b border-dark/10 py-6"
            />
          ))}
        </div>
        <p className="text-dark/50 max-w-[620px] mb-20">
          Read more:{" "}
          <Link
            className="underline hover:text-dark"
            href="https://www.platform01consulting.com/insights/the-art-of-financial-modeling"
          >
            the Art of Financial Modelling
          </Link>
        </p>
      </div>
      <div className="container pt-5">
        {/* <Header text="Financial Modelling Services " className="mb-26" /> */}
        <h2 className="heading-4 max-w-[1010px] ">
          Why Businesses Choose Platform01 Consulting
        </h2>

        <div className="flex flex-col gap-0 mt-12 mb-8">
          {consultingItems.map((item, index) => (
            <ChecklistItem
              key={index}
              text={item}
              className="last:border-b-0 border-b border-dark/10 py-6"
            />
          ))}
        </div>
      </div>
      {/* <ServicesSection
        services={servicesData}
        heading="Tailored Scope for Optimal Value"
        supportingText='We understand that every project is Unique. There&apos;s NO "One-Size-Fits-All" approach to Feasibility Studies. We tailor the scope of each study to your Specific Needs, Vision, Scale, and Target Audience, ensuring Optimal Value and Efficient Resource Allocation.'
      /> */}

      {/* <DynamicInsightsSlider bgSurface={true} />
      <CallToAction
        heading="Let' Talk"
        description="We'd love to hear about your project. Whether you're aiming to do a greenfield project, or expand with a brownfield project, our team is here to guide you."
      /> */}
      <FAQSection faqs={faqData} />
    </>
  );
};

export default FeasibilityStudyGeneric;
