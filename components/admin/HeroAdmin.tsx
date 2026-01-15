import React, { Children } from 'react'
import parse from 'html-react-parser';

const HeroAdmin = ({title = "Hero Title", description = "Hero Description", children, haveChildren = false}: {title: string, description: string, children?: React.ReactNode, haveChildren?: boolean}) => {
  return (
    <div className='bg-dark'>
      <div className="container flex justify-between items-end pb-10">
        <div className='flex flex-col justify-end text-white h-[300px]'>
          <h1 className="heading-2">{parse(title)}</h1>
          <p className="mt-2 text-white/50">
              {description}
          </p>
        </div>
        {haveChildren && (
          <div>
            {children || null}
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroAdmin