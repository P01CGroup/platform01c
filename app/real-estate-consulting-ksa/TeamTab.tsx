"use client";

import { useState } from "react";
import { TeamMember } from "@/lib/data/team-data";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TeamCard from "@/components/ui/team-card";

interface TeamTabProps {
  corporateTeamData: {
    heading: string;
    supportingText: string;
    team: TeamMember[];
  };
  consultingTeamData: {
    heading: string;
    supportingText: string;
    team: TeamMember[];
  };
}

const TeamTab = ({ corporateTeamData, consultingTeamData }: TeamTabProps) => {
  const [activeTab, setActiveTab] = useState("corporate");
  return (
    <div className="container pt-16">
      <div className="flex gap-8 md:col-span-3">
        <button
          className={`cursor-pointer heading-2 transition-colors ${activeTab === "corporate" ? "border-primary text-dark" : "border-transparent text-dark/50 hover:text-dark"}`}
          onClick={() => setActiveTab("corporate")}
        >
          Corporate Team
        </button>
        <button
          className={`cursor-pointer heading-2 transition-colors ${activeTab === "consulting" ? "border-primary text-dark" : "border-transparent text-dark/50 hover:text-dark"}`}
          onClick={() => setActiveTab("consulting")}
        >
          Consulting Team
        </button>
      </div>
      {activeTab === "corporate" && (
        <TeamShowcase
          headingFullWidth={true}
          title="Our Real Estate Firm Corporate Team"
          heading={corporateTeamData.heading}
          supportingText={corporateTeamData.supportingText}
          FourColumn={true}
        >
          {corporateTeamData.team.map((item, index) =>
            item ? <TeamCard key={item.id || index} member={item} /> : null,
          )}
        </TeamShowcase>
      )}
      {activeTab === "consulting" && (
        <TeamShowcase
          headingFullWidth={true}
          title="Our Real Estate Firm Consulting Team"
          heading={consultingTeamData.heading}
          supportingText={consultingTeamData.supportingText}
          FourColumn={true}
        >
          {/* <div className="grid grid-cols-5 gap-3 md:col-span-4"> */}
          {consultingTeamData.team.map((item, index) =>
            item ? <TeamCard key={item.id || index} member={item} /> : null,
          )}
          {/* </div> */}
        </TeamShowcase>
      )}
    </div>
  );
};

export default TeamTab;
