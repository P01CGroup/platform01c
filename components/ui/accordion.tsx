'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import parse from 'html-react-parser';

export interface AccordionItem {
  title: string;
  description?: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={item.title} className="border-b border-dark/10 last:border-b-0 flex items-start gap-10">
            <div className='text-sm py-[20px] '>
              {(idx + 1).toString().padStart(2, '0')}.
            </div>
            <div className='flex-1'>
              <button
                className={`cursor-pointer w-full text-left py-4 flex items-center justify-between border-none outline-none `}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
                style={{ borderRadius: 0 }}
              >
                <span className="heading-5 select-none">{parse(item.title)}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-dark">
                    <path d="M6 8L10 12L14 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && item.description && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: 'auto', opacity: 1 },
                      collapsed: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 text-dark/50 text-base">
                      {parse(item.description as string)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
} 