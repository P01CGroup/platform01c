"use client";

import React, { useState } from "react";
import ParallaxImage from "../ui/ParallaxImage";
import { Button } from "../ui/button";
import { ServiceHeroData } from "@/lib/types";
import ArrowRight from "../icons/ArrowRight";
import parse from "html-react-parser";
import { AnimatePresence } from "framer-motion";
import Modal from "../ui/modal";
import Image from "next/image";
import ContactForm from "../ui/ContactForm";

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const ServiceHeroFeasibilityLanding: React.FC<ServiceHeroData> = ({
  subheading,
  heading,
  className = "",
  backgroundImages,
  showContactForm = true,
  showButton = true,
  whatsappNumber = "https://wa.me/97144186048",
  whatsAppButtonMobileView = true,
  awards = [],
  showContactFormMobileView = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-dark text-white relative overflow-hidden z-10">
      <div className="container h-[100dvh] md:h-[768px]">
        <ParallaxImage
          responsiveImages={backgroundImages}
          alt="Background"
          fill
          className="absolute inset-0 w-full h-full object-cover -z-10"
          priority
          intensity={0.3}
        />

        <div className="flex flex-col justify-end items-start h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10 md:pb-24 items-start w-full">
            <div
              className={`md:col-span-2 flex items-start flex-col md:flex-row ${className}`}
            >
              {/* Awards Section */}
              <div>
                <h1 className="!text-sm text-white/50 mb-4 !font-sans">
                  {subheading}
                </h1>
                <h2 className="heading-2 leading-snug text-white">
                  {parse(heading)}
                </h2>
                {/* Mobile CTA Button */}
                {showContactFormMobileView && (
                  <div className="md:hidden mt-6 w-full">
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(true)}
                      className="w-full justify-between"
                    >
                      Talk to an expert <ArrowRight />
                    </Button>
                  </div>
                )}

                {/* WhatsApp CTA Button - Below copy on left side */}
                {showButton === true && (
                  <div className="mt-6">
                    {whatsAppButtonMobileView ? (
                      <Button
                        onClick={() => window.open(whatsappNumber, "_blank")}
                        className="justify-between md:hidden"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          WhatsApp
                        </div>
                        <ArrowRight />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => window.open(whatsappNumber, "_blank")}
                        className="justify-between md:flex hidden"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          WhatsApp
                        </div>
                        <ArrowRight />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {awards && awards.length > 0 && (
                <div className="mt-12">
                  <div className="flex flex-col items-center gap-10 w-full">
                    {awards.map((award, index) => (
                      <div
                        key={index}
                        className="flex w-full md:w-fit flex-col items-center gap-5"
                      >
                        <Image
                          src={award.image}
                          alt={award.alt || award.text}
                          className="object-contain"
                          height={80}
                          width={80}
                        />
                        <span className="text-white text-sm text-center max-w-[250px]">
                          {parse(award.text)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {showContactForm && (
              <div className="bg-white p-8 text-dark hidden md:block relative">
                <ContactForm
                  heading="Submit an Inquiry"
                  variant="inline"
                  context="service_hero"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Inquiry Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Submit an Inquiry"
      >
        <AnimatePresence>
          <div>
            <ContactForm variant="modal" context="service_hero" />
          </div>
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default ServiceHeroFeasibilityLanding;
