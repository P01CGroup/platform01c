import React from 'react';

const steps = [
  {
    number: '01.',
    title: 'Preparation',
    items: [
      'Business Valuation',
      'Business Plan',
      'Marketing Materials',
    ],
  },
  {
    number: '02.',
    title: 'Buyer Origination',
    items: [
      'Buyer Fit Assessment',
      'Communication',
      'Letter of Intent',
    ],
  },
  {
    number: '03.',
    title: 'Deal Support',
    items: [
      'Negotiations',
      'Term Sheet',
      'Due Diligence',
    ],
  },
  {
    number: '04.',
    title: 'Deal Closing',
    items: [
      'Shareholder Agreement',
      'Post Deal Activities',
    ],
  },
];

const heading = 'Typical M&A Process';
const supportingText = 'Are you considering selling your business, raising capital, or divesting a non-core unit? We provide premium and exclusive M&A consulting services for mergers and acquisitions in UAE and Dubai. As a premier M&A advisory firm, we guide you through every stage of the transaction, helping you prepare, position, negotiate and support deals that deliver long-term value. Our expertise spans across diverse industries, making us one of the trusted mergers and acquisition companies in the region.';

export default function MAProcess() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 border-b border-dark/10 pb-4 items-end">
          <div className='md:col-span-1'>
            <p className='text-md text-dark/50'>Our Process</p>
          </div>
          <div className='flex gap-8 md:col-span-3'>
            <h2 className="heading-3 max-w-[470px]">{heading}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <p className='text-md text-dark/50 md:col-start-2 md:col-span-2 pt-4'>{supportingText}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 bg-[#F6F8FA] flex flex-col gap-16">
              <div>
                <h3 className='heading-3 text-dark/20'>{step.number}</h3>
                <h2 className='heading-5 max-w-[177px]'>{step.title}</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {step.items.map((item, i) => (
                  <li key={i} className="text-dark/50 text-base flex items-start">
                    <span className="mr-2">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 