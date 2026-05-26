"use client";

import { Check, Minus, X } from "lucide-react";
const traditionalVsP01saas = [
  {
    title: "Focused on strategic value creation",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Long-term strategic partnership",
    traditional: false,
    p01saas: true,
  },
  { title: "Execution-driven", traditional: false, p01saas: true },
  {
    title: "Integrated multidisciplinary support",
    traditional: false,
    p01saas: true,
  },
  {
    title: "Proactive strategic involvement",
    traditional: false,
    p01saas: true,
  },
  { title: "Ongoing strategic oversight", traditional: false, p01saas: true },
  { title: "Embedded coordination support", traditional: false, p01saas: true },
  {
    title: "Flexible strategic capability access",
    traditional: false,
    p01saas: true,
  },
  { title: "Focused on billable hours", traditional: true, p01saas: false },
  { title: "Short-term projects", traditional: true, p01saas: false },
  { title: "Presentation-driven", traditional: true, p01saas: false },
  { title: "Siloed service delivery", traditional: true, p01saas: false },
  { title: "Reactive engagement structure", traditional: true, p01saas: false },
  { title: "Limited continuity", traditional: true, p01saas: false },
  {
    title: "High dependency on internal coordination",
    traditional: true,
    p01saas: false,
  },
  {
    title: "Expensive internal hiring alternatives",
    traditional: true,
    p01saas: false,
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="overflow-x-auto">
          <div className="min-w-[850px] border-2 border-black">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr]">
              {/* Empty top-left */}
              <div className="border-r-2 border-b-2 border-black bg-white" />

              {/* Traditional */}
              <div className="bg-purple-600 border-r-2 border-b-2 border-black p-6 flex items-center justify-center">
                <h3 className="text-white font-bold text-2xl">Traditional</h3>
              </div>

              {/* P01SOaaS */}
              <div className="bg-sky-500 border-b-2 border-black p-6 flex items-center justify-center">
                <h3 className="text-white font-bold text-2xl">P01SOaaS™</h3>
              </div>
            </div>

            {/* Rows */}
            {traditionalVsP01saas.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3">
                {/* Factor */}
                <div className="border-r-2 border-b-2 border-black p-6 flex items-center bg-white">
                  <h4 className="font-semibold text-lg text-black">
                    {item.title}
                  </h4>
                </div>

                {/* Traditional */}
                <div className="border-r-2 border-b-2 border-black p-6 flex items-center justify-center bg-white">
                  {item.traditional ? (
                    <Check className="w-12 h-12 text-black stroke-[2.5]" />
                  ) : (
                    <X className="w-12 h-12 text-black stroke-[2.5]" />
                  )}
                </div>

                {/* P01SOaaS */}
                <div className="border-b-2 border-black p-6 flex items-center justify-center bg-white">
                  {item.p01saas ? (
                    <Check className="w-12 h-12 text-black stroke-[2.5]" />
                  ) : (
                    <X className="w-12 h-12 text-black stroke-[2.5]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
