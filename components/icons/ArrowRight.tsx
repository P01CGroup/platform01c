import React from 'react'

interface ArrowRightProps {
  className?: string
  width?: number
  height?: number
}

const ArrowRight: React.FC<ArrowRightProps> = ({ 
  className = "stroke-white", 
  width = 18, 
  height = 18 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M6 15L12 9L6 3" 
        className={className}
        strokeWidth="1.5" 
        strokeLinecap="square" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowRight 