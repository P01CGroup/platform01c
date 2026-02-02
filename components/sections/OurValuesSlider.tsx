// NOTE: Now using Swiper instead of react-slick
"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Button from "../ui/button";
import {
  ChevronRight,
  Target,
  Users,
  TrendingUp,
  Award,
  Lightbulb,
  Shield,
  Heart,
  Zap,
  Star,
  Globe,
  Rocket,
  DollarSign,
  BarChart3,
  Calculator,
  FileText,
  Layers,
} from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import CalendlyModalWrapper from "../ui/CalendlyModalWrapper";

export type Value = {
  title: string;
  description: string;
  icon?: string; // now a string key
};

// Map string keys to Lucide icons
const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  users: Users,
  target: Target,
  trending: TrendingUp,
  award: Award,
  lightbulb: Lightbulb,
  shield: Shield,
  heart: Heart,
  zap: Zap,
  star: Star,
  globe: Globe,
  rocket: Rocket,
  dollar: DollarSign,
  barchart: BarChart3,
  calculator: Calculator,
  filetext: FileText,
  layers: Layers,
};

interface OurValuesSliderProps {
  values: Value[];
  bgSurface?: boolean;
  heading?: string;
  supportingText?: string;
}

// Default icons to use if no icon is provided
const defaultIcons = [
  Target,
  Users,
  TrendingUp,
  Award,
  Lightbulb,
  Shield,
  Heart,
  Zap,
  Star,
  Globe,
  Rocket,
];

export default function OurValuesSlider({
  values,
  heading = "What Sets Us Apart?",
  bgSurface = false,
  supportingText,
}: OurValuesSliderProps) {
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);

  // Ensure at least 4 slides for looping/navigation
  let displayValues = values;
  while (displayValues.length < 4) {
    displayValues = displayValues.concat(values);
  }

  // --- Equal height logic ---
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (!cardRefs.current.length) return;
    let maxHeight = 0;
    cardRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.height = "auto"; // reset first
        maxHeight = Math.max(maxHeight, ref.offsetHeight);
      }
    });
    cardRefs.current.forEach((ref) => {
      if (ref) ref.style.height = maxHeight + "px";
    });
  }, [displayValues]);
  // --- End equal height logic ---

  return (
    <section
      className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
    >
      <div className="container">
        <div className="relative mb-8">
          <h2 className="heading-3 mb-0 md:max-w-[calc(100%-300px)]">
            {parse(heading)}
          </h2>
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
            <CalendlyModalWrapper>
              <Button size="icon" variant="secondary">
                Talk to an expert{" "}
                <ChevronRight className="stroke-white" height={16} width={16} />
              </Button>
            </CalendlyModalWrapper>
          </div>
        </div>
        <hr className="border-dark/10 mb-8" />
        {supportingText && (
          <p className="text-dark/50 mb-16 max-w-[760px]">
            {parse(supportingText)}
          </p>
        )}
        <div className="">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={{ prevEl: navPrev.current, nextEl: navNext.current }}
            loop={true}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navPrev.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navNext.current;
            }}
            breakpoints={{
              1024: { slidesPerView: 4 },
              640: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            className="!flex h-full"
          >
            {displayValues.map((value, idx) => {
              // Use provided icon string or fallback to default icons
              const IconComponent =
                value.icon && ICON_MAP[value.icon]
                  ? ICON_MAP[value.icon]
                  : defaultIcons[idx % defaultIcons.length];

              return (
                <SwiperSlide key={idx} className="!flex !items-stretch h-full">
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={`${bgSurface ? "bg-white" : "bg-surface"} rounded-none shadow-none h-full flex flex-col p-7 min-h-[325px] justify-between items-between`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-12 h-12 bg-dark/5 flex items-center justify-center mb-4">
                          <IconComponent className="text-dark/70" size={24} />
                        </div>
                        <h3 className="heading-5 leading-snug text-dark mb-4">
                          {parse(value.title)}
                        </h3>
                      </div>
                      <div className="text-dark/50 text-base flex-grow">
                        {parse(value.description)}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
