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
import { Users, Zap, Target, Award } from "lucide-react";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Turnaround Advisory | Platform01 Consulting",
    description: "Description for Turnaround Advisory page.",
    keywords: "platform01, Turnaround Advisory",
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
      .eq("slug", "/turnaround-advisory")
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

const TurnaroundAdvisoryData: ServiceHeroData = {
  subheading: "Turnaround Advisory",
  heading: "Reclaim Control. Restore Value. Reignite Growth.",
  backgroundImages: {
    mobile: "/services/mobile/turnaround-advisory.png",
    tablet: "/services/tablet/turnaround-advisory.png",
    desktop: "/services/desktop/turnaround-advisory.png",
    ultrawide: "/services/ultrawide/turnaround-advisory.png",
  },
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
    question:
      "Do you offer turnaround advisory services in the UAE and Saudi Arabia?",
    answer: (
      <span>
        Yes. Platform01 Consulting provides turnaround and business
        restructuring services across the UAE and KSA. We work extensively in
        cities such as Dubai, Abu Dhabi, Riyadh, and Jeddah, supporting clients
        through complex financial and operational challenges.
      </span>
    ),
  },
  {
    question:
      "What makes Platform01 a leading turnaround consulting firm in the GCC?",
    answer: (
      <span>
        Our blend of regional expertise, hands-on leadership, and tailored
        execution makes us a trusted partner for turnarounds in the UAE and
        Saudi Arabia. We've advised on some of the most complex situations in
        the region, combining strategy and execution with deep stakeholder
        alignment.
      </span>
    ),
  },
  {
    question:
      "What types of businesses do you support with turnaround consulting in the UAE and Saudi Arabia?",
    answer: (
      <span>
        We support family-owned businesses, mid-market firms, and corporates in
        sectors such as industrial, real estate, retail, F&B, construction,
        logistics, healthcare, and real estate across Riyadh, Dubai, Abu Dhabi,
        Jeddah, Dammam, Sharjah, and the Northern Emirates.
      </span>
    ),
  },
  {
    question:
      "Are your turnaround consultants based in United Arab Emirates and Saudi Arabia?",
    answer: (
      <span>
        Yes. We have on-the-ground presence in United Arab Emirates and Saudi
        Arabia with access to senior consultants in Riyadh, Dubai, Jeddah, and
        the Eastern Province. We understand the unique business environment and
        legal frameworks that shape turnarounds in KSA.
      </span>
    ),
  },
  {
    question:
      "What is the difference between turnaround advisory and financial restructuring?",
    answer: (
      <span>
        Turnaround advisory is broader—it includes operational, strategic, and
        leadership transformation. Financial restructuring is typically a
        subset, focused on resolving balance sheet stress, renegotiating debt,
        and restoring liquidity. We offer consulting services for business
        turnarounds in both situations, with an integrated approach.
      </span>
    ),
  },
  {
    question:
      "How quickly can your turnaround consultants start working on-site in the UAE or Saudi Arabia?",
    answer: (
      <span>
        Our team is built for urgent response. We can deploy senior advisors
        within weeks to businesses in Dubai, Abu Dhabi, Riyadh, Jeddah and other
        cities in UAE and KSA — especially in time-sensitive or high-pressure
        environments.
      </span>
    ),
  },
  {
    question: "What does a turnaround plan from Platform01 typically include?",
    answer: (
      <span>
        A turnaround plan includes: liquidity and cash flow management, cost and
        operational restructuring, management realignment, business model
        shifts, and performance milestones. It's tailored to the specifics of
        each business and sector.
      </span>
    ),
  },
  {
    question:
      "Do you provide interim CEO, CFO, or CSO support during turnaround engagements?",
    answer: (
      <span>
        Yes. We offer interim C-suite leadership including Chief Strategy
        Officers (CSOs) for distressed businesses in the UAE and KSA. This
        ensures accountability and hands-on execution throughout the turnaround
        phase.
      </span>
    ),
  },
  {
    question:
      "How do you handle sensitive stakeholder situations during a turnaround in United Arab Emirates and Saudi Arabia?",
    answer: (
      <span>
        With discretion, diplomacy, and a clear value restoration plan. We have
        experience managing complex family dynamics, investor expectations, and
        board-level conflicts in both family-run and institutional businesses
        across UAE and KSA.
      </span>
    ),
  },
  {
    question:
      "What industries do you have the most turnaround experience in across the GCC?",
    answer: (
      <span>
        Our team has worked across a wide range of sectors including but not
        limited to industrial, energy, retail, healthcare, logistics, F&B,
        industrials, real estate, construction, and education — with operational
        and financial turnarounds tailored to regional market dynamics.
      </span>
    ),
  },
  {
    question:
      "Do you provide business turnaround consulting for distressed startups or early-stage ventures in the UAE?",
    answer: (
      <span>
        Yes. We support fast-scaling startups that face cash burn, operational
        inefficiencies, or founder misalignment. Our agile turnaround strategies
        are designed for dynamic, venture-backed environments.
      </span>
    ),
  },
  {
    question:
      "Can you assist with out-of-court restructurings under Saudi Arabia&apos;s bankruptcy framework?",
    answer: (
      <span>
        Yes. We collaborate with legal, tax and financial advisors,
        restructuring experts and trustees to provide management consulting
        services to clients in both out-of-court and formal restructuring
        processes under Saudi Bankruptcy Law, including preventive settlement
        and financial reorganization procedures.
      </span>
    ),
  },
  {
    question:
      "Why is Platform01 considered a premium turnaround advisory firm in Dubai and Riyadh?",
    answer: (
      <span>
        Because we bring deep practitioner insight, boardroom trust, and
        execution credibility. Our team's ability to lead both strategy and
        hands-on implementation sets us apart from conventional consulting firms
        in the region.
      </span>
    ),
  },
];

const TurnaroundAdvisory = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    service_tags: ["Turnaround Advisory"],
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
        <Header text="Turnaround Advisory" className="mb-26" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
          <h2 className="heading-4 md:col-span-3">
            At Platform01 Consulting, we specialize in high-stakes turnaround
            advisory for businesses facing financial distress, operational
            breakdowns, or strategic misalignment. We work closely with boards,
            CEOs, investors, and lenders to rapidly stabilize the business,
            protect stakeholder value, and implement decisive strategies for
            recovery and renewal.
          </h2>
          <p className="md:col-span-2 text-dark/50">
            Our approach goes beyond traditional consulting —we bring a
            practitioner mindset, combining real-world leadership experience
            with strategic advisory depth to help companies transform under
            pressure and emerge stronger.
          </p>
        </div>
      </div>

      <TeamText>
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
      </TeamText>

      <TeamShowcase
        title="Our Consulting Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} />
        ))}
      </TeamShowcase>

      <Credentials
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We&apos;ve advised across industries including Infrastructure, Real Estate, Technology, Logistics, and Industrials — covering distressed business valuations, strategic options analysis, business diagnostics and turnaround strategies."
        }
      />

      <DynamicInsightsSlider />

      <ServicesSection
        services={servicesData}
        bgSurface={true}
        heading="Our Value Creation Services"
      />

      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
      />
      <CallToAction
        heading="Business Turnaround Experts and Consultants"
        description="Whether you're a fund manager, family office, or institutional investor, Platform01 brings the clarity, confidence, and global standard you need to make informed decisions and report with authority."
      />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default TurnaroundAdvisory;
