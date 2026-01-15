import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AwardsProps {
  bgSurface?: boolean;
}

function Awards({ bgSurface = false }: AwardsProps) {
  return (
    <section
      className={`${bgSurface ? "bg-[color:var(--surface)]" : "bg-white"} py-16`}
    >
      <div className="max-w-6xl mx-auto flex justify-center px-4">
        {/* ✅ This wrapper ensures proper width & height for the fill image */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
          <Link
            href={"https://www.gpmg.uk/winners/m-a-today-global-awards-2026"}
            aria-label="M&A Awards"
            target="_blank"
          >
            <Image
              src="/awards/award1.png"
              alt="M&A awards"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Awards;
