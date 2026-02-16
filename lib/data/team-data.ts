export interface TeamMember {
  id: string;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  text1: string;
  text2?: string;
  background?: string;
  sectorsOfExpertise?: string;
  priorExperience?: string;
  education?: string;
  bioLink?: boolean;
  professionalQualifications?: string;
  recognition?: string;
}

// Centralized team data
export const teamMembers: Record<string, TeamMember> = {
  "mustafa-nadeem": {
    id: "mustafa-nadeem",
    name: "Mustafa Nadeem, CFA",
    image: {
      src: "/consulting-team/1.png",
      alt: "Mustafa Nadeem, CFA",
    },
    text1: "Managing Director",
    text2: "Consulting",

    background:
      "13+ years in Advisory, Private Equity, Strategy Consulting, Corporate Finance, and Equity Research",
    sectorsOfExpertise:
      "Industrials, Healthcare, Technology, Education, Food & Agriculture, Real Estate, Financial Services and Private Capital",
    priorExperience:
      "British International Investment Plc, ValuStrat Consulting, Elixir Securities, and HULT International",
    education:
      "Masters in Finance with Distinction from London Business School (ranked #1 program globally) and BBA Finance from Institute of Business Administration (AACSB accredited)",
    professionalQualifications:
      "Chartered Financial Analyst accredited by the CFA Institute, USA",
    recognition:
      "10+ Successful District Development Advisory Mandates across GCC",
  },
  "saad-jilani": {
    id: "saad-jilani",
    name: "Saad Jilani",
    image: {
      src: "/consulting-team/2.png",
      alt: "Saad Jilani",
    },
    text1: "Senior Practitioner and SME",
    text2: "Energy, Industrials, & Aviation",

    background:
      "13+ years in Corporate Finance, Investments, and Business Change Management",
    sectorsOfExpertise: "Energy & Industrials",
    priorExperience:
      "General Electric, Baker Hughes, and GE Healthcare (Fortune 500 companies)",
    education:
      "BBA Finance from Institute of Business Administration (AACSB accredited)",
    professionalQualifications: "NA",
  },
  "mohammad-ovais": {
    id: "mohammad-ovais",
    name: "Mohammad Ovais, CFA",
    image: {
      src: "/consulting-team/3.png",
      alt: "Mohammad Ovais, CFA",
    },
    text1: "Senior Practitioner and SME",
    text2: "Infrastructure & Healthcare",

    background: "13+ years in Corporate Finance and Investments",
    sectorsOfExpertise: "Healthcare, Power, Oil & Gas, Renewable Energy",
    priorExperience:
      "General Electric and GE Healthcare (Fortune 500 companies)",
    education:
      "BBA Finance from Institute of Business Administration (AACSB accredited)",
    professionalQualifications:
      "Chartered Financial Analyst accredited by the CFA Institute, USA",
  },
  "shwetabh-sameer": {
    id: "shwetabh-sameer",
    name: "Shwetabh Sameer, CFA",
    image: {
      src: "/consulting-team/4.png",
      alt: "Shwetabh Sameer, CFA",
    },
    text1: "Senior Practitioner and SME",
    text2: "Technology & Venture Capital",
    background:
      "12+ years in Venture Capital, Investments and Corporate Finance",
    sectorsOfExpertise:
      "Technology (Fintech, Data Science, AI, etc.) and Venture Capital",
    priorExperience:
      "Molten Ventures, Paua, Seedcamp, Octopus Ventures, and Speedinvest",
    education:
      "Masters in Finance with Distinction from London Business School (ranked #1 program globally); additional degrees in Data Science and Mechanical Engineering",
    professionalQualifications: "CFA, FRM, and CIPM Charterholder",
  },
  "shafi-akhund": {
    id: "shafi-akhund",
    name: "Shafi Akhund, FMVA",
    image: {
      src: "/consulting-team/5.png",
      alt: "Shafi Akhund, FMVA",
    },
    text1: "Senior Consultant",
    text2: "Strategy & Advisory",
    background:
      "13+ years in Investment Advisory, Business Management and Consulting",
    sectorsOfExpertise:
      "Real Estate, Healthcare, Industrials, and Food & Agriculture",
    priorExperience: "10+ years in Real Estate investment advisory",
    education:
      "BBA Finance from Institute of Business Administration and FMVA Certified from CFI Institute, Canada",
    recognition:
      "Real estate practitioner with deep expertise of all sub-sectors",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®), accredited by the Corporate Finance Institute (CFI), Certified in Brokerage from DREI",
  },
  "ali-shah-khawaja": {
    id: "ali-shah-khawaja",
    name: "Ali Shah Khawaja",
    image: {
      src: "/consulting-team/6.png",
      alt: "Ali Shah Khawaja",
    },
    text1: "Manager",
    text2: "Strategy & Advisory",
    background: "6+ years in M&A Advisory and Financial Due Diligence",
    sectorsOfExpertise: "M&A and Due Diligence",
    priorExperience:
      "KPMG, Sherman Securities, Cedar Capital, and Mettis Global",
    education:
      "Bachelor of Commerce (Accounting and Finance) from McGill University, Canada",
    professionalQualifications: "CFA Level III Candidate at CFA Institute, USA",
  },
  "sharan-raza": {
    id: "sharan-raza",
    name: "Sharan Raza, FMVA",
    image: {
      src: "/consulting-team/7.png",
      alt: "Sharan Raza, FMVA",
    },
    text1: "Associate I",
    text2: "Strategy & Advisory",
    background:
      "Experience in Strategy and Advisory across diverse projects and sectors",
    sectorsOfExpertise: "Industrial, Fintech, and Healthcare",
    priorExperience: "Inducted in Platform01 Graduate Program",
    education:
      "Masters of Commerce - Majors in Strategy and finance from University of Sydney",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  "shammaas-abdullah": {
    id: "shammaas-abdullah",
    name: "Shammaas Abdullah, FMVA",
    image: {
      src: "/consulting-team/8.png",
      alt: "Shammaas Abdullah, FMVA",
    },
    text1: "Senior Analyst",
    text2: "Strategy & Advisory",
    background:
      "Experience in Strategy and Advisory across diverse projects and sectors",
    sectorsOfExpertise:
      "Technology, Industrial, Fintech, Healthcare, Oil and Gas",
    priorExperience:
      "AIESEC International; Inducted in Platform01 Graduate Program",
    education:
      "BS Accounting & Finance from Institute of Business Administration (AACSB accredited)",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®) and Investment Banking & Private Equity Modeling Specialization from Corporate Finance Institute, Canada",
  },
  "mohammed-ashir": {
    id: "mohammed-ashir",
    name: "Muhammed Ashir, FMVA, ACCA",
    image: {
      src: "/consulting-team/9.png",
      alt: "Muhammed Ashir, FMVA, ACCA",
    },
    text1: "Senior Analyst",
    text2: "Strategy & Advisory",
    background: "Strategy Consulting, Advisory and Deals",
    sectorsOfExpertise: "Healthcare and Industrial",
    priorExperience: "KPMG",
    education: "ACCA Qualified",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  "muhammad-aizaz": {
    id: "muhammad-aizaz",
    name: "Muhammad Aizaz, FMVA",
    image: {
      src: "/consulting-team/14.png",
      alt: "Muhammad Aizaz, FMVA",
    },
    text1: "Analyst II",
    text2: "Strategy & Advisory",
    background: "Strategy Consulting, Advisory and Deals",
    sectorsOfExpertise: "Healthcare and Industrial",
    priorExperience: "KPMG",
    education: "ACCA Qualified",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  "muhammad-hasnain": {
    id: "muhammad-hasnain",
    name: "Muhammad Hasnain, FMVA",
    image: {
      src: "/consulting-team/10.png",
      alt: "Muhammad Hasnain, FMVA",
    },
    text1: "Analyst II",
    text2: "Strategy & Advisory",
    background: "Experience in Strategy and Advisory across diverse projects",
    sectorsOfExpertise: "Industrial",
    priorExperience: "Inducted in Platform01 Graduate Program",
    education: "BBA Finance",
    professionalQualifications:
      "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  "mohammad-zaryab": {
    id: "mohammad-zaryab",
    name: "Mohammad Zaryab",
    image: {
      src: "/consulting-team/16.png",
      alt: "Mohammad Zaryab",
    },
    text1: "Junior Analyst",
    text2: "Strategy & Advisory",
    background: "Experience in Strategy and Advisory across diverse projects",
    sectorsOfExpertise: "Business",
    priorExperience: "Inducted in Platform01 Graduate Program",
    education: "BS Economics & Finance",
    // professionalQualifications:
    //   "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  "mohammad-misaad": {
    id: "mohammad-misaad",
    name: "Mohammad Misaad",
    image: {
      src: "/consulting-team/17.png",
      alt: "Mohammad Misaad",
    },
    text1: "Junior Analyst",
    text2: "Strategy & Advisory",
    background: "Experience in Strategy and Advisory across diverse projects.",
    sectorsOfExpertise: "Business.",
    priorExperience: "Inducted in Platform01 Graduate Program.",
    education: "BS Accounting & Finance.",
    // professionalQualifications:
    //   "Financial Modeling & Valuation Analyst (FMVA®) from Corporate Finance Institute (CFI), Canada",
  },
  // "abdul-moiz": {
  //   id: "abdul-moiz",
  //   name: "Abdul Moiz, FMVA",
  //   image: {
  //     src: "/consulting-team/11.png",
  //     alt: "Abdul Moiz",
  //   },
  //   text1: "Analyst I",
  //   text2: "Strategy & Advisory",
  //   background: "Experience in Strategy and Advisory across diverse projects",
  //   sectorsOfExpertise: "Business",
  //   priorExperience: "Inducted in Platform01 Graduate Program",
  //   education:
  //     "BBA Finance from Institute of Business Administration (AACSB accredited)",
  //   professionalQualifications:
  //     "Pursuing Financial Modeling & Valuation Analyst (FMVA®) certification from Corporate Finance Institute (CFI), Canada",
  // },
  // "hamna-asghar": {
  //   id: "hamna-asghar",
  //   name: "Hamna Asghar",
  //   image: {
  //     src: "/consulting-team/13.png",
  //     alt: "Hamna Asghar",
  //   },
  //   text1: "Analyst I",
  //   text2: "Strategy & Advisory",
  //   background: "Experience in Strategy and Advisory across diverse projects",
  //   sectorsOfExpertise: "Business",
  //   priorExperience: "Inducted in Platform01 Graduate Program",
  //   education: "BBA Finance",
  //   professionalQualifications:
  //     "Pursuing Financial Modeling & Valuation Analyst (FMVA®) certification from Corporate Finance Institute (CFI), Canada",
  // },

  // details incomplete for zoha ayaz
  "zoha-ayaz": {
    id: "zoha-ayaz",
    name: "Zoha Ayaz",
    image: {
      src: "/consulting-team/15.png",
      alt: "Zoha Ayaz",
    },
    text1: "M&A Executive",
    text2: "Strategy & Advisory",
    background: "Experience in conducting outreach",
    sectorsOfExpertise: "Mergers & Acquisitions",
    priorExperience: "Inducted in Platform01 Graduate Program",
    education: "BBA Economics & Finance",
    professionalQualifications: "",
  },
  // 'muzna-zafar': {
  //   id: 'muzna-zafar',
  //   name: 'Muzna Zafar',
  //   image: {
  //     src: '/consulting-team/12.png',
  //     alt: 'Muzna Zafar'
  //   },
  //   text1: 'Junior Analyst',
  //   text2: 'Strategy & Advisory',
  //   background: 'Trainee with foundational exposure to Strategy and Advisory projects',
  //   sectorsOfExpertise: 'Business',
  //   education: 'Finance Graduate from Institute of Business Administration (AACSB accredited) ',
  // }
};

// Corporate team members
export const corporateTeamMembers: Record<string, TeamMember> = {
  "omar-abedin": {
    id: "omar-abedin",
    name: "Omar Abedin",
    image: {
      src: "/corporate-team/2.png",
      alt: "Omar Abedin",
    },
    text1: "Country Manager (Saudi Arabia)",
    background:
      "Canadian national with 30+ years of global management and leadership experience across the Middle East and North America.",
    sectorsOfExpertise:
      "Healthcare, Technology, Mobility, Pharmaceuticals, FMCG",
    priorExperience:
      "Leadership roles at Johnson & Johnson, Careem, Novartis, and other global FMCG companies; Board Advisor to multiple businesses across the MENA region",
    education:
      "MBA from the Institute of Business Administration (AACSB accredited)",
  },
  "ahsen-aghai": {
    id: "ahsen-aghai",
    name: "Ahsen Aghai",
    image: {
      src: "/corporate-team/17.png",
      alt: "Ahsen Aghai",
    },
    text1: "Marketing Manager",
  },
  "mariyam-akhund": {
    id: "mariyam-akhund",
    name: "Mariyam Akhund",
    image: {
      src: "/corporate-team/16.png",
      alt: "Mariyam Akhund",
    },
    text1: "Sr. Consultant",
  },
  "maha-tauqeer": {
    id: "maha-tauqeer",
    name: "Maha Tauqeer",
    image: {
      src: "/corporate-team/4.png",
      alt: "Maha Tauqeer",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "maham-hameed": {
    id: "maham-hameed",
    name: "Maham Hameed",
    image: {
      src: "/corporate-team/11.png",
      alt: "Maham Hameed",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "mirta-khan": {
    id: "mirta-khan",
    name: "Mirta Khan",
    image: {
      src: "/corporate-team/3.png",
      alt: "Mirta Khan",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "esha-sachdev": {
    id: "esha-sachdev",
    name: "Esha Sachdev",
    image: {
      src: "/corporate-team/14.png",
      alt: "Esha Sachdev",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "muqaddas-noor": {
    id: "muqaddas-noor",
    name: "Muqaddas Noor",
    image: {
      src: "/corporate-team/15.png",
      alt: "Muqaddas Noor",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "raiyan-tauheed": {
    id: "raiyan-tauheed",
    name: "Raiyan Tauheed",
    image: {
      src: "/corporate-team/12.png",
      alt: "Raiyan Tauheed",
    },
    text1: "Commercial Executive",
    bioLink: false,
  },
  "aruha-khan": {
    id: "aruha-khan",
    name: "Aruha Khan",
    image: {
      src: "/corporate-team/6.png",
      alt: "Aruha Khan",
    },
    text1: "Manager HR & Culture",
    bioLink: false,
  },
  "muhammad-shan": {
    id: "muhammad-shan",
    name: "Muhammad Shan",
    image: {
      src: "/corporate-team/8.png",
      alt: "Muhammad Shan",
    },
    text1: "Finance Manager",
    bioLink: false,
  },
  "eliza-prendzov": {
    id: "eliza-prendzov",
    name: "Eliza Prendzov",
    image: {
      src: "/corporate-team/10.png",
      alt: "Eliza Prendzov",
    },
    text1: "External Advisor",
    text2: "(United States)",
    bioLink: false,
  },
  "abdullah-alkhaldi": {
    id: "abdullah-alkhaldi",
    name: "Abdullah AlKhaldi",
    image: {
      src: "/corporate-team/9.png",
      alt: "Abdullah AlKhaldi",
    },
    text1: "External Advisor",
    text2: "(Saudi Arabia)",
    bioLink: false,
  },
  "zia-saeed": {
    id: "zia-saeed",
    name: "Zia Saeed",
    image: {
      src: "/corporate-team/1.png",
      alt: "Zia Saeed",
    },
    text1: "Managing Director",
    text2: "Corporate",
    background:
      "Commercial Leadership, Marketing, CEM, Digital Strategy, Management, Media Agency Management",
    sectorsOfExpertise:
      "Automotive, Healthcare, Ed-Tech, Consumer Electronics, ICT, Legal, and Financial Services",
    priorExperience: "Fibonacci Agency, TCF (PRGN Network), The Resource Group",
    education:
      "Bachelors in Business Administration, IBA & National University of Singapore (NUS)",
    professionalQualifications: "Corporate Director Program, CMI UK",
  },
  "nabeel-ahmed": {
    id: "nabeel-ahmed",
    name: "Nabeel Ahmed",
    image: {
      src: "/corporate-team/13.png",
      alt: "Nabeel Ahmed",
    },
    text1: "General Manager",
    text2: "Corporate",
    background: "Commercial Leadership, Management, Finance",
    sectorsOfExpertise:
      "Information Technology,  Telecommunication,  Retail, Food,  Financial Services",
    priorExperience:
      "Techcore Technology, Vdigit, PH7 Catering Services, Cloud BPO Private Limited (Breezecom), Corrtec Private Limited",
    education: "Masters in Business Administration in Finance",
    professionalQualifications: "CFA Level 3 Qualified",
  },
};

// Helper functions to get team data for different pages
export const getTeamMembers = (memberIds: string[]): TeamMember[] => {
  return memberIds.map((id) => teamMembers[id]).filter(Boolean);
};

export const getCorporateTeamMembers = (memberIds: string[]): TeamMember[] => {
  return memberIds.map((id) => corporateTeamMembers[id]).filter(Boolean);
};

// Predefined team configurations for different pages
export const teamConfigs = {
  // Strategy services
  "growth-strategy": [
    "saad-jilani",
    "shwetabh-sameer",
    "mohammad-ovais",
    "shafi-akhund",
  ],
  "feasibility-study": [
    "saad-jilani",
    "shwetabh-sameer",
    "shafi-akhund",
    "mohammad-ovais",
  ],
  "business-plan": ["mustafa-nadeem", "saad-jilani", "shwetabh-sameer"],
  "real-estate-strategy": ["mustafa-nadeem", "shafi-akhund"],
  "market-research": [
    "mustafa-nadeem",
    "saad-jilani",
    "shwetabh-sameer",
    "omar-abedin",
    "mohammad-ovais",
  ],
  "smb-advisory-services": [
    "mustafa-nadeem",
    "ali-shah-khawaja",
    "sharan-raza",
  ],

  // Finance services
  "ma-consulting": ["mustafa-nadeem", "ali-shah-khawaja", "shafi-akhund"],
  "transaction-support": [
    "mustafa-nadeem",
    "shwetabh-sameer",
    "ali-shah-khawaja",
    "shafi-akhund",
  ],
  "business-valuation": ["shwetabh-sameer", "ali-shah-khawaja", "shafi-akhund"],

  // Capital services
  "due-diligence": ["mustafa-nadeem", "shwetabh-sameer", "ali-shah-khawaja"],
  "portfolio-valuation": [
    "ali-shah-khawaja",
    "shwetabh-sameer",
    "shafi-akhund",
  ],
  "value-creation": ["mustafa-nadeem", "shwetabh-sameer"],

  // Restructuring services
  "restructuring-consulting": ["mustafa-nadeem", "saad-jilani", "shafi-akhund"],
  "turnaround-advisory": ["saad-jilani", "shwetabh-sameer", "shafi-akhund"],

  // Consulting team page
  "consulting-team-primary": [
    "saad-jilani",
    "mohammad-ovais",
    "shwetabh-sameer",
  ],
  "consulting-team-secondary": [
    "shafi-akhund",
    "ali-shah-khawaja",
    "sharan-raza",
    "shammaas-abdullah",
    "mohammed-ashir",
    "muhammad-aizaz",
    "muhammad-hasnain",
    "mohammad-zaryab",
    "mohammad-misaad",
    // "abdul-moiz",
    // "hamna-asghar",
    "zoha-ayaz",
  ],
  "consulting-managing-director": ["mustafa-nadeem"],

  // Corporate team page
  "corporate-team": [
    "omar-abedin",
    "ahsen-aghai",
    "aruha-khan",
    "mariyam-akhund",
    "maha-tauqeer",
    "mirta-khan",
    "esha-sachdev",
    "muqaddas-noor",
    "muhammad-shan",
  ],
  "corporate-advisors": ["eliza-prendzov", "abdullah-alkhaldi"],
  "corporate-managing-director": ["nabeel-ahmed"],
  "financial-modelling-and-analysis": [
    "mustafa-nadeem",
    "ali-shah-khawaja",
    "shafi-akhund",
    "muhammad-aizaz",
  ],
};

// Function to get team data for a specific page (both consulting and corporate)
export const getTeamDataForPage = (pageKey: keyof typeof teamConfigs) => {
  const memberIds = teamConfigs[pageKey];
  const consultingMembers = getTeamMembers(memberIds);
  const corporateMembers = getCorporateTeamMembers(memberIds);
  return [...consultingMembers, ...corporateMembers];
};

// Function to get corporate team data for a specific page
export const getCorporateTeamDataForPage = (
  pageKey: keyof typeof teamConfigs,
) => {
  const memberIds = teamConfigs[pageKey];
  return getCorporateTeamMembers(memberIds);
};

// Export all team members for easy access
export const getAllTeamMembers = () => Object.values(teamMembers);
export const getAllCorporateTeamMembers = () =>
  Object.values(corporateTeamMembers);
