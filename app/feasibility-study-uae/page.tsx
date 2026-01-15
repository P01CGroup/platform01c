import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamText from "@/components/sections/TeamText";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";
import Credentials, {
  CredentialSlide,
} from "@/components/sections/Credentials";
import OurValuesSlider, { Value } from "@/components/sections/OurValuesSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import ServicesSection from "@/components/sections/ServicesSection";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title:
      "Feasibility Study Dubai & UAE | Market Feasibility Experts | Platform01 Consulting",
    description:
      "Leading feasibility study company in Dubai and UAE. Our feasibility study specialists deliver market research, financial analysis, and strategy consulting for projects across sectors.",
    keywords:
      "market feasibility study, feasibility study companies, feasibility study firm, feasibility study expert, feasibility study specialist, feasibility study professional, feasibility study services in dubai, feasibility study consultant dubai, feasibility study dubai",
    og_title: "Feasibility Study Experts in UAE",
    og_description:
      "Premium feasibility study consulting firm in UAE providing market feasibility reports, financial models, and project advisory services.",
    og_image: "/og/feasibility-study-uae.jpg",
    twitter_title: "Feasibility Study Company Dubai | Platform01 Consulting",
    twitter_description:
      "Trusted feasibility study consultants in Dubai delivering professional feasibility study services for startups and large-scale projects.",
    twitter_image: "/og/feasibility-study-uae.jpg",
    canonical_url: "https://platform01consulting.com/feasibility-study-uae",
  };

  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/feasibility-study-uae")
      .single();
    if (data?.seo) {
      seo = {
        ...seo,
        ...data.seo,
        keywords: data.seo.keywords || seo.keywords,
      };
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
  subheading: "Feasibility Study Services in UAE",
  heading: "Building Solid Foundations for Business Success",
  backgroundImages: {
    mobile: "/services/mobile/feasibility-study.png",
    tablet: "/services/tablet/feasibility-study.png",
    desktop: "/services/desktop/feasibility-study.png",
    ultrawide: "/services/ultrawide/feasibility-study.png",
  },
  awards: [
    {
      image: "/awards/strategist-award.png",
      text: "Top Strategist GCC <br/> Industrials, Healthcare & Technology",
      alt: "Top M&A Boutique UAE - 2025",
    },
    {
      image: "/awards/top-consulting-firm-middle-east.png",
      text: "Top Consulting Firm <br/> ConsultancyME",
      alt: "Top Consulting Firm 2025 Middle East 2025",
    },
  ],
  showContactForm: true,
};

const checklistItems = [
  "250+ Projects successfully delivered by our Feasibility Study Specialists",
  "Licensed Feasibility Study Firm in the UAE",
  "Accredited Team from Top Business Schools with Global Professional Qualifications",
  "Institutional Grade Quality Reports and Market Feasibility Studies",
  "Experienced Team from Global Financial Institutions, Big 4 Advisory, and Fortune 500 Companies",
];

const teamData = {
  heading: 'Our Unique "Practitioner-Driven" Approach',
  supportingText:
    "Our Feasibility Study practice in Dubai and UAE is driven by a “Practitioner-Driven” approach—combining industry insights from Global Fortune 500 Corporations and Financial Institutions with years of consulting expertise.",
  team: getTeamDataForPage("feasibility-study"),
};

