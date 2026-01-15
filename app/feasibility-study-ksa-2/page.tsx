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

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Feasibility Study | Platform01 Consulting",
    description: "Description for Feasibility Study page.",
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
      .eq("slug", "/feasibility-study-ksa")
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
  subheading: "Market Feasibility Study Services",
  heading:
    "Building Solid Foundations for Success - Feasibility Study Strategist",
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
  //     alt: "Top M&A Boutique UAE - 2025",
  //   },
  // ],
  awards: [
    {
      image: "/awards/top-consulting-firm-middle-east.png",
      text: "Top Consulting Firm <br/> ConsultancyME",
      alt: "Top Consulting Firm 2025 Middle East 2025",
    },
    {
      image: "/awards/strategist-award.png",
      text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
      alt: "Top M&A Boutique UAE - 2025",
    },
    // {
    //   image: "/awards/strategist-award.png",
    //   text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
    //   alt: "Top M&A Boutique UAE - 2025",
    // },
  ],
  showContactForm: true,
};

const checklistItems = [
  "Enables financing from DFIs (SIDF, ADF, CDF, etc. included), commercial banks, NBFCs, and institutional investors by ensuring a bankable feasibility study that meets global standards.",
  "Last 12 Months: Prepared SIDF feasibility studies for projects worth over SAR 2 billion",
  "250+ Projects successfully delivered by Team Members for projects worth above SAR 100 billion",
  "Accredited Team from Top Business Schools and with Global Professional Qualifications",
  "Experienced Team from Global Financial Institutions, Fortune 500 Companies, Big 4 Advisory, and other Reputable Firms",
];

const teamData = {
  heading:
    'Our Unique "Practitioner-Driven" Approach - Feasibility Study Consulting Services',
  supportingText:
    'Our Feasibility Study practice is based on our unique model of "Practitioner-Driven" approach that brings together Relevant Sector Experience from Global Fortune 500 Corporations and Global Financial Institutions with years of Financial Expertise of consulting in the region.',
  team: getTeamDataForPage("feasibility-study"),
};

const faqData: FAQItem[] = [
  {
    question:
      "What is a feasibility study, and why is it critical for large-scale projects?",
    answer:
      "A feasibility study assesses the commercial and financial viability of a proposed project. For capital-intensive sectors like real estate, energy, healthcare, education, infrastructure, and industrial ventures, a robust feasibility study mitigates risk, validates assumptions, and enables confident decision-making by investors, lenders, and other stakeholders.",
  },
  {
    question:
      "What types of feasibility studies does Platform01 Consulting provide in the UAE and Saudi Arabia?",
    answer:
      "We offer fully integrated feasibility studies for: Industrial Projects (manufacturing, logistics, agri-processing), Infrastructure (transport, utilities, PPPs), Healthcare (hospitals, specialty clinics, diagnostics), Education (K-12 schools, universities, training centers), Energy (renewables, clean tech, district cooling), Real Estate (residential, commercial, hospitality, retail, mixed-use), and other sectors. As a leading feasibility study firm, we ensure each study is grounded in both market realism and financial rigor.",
  },
  {
    question:
      "What makes Platform01 different from generic feasibility consultants?",
    answer:
      "Our studies are led by senior practitioners with real-world experience in investments, development, and operations. We emphasize commercial logic, market realism, and investment readiness—not just academic templates. This unique approach reflects the expertise of a dedicated feasibility study strategist rather than a generalist consultant.",
  },
  {
    question: "What does a typical feasibility study from Platform01 include?",
    answer:
      "Our feasibility studies typically cover: Market & demand analysis, Competitive landscape & pricing intelligence, Technical feasibility (infrastructure, land, utilities, access), Financial modelling & project IRR/NPV, Sensitivity & risk analysis, Business model & commercialization strategy, Regulatory framework & location-specific policy insights, Exit scenarios & investor return perspectives.",
  },
  {
    question:
      "Do you offer Arabic-language feasibility studies for submission?",
    answer:
      "Yes. We can deliver bilingual feasibility reports (English & Arabic) to comply with local requirements in Saudi Arabia.",
  },
  {
    question:
      "Do you offer feasibility studies for industrial projects (manufacturing, logistics)?",
    answer:
      "Yes. We conduct technical and market feasibility for factories, warehouses, logistics hubs, and industrial clusters, aligned with KSA’s Vision 2030 and National Industrial Strategy. Our ability to conduct a feasibility study across diverse sectors ensures clarity and confidence for project stakeholders.",
  },
  {
    question: "Can you support PPP and infrastructure feasibility studies?",
    answer:
      "Absolutely. We help evaluate bankability, risk-sharing, and returns for public-private partnership (PPP) infrastructure projects—such as airports, smart utilities, transport networks, and social infrastructure (healthcare, education). This process often involves a detailed market feasibility study to validate demand and long-term viability.",
  },
  {
    question: "How long does it take to complete a feasibility study?",
    answer:
      "A standard feasibility study can take between 6 to 8 weeks, depending on project complexity, site access, and availability of inputs (technical plans, machinery specifications, etc.).",
  },
  {
    question:
      "Do you offer tailored scopes for early-stage or greenfield projects?",
    answer:
      "Yes. We create modular scopes depending on project maturity—ranging from concept validation to full investment-grade feasibility studies.",
  },
  {
    question: "Can you help revise or validate an existing feasibility study?",
    answer:
      "Yes. We can review, validate, or enhance an existing feasibility study with updated market data, sharper commercial logic, and improved financial modeling. This ensures that the feasibility report of a project remains accurate, current, and investment-ready.",
  },
  {
    question:
      "Can a feasibility study determine the potential profitability of my business idea?",
    answer:
      "Yes, a financial feasibility study analysis includes a financial model in Excel. The financial model covers projections of income statement, balance sheet and cash flow based on project and market fundamentals. With the support of a seasoned, feasibility study expert, these projections provide actionable insights for decision-making.",
  },
  {
    question:
      "What are some of the development financial institutions in Saudi Arabia?",
    answer:
      "In Saudi Arabia, several development financial institutions play a vital role in supporting economic growth, diversification, and sustainable development. Key institutions include: Saudi Industrial Development Fund (SIDF), Agriculture Development Fund (ADF), Islamic Development Bank (IsDB), Social Development Bank (SDB), Real Estate Development Fund (REDF), Saudi Fund for Development (SFD), Human Resources Development Fund (HRDF), Cultural Development Fund, Events Investment Fund, Saudi Exim Bank, Tourism Development Fund (TDF), Small & Medium Enterprise Bank (SME Bank), and National Infrastructure Fund.",
  },
  {
    question:
      "What factors should I consider when choosing a feasibility study company?",
    answer:
      "Consider industry experience, market research expertise, financial analysis capabilities, and project evaluation strength. Look for feasibility assessments that provide customized solutions, actionable recommendations, and strong client testimonials.",
  },
  {
    question:
      "How do I get started with a feasibility study from Platform01 Consulting?",
    answer:
      "Get in touch through our Contact Page, and we will schedule a scoping call to understand your project objectives, timeline, and deliverables. Our feasibility study consulting services ensure you receive tailored, investment-grade insights aligned with your specific needs.",
  },
];

