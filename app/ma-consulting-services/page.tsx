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
import MAProcess from "@/components/sections/MAProcess";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import LazyInsightsSlider from "@/components/sections/LazyInsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import Awards from "@/components/sections/Awards";
import CTAButton from "@/components/ui/ctaButton";

// Enable static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 60; // Revalidate every minute for faster updates

export async function generateMetadata() {
  let seo = {
    title: "M&A Advisory Firm in UAE | M&A Consulting Services | Platform01",
    description:
      "Leading M&A advisory firm in UAE providing premium M&A consulting services. Expert M&A advisory company specializing in mergers and acquisitions in UAE and Dubai.",
    keywords:
      "M&A advisory firm, M&A firm in UAE, M&A advisory company, M&A consulting, mergers and acquisitions UAE, mergers and acquisitions Dubai, M&A services, M&A specialist, M&A business advisors, M&A transaction advisory services Dubai, business valuation UAE, transaction advisory",
    og_title: "M&A Advisory Firm in UAE | Premium M&A Consulting Services",
    og_description:
      "Leading M&A advisory firm in UAE providing expert M&A consulting services for mergers and acquisitions in UAE and Dubai.",
    og_image: "",
    twitter_title: "M&A Advisory Firm in UAE | Platform01 Consulting",
    twitter_description:
      "Expert M&A advisory company in UAE specializing in mergers and acquisitions in UAE and Dubai.",
    twitter_image: "",
    canonical_url: "",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/ma-consulting-services")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    other: {
      preload: "/services/mobile/ma-consulting.png",
      "dns-prefetch": "https://vsqfvsosprmjdktwilrj.supabase.co",
      preconnect: "https://vsqfvsosprmjdktwilrj.supabase.co",
    },
  };
}

