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
import ArrowRight from "@/components/icons/ArrowRight";
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
      .eq("slug", "/feasibility-study")
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
  subheading: "Feasibility Study Services",
  heading: "Building Solid Foundations for Success",
  backgroundImages: {
    mobile: "/services/mobile/feasibility-study.png",
    tablet: "/services/tablet/feasibility-study.png",
    desktop: "/services/desktop/feasibility-study.png",
    ultrawide: "/services/ultrawide/feasibility-study.png",
  },
  showContactForm: true,
};

const checklistItems = [
  "Enables financing from commercial banks, DFIs, NBFCs, and institutional investors by ensuring a bankable feasibility study that meets global standards.",
  "Prepared Feasibility Studies for 18+ projects worth over USD 1 billion in the Last 12 Months",
  "250+ Projects successfully delivered by Team Members for projects worth above USD 40 billion",
  "Accredited Team from Top Business Schools and with Global Professional Qualifications",
  "Experienced Experts from Global Financial Institutions, Fortune 500 Companies, Big 4 Advisory, and other Reputable Firms",
];

const teamData = {
  heading: 'Our Unique "Practitioner-Driven" Approach',
  supportingText:
    'Our Feasibility Study practice is based on our unique model of "Practitioner-Driven" approach that brings together Relevant Sector Experience from Global Fortune 500 Corporations and Global Financial Institutions with years of Financial Expertise of consulting in the region.',
  team: getTeamDataForPage("feasibility-study"),
};

