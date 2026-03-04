// NOTE: Now using Swiper instead of react-slick
"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ContentBlock({
  slides,
  bgSurface = false,
}: {
  slides: string[];
  bgSurface?: boolean;
}) {
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);

  return (
    <section className={`${""} pt-16`}>
      <div className="container pb-16">
        <div className="flex items-center justify-end gap-2 mb-4 mt-8">
          <button
            ref={navPrev}
            className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "" : "bg-white"}`}
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
            className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-surface transition ${bgSurface ? "" : "bg-white"}`}
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
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{ prevEl: navPrev.current, nextEl: navNext.current }}
          loop={true}
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
          {slides.length === 0 ? (
            <SwiperSlide>
              <div className="pt-4 text-center text-dark/50">
                No credentials found for this category.
              </div>
            </SwiperSlide>
          ) : (
            slides.map((slide: string, idx: number) => (
              <SwiperSlide key={idx}>
                <div className="pt-4 text-left bg-transparent shadow-none rounded-none h-full">
                  <div className="heading-5 leading-snug text-dark">
                    {slide}
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
}
