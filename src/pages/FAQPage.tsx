import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where are Velora garments manufactured?',
      a: 'All Velora pieces are designed in London and manufactured in specialized, certified European partner ateliers. Our gabardine trench coats are tailored in Yorkshire, England; our leather goods are hand-stitched in Florence, Italy; and our fine knitwear is spun in Hawick, Scotland and Porto, Portugal.'
    },
    {
      q: 'What are your complimentary delivery thresholds and courier partners?',
      a: 'We provide complimentary carbon-neutral express delivery via DHL Green Express on all orders over $120. Orders below this threshold carry a flat $9.50 fee. For next-day delivery, Priority Air is available at checkout for $16.00.'
    },
    {
      q: 'What is the 30-day return and exchange policy?',
      a: 'We offer hassle-free 30-day returns on all unworn items with security tags attached in original packaging. Every order arrives with a prepaid return shipping label and archival garment bag. Refunds are processed to the original payment method within 3 business days of receipt.'
    },
    {
      q: 'How do I determine the right size for trench coats and outerwear?',
      a: 'Our trench coats and tailored overcoats are cut true to traditional British sizing with a clean, drape-enhancing silhouette that accommodates light knitwear underneath. If you prefer a tighter slim-fit, we recommend ordering one size down. You can also consult our interactive Size Guide on any product detail page.'
    },
    {
      q: 'Do you offer garment care and repair services for archive pieces?',
      a: 'Yes. As part of our commitment to permanence, we provide lifetime complimentary replacement horn buttons, minor seam repair, and leather conditioning advice for all authentic Velora garments. Contact our concierge at concierge@velora.com to arrange atelier servicing.'
    }
  ];

  return (
    <div id="faq-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 text-[#111111]">
      <div className="text-center">
        <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#6B6964]">
          Client Information
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#111111] font-normal mt-1">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6964] mt-2">
          Clear answers regarding delivery, craftsmanship, returns, and bespoke fitting appointments.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-[#E8E6E0] bg-[#FFFFFF] transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4"
            >
              <span className={`font-editorial text-lg sm:text-xl font-normal transition-colors ${openIdx === idx ? 'text-[#111111]' : 'text-[#2A2A2A]'}`}>
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`text-[#111111] transition-transform duration-300 shrink-0 ${
                  openIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B6964] font-sans leading-relaxed border-t border-[#E8E6E0] pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
