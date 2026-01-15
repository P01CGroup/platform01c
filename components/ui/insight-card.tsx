import React from 'react'
import OptimizedImage from './OptimizedImage'
import Link from 'next/link'
import parse from 'html-react-parser';
import { formatDate } from '@/lib/utils/date-format';

export type Insight = {
  image: string;
  date: string;
  updatedDate?: string;
  title: string;
  excerpt: string;
  author: string;
  coAuthor: string;
  slug: string;
};

interface InsightCardProps {
  insight: Insight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link href={`/insights/${insight.slug}`} className="block h-full">
      <div className="h-full flex flex-col gap-8 hover:opacity-90 transition-opacity duration-200 cursor-pointer">
        <div className="relative w-full h-56" style={{ aspectRatio: '16/9' }}>
          <OptimizedImage 
            src={insight.image} 
            alt={insight.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-56 object-cover" 
            quality={85}
            format="webp"
            placeholder="empty"
          />
        </div>
        <div className='flex flex-col gap-5'>
          <div className="text-xs text-dark/50">
            {formatDate(insight.date, 'short')}
            {insight.updatedDate && insight.updatedDate !== insight.date && (
              <span className="ml-2 text-dark/30">
                • Updated {formatDate(insight.updatedDate, 'short')}
              </span>
            )}
          </div>
          <hr className='border-dark/10' />
          <div>
            <h3 className="heading-5 leading-snug text-dark line-clamp-2">{parse(insight.title)}</h3>
            <div className="text-dark/50 line-clamp-4">{parse(insight.excerpt)}</div>
          </div>
          <hr className='border-dark/10' />
          <div className="text-xs text-dark/50">
            {parse(`Author: <span class="text-dark">${insight.author}</span>,<br />`)}
            {insight.coAuthor
              ? parse(`Co-Author: <span class="text-dark">${insight.coAuthor}</span>`)
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
} 