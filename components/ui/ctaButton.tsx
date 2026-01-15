import Link from 'next/link'
import React from 'react'
import ArrowRight from '../icons/ArrowRight'
import parse from 'html-react-parser'
import Image from 'next/image'
import CalendlyModalWrapper from './CalendlyModalWrapper';

const CTAButton = ({text, iconURL = '/icons/call.svg', link = 'https://calendly.com/p01consulting/30min'}: {text: string, iconURL?: string, link?: string}) => {
  const isCalendly = link && link.startsWith('https://calendly.com/p01consulting');
  const button = (
    <button
      type="button"
      className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition pl-6 pr-6 py-4 cursor-pointer backdrop-blur-sm"
    >
      <span className="flex items-center">
        <Image src={iconURL} alt="call" width={24} height={24} />
      </span>
      <span className="flex flex-col items-start text-left max-w-[150px] text-sm">
        {parse(text)}
      </span>
      <span className="ml-4">
        <ArrowRight className="w-6 h-6 stroke-white/50" />
      </span>
    </button>
  );
  if (isCalendly) {
    return <CalendlyModalWrapper>{button}</CalendlyModalWrapper>;
  }
  return <Link href={link} target='_blank'>{button}</Link>;
}

export default CTAButton