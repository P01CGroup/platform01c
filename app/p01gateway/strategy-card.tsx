"use client";

import React, { useState } from "react";
import ArrowRight from "@/components/icons/ArrowRight";
import parse from "html-react-parser";
import Modal from "@/components/ui/modal";

interface ServiceData {
  title: string;
  description: string;
  additionalText?: string;
  // services: string[];
}

interface StrategyCardsProps {
  service?: ServiceData;
  className?: string;
  bgSurface?: boolean;
}

const StrategyCards: React.FC<StrategyCardsProps> = ({
  service,
  className = "",
  bgSurface = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className={`relative p-4 text-left transition-all duration-200 group border border-dark/10 bg-surface text-dark flex flex-col justify-between gap-6 ${bgSurface ? "bg-surface" : ""} ${className}`}
      >
        <div>
          <h5 className="leading-tight">{service?.title}</h5>
        </div>

        <div className="flex justify-between items-center gap-5 border-t border-dark/10 py-2 text-left w-full cursor-pointer">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 stroke-dark/50" />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={service?.title || "Service"}
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="flex flex-col gap-6 justify-between px-4 overflow-y-scroll max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col gap-2">
              <h2 className="heading-4">{service?.title}</h2>

              {/* {service?.description && (
                <p className="text-dark/50 leading-tight">
                  {parse(service?.description)}
                </p>
              )} */}
            </div>

            <div className="flex flex-col gap-3 text-dark/50 leading-tight">
              {/* <div>
                <ul className="mt-3 flex flex-col gap-2 list-disc pl-6">
                  {service?.services?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div> */}
              {service?.description && parse(service?.description)}
            </div>
            {/* {service?.additionalText && (
              <p className="text-dark/50 leading-tight">
                {parse(service?.additionalText)}
              </p>
            )} */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StrategyCards;
