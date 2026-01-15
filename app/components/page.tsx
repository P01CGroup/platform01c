'use client'

import React from 'react'
import { Button } from '../../components/ui/button'
import ArrowRight from '../../components/icons/ArrowRight'
import ParallaxImage from '../../components/ui/ParallaxImage'

const Components = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <ParallaxImage
          src="/design_system.png"
          alt="Background"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
          intensity={0.3}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white pt-16 md:pt-0" >
          <h2 className="heading-2 mb-6">Design System</h2>
          <p className="text-lg max-w-2xl mx-auto text-white/50">
            Explore our comprehensive component library with smooth scroll animations
          </p>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-20 bg-surface">
        <div className='container mx-auto p-8'>
          <div className="space-y-20">
          
            <div>
              <h2 className="mb-8 border-b pb-4 border-stroke/20 heading-2 text-center">Typography</h2>
              <div className="space-y-6">
                <h1>H1 Heading (100/130)</h1>
                <h2>H2 Heading (59/130)</h2>
                <h3>H3 Heading (44.4/130)</h3>
                <h4>H4 Heading (29.6/130)</h4>
                <h5>H5 Heading (22/130)</h5>
                <h6>H6 Heading (18/130)</h6>
              </div>
            </div>

            {/* Body Text Section */}
            <div>
              <h2 className="mb-8 border-b pb-4 border-stroke/20 heading-2 text-center">Body Text</h2>
              <div className="space-y-6">
                <p className="text-lg">Body Large (24/Auto). Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-md">Body Medium (16/Auto). Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-sm">Body Small (14/Auto). Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>


            {/* Buttons Section */}
              <div>
                <h2 className="mb-8 border-b pb-4 border-stroke/20 heading-2 text-center">Interactive Elements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 bg-white border border-stroke/20 p-4 gap-4 rounded-lg">
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button>Contact Us</Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="secondary">Contact Us</Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="tertiary">Contact Us</Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="ghost">Contact Us</Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button size="icon">Contact Us <ArrowRight /></Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="secondary" size="icon">Contact Us <ArrowRight /></Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="tertiary" size="icon">Contact Us <ArrowRight className='stroke-stroke/20'/></Button>
                  </div>
                  <div className='flex justify-start items-center p-4 bg-surface rounded-lg'>
                      <Button variant="ghost" size="icon">Contact Us <ArrowRight className='stroke-stroke/20'/></Button>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Components