import { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero";
import Header from "@/components/ui/header";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";
import OurValuesSlider from "@/components/sections/OurValuesSlider";
import Credentials from "@/components/sections/Credentials";
import ServicesSection from "@/components/sections/ServicesSection";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { shuffleArray } from "@/lib/utils";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { getSeoMetadata } from "@/lib/seo-config";
import {
  BarChart3,
  Globe,
  Calculator,
  TrendingUp,
  FileText,
} from "lucide-react";
import { DynamicInsightsSlider } from "@/components/sections/InsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: "Market Research | Platform01 Consulting",
    description: "Description for Market Research page.",
    keywords: "platform01, Market Research",
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
      .eq("slug", "/market-research")
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

const MarketResearchData: ServiceHeroData = {
  subheading: "Market Research",
  heading: "Strategic Market Intelligence for Confident Decision-Making",
  backgroundImages: {
    mobile: "/services/mobile/market-research.png",
    tablet: "/services/tablet/market-research.png",
    desktop: "/services/desktop/market-research.png",
    ultrawide: "/services/ultrawide/market-research.png",
  },
  showContactForm: true,
};

const teamData = {
  heading: "Market Research Team",
  supportingText:
    "Our market research team brings a practitioner&apos;s mindset to every engagement, ensuring insights are grounded in real business context and tailored to your strategic needs.",
  team: getTeamDataForPage("market-research"),
};

const servicesData = [
  {
    title: "Market Sizing & Demand Forecasting",
    description: (
      <span>
        <ul>
          <li>Regional opportunity mapping</li>
          <li>Growth outlooks under base and stretch scenarios</li>
          <li>Industry-specific TAM/SAM/SOM modeling</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Customer and Buyer Intelligence",
    description: (
      <span>
        <ul>
          <li>Primary surveys and interviews (B2B & B2C)</li>
          <li>Buyer behavior and segmentation</li>
          <li>Price sensitivity and value-driver analysis</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Competitive & Industry Analysis",
    description: (
      <span>
        <ul>
          <li>Market share mapping and competitor profiling</li>
          <li>Benchmarking and white-space identification</li>
          <li>Business model trends and entry barriers</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Policy, Regulation & Market Context",
    description: (
      <span>
        <ul>
          <li>Sectoral impact of policy reforms</li>
          <li>Licensing frameworks, incentives, and compliance landscape</li>
          <li>
            Localization and national development programs (e.g., Vision 2030,
            UAE Industrial Strategy)
          </li>
        </ul>
      </span>
    ),
  },
  {
    title: "Market Entry & Localization Studies",
    description: (
      <span>
        <ul>
          <li>Feasibility of entry</li>
          <li>Distribution model options and partner search</li>
          <li>Localization strategies for product and operations</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Strategic Investor Research",
    description: (
      <span>
        <ul>
          <li>Opportunity thesis development</li>
          <li>Sector scans for fund deployment</li>
          <li>Exit environment and precedent activity</li>
        </ul>
      </span>
    ),
  },
];

const valuesData = {
  heading: "Our Differentiation",
  supportingText:
    "We are not a traditional research house. What sets us apart:",
  values: [
    {
      title: "Practitioner-Driven Research",
      description:
        "Built by ex-operators, strategists, and investors — not just analysts.",
    },
    {
      title: "Decision-Ready Insights",
      description:
        "Sharp, business-driven output that informs market entry, pricing, investments, and go-to-market.",
    },
    {
      title: "Contextual Depth",
      description:
        "We factor regulatory, cultural, and sector-specific nuances across GCC markets.",
    },
    {
      title: "Custom Scope",
      description:
        "No off-the-shelf reports — each project is uniquely designed.",
    },
  ],
};

const faqData: FAQItem[] = [
  {
    question:
      "Do you provide market research services specifically for Saudi Arabia and the UAE?",
    answer: (
      <span>
        Yes, <strong>Saudi Arabia and the UAE</strong> are our primary markets.
        Our research is specifically designed for the local regulatory,
        economic, and cultural contexts of these countries. Whether it’s
        understanding the nuances of Riyadh’s retail growth or Abu Dhabi’s
        industrial policies, we offer targeted insights.
      </span>
    ),
  },
  {
    question: "What sectors do you cover in the UAE and Saudi Arabia?",
    answer: (
      <span>
        We cover a wide range of sectors in both the{" "}
        <strong>UAE and Saudi Arabia</strong>, including healthcare, retail,
        industrials, logistics, education, technology, and financial services.
        We also handle niche and emerging sectors such as green economy,
        circular industries, and smart infrastructure.
      </span>
    ),
  },
  {
    question:
      "Can you support investment decisions with your research in Saudi Arabia and the UAE?",
    answer: (
      <span>
        Absolutely. Our market research is built to support{" "}
        <strong>
          investors evaluating opportunities in Saudi Arabia and the UAE
        </strong>{" "}
        — from market sizing to competitor analysis to exit landscape
        assessments. We frequently support VCs, private equity firms, and
        strategic investors operating in the region.
      </span>
    ),
  },
  {
    question: "Do you conduct local fieldwork in the UAE and Saudi Arabia?",
    answer: (
      <span>
        Yes. Depending on project needs, we conduct{" "}
        <strong>interviews, surveys, and mystery shopping</strong> in{" "}
        <strong>Saudi Arabia and the UAE</strong>. Our network of researchers,
        industry advisors, and on-ground teams allows us to collect primary
        insights efficiently and with credibility.
      </span>
    ),
  },
  {
    question:
      "Is your market research suitable for feasibility studies in Saudi Arabia or UAE?",
    answer: (
      <span>
        Definitely. Market research is a core component of{" "}
        <strong>feasibility studies in both Saudi Arabia and the UAE</strong>.
        We provide foundational market intelligence that helps clients assess
        viability before committing capital.
      </span>
    ),
  },
  {
    question:
      "Can you conduct fast-turnaround research projects in the UAE or Saudi Arabia?",
    answer: (
      <span>
        Yes. While most of our research engagements range from 2 to 8 weeks, we
        also offer <strong>rapid research sprints</strong> for time-sensitive
        decisions, especially for clients operating in{" "}
        <strong>Saudi Arabia or the UAE</strong> with fast-moving deals or
        market entry considerations.
      </span>
    ),
  },
  {
    question:
      "Are your research reports suitable for regulatory submissions in Saudi Arabia or UAE?",
    answer: (
      <span>
        In many cases, yes. While we do not prepare formal regulatory filings,
        our reports are often used by clients as part of{" "}
        <strong>business licensing</strong>,{" "}
        <strong>investment applications</strong>, and{" "}
        <strong>strategy documentation</strong> required by entities in{" "}
        <strong>Saudi Arabia and the UAE</strong>.
      </span>
    ),
  },
  {
    question:
      "Can you support international companies entering the Saudi or UAE markets?",
    answer: (
      <span>
        Yes. We frequently support international firms looking to expand into{" "}
        <strong>Saudi Arabia and the UAE</strong> by offering insights on market
        potential, customer segments, competitive landscape, and localization
        strategies.
      </span>
    ),
  },
  {
    question:
      "What makes your firm different from other market research firms in the UAE and Saudi Arabia?",
    answer: (
      <span>
        Unlike traditional survey providers,{" "}
        <strong>Platform01 Consulting</strong> delivers{" "}
        <strong>consulting-grade research</strong> that’s grounded in{" "}
        <strong>strategic context</strong>, deep regional understanding, and a
        track record of working with investors, corporates, and regulators
        across the <strong>UAE and Saudi Arabia</strong>.
      </span>
    ),
  },
  {
    question:
      "How do I get started with a market research project in Saudi Arabia or the UAE?",
    answer: (
      <span>
        Reach out to us through our website or email. We’ll schedule a discovery
        call to understand your objectives, timelines, and deliverables. From
        there, we’ll scope a customized proposal aligned with your needs in{" "}
        <strong>Saudi Arabia or the UAE</strong>.
      </span>
    ),
  },
];

const MarketResearch = async () => {
  // Fetch credentials with the relevant service tag
  let credentials: Credential[] = [];
  let error: string | null = null;

  try {
    const result = await credentialsService.getCredentials({
      service_tags: ["Feasibility Study"],
      is_active: true,
    });
    credentials = result.data || [];
    error = result.error;
  } catch (err) {
    console.error("Failed to fetch credentials:", err);
    error = "Failed to load credentials";
  }

  // Map to CredentialSlide
  const slides = credentials.map((c: Credential) => ({
    type: "service",
    category: c.service_tags.join(", "),
    title: c.title,
  }));

  return (
    <>
      <ServiceHero
        {...MarketResearchData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />
      <div className="container pt-4 pb-20">
        <Header text="Market Research" className="mb-20" />
        <h3 className="text-dark/">
          At Platform01 Consulting, we deliver bespoke market research that
          drives smarter strategies, bolder investments, and better decisions.
          In today’s fast-evolving regional markets, especially across the GCC,
          market intelligence must be relevant, contextual, and actionable — not
          just data-heavy.
        </h3>
        <h4 className="mt-10 text-dark/50">
          Our consulting-led research methodology ensures every engagement is
          rooted in real business context, with outputs tailored to your
          strategic needs — whether you’re exploring market entry, validating
          demand, or preparing a board-level investment case.
        </h4>
      </div>

      <TeamShowcase
        noHeader={true}
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        bgSurface={true}
      >
        {teamData.team.map((item, index) => (
          <TeamCard key={index} member={item} bgSurface={false} />
        ))}
      </TeamShowcase>
      <OurValuesSlider
        values={valuesData.values}
        bgSurface={false}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />

      <ServicesSection
        services={servicesData}
        heading="Our Market Research Services"
        bgSurface={true}
      />
      <Credentials
        slides={slides}
        bgSurface={false}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We've developed business plans across industries including tech, F&B, fintech, logistics, real estate, and industrials—covering diversification, EMEA expansion, joint ventures, and debt financing."
        }
      />
      <DynamicInsightsSlider bgSurface={true} />
      <CallToAction />
      <FAQSection faqs={faqData} />
    </>
  );
};

export default MarketResearch;