const servicesData = [
  {
    title: "Market Research & Assessment",
    description: (
      <span>
        Comprehensive analysis of market dynamics, trends, and competitive
        landscape.
      </span>
    ),
  },
  {
    title: "Business Model & Strategy",
    description: (
      <span>
        Development of a robust business model and strategic roadmap for project
        success.
      </span>
    ),
  },
  {
    title: "Financial Modelling & Analysis",
    description: (
      <span>
        Detailed financial projections with estimation of project NPV, IRR &
        Payback Period.
      </span>
    ),
  },
  {
    title: "Business Risks & Mitigation",
    description: (
      <span>
        Identification and assessment of potential risks by sensitivity and
        scenario analysis.
      </span>
    ),
  },
  {
    title: "Implementation Plan",
    description: (
      <span>
        A practical plan outlining the steps required to bring the project to
        fruition.
      </span>
    ),
  },
];
const FeasibilityStudySceondary = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Feasibility Study"],
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
        // showButton={true}
        // whatsappNumber="https://wa.me/966556075362"
        // whatsAppButtonMobileView={true}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5">
        <Header text="Feasibility Study Consultant" className="mb-26" />
        <h2 className="heading-4 max-w-[1010px]">
          Our Feasibility Study Expert service has been designed for clients
          looking for Premium and Bespoke Consulting services delivered through
          our unique "Practitioner-Driven" approach that brings deep Industry
          Expertise with Financial Acumen to deliver High-Quality strategic
          insights. Through our feasibility study consulting services in Saudi
          Arabia, we deliver investment-grade insights that align with Vision
          2030 and institutional financing requirements.
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
      <TeamText>
        <div>
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
            and Avoid Costly Mistakes. . Engaging a trusted feasibility study
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
      </TeamText>
      <TeamShowcase
        title="Our Feasibility Study Firm Consulting Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        FourColumn={true}
      >
        {teamData.team.map((item, index) =>
          item ? <TeamCard key={item.id || index} member={item} /> : null
        )}
      </TeamShowcase>
      <Credentials
        showCalendly={true}
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision as a Feasibility Study Professional."
        }
        calendlyMobileView={false}
      />

      <ServicesSection
        showCTA={true}
        services={servicesData}
        heading="Tailored Scope for Optimal Value - Feasibility Study Company"
        supportingText='We understand that every project is Unique. There&apos;s NO "One-Size-Fits-All" approach to Feasibility Studies. We tailor the scope of each study to your Specific Needs, Vision, Scale, and Target Audience, ensuring Optimal Value and Efficient Resource Allocation when you Conduct a Feasibility Study.'
      />

      {/* <DynamicInsightsSlider bgSurface={true} /> */}
      <CallToAction
        heading="Let' Talk - Feasibility Report of a Project"
        description="We'd love to hear about your project. Whether you're aiming to do a greenfield project, or expand with a brownfield project, our team is here to guide you with Bankable Feasibility Study expertise."
      />
      <FAQSection faqs={faqData} showCTA={true} />
    </>
  );
};

export default FeasibilityStudySceondary;
