
# Team Data Management System

This directory contains the centralized team data management system for Platform01 Consulting. All team member information is now stored in a single location and can be easily accessed across all pages.

## Files

- `team-data.ts` - Main team data file containing all team member information and helper functions
- `team-data-example.ts` - Example usage of the team data system
- `README.md` - This documentation file

## Team Member Structure

Each team member has the following structure:

```typescript
interface TeamMember {
  id: string                    // Unique identifier (e.g., 'mustafa-nadeem')
  name: string                  // Full name (e.g., 'Mustafa Nadeem, CFA')
  image: {
    src: string                 // Image path (e.g., '/consulting-team/1.png')
    alt: string                 // Alt text for accessibility
  }
  text1: string                 // Primary role/title
  text2?: string                // Secondary role/specialization (optional)
  bioLink?: boolean             // Whether to show bio link (optional)
  keyPoints?: string[]          // Key points for display (optional)
  background?: string           // Professional background (optional)
  sectorsOfExpertise?: string   // Areas of expertise (optional)
  priorExperience?: string      // Previous experience (optional)
  education?: string            // Educational background (optional)
  professionalQualifications?: string // Professional certifications (optional)
}
```

## Available Team Members

### Consulting Team
- `mustafa-nadeem` - Managing Director, Consulting
- `saad-jilani` - Subject Matter Expert, Energy & Industrials
- `mohammad-ovais` - Subject Matter Expert, Infrastructure, Healthcare & logistics
- `shwetabh-sameer` - Subject Matter Expert, Technology & Venture Capital
- `shafi-akhund` - Senior Consultant, Real Estate
- `ali-shah-khawaja` - Manager, Consulting
- `sharan-raza` - Associate I, Strategy & Advisory
- `shammaas-abdullah` - Senior Analyst, Strategy & Advisory
- `mohammed-ashir` - Senior Analyst, Strategy & Advisory
- `muhammad-hasnain` - Analyst II, Strategy & Advisory
- `abdul-moiz` - Analyst I, Strategy & Advisory
- `muzna-zafar` - Junior Analyst, Strategy & Advisory
- `hamna-asghar` - Analyst I, Strategy & Advisory

### Corporate Team
- `omar-abedin` - Country Manager (Saudi Arabia)
- `maha-tauqeer` - Commercial Executive
- `emaan-asad-khan` - Commercial Executive
- `mirta-khan` - Commercial Executive
- `aruha-khan` - Manager HR & Culture
- `muhammad-shan` - Finance Manager
- `eliza-prendzov` - Advisor, Government Relations & Partnership (United States)
- `abdullah-alkhaldi` - Advisor (Saudi Arabia)

## Predefined Team Configurations

The system includes predefined team configurations for different pages:

### Strategy Services
- `growth-strategy` - Saad Jilani, Shwetabh Sameer, Mohammad Ovais, Shafi Akhund
- `feasibility-study` - Saad Jilani, Shwetabh Sameer, Mohammad Ovais, Shafi Akhund
- `business-plan` - Mustafa Nadeem, Saad Jilani, Shwetabh Sameer
- `real-estate-strategy` - Shafi Akhund, Saad Jilani, Mohammad Ovais

### Finance Services
- `ma-consulting` - Mustafa Nadeem, Ali Shah Khawaja, Shafi Akhund, Sharan Raza, Shammaas Abdullah, Mohammed Ashir
- `transaction-support` - Mustafa Nadeem, Shwetabh Sameer, Ali Shah Khawaja, Shafi Akhund
- `business-valuation` - Shwetabh Sameer, Ali Shah Khawaja, Shafi Akhund

### Capital Services
- `due-diligence` - Ali Shah Khawaja, Shwetabh Sameer, Saad Jilani
- `portfolio-valuation` - Ali Shah Khawaja, Shwetabh Sameer, Saad Jilani
- `value-creation` - Ali Shah Khawaja, Shwetabh Sameer, Saad Jilani

### Restructuring Services
- `restructuring-consulting` - Mustafa Nadeem, Saad Jilani, Shafi Akhund
- `turnaround-advisory` - Saad Jilani, Shwetabh Sameer, Shafi Akhund

### About Pages
- `consulting-team-primary` - Saad Jilani, Mohammad Ovais, Shwetabh Sameer
- `consulting-team-secondary` - Shafi Akhund, Ali Shah Khawaja, Sharan Raza, Shammaas Abdullah, Mohammed Ashir, Muhammad Hasnain, Abdul Moiz, Muzna Zafar, Hamna Asghar
- `corporate-team` - Omar Abedin, Maha Tauqeer, Emaan Asad Khan, Mirta Khan, Aruha Khan, Muhammad Shan
- `corporate-advisors` - Eliza Prendzov, Abdullah AlKhaldi

## Usage Examples

### Get team data for a specific page
```typescript
import { getTeamDataForPage } from '@/lib/data/team-data'

const teamData = getTeamDataForPage('growth-strategy')
```

### Get corporate team data for a specific page
```typescript
import { getCorporateTeamDataForPage } from '@/lib/data/team-data'

const corporateTeamData = getCorporateTeamDataForPage('corporate-team')
```

### Get a specific team member
```typescript
import { teamMembers } from '@/lib/data/team-data'

const mustafaNadeem = teamMembers['mustafa-nadeem']
```

### Get team members by specific IDs
```typescript
import { getTeamMembers } from '@/lib/data/team-data'

const customTeam = getTeamMembers(['mustafa-nadeem', 'saad-jilani', 'shwetabh-sameer'])
```

### Get all team members
```typescript
import { getAllTeamMembers } from '@/lib/data/team-data'

const allTeamMembers = getAllTeamMembers()
```

## Benefits

1. **Centralized Management**: All team data is stored in one place
2. **Easy Updates**: Update team member information once, and it's reflected everywhere
3. **Consistency**: Ensures consistent team member information across all pages
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Flexibility**: Easy to add new team members or modify existing ones
6. **Reusability**: Team configurations can be reused across different pages

## Adding New Team Members

To add a new team member:

1. Add their information to the `teamMembers` or `corporateTeamMembers` object in `team-data.ts`
2. Use a unique ID (e.g., 'firstname-lastname')
3. Include all required fields (id, name, image, text1)
4. Add optional fields as needed

## Modifying Team Configurations

To modify which team members appear on a specific page:

1. Find the relevant configuration in the `teamConfigs` object
2. Update the array of team member IDs
3. The changes will be reflected immediately on the page

## Migration Notes

All existing pages have been updated to use the centralized team data system. The old hardcoded team data arrays have been replaced with calls to the appropriate helper functions. 