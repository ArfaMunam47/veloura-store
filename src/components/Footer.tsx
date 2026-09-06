import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      showToast('Thank you for subscribing to Velora Editorial communications.');
      setEmail('');
    } else {
      showToast('Please provide a valid email address.');
    }
  };

  return (
    <footer id="main-footer" className="bg-[#050E09] text-[#FAF9F5] pt-16 pb-12 border-t border-[#183B2B] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#183B2B]">
          <div className="lg:col-span-5">
            <span className="font-editorial text-3xl tracking-[0.18em] uppercase font-normal text-white block">
              VELORA
            </span>
            <span className="text-[10px] font-mono-luxury uppercase tracking-[0.25em] text-[#D4AF37] block mt-1">
              HAUTE ATELIER & 3D STUDIO
            </span>
            <p className="mt-3 text-xs sm:text-[13px] text-[#9DB4A7] leading-relaxed max-w-md font-sans">
              Considered bespoke tailoring, pure cashmere knitwear, and handcrafted Tuscan leather goods engineered for generational permanence and timeless elegance.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#091C13] p-6 sm:p-7 border border-[#1E4A35] rounded-xs shadow-xl">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
                Editorial Dispatch
              </span>
              <h3 className="font-editorial text-xl text-white font-normal">
                Receive private invitations to seasonal runway capsules & bespoke archive releases.
              </h3>
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your confidential email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-[#06110B] border border-[#214D37] px-4 py-2.5 text-xs text-white placeholder:text-[#6C8578] focus:outline-hidden focus:border-[#D4AF37] font-sans rounded-xs"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 rounded-xs shadow-md"
                >
                  <span>Request Invitation</span>
                  <ArrowRight size={12} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#183B2B] text-xs">
          {/* Col 1 */}
          <div>
            <h4 className="font-mono-luxury text-[10.5px] uppercase tracking-[0.18em] text-[#E5C583] mb-3.5">
              Disciplines
            </h4>
            <ul className="space-y-2 text-[#9DB4A7]">
              <li>
                <button
                  onClick={() => onNavigate('shop', { group: 'Women' })}
                  className="hover:text-white transition-colors"
                >
                  Women’s Ready-to-Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { group: 'Men' })}
                  className="hover:text-white transition-colors"
                >
                  Men’s Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { group: 'Footwear' })}
                  className="hover:text-white transition-colors"
                >
                  Handcrafted Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { group: 'Accessories' })}
                  className="hover:text-white transition-colors"
                >
                  Tuscan Leather Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { cat: 'perfume' })}
                  className="hover:text-white transition-colors"
                >
                  Haute Parfumerie & Scents
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-mono-luxury text-[10.5px] uppercase tracking-[0.18em] text-[#E5C583] mb-3.5">
              Maison
            </h4>
            <ul className="space-y-2 text-[#9DB4A7]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Atelier Philosophy & Lineage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Sustainable Mills & Traceability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  European Artisan Guilds
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-mono-luxury text-[10.5px] uppercase tracking-[0.18em] text-[#E5C583] mb-3.5">
              Concierge Service
            </h4>
            <ul className="space-y-2 text-[#9DB4A7]">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Order Status & Insured Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  Worldwide Carbon-Neutral Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  30-Day Atelier Return Privilege
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Private Salon Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-mono-luxury text-[10.5px] uppercase tracking-[0.18em] text-[#E5C583] mb-3.5">
              Atelier Management
            </h4>
            <ul className="space-y-2 text-[#9DB4A7]">
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-[#E5C583] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Atelier Operations Console</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Client Account Dashboard
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E998C] gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Maison
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-white transition-colors"
            >
              Accessibility
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={13} strokeWidth={1.5} className="text-[#D4AF37]" />
            <span>© {new Date().getFullYear()} Velora Haute Atelier. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
