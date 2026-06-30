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
import TeamTab from "./TeamTab";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  let seo = {
    title: " Real Estate Advisory KSA | Feasibility, HBU & Transactions",
    description:
      "Expert real estate consulting in Saudi Arabia, real estate, HBU studies & investment advisory for developers & investors in KSA.",
    keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url:
      "https://www.platform01consulting.com/real-estate-consulting-ksa",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/real-estate-consulting-ksa")
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
  subheading: "Real Estate Consulting Services",
  heading: "Unlocking Value in Saudi Arabia's Real Estate Market",
  smallHeading: "Licensed Management Consulting Firm in Saudi Arabia",
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

const checklistItems = [
  "Enables financing from DFIs (SIDF, ADF, CDF, etc. included), commercial banks, NBFCs, and institutional investors by ensuring a bankable feasibility study that meets global standards.",
  "Last 12 Months: Prepared SIDF real estate for projects worth over SAR 2 billion",
  "250+ Projects successfully delivered by Team Members for projects worth above SAR 100 billion",
  "Accredited Team from Top Business Schools and with Global Professional Qualifications",
  "Experienced Team from Global Financial Institutions, Fortune 500 Companies, Big 4 Advisory, and other Reputable Firms",
  "We deliver investment-grade insights that align with Vision 2030 and institutional financing requirements",
];

const teamData = {
  heading:
    'Our Unique "Practitioner-Driven" Approach </br>Real Estate Consulting Services',
  supportingText:
    'Our Real Estate practice is based on our unique model of "Practitioner-Driven" approach that brings together Relevant Sector Experience from Global Fortune 500 Corporations and Global Financial Institutions with years of Financial Expertise of consulting in the region.',
  team: getTeamDataForPage("real-estate-consulting-ksa"),
};

const corporateTeamData = {
  heading: "Our Saudi Arabia Corporate Team",
  supportingText:
    "Our KSA Corporate Team plays a critical role in delivering a seamless client experience by overseeing all matters related to Commercial and Corporate affairs. With a strong focus on process integrity and operational discipline, it empowers our Consulting Team to focus on delivering exceptional value to clients.",
  team: getTeamDataForPage("feasibility-corporate-team"),
};

const faqData: FAQItem[] = [
  {
    question:
      "What is a real estate, and why is it critical for large-scale projects?",
    answer:
      "A real estate assesses the commercial and financial viability of a proposed project. For capital-intensive sectors like real estate, energy, healthcare, education, infrastructure, and industrial ventures, a robust real estate mitigates risk, validates assumptions, and enables confident decision-making by investors, lenders, and other stakeholders.",
  },
  {
    question:
      "What types of real estate does Platform01 Consulting provide in the Saudi Arabia?",
    answer:
      "We offer fully integrated real estate for: Industrial Projects (manufacturing, logistics, agri-processing), Infrastructure (transport, utilities, PPPs), Healthcare (hospitals, specialty clinics, diagnostics), Education (K-12 schools, universities, training centers), Energy (renewables, clean tech, district cooling), Real Estate (residential, commercial, hospitality, retail, mixed-use), and other sectors. As a leading real estate firm, we ensure each study is grounded in both market realism and financial rigor.",
  },
  {
    question:
      "What makes Platform01 different from generic Real Estate consultants?",
    answer:
      "Our studies are led by senior practitioners with real-world experience in investments, development, and operations. We emphasize commercial logic, market realism, and investment readiness—not just academic templates. This unique approach reflects the expertise of a dedicated real estate strategist rather than a generalist consultant.",
  },
  {
    question:
      "What does a typical real estate from Platform01 Consulting include?",
    answer:
      "Our real estate typically cover: Market & demand analysis, Competitive landscape & pricing intelligence, Technical feasibility (infrastructure, land, utilities, access), Financial modelling & project IRR/NPV, Sensitivity & risk analysis, Business model & commercialization strategy, Regulatory framework & location-specific policy insights, Exit scenarios & investor return perspectives.",
  },
  {
    question: "Do you offer Arabic-language real estate for submission?",
    answer:
      "Yes. We can deliver bilingual feasibility reports (English & Arabic) to comply with local requirements in Saudi Arabia.",
  },
  {
    question:
      "Do you offer real estate for industrial projects (manufacturing, logistics)?",
    answer:
      "Yes. We conduct technical and market feasibility for factories, warehouses, logistics hubs, and industrial clusters, aligned with KSA’s Vision 2030 and National Industrial Strategy. Our ability to conduct a real estate across diverse sectors ensures clarity and confidence for project stakeholders.",
  },
  {
    question: "Can you support PPP and infrastructure real estate?",
    answer:
      "Absolutely. We help evaluate bankability, risk-sharing, and returns for public-private partnership (PPP) infrastructure projects—such as airports, smart utilities, transport networks, and social infrastructure (healthcare, education). This process often involves a detailed market real estate to validate demand and long-term viability.",
  },
  {
    question: "How long does it take to complete a real estate?",
    answer:
      "A standard real estate can take between 6 to 8 weeks, depending on project complexity, site access, and availability of inputs (technical plans, machinery specifications, etc.).",
  },
  {
    question:
      "Do you offer tailored scopes for early-stage or greenfield projects?",
    answer:
      "Yes. We create modular scopes depending on project maturity—ranging from concept validation to full investment-grade real estate.",
  },
  {
    question: "Can you help revise or validate an existing real estate?",
    answer:
      "Yes. We can review, validate, or enhance an existing real estate with updated market data, sharper commercial logic, and improved financial modeling. This ensures that the feasibility report of a project remains accurate, current, and investment-ready.",
  },
  {
    question:
      "Can a real estate determine the potential profitability of my business idea?",
    answer:
      "Yes, a financial real estate analysis includes a financial model in Excel. The financial model covers projections of income statement, balance sheet and cash flow based on project and market fundamentals. With the support of a seasoned, feasibility study expert, these projections provide actionable insights for decision-making.",
  },
  {
    question:
      "What are some of the development financial institutions in Saudi Arabia?",
    answer:
      "In Saudi Arabia, several development financial institutions play a vital role in supporting economic growth, diversification, and sustainable development. Key institutions include: Saudi Industrial Development Fund (SIDF), Agriculture Development Fund (ADF), Islamic Development Bank (IsDB), Social Development Bank (SDB), Real Estate Development Fund (REDF), Saudi Fund for Development (SFD), Human Resources Development Fund (HRDF), Cultural Development Fund, Events Investment Fund, Saudi Exim Bank, Tourism Development Fund (TDF), Small & Medium Enterprise Bank (SME Bank), and National Infrastructure Fund.",
  },
  {
    question:
      "What factors should I consider when choosing a real estate company?",
    answer:
      "Consider industry experience, market research expertise, financial analysis capabilities, and project evaluation strength. Look for feasibility assessments that provide customized solutions, actionable recommendations, and strong client testimonials.",
  },
  {
    question:
      "How do I get started with a real estate from Platform01 Consulting?",
    answer:
      "Get in touch through our Contact Page, and we will schedule a scoping call to understand your project objectives, timeline, and deliverables. Our real estate consulting services ensure you receive tailored, investment-grade insights aligned with your specific needs.",
  },
  {
    question:
      "Why is Platform01 Consulting the best real estate firm in Saudi Arabia?",
    answer: (
      <span>
        <p>
          Platform01 Consulting Group is a leading independent real estate
          firm in Saudi Arabia. Our role is to present a project's true
          fundamentals accurately, objectively, and to the standard
          institutional reviewers expect. Here's what sets us apart:
        </p>
        <ul>
          <li>
            - Locally licensed, on-ground in Riyadh: We operate as Platform01
            Consulting Arabia, a licensed management consulting entity,
            combining global financial standards with a real-time local
            presence.
            <br />
          </li>
          <li>
            - Elite academic pedigree: Core leadership is qualified at the
            world's top five business schools, including London Business School
            and Columbia Business School, with team members from McGill
            University and Oxford Brookes University.
            <br />
          </li>
          <li>
            - Premier global credentials and qualifications: Our consulting team
            hold the field's leading professional designations: CFA, FRM, CIPM,
            FMVA, and ACCA.
            <br />
          </li>
          <li>
            - Hands-on institutional experience: Built on careers at Fortune 500
            industrial leaders like General Electric and Baker Hughes, global
            financial institutions including British International Investment
            and Molten Ventures, and tier-1 advisory firms such as KPMG and BDO.
            <br />
          </li>
          <li>
            - Award-winning work: Recognized at the Consultancy Middle East
            Awards 2025 with Gold in Corporate Finance and Gold in Industrial,
            plus Silver in Management Consulting, Strategy, Healthcare, and Real
            Estate.
            <br />
          </li>
          <li>
            - Trusted by Global institutions: This blend of pedigree,
            independence, and recognition is precisely what SIDF, ADF, TDF, REDF
            and other development finance institutions and commercial banks look
            for.
            <br />
          </li>
          <li>
            - An unblemished track record: Studies compiled by Platform01
            maintain a record of zero rejections based on study quality or
            analytical integrity globally.
            <br />
            <br />
          </li>
        </ul>
        <p>
          A viable project, documented to this standard, speaks for itself, and
          that is the difference Platform01 delivers.
        </p>
      </span>
    ),
  },
];

const servicesData = [
  {
    title: "Practitioner-Driven Insights",
    description: (
      <span>
        Our team brings real-world investment, development advisory, and
        transaction experience to every engagement.
      </span>
    ),
  },
  {
    title: "Bespoke, Unbiased Advice",
    description: (
      <span>
        We are not brokers or agents. Our sole commitment is to your success.
      </span>
    ),
  },
  {
    title: "Market Expertise",
    description: (
      <span>
        Deep understanding of the UAE and Saudi Arabia's regulatory, cultural,
        and market landscapes.
      </span>
    ),
  },
  {
    title: "Data-Driven Rigor",
    description: (
      <span>
        We combine high-quality primary research with advanced financial
        modeling and scenario planning.
      </span>
    ),
  },
];

const FeasibilityStudySceondary = async () => {
  // Fetch credentials with the relevant service tag
  const { data: credentials, error } = await credentialsService.getCredentials({
    industry_tags: ["Real Estate"],
    is_active: true,
  });

  // Map to CredentialSlide
  const slides = credentials.map((c: Credential) => ({
    type: "industry",
    category: "Real Estate",
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
            name: "Real Estate Consulting Services Saudi Arabia",
            description:
              "Real estate advisory services in Saudi Arabia including real estate, highest and best use studies, and investment advisory for developers and investors.",
            url: "https://www.platform01consulting.com/real-estate-consulting-ksa",
            provider: {
              "@type": "Organization",
              name: "Platform01 Consulting",
              award: [
                "Top Consulting Firm ConsultancyME 2025",
                "Top Strategist GCC 2026",
                "Top M&A Advisory Boutique 2025",
              ],
            },
            areaServed: "Saudi Arabia",
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
                name: "Real Estate Consulting Saudi Arabia",
                item: "https://www.platform01consulting.com/real-estate-consulting-ksa",
              },
            ],
          }),
        }}
      />
      {teamData.team.map((member) => (
        <script
          key={member.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: member.name,
              jobTitle: member.text1,
              image: `https://www.platform01consulting.com${member.image.src}`,
              worksFor: {
                "@type": "Organization",
                name: "Platform01 Consulting",
              },
            }),
          }}
        />
      ))}
      {corporateTeamData.team.map((member) => (
        <script
          key={member.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: member.name,
              jobTitle: member.text1,
              image: `https://www.platform01consulting.com${member.image.src}`,
              worksFor: {
                "@type": "Organization",
                name: "Platform01 Consulting",
              },
            }),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a real estate, and why is it critical for large-scale projects?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A real estate assesses the commercial and financial viability of a proposed project, mitigating risk and enabling confident decision-making by stakeholders.",
                },
              },
              {
                "@type": "Question",
                name: "What types of real estate does Platform01 Consulting provide in Saudi Arabia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer integrated real estate for industrial projects, infrastructure, healthcare, education, energy, and real estate, grounded in market realism and financial rigor.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Platform01 different from generic real estate consultants?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our studies are led by senior practitioners with real-world investment and operations experience, emphasizing commercial logic over academic templates.",
                },
              },
              {
                "@type": "Question",
                name: "What does a typical real estate from Platform01 Consulting include?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Market and demand analysis, competitive landscape and pricing intelligence, technical feasibility, financial modelling and project IRR/NPV, sensitivity and risk analysis, business model and commercialization strategy, regulatory framework insights, and exit scenarios.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer Arabic-language real estate for submission?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we deliver bilingual feasibility reports in English and Arabic to comply with local Saudi Arabia requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer real estate for industrial projects (manufacturing, logistics)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we conduct technical and market feasibility for factories, warehouses, logistics hubs, and industrial clusters aligned with Vision 2030 and the National Industrial Strategy.",
                },
              },
              {
                "@type": "Question",
                name: "Can you support PPP and infrastructure real estate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we help evaluate bankability, risk-sharing, and returns for public-private partnership infrastructure projects such as airports, utilities, and social infrastructure.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to complete a real estate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A standard real estate can take between 6 to 8 weeks depending on project complexity, site access, and input availability.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer tailored scopes for early-stage or greenfield projects?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we create modular scopes ranging from concept validation to full investment-grade real estate.",
                },
              },
              {
                "@type": "Question",
                name: "Can you help revise or validate an existing real estate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we can review, validate, or enhance an existing real estate with updated market data, sharper commercial logic, and improved financial modeling.",
                },
              },
              {
                "@type": "Question",
                name: "Can a real estate determine the potential profitability of my business idea?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, a financial real estate includes a financial model in Excel covering income statement, balance sheet, and cash flow projections based on project and market fundamentals.",
                },
              },
              {
                "@type": "Question",
                name: "What are some of the development financial institutions in Saudi Arabia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Key institutions include Saudi Industrial Development Fund, Agriculture Development Fund, Islamic Development Bank, Social Development Bank, Real Estate Development Fund, and Saudi Fund for Development.",
                },
              },
              {
                "@type": "Question",
                name: "What factors should I consider when choosing a real estate company?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Consider industry experience, market research expertise, financial analysis capabilities, and project evaluation strength, along with customized solutions and strong client testimonials.",
                },
              },
              {
                "@type": "Question",
                name: "How do I get started with a real estate from Platform01 Consulting?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Get in touch through our contact page and we will schedule a scoping call to understand your project objectives, timeline, and deliverables.",
                },
              },
              {
                "@type": "Question",
                name: "Why is Platform01 Consulting the best real estate firm in Saudi Arabia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Platform01 is locally licensed in Riyadh, led by graduates of top global business schools, holds leading professional designations including CFA, FRM, and FMVA, and has a track record of zero rejections based on study quality, recognized with multiple awards at the Consultancy Middle East Awards 2025.",
                },
              },
            ],
          }),
        }}
      />
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
      <section className="bg-surface">
        <div className="container pt-5 pb-20">
          <Header text="Real Estate" className="mb-26" />
          <h2 className="heading-4 max-w-[1010px]">
            At Platform01 Consulting, we partner with investors, developers,
            corporations, and landowners to deliver strategic real estate
            consulting services tailored to today's dynamic markets in the Saudi
            Arabia. Whether you are assessing a new development, repositioning
            an existing asset, or seeking transaction advisory opportunities in
            the sector, our practitioner-led team helps you make condent,
            data-driven decisions.
          </h2>
          {/* <h2 className="heading-4 max-w-[1010px]">
          Our Feasibility Study Expert service has been designed for clients
          looking for Premium and Bespoke Consulting services delivered through
          our unique "Practitioner-Driven" approach that brings deep Industry
          Expertise with Financial Acumen to deliver High-Quality strategic
          insights. Through our feasibility study consulting services in Saudi
          Arabia, we deliver investment-grade insights that align with Vision
          2030 and institutional financing requirements.
        </h2> */}

          {/* <div className="flex flex-col gap-0 mt-12 mb-16">
            {checklistItems.map((item, index) => (
              <ChecklistItem
                key={index}
                text={item}
                className="last:border-b-0 border-b border-dark/10 py-6"
              />
            ))}
          </div> */}
        </div>
      </section>
      {/* <TeamText>
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
            and Avoid Costly Mistakes. Engaging a trusted feasibility study
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
      </TeamText> */}
      <TeamTab
        corporateTeamData={corporateTeamData}
        consultingTeamData={teamData}
      />
      {/* <TeamShowcase
        headingFullWidth={true}
        title="Our Feasibility Study Firm Consulting Team"
        heading={teamData.heading}
        supportingText={teamData.supportingText}
        FourColumn={true}
      >
        {teamData.team.map((item, index) =>
          item ? <TeamCard key={item.id || index} member={item} /> : null,
        )}
      </TeamShowcase> */}
      <Credentials
        showCalendly={false}
        slides={slides}
        bgSurface={true}
        disableTabs={true}
        heading={"Decades of experience. Billions in advisory value."}
        supportingText={
          "We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision as a Real Estate Professional."
        }
        calendlyMobileView={false}
      />

      <ServicesSection
        fullWidth={true}
        showCTA={false}
        services={servicesData}
        heading="At Platform01 Consulting, We differentiate ourselves with"
        // supportingText='We understand that every project is Unique. There&apos;s NO "One-Size-Fits-All" approach to real estate. We tailor the scope of each study to your Specific Needs, Vision, Scale, and Target Audience, ensuring Optimal Value and Efficient Resource Allocation when you Conduct a Feasibility Study.'
      />

      {/* <DynamicInsightsSlider bgSurface={true} /> */}
      <CallToAction
        heading="Let's Talk"
        description="We'd love to hear about your project. Whether you're aiming to do a greenfield project, or expand with a brownfield project, our team is here to guide you with Bankable Real Estate expertise."
      />
      <FAQSection
        leftAligned={true}
        calendlyButtonVisibility={false}
        faqs={faqData}
        showCTA={false}
      />
    </>
  );
};

export default FeasibilityStudySceondary;
