// Example usage of the centralized team data
import {
  getTeamDataForPage,
  getCorporateTeamDataForPage,
  teamMembers,
  corporateTeamMembers,
  getAllTeamMembers,
  getAllCorporateTeamMembers,
} from "./team-data";

// Example 1: Get team data for a specific service pag
const growthStrategyTeam = getTeamDataForPage("growth-strategy");
console.log("Growth Strategy Team:", growthStrategyTeam);

// Example 2: Get corporate team data for a specific page
const corporateTeam = getCorporateTeamDataForPage("corporate-team");
console.log("Corporate Team:", corporateTeam);

// Example 3: Get a specific team member by ID
const mustafaNadeem = teamMembers["mustafa-nadeem"];
console.log("Mustafa Nadeem:", mustafaNadeem);

// Example 4: Get all team members
const allTeamMembers = getAllTeamMembers();
console.log("All Team Members:", allTeamMembers);

// Example 5: Get all corporate team members
const allCorporateTeamMembers = getAllCorporateTeamMembers();
console.log("All Corporate Team Members:", allCorporateTeamMembers);

// Example 6: Filter team members by role
const subjectMatterExperts = allTeamMembers.filter((member) =>
  member.text1.includes("Subject Matter Expert")
);
console.log("Subject Matter Experts:", subjectMatterExperts);

// Example 7: Get team members by specific IDs
import { getTeamMembers } from "./team-data";
const customTeam = getTeamMembers([
  "mustafa-nadeem",
  "saad-jilani",
  "shwetabh-sameer",
]);
console.log("Custom Team:", customTeam);

// Example 8: Get corporate team members by specific IDs
import { getCorporateTeamMembers } from "./team-data";
const customCorporateTeam = getCorporateTeamMembers([
  "omar-abedin",
  "maha-tauqeer",
]);
console.log("Custom Corporate Team:", customCorporateTeam);

export {
  growthStrategyTeam,
  corporateTeam,
  mustafaNadeem,
  allTeamMembers,
  allCorporateTeamMembers,
  subjectMatterExperts,
  customTeam,
  customCorporateTeam,
};
