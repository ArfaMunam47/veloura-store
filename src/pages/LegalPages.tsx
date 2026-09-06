import React from 'react';

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-[#6B6964] font-sans leading-relaxed">
    <h1 className="font-editorial text-4xl text-[#111111] font-normal mb-6">Privacy Policy & Client Data Charter</h1>
    <p><b className="text-[#111111]">Last Updated:</b> May 2025</p>
    <p>
      At Velora, we maintain strict confidentiality regarding your personal data. We do not sell, rent, or monetize client email addresses, browsing behavior, or purchase records with third-party advertising brokers.
    </p>
    <h2 className="font-editorial text-2xl text-[#111111] font-normal pt-4">1. Data Collected for Logistics</h2>
    <p>
      We collect your shipping name, physical address, and telephone number exclusively for courier dispatch (DHL, Royal Mail, FedEx) and order status communications. Payment data is tokenized securely via 256-bit encrypted gateways and never stored in plain text.
    </p>
    <h2 className="font-editorial text-2xl text-[#111111] font-normal pt-4">2. Your Right to Erasure</h2>
    <p>
      You may request immediate erasure of your customer profile and mailing list registration at any time by emailing concierge@velora.com.
    </p>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-[#6B6964] font-sans leading-relaxed">
    <h1 className="font-editorial text-4xl text-[#111111] font-normal mb-6">Terms of Service & Conditions</h1>
    <p><b className="text-[#111111]">Last Updated:</b> May 2025</p>
    <p>
      By accessing the Velora digital boutique or purchasing our creations, you agree to the conditions set forth herein.
    </p>
    <h2 className="font-editorial text-2xl text-[#111111] font-normal pt-4">1. Limited Batch Production</h2>
    <p>
      Garments are crafted in numbered seasonal batches. In the rare event that an item becomes unavailable following order placement, you will be notified immediately and issued a prompt full refund.
    </p>
    <h2 className="font-editorial text-2xl text-[#111111] font-normal pt-4">2. Return Condition Requirements</h2>
    <p>
      Returned garments must remain unworn, unwashed, unaltered, and fitted with all original security tags and archival garment bags.
    </p>
  </div>
);
