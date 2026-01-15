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
  ];

  // Pages where UAE section should be excluded
  const excludeUAEpages = [
    "/feasibility-study-ksa",
    "/business-valuation-services-ksa",
    "/feasibility-study-ksa-2",
    "/feasibility-study-ksa-3",
  ];

  const shouldExcludeSaudi = excludeSaudiPages.includes(pathname);
  const shouldExcludeUAE = excludeUAEpages.includes(pathname);

  return (
    <Footer excludeSaudi={shouldExcludeSaudi} excludeUAE={shouldExcludeUAE} />
  );
}
