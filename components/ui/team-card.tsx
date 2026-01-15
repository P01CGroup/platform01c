"use client";

import React, { useState } from "react";
import ArrowRight from "@/components/icons/ArrowRight";
import OptimizedImage from "./OptimizedImage";
import Modal from "./modal";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "./button";
import { TeamMember } from "@/lib/data/team-data";
import CalendlyModalWrapper from "./CalendlyModalWrapper";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
  bgSurface?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({
  member,
  className = "",
  bgSurface = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewBio = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleViewBio}
        className={`flex flex-col gap-3 ${className}`}
      >
        <div
          className={`${bgSurface ? "bg-surface" : "bg-white"} relative aspect-[2.3/3] overflow-hidden cursor-pointer`}
        >
          <OptimizedImage
            src={member.image.src}
            alt={member.image.alt}
            fill
            className="absolute inset-0 w-full h-full object-cover object-top"
            priority
            quality={85}
            format="webp"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9p6k9wAAAABJRU5ErkJggg=="
          />
        </div>
        <div>
          <h5 className="leading-tight">{member.name}</h5>
          <p className="text-dark/50 leading-tight capitalize">
            {member.text1}
            <br />
            {member.text2 && member.text2}
          </p>
        </div>
        {member.bioLink == false ? (
          <Link
            href={`mailto:info@platform01consulting.com`}
            className="flex justify-between items-center gap-5 border-t border-dark/10 py-2 text-left w-full cursor-pointer"
          >
            <span>Email {member.name.split(" ")[0]}</span>
            <ArrowRight className="w-4 h-4 stroke-dark/50" />
          </Link>
        ) : (
          <div className="flex justify-between items-center gap-5 border-t border-dark/10 py-2 text-left w-full cursor-pointer">
            <span>View Bio</span>
            <ArrowRight className="w-4 h-4 stroke-dark/50" />
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Team Member - ${member.name}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative md:flex hidden aspect-[2.3/3]  overflow-hidden bg-surface">
            <OptimizedImage
              src={member.image.src}
              alt={member.image.alt}
              fill
              className="absolute inset-0 w-full h-full object-cover object-top"
              priority
              quality={85}
              format="webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9p6k9wAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2 justify-between px-4 overflow-y-scroll max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col gap-0">
              <h2 className="heading-4">{member.name}</h2>
              <h3 className="!text-base !font-sans leading-tight text-dark/50">
                {member.text1} {member.text2 && `- ${member.text2}`}
              </h3>
            </div>
            <div className="flex flex-col gap-3 text-dark/50 leading-tight ">
              {member.background && (
                <div>
                  <span className="text-dark">Background:</span>
                  <br /> {member.background}
                </div>
              )}
              {member.sectorsOfExpertise && (
                <div>
                  <span className="text-dark">Sectors of Expertise:</span>
                  <br /> {member.sectorsOfExpertise}
                </div>
              )}
              {member.priorExperience && (
                <div>
                  <span className="text-dark">Prior Experience:</span>
                  <br /> {member.priorExperience}
                </div>
              )}
              {member.education && (
                <div>
                  <span className="text-dark">Education:</span>
                  <br /> {member.education}
                </div>
              )}
              {member.professionalQualifications && (
                <div>
                  <span className="text-dark">
                    Professional Qualifications:
                  </span>
                  <br /> {member.professionalQualifications}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 md:justify-between text-dark/50 leading-tight">
              <Link
                href="mailto:info@platform01consulting.com"
                className="flex items-center gap-2 text-dark col-span-2"
              >
                <div className="w-12 h-12 bg-surface flex items-center justify-center">
                  <Mail className="w-5 h-5 stroke-dark" />
                </div>
                Email Us
              </Link>
              <Link
                href="tel:+966555555555"
                className="flex items-center gap-2 text-dark "
              >
                <div className="w-12 h-12 bg-surface flex items-center justify-center">
                  <Phone className="w-5 h-5 stroke-dark" />
                </div>
                Call KSA
              </Link>
              <Link
                href="tel:+971555555555"
                className="flex items-center gap-2 text-dark "
              >
                <div className="w-12 h-12 bg-surface flex items-center justify-center">
                  <Phone className="w-5 h-5 stroke-dark" />
                </div>
                Call UAE
              </Link>
              <div className="col-span-2 w-full ">
                <CalendlyModalWrapper>
                  <Button size="icon">
                    Talk to an expert
                    <ArrowRight className="w-5 h-5 stroke-white" />
                  </Button>
                </CalendlyModalWrapper>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TeamCard;
