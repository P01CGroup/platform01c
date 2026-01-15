import React from 'react';
import OptimizedImage from './OptimizedImage';

interface CredentialCardProps {
  category: string;
  title: string;
}

// Map category to icon path (add more as needed)
const categoryIconMap: Record<string, string> = {
  // Business Services
  BusinessValuation: '/services/tablet/business-valuation.png',
  PortfolioValuation: '/services/tablet/portfolio-valuation.png',
  CommercialDueDiligence: '/services/tablet/commercial-due-deligence.png',
  FeasibilityStudy: '/services/tablet/feasibility-study.png',
  GrowthStrategy: '/services/tablet/growth-strategy.png',
  MAConsulting: '/services/tablet/ma-consulting.png',
  RealEstateService: '/services/tablet/real-estate.png',
  Restructuring: '/services/tablet/restructuring.png',
  TransactionSupport: '/services/tablet/transaction-support.png',
  TurnaroundAdvisory: '/services/tablet/turnaround-advisory.png',
  ValueCreation: '/services/tablet/value-creation.png',
  RealEstate: '/services/tablet/real-estate.png',

  Consumer: '/industry/consumer.png',
  Education: '/industry/education.png',
  Energy: '/industry/energy.png',
  Entertainment: '/industry/entertainment.png',
  Food: '/industry/food.png',
  Healthcare: '/industry/healthcare.png',
  Industrial: '/industry/industrial.png',
  Infrastructure: '/industry/infrastructure.png',
  Logistics: '/industry/logistics.png',
  Technology: '/industry/technology.png',
  // Add more mappings as needed
};

const getCategoryIcon = (category: string) => {
  // Normalize category string (remove spaces, case-insensitive)
  const key = category.replace(/\s+/g, '').replace(/&/g, '').replace(/-/g, '').replace(/_/g, '').toLowerCase();
  for (const mapKey in categoryIconMap) {
    if (mapKey.toLowerCase() === key) {
      return categoryIconMap[mapKey];
    }
  }
  return '/the_firm-tablet.png';
};

const CredentialCard: React.FC<CredentialCardProps> = ({ category, title }) => {
  const tags = category.split(',').map(tag => tag.trim());
  const iconSrc = getCategoryIcon(tags[0] || '');
  return (
    <div className="bg-white border border-dark/10 h-full flex flex-col gap-2 relative -z-10">
      <div className="flex items-center flex-col gap-2relative">
        <div className='relative aspect-3/2 w-full'>
          <OptimizedImage
            src={iconSrc}
            fill
            alt={tags[0] + ' icon'}
            className="object-cover "
            quality={85}
            format="webp"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className='p-4 pt-2 flex-1 flex flex-col gap-2 justify-between'>
        <div className="heading-6 leading-snug text-dark text-base mt-1">
          {title}
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] uppercase tracking-wider text-dark/40 font-semibold bg-dark/5 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredentialCard; 