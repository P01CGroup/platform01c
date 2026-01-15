import React from 'react'

interface CheckMarkProps {
  className?: string
  width?: number
  height?: number
}

const CheckMark: React.FC<CheckMarkProps> = ({ 
  className = "stroke-dark", 
  width = 18, 
  height = 18 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M20 7L9 18L4 13" 
        className={className}
        strokeWidth="2" 
        strokeLinecap="square" 
        strokeLinejoin="round"/>
    </svg>
  )
}

export default CheckMark 