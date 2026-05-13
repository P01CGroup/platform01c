"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import parse from "html-react-parser";

interface Service {
  title?: string;
  description?: string;
}

interface ServiceSliderProps {
  displayServiceData: Service[];
  bgSurface?: boolean;
  heading?: string;
}

const ServicesSlider = ({
  bgSurface = true,
  heading = "",
  displayServiceData,
}: ServiceSliderProps) => {
  const navPrev = useRef<HTMLButtonElement | null>(null);
  const navNext = useRef<HTMLButtonElement | null>(null);
  return (
    <section
      className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
    >
      <div className="container">
        <div className="relative mb-14">
          <h2 className="heading-3">{heading}</h2>
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
          spaceBetween={18}
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
          {displayServiceData?.map((service, idx) => (
            <SwiperSlide
              style={{ height: "auto !important" }}
              key={idx}
              className="mt-14 !h-auto flex items-stretch"
            >
              <div className="p-8 bg-white flex flex-col gap-6 h-full w-full">
                <div>
                  <h3 className="heading-3 text-dark/20">0{idx + 1}.</h3>
                  <h2 className="heading-5 max-w-[220px] min-h-[58px]">
                    {service.title}
                  </h2>
                </div>
                <p className="text-dark/50">{parse(service.description)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServicesSlider;
