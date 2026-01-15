export const seoConfig: { [key: string]: { title: string; description: string; keywords: string } } = {
  default: {
    title: 'Platform01 Consulting | Your Platform for Strategic Success',
    description: 'Welcome to Platform01, your partner in business strategy and consulting.',
    keywords: 'business, consulting, strategy, platform01',
  },
  Home: {
    title: 'Platform01 Consulting | Your Platform for Strategic Success',
    description: 'Welcome to Platform01, your partner in business strategy and consulting.',
    keywords: 'business, consulting, strategy, platform01',
  },
  InsightsPage: {
    title: 'Insights | Platform01 Consulting',
    description: 'Explore the latest insights and thought leadership from Platform01.',
    keywords: 'insights, thought leadership, platform01',
  },
  CredentialsPage: {
    title: 'Credentials | Platform01 Consulting',
    description: 'Discover our credentials and expertise at Platform01.',
    keywords: 'credentials, expertise, platform01',
  },
  Components: {
    title: 'Components | Platform01 Consulting',
    description: 'Description for Components page.',
    keywords: 'platform01, Components',
  },
  ConsultingTeam: {
    title: 'Consulting Team | Platform01 Consulting',
    description: 'Description for Consulting Team page.',
    keywords: 'platform01, Consulting Team',
  },
  CorporateTeam: {
    title: 'Corporate Team | Platform01 Consulting',
    description: 'Description for Corporate Team page.',
    keywords: 'platform01, Corporate Team',
  },
  TermsOfUse: {
    title: 'Terms of Use | Platform01 Consulting',
    description: 'Description for Terms of Use page.',
    keywords: 'platform01, Terms of Use',
  },
  PrivacyPolicy: {
    title: 'Privacy Policy | Platform01 Consulting',
    description: 'Description for Privacy Policy page.',
    keywords: 'platform01, Privacy Policy',
  },
  ValueCreation: {
    title: 'Value Creation | Platform01 Consulting',
    description: 'Description for Value Creation page.',
    keywords: 'platform01, Value Creation',
  },
  MAConsulting: {
    title: 'M&A Consulting | Platform01 Consulting',
    description: 'Description for M&A Consulting page.',
    keywords: 'platform01, M&A Consulting',
  },
  DueDiligence: {
    title: 'Due Diligence | Platform01 Consulting',
    description: 'Description for Due Diligence page.',
    keywords: 'platform01, Due Diligence',
  },
  MarketResearch: {
    title: 'Market Research | Platform01 Consulting',
    description: 'Description for Market Research page.',
    keywords: 'platform01, Market Research',
  },
  BrandStrategy: {
    title: 'Brand Strategy | Platform01 Consulting',
    description: 'Description for Brand Strategy page.',
    keywords: 'platform01, Brand Strategy',
  },
  GrowthStrategy: {
    title: 'Growth Strategy | Platform01 Consulting',
    description: 'Description for Growth Strategy page.',
    keywords: 'platform01, Growth Strategy',
  },
  BusinessPlan: {
    title: 'Business Plan | Platform01 Consulting',
    description: 'Description for Business Plan page.',
    keywords: 'platform01, Business Plan',
  },
  FeasibilityStudy: {
    title: 'Feasibility Study | Platform01 Consulting',
    description: 'Description for Feasibility Study page.',
    keywords: 'platform01, Feasibility Study',
  },
  RealEstateStrategy: {
    title: 'Real Estate Strategy | Platform01 Consulting',
    description: 'Description for Real Estate Strategy page.',
    keywords: 'platform01, Real Estate Strategy',
  },
  BusinessValuation: {
    title: 'Business Valuation | Platform01 Consulting',
    description: 'Description for Business Valuation page.',
    keywords: 'platform01, Business Valuation',
  },
  TransactionSupport: {
    title: 'Transaction Support | Platform01 Consulting',
    description: 'Description for Transaction Support page.',
    keywords: 'platform01, Transaction Support',
  },
  PortfolioValuation: {
    title: 'Portfolio Valuation | Platform01 Consulting',
    description: 'Description for Portfolio Valuation page.',
    keywords: 'platform01, Portfolio Valuation',
  },
  RestructuringConsulting: {
    title: 'Restructuring Consulting | Platform01 Consulting',
    description: 'Description for Restructuring Consulting page.',
    keywords: 'platform01, Restructuring Consulting',
  },
  TurnaroundAdvisory: {
    title: 'Turnaround Advisory | Platform01 Consulting',
    description: 'Description for Turnaround Advisory page.',
    keywords: 'platform01, Turnaround Advisory',
  },
  // Add more page/component names as needed
};

export function getSeoMetadata(pageName: string) {
  const seo = seoConfig[pageName] || seoConfig['default'];
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
} 