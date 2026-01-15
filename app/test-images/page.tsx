import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import ParallaxImage from '@/components/ui/ParallaxImage';

export default function TestImagesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Image Optimization Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Direct OptimizedImage with local image */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 1: Direct OptimizedImage (Local)</h2>
          <div className="relative w-64 h-48 bg-gray-200">
            <OptimizedImage
              src="/the_firm-desktop.png"
              alt="Test Hero Image"
              fill
              className="object-cover"
              priority
              quality={85}
              format="webp"
            />
          </div>
        </div>

        {/* Test 2: ParallaxImage with responsive images */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 2: ParallaxImage (Responsive)</h2>
          <div className="relative w-full h-64 bg-gray-200">
            <ParallaxImage
              responsiveImages={{
                mobile: "/the_firm-mobile.png",
                tablet: "/the_firm-tablet.png",
                desktop: "/the_firm-desktop.png",
                ultrawide: "/the_firm-ultrawide.png"
              }}
              alt="Test Responsive Hero"
              fill
              className="object-cover"
              priority
              intensity={0.1}
            />
          </div>
        </div>

        {/* Test 3: OptimizedImage with remote image */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 3: OptimizedImage (Remote)</h2>
          <div className="relative w-64 h-48 bg-gray-200">
            <OptimizedImage
              src="https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753889867089-pexels-julia-m-cameron-6995402.jpg"
              alt="Test Remote Image"
              fill
              className="object-cover"
              quality={85}
              format="webp"
            />
          </div>
        </div>

        {/* Test 4: Regular Next.js Image for comparison */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 4: Regular Next.js Image (Comparison)</h2>
          <div className="relative w-64 h-48 bg-gray-200">
            <img
              src="/the_firm-desktop.png"
              alt="Test Regular Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
