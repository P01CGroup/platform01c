import HeroInner from "@/components/sections/HeroInner";
import Header from "@/components/ui/header";
import React from "react";
import TeamCard from "@/components/ui/team-card";
import { getTeamDataForPage } from "@/lib/data/team-data";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function generateMetadata() {
  let seo = {
    title: "Consulting Team | Platform01 Consulting",
    description: "Description for Consulting Team page.",
    keywords: "platform01, Consulting Team",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    canonical_url: "",
  };
  try {
    const { data } = await supabaseAdmin
      .from("static_pages")
      .select("seo")
      .eq("slug", "/consulting-team") // <-- leading slash
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || "" };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

const ConsultingTeam = () => {
  const Hero = {
    title: "Experienced. Qualified. Industry Leadership.",
    supportingText:
      "We serve as consultants to some of the world&apos;s fastest-growing companies, visionary investors, forward-thinking corporations, and critical stakeholders across the region. Our edge lies in the depth of our global experience, sharp commercial instinct, and tailored solutions that go far beyond generic consulting playbooks.",
  };

  const TeamPrimary = getTeamDataForPage("consulting-team-primary");
  const TeamSecondary = getTeamDataForPage("consulting-team-secondary");
  const ManagingDirector = getTeamDataForPage("consulting-managing-director");
  return (
    <>
      <HeroInner title={Hero.title} supportingText={Hero.supportingText} />
      <div className="container pt-5">
        <Header text="Our Consulting Team" className="mb-26" />
        <div className="mb-10">
          <h2 className="heading-2 mb-4">Our Consulting Team</h2>
          <p className="max-w-2xl text-dark/50">
            Our Consulting team offers a unique blend of consultants,
            practitioners, and investors with prior background from Global
            Financial Institutions, Fortune 500 Corporations, Big 4 Advisory
            Firms and other Reputable Organizations in the region and beyond.  
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-20">
          {ManagingDirector.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              className="md:col-start-2"
            />
          ))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:col-span-2 md:max-h-[455px]">
            <div className="md:col-span-2 flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">Background</h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                {ManagingDirector[0]?.background ||
                  "Advisory, Strategy Consulting, Private Equity, Corporate Finance, and Equity Research"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">Locations</h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                London, Dubai, Riyadh, and Doha
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">
                Projects Delivered
              </h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                250+ strategy and advisory assignments
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">Sectors</h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                {ManagingDirector[0]?.sectorsOfExpertise ||
                  "Industrials, Healthcare, Technology, Education, Food & Agriculture, Real Estate, and Financial Services"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">
                Prior Experience
              </h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                {ManagingDirector[0]?.priorExperience ||
                  "British International Investment Plc, ValuStrat Consulting, Elixir Securities and HULT International"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">Education</h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                {ManagingDirector[0]?.education ||
                  "Masters in Finance (MiF) program at London Business School, Ranked #1 Globally"}
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <h6 className="!font-sans !text-md text-dark">
                Professional Qualification
              </h6>
              <p className="text-dark/50 leading-tight max-w-[615px]">
                {ManagingDirector[0]?.professionalQualifications ||
                  "CFA Charterholder accredited by the CFA Institute, USA"}
              </p>
            </div>
          </div>
        </div>
        <hr className="border-dark/10 my-20" />
        <h2 className="heading-3 mb-4 max-w-[1060px] pb-10">
          Our SMEs and Senior Practitioners bring deep Industry Expertise from
          reputable Global Corporations and Financial Institutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="md:col-start-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
            {TeamPrimary.map((member, index) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
        <hr className="border-dark/10 my-20" />
        <h2 className="heading-3 mb-4 max-w-[1060px] pb-10">
          Our consulting team includes industry professionals from Big 4 firms
          and other leading Advisory boutiques in the GCC region
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pb-20">
          <div className="md:col-start-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10">
            {TeamSecondary.map((member, index) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultingTeam;
