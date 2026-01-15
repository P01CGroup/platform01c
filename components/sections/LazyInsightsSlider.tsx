'use client'

import dynamic from 'next/dynamic'

// Lazy load the InsightsSlider to reduce initial bundle size
const DynamicInsightsSlider = dynamic(() => import('./InsightsSlider').then(mod => ({ default: mod.DynamicInsightsSlider })), {
  loading: () => (
    <div className="py-20 bg-light">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

interface LazyInsightsSliderProps {
  bgSurface?: boolean
}

const LazyInsightsSlider: React.FC<LazyInsightsSliderProps> = (props) => {
  return <DynamicInsightsSlider {...props} />
}

export default LazyInsightsSlider
