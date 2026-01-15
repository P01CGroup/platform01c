import React from 'react'
import ParallaxImage from '../ui/ParallaxImage'
import { BackgroundImages } from '@/lib/types'

interface HeroProps {
  backgroundImages?: BackgroundImages
  className?: string
}

const Hero: React.FC<HeroProps> = ({ 
  backgroundImages,
  className = ''
}) => {
  return (
    <div className={`bg-dark text-white relative overflow-hidden z-10 ${className}`}>
      <div className="container h-[100dvh] md:h-[768px] ">
          
        <ParallaxImage
          src="/the_firm.png"
          responsiveImages={backgroundImages}
          alt="Background"
          fill
          className="absolute inset-0 w-full h-full object-cover -z-10"
          priority
          intensity={0.3}
        />
          <div className='flex flex-col justify-end items-start h-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pb-10 md:pb-24 items-end'>
              <h1 className='heading-2 max-w-[550px] leading-snug'>
                Bespoke Solutions. 
                Real World Impact.
              </h1>
              <p className='text-white/70 pb-5'>
              We serve as consultants to some of the world's fastest-growing companies, visionary investors, forward-thinking corporations, and critical stakeholders across the region. Our edge lies in the depth of our global experience, sharp commercial instinct, and tailored solutions that go far beyond generic consulting playbooks.
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Hero