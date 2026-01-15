import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { OfflineFallback } from "@/components/ui/offline-fallback";
import ConditionalNavbar from "../components/ui/conditional-navbar";
import ConditionalFooter from "../components/ui/conditional-footer";
import Script from "next/script";
import FloatingActionIconClientOnly from "@/components/ui/FloatingActionIconClientOnly";
const Canela = localFont({
  src: "../fonts/Canela-Regular.otf",
  variable: "--font-canela",
  display: "swap",
  preload: true,
  fallback: ["serif"],
  adjustFontFallback: false,
});

const Satoshi = localFont({
  src: "../fonts/Satoshi-Medium.otf",
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Platform01 Consulting - Your Platform for Strategic Success",
  description:
    "Platform01 is providing We serve as consultants to some of the world&apos;s fastest-growing companies and renowned investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="U_Ycjgmia8KwufYCI0NR9BZ77fIg-T2KXuS2uRe7MLI"
        />
        <link rel="preconnect" href="https://scripts.clixtell.com" />
        <link rel="preconnect" href="https://qbgziiof.me.stape.io" />
        <link
          rel="dns-prefetch"
          href="https://vsqfvsosprmjdktwilrj.supabase.co"
        />
        <link
          rel="preload"
          href="/fonts/Canela-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W3QPBDV');
            `,
          }}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-78NQ19KEEM');
            `,
          }}
        />
      </head>
      <body
        className={`${Canela.variable} ${Satoshi.variable} antialiased font-sans text-dark`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3QPBDV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <OfflineFallback>
          <ErrorBoundary>
            <ConditionalNavbar />
            <FloatingActionIconClientOnly />
            {children}
            <ConditionalFooter />
          </ErrorBoundary>
        </OfflineFallback>
      </body>
    </html>
  );
}
