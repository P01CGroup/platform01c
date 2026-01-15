"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../ui/header";
import parse from "html-react-parser";
import Button from "../ui/button";
import { ChevronRight } from "lucide-react";
import CalendlyModalWrapper from "../ui/CalendlyModalWrapper";

export interface ServiceItem {
  title: string;
  description?: string | React.ReactNode;
}

interface ServicesSectionProps {
  services: ServiceItem[];
  heading?: string;
  bgSurface?: boolean;
  supportingText?: string;
  showCTA?: boolean;
}

export default function ServicesSection({
  services,
  heading = "Key Components of Our Business Plans",
  showCTA,
  bgSurface = false,
  supportingText = "",
}: ServicesSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className={`${bgSurface ? "bg-surface" : "bg-white"} py-20`}>
      <div className="container pt-5">
        {heading && <h2 className="heading-2 mb-8 max-w-[640px]">{heading}</h2>}
        {supportingText && (
          <p className="text-dark/50 text-base mb-8 max-w-[490px]">
            {supportingText}
          </p>
        )}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-4 mt-16">
          {services.map((service, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={service.title}
                className="border-b border-dark/10 last:border-b-0 md:col-span-3 md:col-start-2 flex items-start gap-10"
              >
                <div className="text-sm py-[20px] ">
                  {(idx + 1).toString().padStart(2, "0")}.
                </div>
                <div className="flex-1">
                  <button
                    className={`cursor-pointer w-full text-left py-4 flex items-center justify-between border-none outline-none `}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    style={{ borderRadius: 0 }}
                  >
                    <span className="heading-5 select-none">
                      {parse(service.title)}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-dark"
                      >
                        <path
                          d="M6 8L10 12L14 8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && service.description && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: "auto", opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-dark/50 text-base">
                          {service.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Block after services list */}
        {showCTA === true && (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-4 mt-16">
            <div className="md:col-span-3 md:col-start-2">
              <div className="bg-white text-dark p-8 border border-dark/10">
                <h3 className="heading-4 mb-4">Ready to Get Started?</h3>
                <p className="text-dark/70 mb-6 max-w-[500px]">
                  Let's discuss how our services can help you achieve your
                  business goals. Book a consultation to explore your options.
                </p>
                <CalendlyModalWrapper>
                  <Button size="icon" variant="primary">
                    Talk to an expert{" "}
                    <ChevronRight
                      className="stroke-white"
                      height={16}
                      width={16}
                    />
                  </Button>
                </CalendlyModalWrapper>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
