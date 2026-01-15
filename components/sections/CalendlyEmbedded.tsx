"use client";

import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";

interface CalendlyEmbeddedProps {
  heading?: string;
  supportingText?: string;
  calendlyUrl?: string;
  bgSurface?: boolean;
  calendlyMobileView?: boolean;
}

const DEFAULT_CALENDLY_URL = "https://calendly.com/p01consulting/30min";

const CalendlyEmbedded: React.FC<CalendlyEmbeddedProps> = ({
  heading = "Book Your Consultation",
  supportingText = "Schedule a 30-minute consultation with our experts to discuss your project requirements and how we can help you achieve your business goals.",
  calendlyUrl = DEFAULT_CALENDLY_URL,
  bgSurface = false,
  calendlyMobileView = true,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className={`${bgSurface ? "bg-surface" : "bg-white"} py-20`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Copy */}
          <div className="space-y-8 flex flex-col justify-center h-full">
            <div className="space-y-6">
              <h2 className="heading-3 max-w-[500px] leading-tight">
                {parse(heading)}
              </h2>

              <p className="text-dark/70 text-lg max-w-[500px] leading-relaxed">
                {parse(supportingText)}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="heading-5 text-dark">What You'll Get:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-6 text-dark mb-1">
                      30-Minute Strategic Consultation
                    </h4>
                    <p className="text-dark/60 text-sm">
                      Focused discussion on your specific business challenges
                      and opportunities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-6 text-dark mb-1">
                      Free Initial Assessment
                    </h4>
                    <p className="text-dark/60 text-sm">
                      Complimentary evaluation of your current situation and
                      potential solutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-6 text-dark mb-1">
                      Personalized Recommendations
                    </h4>
                    <p className="text-dark/60 text-sm">
                      Tailored strategic advice based on your unique business
                      context
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Calendly Widget */}
          {/* <div className="relative">
            <div className="bg-white border border-dark/10 overflow-hidden">
              <div className="">
                <div
                  ref={widgetRef}
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minWidth: 320, height: 700, width: "100%" }}
                />
              </div>
            </div>
          </div> */}
          <div
            className={`
    relative 
    ${!calendlyMobileView ? "hidden md:block" : "block"}
  `}
          >
            <div className="bg-white border border-dark/10 overflow-hidden">
              <div>
                <div
                  ref={widgetRef}
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minWidth: 320, height: 700, width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlyEmbedded;
