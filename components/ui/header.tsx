import React from 'react'
import parse from 'html-react-parser'

interface HeaderProps {
  text: string
  className?: string
}

const Header: React.FC<HeaderProps> = ({ text, className }) => {
  return (
    <div className={`text-sm border-t border-dark/10 pt-2 ${className}`}>{parse(text)}</div>
  )
}

export default Header