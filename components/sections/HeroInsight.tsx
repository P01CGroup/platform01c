import React from 'react'
import ParallaxImage from '../ui/ParallaxImage'
import { formatDate } from '@/lib/utils/date-format'

interface HeroInsightProps {
  backgroundImage?: string
  className?: string
  title?: string
  excerpt?: string
  date?: string
  updatedDate?: string
}

const HeroInsight: React.FC<HeroInsightProps> = ({ 
  backgroundImage,
  title,
  excerpt,
  date,
  updatedDate,
  className = ''
}) => {
  return (
    <div className={`bg-dark text-white relative overflow-hidden z-10 ${className}`}>
      <div className="container h-[100dvh] md:h-[768px] flex justify-between items-end pb-10">
         {
          backgroundImage && (
            <ParallaxImage
            src={backgroundImage}
            alt="Background"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
            priority
            intensity={0.3}
          />
          )
         }
        <div className='absolute w-full h-1/2 left-0 bottom-0 -z-10 bg-gradient-to-t from-dark/50 to-dark/0'></div>
        <div className='flex flex-col justify-end items-start'>
            <h1 className='heading-3 w-full max-w-[750px] leading-snug'>
              {title}
            </h1>
            <p className='text-white/50 max-w-[600px]'>
              {excerpt}
            </p>
        </div>
        <div className='flex items-end gap-1 flex-col'>
         <span className='text-white/50'>
          Published On
         </span>
         <span className='text-white'>
            {formatDate(date, 'long')}
         </span>
         {updatedDate && updatedDate !== date && (
           <>
             <span className='text-white/30 text-sm mt-2'>
               Updated On
             </span>
             <span className='text-white/70 text-sm'>
               {formatDate(updatedDate, 'long')}
             </span>
           </>
         )}
        </div>
      </div>
    </div>
  )
}

export default HeroInsight