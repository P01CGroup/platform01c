"use client";
// NOTE: Now using Swiper instead of react-slick

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import InsightCard from "../ui/insight-card";
import { useInsightsForSlider } from "@/lib/hooks/useInsights";
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

// Map database insight to slider format
function mapDBInsightToSlider(insight: DBInsight): Insight {
  const publishedDate =
    getDatePart(insight.published_date) || getDatePart(new Date()) || "";
  const updatedDate = getDatePart(insight.updated_at);

  return {
    image:
      insight.image_url ||
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: publishedDate,
    updatedDate:
      updatedDate && areDatesDifferent(updatedDate, publishedDate)
        ? updatedDate
        : undefined,
    title: insight.title,
    excerpt: insight.excerpt,
    author: insight.author,
    coAuthor: insight.co_author || "",
    slug: insight.slug,
  };
}

// Add hasMounted state at the top of DynamicInsightsSlider
export function DynamicInsightsSlider({
  bgSurface = false,
  heading = "Insights and Thought Leadership",
  limit = 6,
}: Omit<InsightsSliderProps, "insights"> & { limit?: number }) {
  const {
    insights: dbInsights,
    loading,
    error,
    refetch,
    clearCache,
  } = useInsightsForSlider(limit);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Define handleRefresh to refresh insights
  const handleRefresh = useCallback(() => {
    clearCache();
    refetch();
    setLastRefreshed(new Date());
  }, [clearCache, refetch]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      clearCache();
      refetch();
      setLastRefreshed(new Date());
    }, 60 * 1000); // 1 minute
    return () => clearInterval(interval);
  }, [clearCache, refetch]);

  // Refetch on window focus
  useEffect(() => {
    const onFocus = () => {
      clearCache();
      refetch();
      setLastRefreshed(new Date());
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [clearCache, refetch]);

  // Map database insights to slider format
  // const insights = dbInsights.map(mapDBInsightToSlider);
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle insights after mapping
  const insights = shuffleArray(dbInsights.map(mapDBInsightToSlider));

  if (loading) {
    return (
      <section
        className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
      >
        <div className="container">
          <div className="relative mb-14">
            <h2 className="heading-3 max-w-[470px]">{heading}</h2>
            <div className="flex items-center justify-start md:justify-end gap-2 pt-4 md:pt-0 md:absolute bottom-0 right-0">
              <div className="text-xs text-dark/30 mr-2">
                Last updated:{" "}
                {hasMounted ? lastRefreshed.toLocaleTimeString() : ""}
              </div>
              <button
                onClick={handleRefresh}
                className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "bg-white" : "bg-[color:var(--surface)]"}`}
                aria-label="Refresh insights"
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
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
            </div>
          </div>
          <hr className="border-dark/10" />
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark"></div>
            <span className="ml-4 text-dark/50">Loading insights...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
      >
        <div className="container">
          <div className="relative mb-14">
            <h2 className="heading-3 max-w-[470px]">{heading}</h2>
            <div className="flex items-center justify-start md:justify-end gap-2 pt-4 md:pt-0 md:absolute bottom-0 right-0">
              <div className="text-xs text-dark/30 mr-2">
                Last updated:{" "}
                {hasMounted ? lastRefreshed.toLocaleTimeString() : ""}
              </div>
              <button
                onClick={handleRefresh}
                className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "bg-white" : "bg-[color:var(--surface)]"}`}
                aria-label="Refresh insights"
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
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
            </div>
          </div>
          <hr className="border-dark/10" />
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <span className="text-red-500 block mb-4">
                Failed to load insights. Please try again later.
              </span>
              <RetryButton
                onRetry={handleRefresh}
                className="bg-dark text-white hover:bg-dark/80"
              >
                Retry
              </RetryButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (insights.length === 0) {
    return (
      <section
        className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
      >
        <div className="container">
          <div className="relative mb-14">
            <h2 className="heading-3 max-w-[470px]">{heading}</h2>
            <div className="flex items-center justify-start md:justify-end gap-2 pt-4 md:pt-0 md:absolute bottom-0 right-0">
              <div className="text-xs text-dark/30 mr-2">
                Last updated:{" "}
                {hasMounted ? lastRefreshed.toLocaleTimeString() : ""}
              </div>
              <button
                onClick={handleRefresh}
                className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "bg-white" : "bg-[color:var(--surface)]"}`}
                aria-label="Refresh insights"
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
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
            </div>
          </div>
          <hr className="border-dark/10" />
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <span className="text-dark/50 block mb-4">
                No insights available at the moment.
              </span>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/80 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <InsightsSlider
      insights={insights}
      bgSurface={bgSurface}
      heading={heading}
    />
  );
}

export default function InsightsSlider({
  insights,
  bgSurface = false,
  heading = "Insights and Thought Leadership",
}: InsightsSliderProps) {
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);

  // Add refresh functionality if available
  const handleRefresh = useCallback(() => {
    // This will be called from DynamicInsightsSlider
    window.location.reload();
  }, []);

  // Ensure at least 4 slides for looping/navigation
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