const faqData: FAQItem[] = [
  {
    question:
      "What is a feasibility study, and why is it critical for projects in Dubai and UAE?",
    answer: (
      <span>
        A feasibility study assesses the commercial and financial viability of
        your business idea. For capital-intensive projects in the UAE—real
        estate, healthcare, energy, education, or industrial ventures—a
        professional feasibility study firm ensures your investment decisions
        are data-driven and aligned with market realities.
      </span>
    ),
  },
  {
    question:
      "Do you provide feasibility study services in Dubai and across UAE?",
    answer: (
      <span>
        Yes. Our feasibility study consultants in Dubai deliver tailored
        feasibility reports covering market, financial, and technical
        assessments. We are one of the leading feasibility study companies
        trusted by investors, developers, and entrepreneurs across the region.
      </span>
    ),
  },
  {
    question: "What makes Platform01 a leading feasibility study firm?",
    answer: (
      <span>
        Our work is led by <strong>feasibility study experts</strong> and{" "}
        <strong>specialists</strong> with deep industry experience. We emphasize
        actionable insights, financial robustness, and market realism— making us
        a trusted <strong>feasibility study company</strong> in Dubai and the
        UAE.
      </span>
    ),
  },
  {
    question: "How long does it take to complete a market feasibility study?",
    answer: (
      <span>
        A standard <strong>market feasibility study</strong> typically takes 6–8
        weeks depending on project complexity. As a professional{" "}
        <strong>feasibility study consultant Dubai</strong> team, we ensure
        timely delivery without compromising analytical depth.
      </span>
    ),
  },
  {
    question: "Can you help improve an existing feasibility report?",
    answer: (
      <span>
        Absolutely. Our <strong>feasibility study professionals</strong> can
        review and enhance your existing report with updated data, refined
        analysis, and improved financial modeling.
      </span>
    ),
  },
  {
    question:
      "Do you provide bilingual feasibility study reports (Arabic & English)?",
    answer: (
      <span>
        Yes. We provide bilingual feasibility study documentation in both
        English and Arabic to meet UAE regulatory and submission requirements.
      </span>
    ),
  },
];

const servicesData = [
  {
    title: "Market Research & Assessment",
    description: (
      <span>
        Comprehensive <strong>market feasibility study</strong> covering demand
        analysis, trends, and competition.
      </span>
    ),
  },
  {
    title: "Business Model & Strategy",
    description: (
      <span>
        Development of strategic business models guided by our{" "}
        <strong>feasibility study consultants</strong>.
      </span>
    ),
  },
  {
    title: "Financial Modelling & Analysis",
    description: (
      <span>
        Detailed project valuation, NPV, IRR, and Payback Period prepared by{" "}
        <strong>feasibility study experts</strong>.
      </span>
    ),
  },
  {
    title: "Business Risks & Mitigation",
    description: (
      <span>
        Scenario-based risk analysis and sensitivity modeling by our{" "}
        <strong>feasibility study specialists</strong>.
      </span>
    ),
  },
  {
    title: "Implementation Plan",
    description: (
      <span>
        End-to-end roadmap from planning to execution led by our{" "}
        <strong>feasibility study professionals</strong>.
      </span>
    ),
  },
];

const FeasibilityStudyUAE = async () => {
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Feasibility Study"],
    is_active: true,
  });

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
        <Header text="Feasibility Study Dubai & UAE" className="mb-26" />
        <h2 className="heading-4 max-w-[1010px]">
          Our <strong>Feasibility Study Services in Dubai</strong> are designed
          for clients seeking premium, bespoke consulting delivered by industry
          practitioners. As a trusted <strong>feasibility study firm</strong>,
          we combine market intelligence and financial expertise to deliver
          high-quality, actionable insights.
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
            A <strong>Feasibility Study</strong> is more than just assessing
            economic viability—it’s the bedrock of your project’s strategy.
            Partnering with a seasoned{" "}
            <strong>feasibility study consultant Dubai</strong> ensures your
            project decisions are guided by market realities and grounded
            financial logic.
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
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of Experience. Billions in Advisory Value."}
        supportingText={
          "We bring a legacy of performance across corporate strategy, project finance, and investment advisory—built on precision and delivered by top feasibility study professionals."
        }
        showCalendly={true}
        calendlyMobileView={false}
      />

      <ServicesSection
        services={servicesData}
        heading="Tailored Scope for Maximum Value"
        supportingText="Every project is unique. Our feasibility study specialists customize each scope to your vision, ensuring optimal efficiency and investment readiness."
      />

      {/* <DynamicInsightsSlider bgSurface={true} /> */}

      <CallToAction
        heading="Let's Talk"
        description="Looking for the best feasibility study consultants in Dubai or the UAE? Let's discuss your project goals and how our feasibility study professionals can help."
      />

      <FAQSection faqs={faqData} />
    </>
  );
};

export default FeasibilityStudyUAE;
