import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,

  // Optimize bundle
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "swiper"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async redirects() {
    return [
      {
        source: "/credentials-by-industry-type",
        destination: "/credentials",
        permanent: true,
      },
      {
        source: "/credentials-by-project-type",
        destination: "/credentials",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ovais-2",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/mustafa",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/shafi-akhund",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/ali-shah",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/shwetabh",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/saad",
        destination: "/consulting-team",
        permanent: true,
      },
      {
        source: "/omar-abedin",
        destination: "/corporate-team",
        permanent: true,
      },
      // Insights redirects
      {
        source: "/corporate-turnaround-story-advanced-micro-devices-amd",
        destination:
          "/insights/corporate-turnaround-story-advanced-micro-devices-amd",
        permanent: true,
      },
      {
        source:
          "/lego-one-of-the-greatest-turnaround-stories-in-corporate-history",
        destination:
          "/insights/lego-one-of-the-greatest-turnaround-stories-in-corporate-history",
        permanent: true,
      },
      {
        source: "/approach-to-turnaround-industrial-businesses",
        destination: "/insights/approach-to-turnaround-industrial-businesses",
        permanent: true,
      },
      {
        source: "/corporate-turnaround-story-delta-airlines",
        destination: "/insights/corporate-turnaround-story-delta-airlines",
        permanent: true,
      },
      {
        source: "/business-valuation-of-a-distressed-business",
        destination: "/insights/business-valuation-of-a-distressed-business",
        permanent: true,
      },
      {
        source: "/strategic-planning-in-recession",
        destination: "/insights/strategic-planning-in-recession",
        permanent: true,
      },
      {
        source: "/corporate-turnaround-stories-ford-motor-company-2006-2010",
        destination:
          "/insights/corporate-turnaround-stories-ford-motor-company-2006-2010",
        permanent: true,
      },
      {
        source: "/platform01-consulting-2024-a-remarkable-year-in-review",
        destination:
          "/insights/platform01-consulting-2024-a-remarkable-year-in-review",
        permanent: true,
      },
      {
        source: "/building-the-brand-funneltm-the-p10c-way",
        destination: "/insights/building-the-brand-funneltm-the-p10c-way",
        permanent: true,
      },
      {
        source:
          "/mastering-customer-insights-turning-data-into-actionable-business-strategies",
        destination:
          "/insights/mastering-customer-insights-turning-data-into-actionable-business-strategies",
        permanent: true,
      },
      {
        source: "/framework-to-maximize-the-exit-potential",
        destination: "/insights/framework-to-maximize-the-exit-potential",
        permanent: true,
      },
      {
        source: "/finding-and-pitching-to-potential-investors",
        destination: "/insights/finding-and-pitching-to-potential-investors",
        permanent: true,
      },
      {
        source:
          "/the-importance-of-liquidation-preference-as-a-startup-founder",
        destination:
          "/insights/the-importance-of-liquidation-preference-as-a-startup-founder",
        permanent: true,
      },
      {
        source:
          "/mastering-communication-design-in-the-gcc-strategies-for-cultural-impact-and-market-success",
        destination:
          "/insights/mastering-communication-design-in-the-gcc-strategies-for-cultural-impact-and-market-success",
        permanent: true,
      },
      {
        source:
          "/brand-equity-how-to-measure-and-strengthen-the-value-of-your-brand",
        destination:
          "/insights/brand-equity-how-to-measure-and-strengthen-the-value-of-your-brand",
        permanent: true,
      },
      {
        source:
          "/reputation-management-for-ceos-and-boards-building-and-protecting-your-brand-2",
        destination:
          "/insights/reputation-management-for-ceos-and-boards-building-and-protecting-your-brand-2",
        permanent: true,
      },
      {
        source: "/blue-ocean-strategy",
        destination: "/insights/blue-ocean-strategy",
        permanent: true,
      },
      {
        source: "/what-vcs-look-for-in-startups",
        destination: "/insights/what-vcs-look-for-in-startups",
        permanent: true,
      },
      {
        source: "/the-impact-of-renewables-on-the-grid",
        destination: "/insights/the-impact-of-renewables-on-the-grid",
        permanent: true,
      },
      {
        source:
          "/navigating-crisis-communication-protecting-your-brand-in-challenging-times",
        destination:
          "/insights/navigating-crisis-communication-protecting-your-brand-in-challenging-times",
        permanent: true,
      },
      {
        source:
          "/optimizing-your-marketing-processes-for-maximum-efficiency-and-impact",
        destination:
          "/insights/optimizing-your-marketing-processes-for-maximum-efficiency-and-impact",
        permanent: true,
      },
      {
        source:
          "/the-role-of-cultural-insights-in-building-authentic-brand-communications",
        destination:
          "/insights/the-role-of-cultural-insights-in-building-authentic-brand-communications",
        permanent: true,
      },
      {
        source:
          "/navigating-the-logistics-landscape-understanding-the-sub-sectors",
        destination:
          "/insights/navigating-the-logistics-landscape-understanding-the-sub-sectors",
        permanent: true,
      },
      {
        source:
          "/building-loyalty-programs-that-drive-long-term-customer-engagement-your-brand",
        destination:
          "/insights/building-loyalty-programs-that-drive-long-term-customer-engagement-your-brand",
        permanent: true,
      },
      {
        source:
          "/the-art-of-brand-positioning-carving-your-unique-market-space",
        destination:
          "/insights/the-art-of-brand-positioning-carving-your-unique-market-space",
        permanent: true,
      },
      {
        source: "/building-a-strong-brand-identity-how-to-stand-out-in-the-gcc",
        destination:
          "/insights/building-a-strong-brand-identity-how-to-stand-out-in-the-gcc",
        permanent: true,
      },
      {
        source: "/role-of-lng-in-energy-transition",
        destination: "/insights/role-of-lng-in-energy-transition",
        permanent: true,
      },
      {
        source: "/the-crucial-role-of-commercial-integration-in-ma-success",
        destination:
          "/insights/the-crucial-role-of-commercial-integration-in-ma-success",
        permanent: true,
      },
      {
        source: "/private-equity-investment-strategies",
        destination: "/insights/private-equity-investment-strategies",
        permanent: true,
      },
      {
        source:
          "/the-power-of-storytelling-in-creating-emotional-connections-with-consumers",
        destination:
          "/insights/the-power-of-storytelling-in-creating-emotional-connections-with-consumers",
        permanent: true,
      },
      {
        source:
          "/portfolio-valuations-why-it-matters-for-private-capital-investors",
        destination:
          "/insights/portfolio-valuations-why-it-matters-for-private-capital-investors",
        permanent: true,
      },
      {
        source: "/leveraging-consumer-insights-to-drive-product-innovation",
        destination:
          "/insights/leveraging-consumer-insights-to-drive-product-innovation",
        permanent: true,
      },
      {
        source:
          "/using-customer-personas-to-drive-marketing-strategy-and-brand-success",
        destination:
          "/insights/using-customer-personas-to-drive-marketing-strategy-and-brand-success",
        permanent: true,
      },
      {
        source:
          "/developing-a-winning-marketing-strategy-from-concept-to-execution",
        destination:
          "/insights/developing-a-winning-marketing-strategy-from-concept-to-execution",
        permanent: true,
      },
      {
        source: "/strategic-buyouts-in-ma",
        destination: "/insights/strategic-buyouts-in-ma",
        permanent: true,
      },
      {
        source:
          "/solar-panel-manufacturing-materials-technology-and-sustainability",
        destination:
          "/insights/solar-panel-manufacturing-materials-technology-and-sustainability",
        permanent: true,
      },
      {
        source: "/valuing-early-stage-startups-venture-capital-approach",
        destination:
          "/insights/valuing-early-stage-startups-venture-capital-approach",
        permanent: true,
      },
      {
        source:
          "/designing-communication-campaigns-that-resonate-with-gcc-audiences",
        destination:
          "/insights/designing-communication-campaigns-that-resonate-with-gcc-audiences",
        permanent: true,
      },
      {
        source: "/corporate-success-stories-netflix",
        destination: "/insights/corporate-success-stories-netflix",
        permanent: true,
      },
      {
        source:
          "/the-growth-conundrum-in-manufacturing-challenges-and-strategic-solutions",
        destination:
          "/insights/the-growth-conundrum-in-manufacturing-challenges-and-strategic-solutions",
        permanent: true,
      },
      {
        source:
          "/revisiting-the-lbo-strategy-why-now-may-be-the-ideal-time-for-strategic-investors",
        destination:
          "/insights/revisiting-the-lbo-strategy-why-now-may-be-the-ideal-time-for-strategic-investors",
        permanent: true,
      },
      {
        source: "/strategy-consulting/feasibility-study-ksa",
        destination: "/feasibility-study",
        permanent: true,
      },
      {
        source: "/strategy-consulting/hire-growth-strategy-consultants",
        destination: "/hire-growth-strategy-consultants",
        permanent: true,
      },
      {
        source: "/strategy-consulting/best-business-plan-consultants",
        destination: "/best-business-plan-consultants",
        permanent: true,
      },
      {
        source:
          "/our-services/financial-consulting/ma-advisory-consulting-services",
        destination: "/ma-consulting-services",
        permanent: true,
      },
      {
        source: "/feasibility-study-consultants",
        destination: "/feasibility-study",
        permanent: true,
      },
      {
        source:
          "/portfolio/feasibility-study-and-business-strategy-for-a-speciality-clinic-and-rehabilitation-center",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/portfolio/feasibility-study-for-manufacturing-of-paper-cups-for-fb-industry",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/portfolio/feasibility-study-and-business-strategy-for-a-niche-market-care-center ",
        destination: "/",
        permanent: true,
      },
    ];
  },
  /* config options here */
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "vsqfvsosprmjdktwilrj.supabase.co",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "platform01consulting.com",
    //   },
    // ],
    // Optimize image delivery
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, immutable",
          },
          // {
          //   key: 'Cache-Control',
          //   value: 'public, max-age=31536000, immutable',
          // },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, immutable",
          },
          // {
          //   key: 'Cache-Control',
          //   value: 'public, max-age=31536000, immutable',
          // },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, immutable",
          },
          // {
          //   key: 'Cache-Control',
          //   value: 'public, max-age=31536000, immutable',
          // },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
