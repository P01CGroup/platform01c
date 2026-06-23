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
    title: " Business Valuation Services in UAE | Platform01 Consulting",
    description:
      "Platform01 provides bespoke business valuation services in UAE, covering standard, distressed, startup & portfolio valuations. CFA-qualified team. Institutional-grade reports. Book a consultation today.",
    keywords:
      "business valuation services in uae, business valuation in dubai, business valuation Dubai, business valuation uae",
    canonical_url:
      "https://www.platform01consulting.com/business-valuation-services-uae",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/business-valuation-services-uae")
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url,
    },
  };
}

const BusinessValuationData: ServiceHeroData = {
  subheading: "Trusted Business Valuation Services in UAE",
  heading: "Bespoke. Accurate. <br/> Reliable.",
  smallHeading: "Business Valuation Services in Dubai and UAE",
  backgroundImages: {
    mobile: "/services/mobile/business-valuation.png",
    tablet: "/services/tablet/business-valuation.png",
    desktop: "/services/desktop/business-valuation.png",
    ultrawide: "/services/ultrawide/business-valuation.png",
  },
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

const teamData = {
  heading: "Accredited and Qualified Business Valuation Team in Dubai",
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

  const faqData: FAQItem[] = [
    {
      question: "What is a business valuation?",
      answer: (
        <span>
          A business valuation is a structured assessment of a company's
          economic worth, expressed as a defensible fair-market value for a
          specific purpose. It combines historical financial analysis, market
          data, and forward-looking projections to determine what a business, or
          a stake in it, is actually worth. A professional valuation delivers
          more than a single number: it documents the methods, assumptions, and
          risks behind the figure so the result can withstand scrutiny from
          buyers, investors, auditors, and courts.
        </span>
      ),
    },
    {
      question:
        "When does a business in the UAE need a professional valuation?",
      answer: (
        <span>
          You need a professional valuation whenever a high-stakes decision
          depends on an accurate company value. Common triggers in the UAE
          include:
          <ul className="list-disc pl-6 mt-2">
            <li>
              Mergers and acquisitions (buying, selling, or merging a business)
            </li>
            <li>Raising capital and investor negotiations</li>
            <li>Shareholder buy-ins or exits</li>
            <li>Succession and estate planning</li>
            <li>Litigation and shareholder disputes</li>
            <li>Financial reporting and impairment testing under IFRS</li>
            <li>Employee share or incentive schemes (ESOPs)</li>
          </ul>
          In each of these, an inaccurate number carries real financial and
          legal consequences, which is why an independent, expert valuation
          matters.
        </span>
      ),
    },
    {
      question: "What valuation methods do you use?",
      answer: (
        <span>
          We apply the three core valuation approaches, income, market, and
          asset-based, and select the right combination for your situation. In
          practice this means discounted cash flow (DCF) analysis, market
          multiples such as EV/EBITDA, and comparable transaction analysis, all
          supported by scenario modelling and sensitivity testing. Using more
          than one method lets us triangulate a defensible value and stress-test
          it against different assumptions, rather than relying on a single
          formula.
        </span>
      ),
    },
    {
      question: "How much does a business valuation cost in the UAE?",
      answer: (
        <span>
          The fee depends on the purpose of the valuation, the complexity of the
          business, the data available, and the depth of analysis required; a
          multi-entity, cross-border valuation for an M&A transaction demands
          far more work than a single-entity review. Platform01 is a premium,
          hands-on firm rather than a low-cost or automated provider, so every
          engagement is scoped and priced bespoke to the work involved. Share
          your objective with us and we will provide a tailored proposal.
        </span>
      ),
    },
    {
      question: "How long does a business valuation take?",
      answer: (
        <span>
          Most business valuations take roughly three to four weeks from the
          point we receive complete information, though timelines vary with the
          complexity and scope of the engagement and how quickly data is
          provided. Transaction-driven mandates with tight deadlines can often
          be expedited. We agree the timeline upfront so it aligns with your
          deal, fundraising round, or reporting deadline.
        </span>
      ),
    },
    {
      question:
        "What is the difference between an online or automated valuation and a professional valuation?",
      answer: (
        <span>
          An automated or online valuation applies a generic formula to a
          handful of inputs and produces an instant, unsupported estimate —
          useful only for rough curiosity. A professional valuation is built by
          qualified analysts who examine your actual financials, industry
          dynamics, and risk profile, apply multiple methodologies, and document
          defensible assumptions. For M&A, investment, audit, or disputes, only
          a rigorous, expert-led valuation will hold up under due diligence from
          counterparties, investors, auditors, or courts. Platform01
          deliberately works beyond off-the-shelf, automated assessments.
        </span>
      ),
    },
    {
      question:
        "What documents and information do you need to value my business?",
      answer: (
        <span>
          We typically need historical financial statements (usually three to
          five years), recent management accounts, financial projections or a
          business plan, a breakdown of assets and liabilities, the
          capitalisation table and shareholding structure, and context on the
          business model, customers, and market position. Specialized valuations
          — such as impairment testing or brand valuation — may require
          additional data. All information is handled under strict
          confidentiality.
        </span>
      ),
    },
    {
      question: "What types of business valuation services do you offer?",
      answer: (
        <span>
          We provide a full range of valuation services, including standard
          business valuations, distressed business valuations, investor
          portfolio valuations, brand valuations, startup and early-stage
          valuations, impairment testing, and other specialized valuations. Each
          is scoped to its specific purpose — a valuation prepared for a
          fundraising round is structured differently from one prepared for
          impairment testing or a shareholder dispute.
        </span>
      ),
    },
    {
      question:
        "How do you value a startup or early-stage company with limited financial history?",
      answer: (
        <span>
          For startups and early-stage companies we rely on forward-looking
          methods rather than historical earnings. This includes
          projection-based DCF analysis, comparable company and transaction
          multiples, and venture-stage valuation frameworks where relevant,
          combined with rigorous scrutiny of the business model, addressable
          market, and growth assumptions. The objective is a credible,
          investor-ready valuation that holds up in negotiations with venture
          capital and strategic investors.
        </span>
      ),
    },
    {
      question:
        "Are your valuations accepted for M&A, fundraising, audit, and disputes?",
      answer: (
        <span>
          Yes. Our reports are built to institutional standards and are used for
          M&A transactions, fundraising and investor negotiations, financial
          reporting and impairment testing, shareholder and litigation matters,
          and strategic decision-making. Each report clearly documents the
          methodology, assumptions, and sensitivities, so it can withstand due
          diligence from counterparties, investors, auditors, and legal
          advisors.
        </span>
      ),
    },
    {
      question:
        "Do you provide valuations for impairment testing and IFRS financial reporting?",
      answer: (
        <span>
          Yes. We perform impairment testing and fair-value assessments aligned
          with IFRS requirements, including value-in-use and
          fair-value-less-costs-of-disposal analyses. These engagements are
          designed to support your auditors and meet your financial reporting
          obligations with clear, well-documented, and defensible evidence.
        </span>
      ),
    },
    {
      question: "How do you ensure accuracy and objectivity in a valuation?",
      answer: (
        <span>
          Accuracy comes from rigorous analysis, multiple cross-checking
          methodologies, and scenario and sensitivity testing rather than
          reliance on a single assumption. Objectivity comes from an
          independent, practitioner-led process in which our analysts examine
          the evidence, challenge management's assumptions, and document
          everything transparently. We work closely on every valuation rather
          than outsourcing it to a template or a junior-only team, which is what
          allows us to stand behind each number we deliver.
        </span>
      ),
    },
    {
      question:
        "Can you value businesses across all seven emirates of the UAE?",
      answer: (
        <span>
          Yes. We serve clients across all seven emirates — Dubai, Abu Dhabi,
          Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain — as well
          as cross-border and GCC-wide engagements, working from our offices in
          Dubai and Riyadh. Our team pairs local market knowledge of each
          emirate's industries and free zones with international valuation
          experience, which is essential for businesses operating regionally and
          globally.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Dubai?",
      answer: (
        <span>
          Yes, Dubai is our home market, with our office in Dubai Digital Park,
          Silicon Oasis. We value businesses across Dubai's core sectors,
          including trade and logistics, real estate, technology and fintech,
          hospitality, and professional services, and we work with companies in
          mainland Dubai and across its free zones such as DIFC, DMCC, and
          JAFZA. Whether the valuation supports an M&A deal, a DIFC-based
          investment, or a fundraising round, we tailor the analysis to Dubai's
          specific market dynamics.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Abu Dhabi?",
      answer: (
        <span>
          Yes, we serve clients across Abu Dhabi, the UAE's capital and largest
          economy by GDP. Abu Dhabi's business landscape is anchored in energy,
          industrials, infrastructure, sovereign and institutional investment,
          healthcare, and a fast-growing technology sector, with many entities
          operating from the ADGM financial free zone. We value businesses,
          investments, and portfolios for corporates, government-linked
          entities, and institutional investors, applying the rigour these
          high-stakes mandates demand.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Sharjah?",
      answer: (
        <span>
          Yes, we value businesses across Sharjah, a major industrial and SME
          hub with strong manufacturing, education, logistics, and
          family-business sectors, alongside free zones such as SAIF Zone and
          Hamriyah. Sharjah has a high concentration of established family-owned
          enterprises, where valuations frequently support succession planning,
          shareholder restructuring, and partial exits — situations in which an
          independent, defensible valuation is essential.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Ajman?",
      answer: (
        <span>
          Yes, we serve businesses in Ajman, home to a dense base of SMEs, light
          manufacturing, and trading companies, many operating from Ajman Free
          Zone. Owners here often need valuations for a sale, investor entry, or
          financing, and benefit from a professional, hands-on valuation rather
          than an automated estimate when the outcome carries real financial
          weight.
        </span>
      ),
    },
    {
      question:
        "Do you provide business valuation services in Ras Al Khaimah (RAK)?",
      answer: (
        <span>
          Yes, we value businesses across Ras Al Khaimah, an emirate strong in
          manufacturing (including ceramics and building materials),
          industrials, tourism, and holding structures. RAK is also a major hub
          for international and offshore companies through RAK ICC and the RAKEZ
          free zone, so we frequently handle valuations of holding companies,
          group entities, and cross-border structures registered there.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Fujairah?",
      answer: (
        <span>
          Yes, we serve clients in Fujairah, the UAE's east-coast emirate and
          one of the world's largest bunkering and oil-storage hubs, anchored by
          the Port of Fujairah. Its economy spans shipping and maritime
          services, logistics, oil storage and trading, and quarrying. We value
          businesses and assets tied to these sectors, applying methods suited
          to capital-intensive and trading-led operations.
        </span>
      ),
    },
    {
      question: "Do you provide business valuation services in Umm Al Quwain?",
      answer: (
        <span>
          Yes, we value businesses in Umm Al Quwain, a growing base for SMEs,
          manufacturing, fisheries, and tourism, with many companies established
          through the UAQ Free Trade Zone. Whatever the size of the business, we
          bring the same institutional-grade, hands-on approach to every
          valuation, scoped precisely to its purpose.
        </span>
      ),
    },
    {
      question:
        "Why is Platform01 Consulting the best firm for business valuations in the UAE?",
      answer: (
        <span>
          Platform01 Consulting is the firm of choice for clients who need
          valuations that hold up under the highest scrutiny.
          <ul className="list-disc pl-6 mt-2">
            <li>
              Locally licensed, on-ground in Dubai and UAE: We operate as a
              licensed management and investment consulting entity, combining
              global financial standards with a real-time local presence.
            </li>
            <li>
              Elite academic pedigree: Core leadership is qualified at the
              world's top five business schools, including London Business
              School and Columbia Business School, with team members from McGill
              University and Oxford Brookes University.
            </li>
            <li>
              Premier global credentials and qualifications: Our consulting team
              hold the field's leading professional designations: CFA, FRM,
              CIPM, FMVA, and ACCA.
            </li>
            <li>
              Hands-on institutional experience: Built on careers at Fortune 500
              industrial leaders like General Electric and Baker Hughes, global
              financial institutions including British International Investment
              and Molten Ventures, and tier-1 advisory firms such as KPMG and
              BDO.
            </li>
            <li>
              Award-winning work: Recognized at the Consultancy Middle East
              Awards 2025 with Gold in Corporate Finance, Gold in M&A, and Gold
              in Industrial, plus Silver in Management Consulting, Strategy,
              Healthcare, and Real Estate.
            </li>
            <li>
              An unblemished track record: Studies compiled by Platform01
              maintain a record of zero rejections based on study quality or
              analytical integrity globally.
            </li>
          </ul>
          What truly sets us apart is our practitioner-driven, hands-on
          approach; we work closely on every valuation, applying multiple
          methodologies, scenario analysis, and sensitivity testing to deliver
          institutional-grade accuracy rather than off-the-shelf estimates. With
          250+ projects delivered and the trust of major institutional
          investors, corporates, and investment firms across the region,
          Platform01 is built for clients who treat a valuation as a decision
          that genuinely matters.
        </span>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Business Valuation Services UAE",
            description:
              "Bespoke business valuation services in UAE covering standard, distressed, startup and portfolio valuations. CFA-qualified team, institutional-grade reports.",
            url: "https://www.platform01consulting.com/business-valuation-services-uae",
            provider: {
              "@type": "Organization",
              name: "Platform01 Consulting",
              award: [
                "Top Consulting Firm ConsultancyME 2025",
                "Top Strategist GCC 2026",
                "Top M&A Advisory Boutique 2025",
              ],
            },
            areaServed: "United Arab Emirates",
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
                name: "Business Valuation Services UAE",
                item: "https://www.platform01consulting.com/business-valuation-services-uae",
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
              ...(member.text2 && { description: member.text2 }),
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
                name: "What is a business valuation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A business valuation is a structured assessment of a company's economic worth, expressed as a defensible fair-market value for a specific purpose, combining historical financial analysis, market data, and forward-looking projections.",
                },
              },
              {
                "@type": "Question",
                name: "When does a business in the UAE need a professional valuation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Common triggers include mergers and acquisitions, raising capital and investor negotiations, shareholder buy-ins or exits, succession and estate planning, litigation and shareholder disputes, financial reporting and impairment testing under IFRS, and employee share or incentive schemes.",
                },
              },
              {
                "@type": "Question",
                name: "What valuation methods do you use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We apply the three core valuation approaches, income, market, and asset-based, including discounted cash flow analysis, market multiples such as EV/EBITDA, and comparable transaction analysis, supported by scenario and sensitivity testing.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a business valuation cost in the UAE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The fee depends on the purpose of the valuation, business complexity, data availability, and depth of analysis required. Every engagement is scoped and priced bespoke to the work involved.",
                },
              },
              {
                "@type": "Question",
                name: "How long does a business valuation take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most business valuations take roughly three to four weeks from receipt of complete information, though timelines vary with complexity and scope. Transaction-driven mandates with tight deadlines can often be expedited.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between an online or automated valuation and a professional valuation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An automated valuation applies a generic formula to a few inputs for a rough estimate, while a professional valuation is built by qualified analysts examining actual financials, industry dynamics, and risk profile using multiple methodologies with documented, defensible assumptions.",
                },
              },
              {
                "@type": "Question",
                name: "What documents and information do you need to value my business?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We typically need three to five years of historical financial statements, recent management accounts, financial projections, a breakdown of assets and liabilities, the capitalisation table, and context on the business model and market position.",
                },
              },
              {
                "@type": "Question",
                name: "What types of business valuation services do you offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide standard business valuations, distressed business valuations, investor portfolio valuations, brand valuations, startup and early-stage valuations, impairment testing, and other specialized valuations.",
                },
              },
              {
                "@type": "Question",
                name: "How do you value a startup or early-stage company with limited financial history?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We rely on forward-looking methods including projection-based DCF analysis, comparable company and transaction multiples, and venture-stage valuation frameworks, combined with scrutiny of the business model and growth assumptions.",
                },
              },
              {
                "@type": "Question",
                name: "Are your valuations accepted for M&A, fundraising, audit, and disputes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our reports are built to institutional standards and used for M&A transactions, fundraising, financial reporting and impairment testing, shareholder and litigation matters, and strategic decision-making.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide valuations for impairment testing and IFRS financial reporting?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we perform impairment testing and fair-value assessments aligned with IFRS requirements, including value-in-use and fair-value-less-costs-of-disposal analyses.",
                },
              },
              {
                "@type": "Question",
                name: "How do you ensure accuracy and objectivity in a valuation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Accuracy comes from rigorous analysis, multiple cross-checking methodologies, and sensitivity testing. Objectivity comes from an independent, practitioner-led process where analysts challenge management's assumptions and document everything transparently.",
                },
              },
              {
                "@type": "Question",
                name: "Can you value businesses across all seven emirates of the UAE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we serve clients across all seven emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain, as well as cross-border and GCC-wide engagements from our offices in Dubai and Riyadh.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Dubai?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Dubai is our home market with our office in Dubai Digital Park, Silicon Oasis, serving sectors including trade and logistics, real estate, technology, fintech, and hospitality across mainland Dubai and free zones like DIFC, DMCC, and JAFZA.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Abu Dhabi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we serve clients across Abu Dhabi, valuing businesses in energy, industrials, infrastructure, healthcare, and technology, including entities operating from the ADGM financial free zone.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Sharjah?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we value businesses across Sharjah's manufacturing, education, logistics, and family-business sectors, frequently supporting succession planning and shareholder restructuring.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Ajman?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we serve businesses in Ajman across SMEs, light manufacturing, and trading companies, supporting valuations for sales, investor entry, or financing.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Ras Al Khaimah (RAK)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we value businesses across RAK's manufacturing, industrials, and tourism sectors, including holding companies and cross-border structures registered through RAK ICC and RAKEZ.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Fujairah?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we serve clients in Fujairah across shipping, maritime services, logistics, and oil storage and trading, applying methods suited to capital-intensive and trading-led operations.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide business valuation services in Umm Al Quwain?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we value businesses in Umm Al Quwain across SMEs, manufacturing, fisheries, and tourism, including companies established through the UAQ Free Trade Zone.",
                },
              },
              {
                "@type": "Question",
                name: "Why is Platform01 Consulting the best firm for business valuations in the UAE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Platform01 is a locally licensed firm with leadership from top global business schools, holding professional designations including CFA, FRM, CIPM, FMVA, and ACCA, with hands-on experience at Fortune 500 companies and tier-1 advisory firms, recognized with multiple Gold and Silver awards at the Consultancy Middle East Awards 2025, and a track record of zero rejections based on study quality.",
                },
              },
            ],
          }),
        }}
      />
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

      {/* <TeamText>
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
      </TeamText> */}

      <TeamShowcase
        headingFullWidth={true}
        FourColumn={true}
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
        showCalendly={false}
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
        fullWidth={true}
        showCTA={false}
        services={servicesData}
        bgSurface={false}
        heading="Our Business Valuation Services UAE"
        supportingText="We cater to various valuation needs, addressing the specific requirements of businesses, investors, and financial institutions:"
      />

      <OurValuesSlider
        calendlyButtonVisibility={false}
        values={valuesData.values}
        bgSurface={true}
        {...(valuesData.heading && { heading: valuesData.heading })}
        {...(valuesData.supportingText && {
          supportingText: valuesData.supportingText,
        })}
      />

      {/* <DynamicInsightsSlider /> */}
      <CallToAction />
      <FAQSection
        calendlyButtonVisibility={false}
        leftAligned={true}
        faqs={faqData}
        showCTA={false}
      />
    </>
  );
};

export default BusinessValuation;
