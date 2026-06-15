"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import InsightCard from "../ui/insight-card";
import { Insight as DBInsight } from "@/lib/types/cms";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { RetryButton } from "@/components/ui/retry-button";
import { getDatePart, areDatesDifferent } from "@/lib/utils/date-format";

export type Insight = {
  image: string;
  date: string;
  updatedDate?: string;
  title: string;
  excerpt: string;
  author: string;
  coAuthor: string;
  slug: string;
};

interface InsightsSliderProps {
  insights: Insight[];
  bgSurface?: boolean;
  heading?: string;
}

export default function InsightsSlider({
  insights: rawInsights,
  bgSurface = false,
  heading = "Insights and Thought Leadership",
}: InsightsSliderProps) {
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);

  const [insights, setInsights] = useState(rawInsights);

  useEffect(() => {
    const shuffled = [...rawInsights];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setInsights(shuffled);
  }, []);

  let displayInsights = insights;
  while (displayInsights.length < 4) {
    displayInsights = displayInsights.concat(insights);
  }

  return (
    <section
      className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
    >
      <div className="container">
        <div className="relative mb-14">
          <h2 className="heading-3 max-w-[470px]">{heading}</h2>
          <div className="flex items-center justify-start md:justify-end gap-2 pt-4 md:pt-0 md:absolute bottom-0 right-0">
            <button
              ref={navPrev}
              className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "bg-white" : "bg-[color:var(--surface)]"}`}
              aria-label="Previous"
              type="button"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="stroke-dark/50"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              ref={navNext}
              className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "bg-white" : "bg-[color:var(--surface)]"}`}
              aria-label="Next"
              type="button"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="stroke-dark/50"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <hr className="border-dark/10" />
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{ prevEl: navPrev.current, nextEl: navNext.current }}
          loop={true}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navPrev.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navNext.current;
          }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {displayInsights.map((insight, idx) => (
            <SwiperSlide key={idx} className="mt-14">
              <InsightCard insight={insight} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
