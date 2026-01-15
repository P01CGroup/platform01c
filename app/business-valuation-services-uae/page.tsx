import { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import ChecklistItem from "@/components/ui/checklist_item";
import TeamText from "@/components/sections/TeamText";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";
import Credentials from "@/components/sections/Credentials";
import ServicesSection from "@/components/sections/ServicesSection";
import OurValuesSlider from "@/components/sections/OurValuesSlider";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { ServiceHeroData } from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Business Valuation | Platform01 Consulting",
    description:
      "Professional business valuation services in UAE and Dubai by Platform01 Consulting.",
    keywords:
      "business valuation services in uae, business valuation in dubai, business valuation Dubai, business valuation uae",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/business-valuation-services")
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

const BusinessValuationData: ServiceHeroData = {
  subheading: "Trusted Business Valuation Services in UAE",
  heading: "Bespoke. Accurate. <br/> Reliable.",
  backgroundImages: {
    mobile: "/services/mobile/business-valuation.png",
    tablet: "/services/tablet/business-valuation.png",
    desktop: "/services/desktop/business-valuation.png",
    ultrawide: "/services/ultrawide/business-valuation.png",
  },
  awards: [
    {
      image: "/awards/ma-award-1.png",
      text: "Top M&A Boutique <br/> UAE - 2025",
      alt: "Top M&A Boutique UAE - 2025",
    },
    {
      image: "/awards/ma-award-1.png",
      text: "Top M&A Advisory <br/> Boutique 2025",
      alt: "Top M&A Advisory Boutique 2025",
    },
    {
      image: "/awards/top-consulting-firm-middle-east.png",
      text: "Top Consulting Firm <br/> ConsultancyME",
      alt: "Top Consulting Firm 2025 Middle East 2025",
    },
  ],
  showContactForm: true,
};

const teamData = {
  heading: "Accredited and <br/> Qualified Business Valuation Team in Dubai",
  supportingText:
    "Our Business Valuation team includes professionals with CFA, FRM, CIPM, FMVA, and ACCA qualifications, with experience at Big 4 and other reputable advisory firms.",
  team: getTeamDataForPage("business-valuation"),
};

const valuesData = {
  heading: "Tailored Scope for Optimal Value in Business Valuation UAE",
  supportingText:
    'We understand that every project is unique. There&apos;s no "One-Size-Fits-All" approach to Business Valuations. We tailor the scope of each study to your specific needs, ensuring efficiency and precision.',
  values: [
    {
      title: "Detailed Financial Analysis",
      description:
        "Examining historical performance, projected earnings, and financial health.",
      icon: "barchart",
    },
    {
      title: "Industry & Market Assessment",
      description:
        "Evaluating sector trends, competitive landscape, and macroeconomic factors.",
      icon: "globe",
    },
    {
      title: "Valuation <br/> Methodologies",
      description:
        "Applying DCF, market multiples, and transaction comparables to ensure a robust valuation.",
      icon: "calculator",
    },
    {
      title: "Scenario Analysis & Sensitivities",
      description:
        "Stress-testing assumptions to provide reliable valuation insights and highlight key risks.",
      icon: "trending",
    },
    {
      title: "Comprehensive <br/> Valuation Report",
      description:
        "Delivering a clear, well-documented valuation report with actionable insights.",
      icon: "filetext",
    },
  ],
};

const servicesData = [
  {
    title: "Standard Business Valuation in Dubai",
    description: (
      <span>
        Essential for M&A transactions, financial reporting, and strategic
        decision-making.
      </span>
    ),
  },
  {
    title: "Distressed Business Valuation",
    description: (
      <span>
        Assessing companies facing financial challenges, restructuring, or
        insolvency scenarios.
      </span>
    ),
  },
  {
    title: "Investor Portfolio Valuation",
    description: (
      <span>
        Helping investors and private equity firms evaluate the fair value of
        their holdings for financial reporting and investment strategies.
      </span>
    ),
  },
  {
    title: "Brand Valuation",
    description: (
      <span>
        Determining the monetary worth of a company&apos;s brand and
        intellectual property for financial and strategic purposes.
      </span>
    ),
  },
  {
    title: "Startup Business Valuation",
    description: (
      <span>
        Valuing high-growth startups using appropriate methodologies tailored to
        their unique risk-reward profile.
      </span>
    ),
  },
  {
    title: "Impairment Testing",
    description: (
      <span>
        Assessing whether a company's assets have suffered a decline in fair
        value.
      </span>
    ),
  },
  {
    title: "Other Specialized Valuations",
    description: (
      <span>
        Including purchase price allocations, goodwill impairment testing, and
        litigation-based valuations.
      </span>
    ),
  },
];

const BusinessValuation = async () => {
  let credentials: Credential[] = [];
  try {
    const result = await credentialsService.getCredentials({
      service_tags: ["Business Valuation"],
      is_active: true,
    });
    credentials = result.data || [];
  } catch (err) {
    console.error("Failed to fetch credentials:", err);
  }

  const slides = credentials.map((c: Credential) => ({
    type: "service",
    category: c.service_tags.join(", "),
    title: c.title,
  }));

  return (
    <>
      <ServiceHero
        {...BusinessValuationData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />

      <div className="container pt-5 pb-20">
        <Header
          text="Comprehensive Business Valuation in Dubai"
          className="mb-26"
        />
        <h2 className="heading-4 max-w-[1010px] mb-8">
          At Platform01 Consulting, we provide comprehensive, bespoke, and
          high-quality business valuation services that go beyond generic and
          off-the-shelf online assessments.
        </h2>
        <ChecklistItem
          text="250+ Projects successfully delivered by Team Members"
          className="py-6 border-b border-dark/10"
        />
        <ChecklistItem
          text="Licensed Management Consulting firm in the UAE with offices in Dubai and Riyadh"
          className="py-6 border-b border-dark/10"
        />
        <ChecklistItem
          text="Experienced Team from Global Financial Institutions, Fortune 500 Companies, Big 4 Advisory, and other Reputable Firms"
          className="py-6 border-b border-dark/10"
        />
        <ChecklistItem
          text="Accredited Team from Top Business Schools and with Global Professional Qualifications"
          className="py-6 border-b border-dark/10"
        />
        <ChecklistItem
          text="Institutional Grade Quality of reports and studies"
          className="py-6"
        />
      </div>

      <TeamText>
        <div>
          <h2 className="heading-3 max-w-[810px]">
            Exploring Business Valuation Services in UAE with Precision and
            Expertise
          </h2>
          <hr className="border-dark/10 my-8" />
          <h2 className="heading-4 text-dark/50 max-w-[810px]">
            Business valuation is more than just numbers—it&apos;s about
            understanding the story behind the business and its market dynamics.
          </h2>
        </div>
        <p className="max-w-[810px]">
          Our goal is to provide valuations that empower clients with deep,
          strategic insights. If you seek a business valuation partner that
          prioritizes accuracy and reliability, we are here to help.
        </p>
      </TeamText>

      <TeamShowcase
        title="Our Business Valuation Dubai Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={false}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} bgSurface={true} />
        ))}
      </TeamShowcase>

      <Credentials
        showCalendly={true}
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
        calendlyMobileView={false}
      />

      <ServicesSection
        showCTA={true}
        services={servicesData}
        bgSurface={false}
        heading="Our Business Valuation Services UAE"
        supportingText="We cater to various valuation needs, addressing the specific requirements of businesses, investors, and financial institutions:"
      />

      <OurValuesSlider
        values={valuesData.values}
        bgSurface={true}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />

      {/* <DynamicInsightsSlider /> */}
      <CallToAction />
    </>
  );
};

export default BusinessValuation;
