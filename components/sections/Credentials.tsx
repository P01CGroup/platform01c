// NOTE: Now using Swiper instead of react-slick
"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import parse from "html-react-parser";
import CalendlyEmbedded from "./CalendlyEmbedded";

export type CredentialSlide = {
  type: string;
  category: string;
  title: string;
};

export type CredentialTab = {
  label: string;
  value: string;
};

interface CredentialsProps {
  slides: CredentialSlide[];
  tabs?: CredentialTab[];
  disableTabs?: boolean;
  heading?: string;
  supportingText?: string;
  bgSurface?: boolean;
  showCalendly?: boolean;
  calendlyMobileView?: boolean;
}

// Client-side shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Credentials({
  slides,
  tabs = [],
  disableTabs = false,
  bgSurface = false,
  showCalendly,
  calendlyMobileView = true,
  heading = "Our Credentials",
  supportingText = "We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision.",
}: CredentialsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "");
  const [currentSlides, setCurrentSlides] = useState<CredentialSlide[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  // Shuffle slides on client side when component mounts or slides change
  useEffect(() => {
    if (slides.length > 0 && !hasShuffled) {
      setCurrentSlides(shuffleArray(slides));
      setHasShuffled(true);
    } else if (slides.length > 0) {
      // For subsequent updates, also shuffle to maintain randomness
      setCurrentSlides(shuffleArray(slides));
    }
  }, [slides, hasShuffled]);

  const filteredSlides = disableTabs
    ? currentSlides
    : currentSlides.filter((slide) => slide.type === activeTab);

  // Ensure at least 4 slides for looping/navigation, but avoid infinite loop if empty
  let displaySlides = filteredSlides;
  if (displaySlides.length === 0) {
    displaySlides = [];
  } else {
    while (displaySlides.length < 4) {
      displaySlides = displaySlides.concat(filteredSlides);
    }
  }

  return (
    <section
      className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} pt-16`}
    >
      <div className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 border-b border-dark/10 pb-4 items-end">
          {disableTabs ? (
            <>
              <div className="md:col-span-1">
                <p className="text-md text-dark/50">Our Credentials</p>
              </div>
              <div className="flex gap-8 md:col-span-3">
                <h2 className="heading-3 max-w-[470px]">{heading}</h2>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-1">
                <p className="text-md text-dark/50">Our Credentials</p>
              </div>
              {tabs.length > 0 && (
                <div className="flex gap-8 md:col-span-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      className={`cursor-pointer heading-2 transition-colors ${activeTab === tab.value ? "border-primary text-dark" : "border-transparent text-dark/50 hover:text-dark"}`}
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {supportingText && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <p className="text-md text-dark/50 md:col-start-2 md:col-span-2 pt-4">
              {parse(supportingText)}
            </p>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 mb-4 mt-8">
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
        <Swiper
          key={activeTab}
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{ prevEl: navPrev.current, nextEl: navNext.current }}
          loop={displaySlides.length > 0}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = navPrev.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = navNext.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            1024: { slidesPerView: 4 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {displaySlides.length === 0 ? (
            <SwiperSlide>
              <div className="pt-4 text-center text-dark/50">
                No credentials found for this category.
              </div>
            </SwiperSlide>
          ) : (
            displaySlides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="pt-4 text-left bg-transparent shadow-none rounded-none h-full">
                  <div className="text-xs text-dark/50 mb-2 border-b border-dark/10 pb-2">
                    {slide.category}
                  </div>
                  <div className="heading-5 leading-snug text-dark">
                    {slide.title}
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Calendly Embedded Section */}
      {showCalendly === true && (
        <CalendlyEmbedded
          heading="Ready to Discuss Your Project?"
          supportingText="Book a consultation with our experts to explore how we can help you achieve your business objectives. Our team is ready to provide personalized insights and strategic guidance."
          bgSurface={!bgSurface}
          calendlyMobileView={calendlyMobileView}
        />
      )}
    </section>
  );
}
