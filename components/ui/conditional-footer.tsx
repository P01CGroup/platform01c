// import { usePathname } from "next/navigation";
// import Footer from "./footer";

// export default function ConditionalFooter() {
//   const pathname = usePathname();

//   // For SMB advisory services page, exclude Saudi section
//   if (pathname === "/smb-advisory-services") {
//     return <Footer excludeSaudi={true} />;
//   }

//   // For all other pages, show full footer
//   return <Footer />;
// }

"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Pages where Saudi section should be excluded
  const excludeSaudiPages = [
    "/smb-advisory-services",
    "/smb-advisory-services-uae",
    "/ma-consulting-services",
    "/transactions-advisory-services-uae",
    "/best-business-plan-consultants-uae",
    "/business-valuation-services-uae",
    "/ma-consulting-services-2",
    "/feasibility-study-uae",
    "/financial-modelling-and-analysis-uk",
    "/commercial-due-diligence-services-uk",
    "/business-valuation-services-uk",
    "/best-business-plan-consultants-uk",
    "/financial-modelling-and-analysis-uk",
  ];

  // Pages where UAE section should be excluded
  const excludeUAEpages = [
    "/feasibility-study-ksa",
    "/business-valuation-services-ksa",
    "/feasibility-study-ksa-2",
    "/feasibility-study-ksa-3",
    "/financial-modelling-and-analysis-uk",
    "/commercial-due-diligence-services-uk",
    "/business-valuation-services-uk",
    "/best-business-plan-consultants-uk",
    "/financial-modelling-and-analysis-uk",
    "/real-estate-consulting-ksa",
  ];

  const shouldExcludeSaudi = excludeSaudiPages.includes(pathname);
  const shouldExcludeUAE = excludeUAEpages.includes(pathname);

  return (
    <Footer excludeSaudi={shouldExcludeSaudi} excludeUAE={shouldExcludeUAE} />
  );
}
