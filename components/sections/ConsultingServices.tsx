'use client'

import { useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowRight from '../icons/ArrowRight';
import Link from 'next/link';
import Header from '../ui/header';
import parse from 'html-react-parser';
import { Target, TrendingUp, Building2, RefreshCw } from 'lucide-react';

const TABS_DATA = [
  {
    title: 'Strategy <br/> Consulting',
    cards: [
      { title: 'Feasibility Study', href: '/feasibility-study' },
      { title: 'Business Plan', href: '/best-business-plan-consultants' },
      { title: 'Growth Strategy', href: '/hire-growth-strategy-consultants' },
      { title: 'Brand Strategy', href: '/brand-strategy' },
      { title: 'Real Estate Strategy', href: '/real-estate-consulting' },
      { title: 'Market Research', href: '/market-research' },
    ],
  },
  {
    title: 'Corporate <br/>Finance Consulting',
    cards: [
      { title: 'Business Valuation', href: '/business-valuation-services' },
      { title: 'Transaction Support', href: '/transactions-advisory-services' },
      { title: 'M&A Consulting', href: '/ma-consulting-services' },
    ],
  },
  {
    title: 'Private <br/>Capital Consulting',
    cards: [
      { title: 'Commercial Due Diligence', href: '/commercial-due-diligence-services' },
      { title: 'Portfolio Valuation', href: '/portfolio-valuation-services' },
      { title: 'Value Creation', href: '/value-creation-strategy-services' },
    ],
  },
  {
    title: 'Turnaround <br/> & Restructuring',
    cards: [
      { title: 'Turnaround Advisory', href: '/turnaround-advisory' },
      { title: 'Restructuring Consulting', href: '/restructuring-consulting' },
    ],
  },
];

export default function ConsultingServices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white pb-16 pt-5">
      <div className="container">
        <Header text="Our Services" className="mb-26" />
        <div className="mb-10">
          <h2 className="heading-3 mb-4">Bespoke<br />Consulting Services</h2>
        </div>
        
        {/* Tab Headers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {TABS_DATA.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(idx)}
              className={`relative p-6 text-left transition-all duration-200 group border border-dark/10 cursor-pointer ${
                activeTab === idx
                  ? 'bg-surface text-dark'
                  : 'bg-white'
              }`}
            >
              {/* Icon for each service category */}
              <div className={`w-12 h-12 mb-8 flex items-center justify-center text-dark ${activeTab === idx ? 'bg-white' : 'bg-surface'} group-hover:text-primary transition-colors duration-200`}>
                {idx === 0 && <Target size={24} />}
                {idx === 1 && <TrendingUp size={24} />}
                {idx === 2 && <Building2 size={24} />}
                {idx === 3 && <RefreshCw size={24} />}
              </div>
              
              <h5 className="leading-tight">
                {parse(tab.title)}
              </h5>
              
              {/* Active indicator */}
              {/* {activeTab === idx && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              )} */}
            </button>
          ))}
        </div>
          <hr className='border-dark/10 my-8' />
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {TABS_DATA[activeTab].cards.map((card, cidx) => (
                <Link href={card.href} key={card.title}>
                  <motion.button
                    whileHover={{ scale: 1.025, backgroundColor: 'rgba(9,26,42,0.03)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="cursor-pointer flex flex-col items-end justify-start gap-5 px-6 py-6 border-b border-dark/10 bg-transparent w-full text-left group focus:outline-none hover:border-primary/20"
                  >
                    <span className="heading-6 text-dark transition-colors duration-200 w-full text-left">
                      {card.title.split(' ').length > 1 ? (
                        <span className="block">
                          {card.title.split(' ').slice(0, Math.ceil(card.title.split(' ').length / 2)).join(' ')}
                          <br />
                          {card.title.split(' ').slice(Math.ceil(card.title.split(' ').length / 2)).join(' ')}
                        </span>
                      ) : (
                        card.title
                      )}
                    </span>
                    <ArrowRight className="stroke-gray-400 group-hover:stroke-primary transition-colors duration-200" width={18} height={18} />
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 