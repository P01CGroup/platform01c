export type NavItemData = {
  label: string;
  href: string;
  children?: NavItemData[];
  isMegaMenu?: boolean; // Flag to indicate if this item should trigger a mega menu
};

export type MegaMenuColumn = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type MegaMenuData = {
  label: string;
  href: string;
  isMegaMenu: true;
  children: MegaMenuColumn[];
};

export const navigationData: (NavItemData | MegaMenuData)[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Firm", href: "/" },
      { label: "The Consulting Team", href: "/consulting-team" },
      { label: "The Corporate Team", href: "/corporate-team" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    isMegaMenu: true,
    children: [
      {
        title: "Strategy Consulting",
        links: [
          { label: "Feasibility Study", href: "/feasibility-study" },
          { label: "Business Plan", href: "/best-business-plan-consultants" },
          {
            label: "Growth Strategy",
            href: "/hire-growth-strategy-consultants",
          },
          { label: "Brand Strategy", href: "/brand-strategy" },
          { label: "Real Estate Strategy", href: "/real-estate-consulting" },
          { label: "Market Research", href: "/market-research" },
        ],
      },
      {
        title: "Corporate Finance Consulting",
        links: [
          { label: "Business Valuation", href: "/business-valuation-services" },
          {
            label: "Transaction Support",
            href: "/transactions-advisory-services",
          },
          { label: "M&A Consulting", href: "/ma-advisory" },
          {
            label: "Financial Modelling",
            href: "/financial-modelling-and-analysis",
          },
        ],
      },
      {
        title: "Private Capital Consulting",
        links: [
          {
            label: "Commercial Due Diligence",
            href: "/commercial-due-diligence-services",
          },
          {
            label: "Portfolio Valuation",
            href: "/portfolio-valuation-services",
          },
          {
            label: "Value Creation",
            href: "/value-creation-strategy-services",
          },
        ],
      },
      {
        title: "Turnaround & Restructuring",
        links: [
          { label: "Turnaround Advisory", href: "/turnaround-advisory" },
          {
            label: "Restructuring Consulting",
            href: "/restructuring-consulting",
          },
        ],
      },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Credentials",
    href: "/credentials",
  },
];