const MaConsultingData: ServiceHeroData = {
  subheading: "Leading M&A Advisory Firm in UAE",
  heading: "Expert M&A Advisory Services",
  backgroundImages: {
    mobile: "/services/mobile/ma-consulting.png",
    tablet: "/services/tablet/ma-consulting.png",
    desktop: "/services/desktop/ma-consulting.png",
    ultrawide: "/services/ultrawide/ma-consulting.png",
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
  heading: "Expert M&A Advisory Team",
  supportingText:
    "Our team of former investment bankers, corporate strategists, and private equity professionals brings a practitioner&apos;s mindset to every deal. As leading M&A business advisors in UAE, we combine deep industry expertise with local market knowledge",
  team: getTeamDataForPage("ma-consulting"),
};

const servicesData = [
  {
    title: "Business Sale Consultancy (Sell-Side M&A)",
    description: (
      <span>
        We provide comprehensive M&A services and transaction support for
        selling your company, including market preparation, valuation, buyer
        identification, negotiation support, due diligence support, and
        transaction support. Our M&A specialist team in UAE specializes in
        maximizing value for business owners.
      </span>
    ),
  },
  {
    title: "Business Valuation Services",
    description: (
      <span>
        We offer independent, institutional grade, and investor-ready business
        valuation reports tailored for the UAE market. Our M&A advisory company
        ensures accurate and defensible valuations that meet international
        standards.
      </span>
    ),
  },
  {
    title: "Divestments & Carve-Outs Consultancy",
    description: (
      <span>
        We work with conglomerates and holding groups to devise strategy to
        divest non-core assets, optimize portfolios, and unlock shareholder
        value. As a leading M&A company in UAE, we help organizations streamline
        their operations and focus on core competencies.
      </span>
    ),
  },
  {
    title: "Transaction Readiness & M&A Strategy",
    description: (
      <span>
        We prepare clients for the M&A process with strategic guidance and
        investor-grade documentation. Our M&A advisory firm ensures you're fully
        equipped to navigate complex transactions successfully.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Choose Our M&A Advisory Firm?",
  supportingText:
    'We understand that every project is unique. There&apos;s no "one-size-fits-all" approach to M&A transactions. As a leading M&A advisory company in UAE, we tailor each engagement to your specific needs, requirements, and target audience, ensuring efficiency and precision throughout the process',
  values: [
    {
      title: "Experienced M&A Advisory Team",
      description:
        "Our team consists of strategic M&A consultants who bring structure, clarity, and negotiating power to your transaction. Our M&A advisor company firm combines deep expertise with practical deal experience.",
      icon: "users",
    },
    {
      title: "Bespoke, Client-Focused Approach",
      description:
        "We have a successful track record of helping clients get better value out of the M&A process. As a premier M&A advisory company, we focus on delivering measurable results.",
      icon: "target",
    },
    {
      title: "Successful <br/> Track Record",
      description:
        "We have a proven track record of helping clients achieve superior outcomes in their M&A transactions. Our M&A firm in UAE has successfully completed numerous complex deals across various industries.",
      icon: "award",
    },
    {
      title: "Scenario Analysis & Sensitivities",
      description:
        "We provide stress-testing assumptions to deliver reliable valuation insights and highlight key risks. Our M&A advisory firm ensures comprehensive risk assessment for every transaction.",
      icon: "trending",
    },
  ],
};
const faqData: FAQItem[] = [
  {
    question: "What type of clients does our M&A advisory firm work with?",
    answer: (
      <span>
        We work exclusively with mid-market companies with annual revenue AED 40
        million above and visionary business leaders who understand the value of
        strategic preparation and are willing to invest in premium and boutique
        M&A consulting services. As a leading M&A advisory firm in UAE offering
        Mergers & Aquisitions in Dubai, our engagements are based on retainers
        and are best suited to clients seeking meaningful, long-term outcomes.
        <br />
        <br />
        Our typical clients typically include:
        <ul className="list-disc pl-6 mt-2">
          <li>
            Established Businesses with annual revenue of at least AED 40
            million
          </li>
          <li>High-Growth Companies with valuation above AED 50 million</li>
          <li>Corporate Groups looking to divest non-core assets</li>
          <li>Investors & Family Offices planning structured exits</li>
        </ul>
      </span>
    ),
  },
  {
    question: "Can I rely solely on our M&A advisory firm for my transaction?",
    answer: (
      <span>
        While our services can significantly enhance your M&A readiness and
        strategic position, we do not replace the need for licensed financial,
        legal, or tax advisors. As a leading M&A firm in UAE, we often work
        alongside other advisors as part of a broader deal team.
      </span>
    ),
  },
  {
    question: "How do I sell my business in the UAE with an M&A advisory firm?",
    answer: (
      <span>
        We guide you through the entire journey — from valuation and packaging a
        growth story to documentation support, due diligence support, and
        transaction support. Our M&A transaction advisory services in Dubai
        ensure you're fully prepared for every stage of the process.
      </span>
    ),
  },
  {
    question: "How long does a business sale take?",
    answer: (
      <span>
        Most business sales take between 6–24 months, depending on deal
        complexity, industry dynamics, buyer interest, and other variables.
      </span>
    ),
  },
  {
    question:
      "How can you help me succeed in an M&A transaction if I&apos;m not clear about the process?",
    answer: (
      <span>
        We act as your Management Consultant throughout the journey. Our support
        includes:
        <ul className="list-disc pl-6 mt-2">
          <li>Defining Your Objectives – Exit, fundraise, or partial sale</li>
          <li>
            Assessing Readiness – Strategy, commercial, operations, and
            structure
          </li>
          <li>
            Crafting the Deal Story – Highlighting value and differentiation
          </li>
          <li>
            Identifying Buyers/Investors – Preparing investor documentation and
            buyer universe
          </li>
          <li>
            Negotiation & Transaction Support & Consultancy – Supporting Q&A,
            LOIs, and due diligence
          </li>
        </ul>
      </span>
    ),
  },
  {
    question: "How does our M&A advisory firm&apos;s experience set us apart?",
    answer: (
      <span>
        As a premier M&A advisory company, our team includes former investment
        bankers, corporate strategists, and private equity professionals. Our
        M&A firm in UAE brings deep transactional experience across the MENAP,
        having advised on capital raises, buy-side transactions, and strategic
        divestments.
      </span>
    ),
  },
  {
    question: "How does our M&A advisory firm support buy-side clients?",
    answer: (
      <span>
        For buy-side mandates, we provide strategic consulting to identify
        suitable acquisition targets, conduct preliminary commercial due
        diligence, evaluate synergies to ensure alignment, and define strategies
        that are aligned with your investment goals. Our M&A advisory company
        specializes in helping acquirers make informed investment decisions.
      </span>
    ),
  },
  {
    question: "Does our M&A advisory firm provide cross-border M&A services?",
    answer: (
      <span>
        We support our clients in cross-border M&A transactions. As a leading
        M&A advisory firm in UAE, our team understands the cultural nuances of
        regional deals and works closely with your team of advisors to deliver
        effective outcomes.
      </span>
    ),
  },
  {
    question: "Does our M&A advisory firm help with negotiations?",
    answer: (
      <span>
        Negotiation support is a key part of our services. We guide clients
        through deal structuring, valuation discussions, term sheet reviews, and
        LOI assessments, all from a consulting and preparation standpoint on a
        best effort basis with no guarantees of success. Our M&A firm in UAE
        brings extensive negotiation experience to every transaction.
      </span>
    ),
  },
];

const MaConsultingServices = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: [
      "M&A Consulting",
      "Transaction Advisory",
      "Transaction Support",
    ],
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
        {...MaConsultingData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      {/* <div className='container pt-5 pb-20'>
       <Header text='Leading M&A Advisory Firm in UAE' className='mb-26' />
       <h2 className="heading-4 max-w-[1010px]">Are you considering selling your business, raising capital, or divesting a non-core unit? We provide premium and exclusive M&A consulting services for mergers and acquisitions in UAE and Dubai. As a premier M&A advisory firm, we guide you through every stage of the transaction, helping you prepare, position, negotiate and support deals that deliver long-term value.</h2>
     </div> */}

      <TeamShowcase
        title="Our M&A Consulting Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={true}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} bgSurface={false} />
        ))}
      </TeamShowcase>

      <Credentials
        showCalendly={true}
        calendlyMobileView={false}
        slides={slides}
        bgSurface={false}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, debt financing, and providing specialized Mergers & Acquisition Services."
        }
      />

      <ServicesSection
        showCTA={true}
        services={servicesData}
        bgSurface={true}
        heading="M&A Advisory Firm Services in UAE"
      />
      <MAProcess />
      <OurValuesSlider
        values={valuesData.values}
        bgSurface={true}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />

      <LazyInsightsSlider bgSurface={false} />
      <CallToAction
        heading="Ready to Work with a Leading M&A Advisory Firm?"
        description="We'd love to hear about your M&A ambitions. Whether you're aiming to sell your business, raise capital, or make strategic investments, our team is here to guide you through every step."
      />
      <FAQSection showCTA={true} faqs={faqData} />
    </>
  );
};

export default MaConsultingServices;