const faqData: FAQItem[] = [
  {
    question:
      "What is a feasibility study, and why is it critical for large-scale projects?",
    answer: (
      <span>
        A feasibility study assesses the commercial and financial viability of a
        proposed project. For capital-intensive sectors like real estate,
        energy, healthcare, education, infrastructure, and industrial ventures,
        a robust feasibility study mitigates risk, validates assumptions, and
        enables confident decision-making by investors, lenders, and other
        stakeholders.
      </span>
    ),
  },
  {
    question:
      "What types of feasibility studies does Platform01 Consulting provide in the UAE and Saudi Arabia?",
    answer: (
      <span>
        We offer fully integrated feasibility studies for:
        <ul className="list-disc pl-6 mt-2">
          <li>
            Industrial Projects (manufacturing, logistics, agri-processing)
          </li>
          <li>Infrastructure (transport, utilities, PPPs)</li>
          <li>Healthcare (hospitals, specialty clinics, diagnostics)</li>
          <li>Education (K-12 schools, universities, training centers)</li>
          <li>Energy (renewables, clean tech, district cooling)</li>
          <li>
            Real Estate (residential, commercial, hospitality, retail,
            mixed-use)
          </li>
          <li>
            Other sectors including tourism, fintech, and industrial services
          </li>
        </ul>
        As a leading feasibility study firm, we ensure each study is grounded in
        both market realism and financial rigor.
      </span>
    ),
  },
  {
    question:
      "What makes Platform01 Consulting different from generic feasibility consultants? ",
    answer: (
      <span>
        Our team includes senior practitioners with real-world experience in
        investments, development, and operations. We emphasize commercial logic,
        market realism, and investment readiness — not just academic templates.
        This approach is why our feasibility study consulting services are
        trusted by reputable organizations and institutions.
      </span>
    ),
  },
  {
    question:
      "What does a typical feasibility study form Platform01 Consulting include?",
    answer: (
      <span>
        Our feasibility studies typically cover:
        <ul className="list-disc pl-6 mt-2">
          <li>Market & demand analysis</li>
          <li>Competitive landscape & pricing intelligence</li>
          <li>
            Technical inputs documentation (infrastructure, land, utilities,
            access)
          </li>
          <li>Business model & commercialization strategy</li>
          <li>Financial modelling & project IRR/NPV</li>
          <li>Business risks and mitigation strategy</li>
          <li>Scenarios and sensitivity analysis</li>
        </ul>
      </span>
    ),
  },
  {
    question:
      "Do you offer Arabic-language feasibility studies for submission?",
    answer: (
      <span>
        Yes. We can deliver bilingual feasibility reports (English & Arabic) to
        comply with local requirements in Saudi Arabia and the United Arab
        Emirates, ensuring a complete feasibility report for regulatory
        submission.
      </span>
    ),
  },
  {
    question: "Do you offer feasibility studies for industrial projects?",
    answer: (
      <span>
        Yes. We conduct technical and market feasibility study assessments for
        manufacturing and industrial sector businesses in Saudi Arabia and
        United Arab Emirates.
      </span>
    ),
  },
  {
    question: "Can you support PPP and infrastructure feasibility studies?",
    answer: (
      <span>
        Absolutely. We help evaluate bankability, risk-sharing, and returns for
        public-private partnership (PPP) infrastructure projects — such as
        airports, smart utilities, transport networks, and social infrastructure
        (healthcare, education).
      </span>
    ),
  },
  {
    question: "How long does it take to complete a feasibility study?",
    answer: (
      <span>
        A standard feasibility study can take between 6 to 8 weeks, depending on
        project complexity, site access, and availability of inputs (technical
        plans, machinery specifications, etc.).
      </span>
    ),
  },
  {
    question:
      "Do you offer tailored scopes for early-stage or greenfield projects?",
    answer: (
      <span>
        Yes. We create modular scopes depending on project maturity — ranging
        from concept validation to full investment-grade feasibility studies.
        Our team can conduct a feasibility study tailored to your unique stage
        of development.
      </span>
    ),
  },
  {
    question: "Can you help revise or validate an existing feasibility study?",
    answer: (
      <span>
        Yes. We can review, validate, or enhance an existing feasibility report
        of a project with updated market data, sharper commercial logic, and
        improved financial modeling.
      </span>
    ),
  },
  {
    question:
      "Can a feasibility study determine the potential profitability of my business idea?",
    answer: (
      <span>
        Yes, a financial feasibility study includes a financial model (in
        Excel), covering projections of income statement, balance sheet, and
        cash flow based on project and market fundamentals. This is where the
        expertise of a feasibility study expert ensures precision.
      </span>
    ),
  },
  {
    question:
      "What are some of the development financial institutions in the United Arab Emirates?",
    answer: (
      <span>
        In the United Arab Emirates (UAE), several development financial
        institutions play a crucial role in supporting economic growth,
        diversification, and sustainable development. These include:
        <ul className="list-disc pl-6 mt-2">
          <li>Emirates Development Bank (EDB)</li>
          <li>Abu Dhabi Fund for Development (ADFD)</li>
          <li>Khalifa Fund for Enterprise Development</li>
          <li>Dubai SME</li>
          <li>Mubadala Investment Company</li>
          <li>Dubai Future Foundation</li>
          <li>Noor Dubai Foundation</li>
          <li>Masdar (Abu Dhabi Future Energy Company)</li>
        </ul>
      </span>
    ),
  },
  {
    question:
      "What are some of the development financial institutions in Saudi Arabia?",
    answer: (
      <span>
        In Saudi Arabia, several development financial institutions play a vital
        role in supporting economic growth, diversification, and sustainable
        development. These include:
        <ul className="list-disc pl-6 mt-2">
          <li>Saudi Industrial Development Fund (SIDF)</li>
          <li>Agriculture Development Fund (ADF)</li>
          <li>Islamic Development Bank (IsDB)</li>
          <li>Social Development Bank (SDB)</li>
          <li>Real Estate Development Fund (REDF)</li>
          <li>Saudi Fund for Development (SFD)</li>
          <li>Human Resources Development Fund (HRDF)</li>
          <li>Cultural Development Fund</li>
          <li>Events Investment Fund</li>
          <li>Saudi Exim Bank</li>
          <li>Tourism Development Fund (TDF)</li>
          <li>Small & Medium Enterprise Bank (SME Bank)</li>
          <li>National Infrastructure Fund</li>
        </ul>
      </span>
    ),
  },
  {
    question:
      "What factors should I consider when choosing a feasibility study company?",
    answer: (
      <span>
        Consider their industry experience, expertise in market research,
        financial analysis, and project evaluation. Look for feasibility
        assessments that provide customized solutions, actionable
        recommendations, and client testimonials reflecting their capabilities.
        The right feasibility study strategist can make the difference between a
        viable and non-viable investment.
      </span>
    ),
  },
  {
    question:
      "How do I get started with a feasibility study from Platform01 Consulting?",
    answer: (
      <span>
        Get in touch through our Contact Page, and we will schedule a scoping
        call to understand your project objectives, timeline, and deliverables.
        Our feasibility study consulting services are designed to give you
        clarity and confidence in moving forward.
      </span>
    ),
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
const FeasibilityStudyGenericSecondary = async () => {
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
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-5">
        <Header text="Feasibility Study" className="mb-26" />
        <h2 className="heading-4 max-w-[1010px]">
          Our Feasibility Study service has been designed for clients looking
          for Premium and Bespoke Consulting services delivered through our
          unique "Practitioner-Driven" approach that brings deep Industry
          Expertise with Financial Acumen to deliver High-Quality strategic
          insights. Our feasibility study consulting services are trusted by
          leading investors and institutions for their rigor and strategic
          value.
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
      </TeamText>
      <TeamShowcase
        title="Our Consulting Team"
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
          "We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision."
        }
        calendlyMobileView={false}
      />

      <ServicesSection
        showCTA={true}
        services={servicesData}
        heading="Tailored Scope for Optimal Value"
        supportingText='We understand that every project is Unique. There&apos;s NO "One-Size-Fits-All" approach to Feasibility Studies. We tailor the scope of each study to your Specific Needs, Vision, Scale, and Target Audience, ensuring Optimal Value and Efficient Resource Allocation.'
      />

      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction
        heading="Let' Talk"
        description="We'd love to hear about your project. Whether you're aiming to do a greenfield project, or expand with a brownfield project, our team is here to guide you."
      />
      <FAQSection faqs={faqData} showCTA={true} />

      {/* Explore More Section */}
      <div className="bg-surface py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-3 mb-4">Explore More</h2>
            <p className="text-dark/70 max-w-2xl mx-auto">
              Discover our specialized feasibility study services tailored for
              specific markets and regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* KSA Card */}
            <Link
              href="/feasibility-study-ksa"
              className="group bg-white p-8 transition-all duration-300 border border-dark/10"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="heading-4 mb-3">
                    Feasibility Study Saudi Arabia
                  </h3>
                  <p className="text-dark/70 mb-4">
                    Specialized feasibility studies for Saudi Arabia, aligned
                    with Vision 2030 and institutional financing requirements
                    including SIDF, ADF, and other DFIs.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                    <span className="font-medium">Explore KSA Services</span>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </Link>

            {/* UAE Card */}
            <Link
              href="/feasibility-study-uae"
              className="group bg-white p-8 transition-all duration-300 border border-dark/10"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="heading-4 mb-3">Feasibility Study UAE</h3>
                  <p className="text-dark/70 mb-4">
                    Comprehensive feasibility studies for Dubai and UAE markets,
                    designed for investors, developers, and entrepreneurs across
                    the region.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                    <span className="font-medium">Explore UAE Services</span>
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeasibilityStudyGenericSecondary;
