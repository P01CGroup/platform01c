import ServiceHero from "@/components/sections/ServiceHero";
import { ServiceHeroData } from "@/lib/types";
import React from "react";
import TeamCard from "@/components/ui/team-card";
import Credentials from "@/components/sections/Credentials";
import OurValuesSlider, { Value } from "@/components/sections/OurValuesSlider";
import CallToAction from "@/components/sections/CallToAction";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamShowcase from "@/components/sections/TeamShowcase";
import MAProcess from "@/components/sections/MAProcess";
import { credentialsService } from "@/lib/services/CredentialsService";
import { Credential } from "@/lib/types/cms";
import { getTeamDataForPage } from "@/lib/data/team-data";
import LazyInsightsSlider from "@/components/sections/LazyInsightsSlider";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-static";
export const revalidate = 60;

export async function generateMetadata() {
  let seo = {
    title:
      "Mergers and Acquisitions in UAE | Top Mergers and Acquisitions Firms | Platform01",
    description:
      "Leading Mergers and Acquisitions firms in Dubai and UAE offering professional consulting and advisory services. Trusted experts in Merger Acquisition Consulting and M&A transactions.",
    keywords:
      "Mergers and acquisitions in Dubai, Mergers and acquisitions in UAE, Mergers and acquisitions firms, Mergers and acquisitions consulting services, Mergers & acquisitions services, Merger acquisition consulting, Merger acquisition company, Mergers and acquisitions advisory services",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/ma-consulting-services")
      .single();
    if (data?.seo)
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

const MaConsultingData: ServiceHeroData = {
  subheading: "Leading Mergers and Acquisitions in UAE",
  heading: "Trusted Mergers and Acquisitions Firms Delivering Results",
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
  ],

  showContactForm: true,
};

const teamData = {
  heading: "Meet Our Expert Merger and Acquisitions Companies Team",
  supportingText:
    "Our multidisciplinary experts combine financial acumen and market insight. As one of the top Merger Acquisition Companies in the UAE, our professionals deliver tailored strategies and transaction excellence.",
  team: getTeamDataForPage("ma-consulting"),
};

const servicesData = [
  {
    title: "Strategic Merger Acquisition Consulting & Advisory",
    description: (
      <span>
        Our dedicated team provides end-to-end Mergers and Acquisitions support,
        from opportunity identification to transaction execution. With deep
        expertise in Merger Acquisition Consulting, we ensure every step
        maximizes client value and minimizes risk.
      </span>
    ),
  },
  {
    title: "Comprehensive Mergers and Acquisitions Consulting Services",
    description: (
      <span>
        We offer specialized{" "}
        <strong>Mergers and Acquisitions Consulting Services</strong> that cover
        valuation, due diligence, and deal structuring—empowering businesses in
        Dubai and UAE to execute high-value transactions confidently.
      </span>
    ),
  },
  {
    title: "Business Valuation & Transaction Readiness",
    description: (
      <span>
        Our valuation experts provide accurate and defensible insights designed
        to support decision-making for every Mergers & Acquisitions Services
        engagement in the UAE market.
      </span>
    ),
  },
];

const valuesData = {
  heading: "Why Choose Our Merger Acquisition Company in UAE?",
  supportingText:
    "We pride ourselves on delivering unmatched service excellence through a client-first approach. Our Merger Acquisition Company combines local knowledge and global standards to drive deal success.",
  values: [
    {
      title: "Experienced Mergers and Acquisitions Firms Network",
      description:
        "We collaborate with leading Mergers and Acquisitions Firms across Dubai and UAE to ensure seamless, compliant, and profitable transactions.",
      icon: "network",
    },
    {
      title: "Tailored Approach to Every Transaction",
      description:
        "No two mergers are the same. We tailor our strategies for your business objectives to maximize outcome efficiency.",
      icon: "target",
    },
  ],
};

const faqData: FAQItem[] = [
  {
    question: "Who benefits most from our Mergers & Acquisitions Services?",
    answer: (
      <span>
        Businesses planning expansion, acquisition, or divestment in UAE can
        leverage our Mergers & Acquisitions Services to achieve strategic growth
        and financial clarity.
      </span>
    ),
  },
  {
    question: "Do you assist with Mergers and Acquisitions in UAE and Dubai?",
    answer: (
      <span>
        Absolutely. Our firm provides full-spectrum advisory and consulting
        support for <strong>Mergers and Acquisitions in UAE</strong> and{" "}
        <strong>Mergers and Acquisitions in Dubai</strong>, ensuring clients
        achieve success across both local and cross-border deals.
      </span>
    ),
  },
];

const MaConsulting2 = async () => {
  const { data: credentials } = await credentialsService.getCredentials({
    service_tags: [
      "Mergers and Acquisitions Consulting",
      "Transaction Advisory",
      "Transaction Support",
    ],
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
        {...MaConsultingData}
        whatsAppButtonMobileView={false}
        showButton={false}
        showContactForm={true}
        showContactFormMobileView={true}
      />

      <TeamShowcase
        title="Meet Our Leading Merger and Acquisitions Companies Experts"
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
        slides={slides}
        bgSurface={false}
        disableTabs={true}
        heading="Trusted Expertise in Mergers and Acquisitions Advisory Services"
        supportingText="We bring decades of proven advisory experience, offering world-class guidance for businesses navigating complex mergers, acquisitions, and strategic partnerships."
        calendlyMobileView={false}
      />

      <ServicesSection
        showCTA={true}
        services={servicesData}
        bgSurface={true}
        heading="Comprehensive Merger and Acquisition Companies in UAE Solutions"
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
        heading="Partner with the Top Merger Acquisition Company in UAE"
        description="Let’s discuss your transaction goals. Whether you're planning a merger, acquisition, or business sale, our team will guide you through every step with confidence."
      />

      <FAQSection faqs={faqData} showCTA={true} />
    </>
  );
};

export default MaConsulting2;
