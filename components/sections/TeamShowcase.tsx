import { div } from 'framer-motion/client'
import React from 'react'
import Header from '../ui/header'
import parse from 'html-react-parser'

const TeamShowcase = ({children, className, title = 'Our Team', heading = 'Our Team', supportingText = 'Team Supporting Text', bgSurface = false, FourColumn = false, noHeader = false}: {children: React.ReactNode, className?: string, title?: string, heading?: string, supportingText?: string, bgSurface?: boolean, FourColumn?: boolean, noHeader?: boolean}) => {
  return (
    <div className={`${className} pb-26 pt-5 ${bgSurface ? 'bg-surface' : ''}`}>
      <div className={`container ${noHeader ? 'pt-26' : ''}`}>
        {!noHeader && <Header className='mb-26' text={title}/>}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
            <div className={`mb-16 ${FourColumn ? 'md:col-span-4' : 'md:col-start-2 md:col-span-3'}`}>
              <h2 className={`heading-3 ${FourColumn ? 'md:max-w-1/3' : 'md:max-w-1/2'}`}>
                {parse(heading)}
              </h2>
              <p className={`text-md text-dark/50 ${FourColumn ? 'md:max-w-2/3' : 'md:max-w-1/2'} ml-auto`}>
                {parse(supportingText)}
              </p>
              
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10 ${FourColumn ? 'md:col-span-4 md:grid-cols-4' : 'md:col-start-2 md:col-span-3  '}`}>
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default TeamShowcase