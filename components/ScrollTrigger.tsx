'use client'

import React from 'react'

interface ScrollTriggerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  trigger?: 'once' | 'always'
  offset?: number
}

const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  trigger = 'once',
  offset = 0
}) => {
  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'data-scroll data-scroll-direction="vertical" data-scroll-speed="-1"'
      case 'down':
        return 'data-scroll data-scroll-direction="vertical" data-scroll-speed="1"'
      case 'left':
        return 'data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1"'
      case 'right':
        return 'data-scroll data-scroll-direction="horizontal" data-scroll-speed="1"'
      default:
        return 'data-scroll'
    }
  }

  const scrollProps = {
    'data-scroll': true,
    'data-scroll-speed': speed,
    'data-scroll-trigger': trigger,
    'data-scroll-offset': offset,
  }

  return (
    <div className={className} {...scrollProps}>
      {children}
    </div>
  )
}

export default ScrollTrigger 