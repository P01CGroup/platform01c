import React from 'react'
import CheckMark from '../icons/CheckMark'

const ChecklistItem = ({text, className}: {text: string, className?: string}) => {
  return (
    <div className={`flex items-center justify-start gap-5 ${className}`}>
        <div className='min-w-[24px] min-h-[24px]'> 
          <CheckMark />
        </div>
        <h4 className='heading-6'>
            {text}
        </h4>
    </div>
  )
}

export default ChecklistItem