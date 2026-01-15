"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../ui/header";
import parse from "html-react-parser";
import Link from "next/link";
import Button from "../ui/button";
import ArrowRight from "../icons/ArrowRight";
import { ChevronRight } from "lucide-react";
import CalendlyModalWrapper from "../ui/CalendlyModalWrapper";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  heading?: string;
  showCTA?: boolean;
}

export default function FAQSection({
  faqs,
  showCTA,
  heading = "Frequently Asked Questions",
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-white pb-20">
      <div className="container pt-5">
        <Header text="FAQs" className="mb-26" />
        {heading && <h2 className="heading-3 mb-8 max-w-[460px]">{heading}</h2>}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="border-b border-dark/10 last:border-b-0 md:col-span-3 md:col-start-2"
              >
                <button
                  className={`cursor-pointer w-full text-left py-4 flex items-center justify-between border-none outline-none `}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{ borderRadius: 0 }}
                >
                  <span className="heading-5 select-none">
                    {parse(faq.question)}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                  {isOpen && (
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
                      className="overflow-hidden bg-white"
                    >
                      <div className="pb-4 text-dark/50 text-base max-w-[600px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA Block after first FAQ */}
                {showCTA === true && idx === 0 && (
                  <div className="mt-8 mb-8">
                    <div className="bg-surface p-6  border border-dark/10">
                      <h4 className="heading-5 mb-3">Still Have Questions?</h4>
                      <p className="text-dark/70 mb-4 text-sm">
                        Our experts are here to help. Book a consultation to get
                        personalized answers to your specific questions.
                      </p>
                      <CalendlyModalWrapper>
                        <Button size="default" variant="secondary">
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
                )}
              </div>
            );
          })}
        </div>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-4">
          <div className=" md:col-span-3 md:col-start-2 mt-10">
            <CalendlyModalWrapper>
              <Button size="icon">
                Talk to an expert{" "}
                <ChevronRight
                  className="stroke-white/50"
                  height={16}
                  width={16}
                />
              </Button>
            </CalendlyModalWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
