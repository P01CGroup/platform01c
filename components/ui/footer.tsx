import Link from "next/link";
import Logo from "./logo";

interface FooterProps {
  excludeSaudi?: boolean;
  excludeUAE?: boolean;
}

const Footer = ({ excludeSaudi = false, excludeUAE = false }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div
        className={`container grid gap-10 border-b border-white/10 pb-10 ${
          excludeSaudi || excludeUAE
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {/* Company Info */}
        <div>
          <Logo className="mb-4 fill-white" width={180} height={71} />
          <hr className="my-4 border-white/10" />
          <p className="text-sm max-w-xs">
            Platform01 Consulting is a premium Management Consulting firm
            partnering with visionary leaders across Corporations, Investment
            firms, Public Institutions, and other organizations seeking bespoke,
            high-impact services.
          </p>
          <div className="flex space-x-4 mt-6">
            {/* Social icons (placeholder SVGs) */}
            <Link
              href="https://www.linkedin.com/company/platform-01-consulting/"
              aria-label="Linkedin"
              className="hover:text-gray-400"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.57143 16H0.25V5.29754H3.57143V16ZM1.89286 3.86577C0.857143 3.86577 0 2.97092 0 1.89709C0 0.85906 0.857143 0 1.89286 0C2.96429 0 3.82143 0.85906 3.82143 1.89709C3.82143 2.97092 2.96429 3.86577 1.89286 3.86577ZM15.9643 16H12.6786V10.8098C12.6786 9.55705 12.6429 7.9821 10.9286 7.9821C9.21429 7.9821 8.96429 9.30649 8.96429 10.7025V16H5.64286V5.29754H8.82143V6.7651H8.85714C9.32143 5.94183 10.3929 5.04698 12 5.04698C15.3571 5.04698 16 7.26622 16 10.1298V16H15.9643Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Saudi Arabia - Only show if not excluded */}
        {!excludeSaudi && (
          <div style={{ paddingTop: "27px" }}>
            <div className="grid ">
              <h5 className="heading-4 mb-2">
                Kingdom of Saudi Arabia
                {/* <br /> */}
              </h5>
              {/* <h5 className="text-right">
                بلاتفورم 01 <br /> كونسلتينغ أرابيا
              </h5> */}
            </div>
            <hr className="my-4 border-white/10" />
            <div className="flex items-start mb-2 text-sm">
              <span className="mr-2 mt-1">
                {/* Location icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </span>
              <span>
                Floor 5, 4055 King Fahd Road, Samama Holding Tower, <br /> P.O.
                Box 12333,
                {/* <br /> */}
                Riyadh, Kingdom of Saudi Arabia
              </span>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <span className="mr-2">
                {/* Phone icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.22.72 3.26a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.04.35 2.13.59 3.26.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>
                <Link href="tel:+966114149349">+966 11 414 9349</Link>
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className="mr-2">
                {/* Mail icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <polyline points="22,7 12,13 2,7" />
                </svg>
              </span>
              <span>
                <Link href="mailto:info@p01cglobal.com">
                  info@p01cglobal.com
                </Link>
              </span>
            </div>
          </div>
        )}

        {/* UAE */}
        {/* UAE - Only show if not excluded */}
        {!excludeUAE && (
          <div style={{ paddingTop: "27px" }}>
            <div className="grid ">
              <h5
                className={`heading-4 mb-2`}
                // className={`heading-4 mb-2 ${excludeSaudi ? "h-[63px]" : ""}`}
              >
                United Arab Emirates
                {/* <br /> */}
              </h5>
            </div>
            <hr className="my-4 border-white/10" />
            <div className="flex items-start mb-2 text-sm">
              <span className="mr-2 mt-1">
                {/* Location icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </span>
              <span>
                Office 403-D, 4th Floor, Building A4, Dubai Digital Park,
                <br /> Silicon Oasis, Dubai, United Arab Emirates
              </span>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <span className="mr-2">
                {/* Phone icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.22.72 3.26a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.04.35 2.13.59 3.26.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>
                <Link href="tel:+97144186048">+971 44 186 048</Link>
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className="mr-2">
                {/* Mail icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <polyline points="22,7 12,13 2,7" />
                </svg>
              </span>
              <span>
                <Link href="mailto:info@p01cglobal.com">
                  info@p01cglobal.com
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Bottom row */}
      <div className="container flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-gray-400 gap-2">
        <div>© 2023-2025 Platform01 Consulting Group</div>
        <div className="space-x-4">
          <Link href="/terms-of-use" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
