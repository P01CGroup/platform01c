import React from 'react'
import parse from 'html-react-parser'

const HeroInner = ({title = 'Hero Title', supportingText = ''}: {title?: string, supportingText?: string}) => {
  return (
    <div className='bg-surface text-dark relative overflow-hidden z-10'>
        <div className="container">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-end items-end h-full pt-44 pb-20 min-h-[350px]'>
                <h1 className='heading-3 max-w-[550px]'>{parse(title)}</h1>
                <p className='text-dark/50'>{parse(supportingText)}</p>
            </div>
        </div>
    </div>
  )
}

export default HeroInner