import React from 'react';
import { ShieldCheck, Award, Feather } from 'lucide-react';
import heroImage from '../assets/images/hero_editorial_look_1788344791123.jpg';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page-container" className="space-y-16 sm:space-y-24 pb-20 text-[#FAF9F5] bg-[#06110B]">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Maison Heritage & Ethos
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal mt-2 leading-tight">
            The art of considered garments.
          </h1>
          <p className="text-xs sm:text-base text-[#9DB4A7] mt-4 font-sans leading-relaxed">
            Velora Atelier was founded with an unyielding commitment to longevity, honest raw materials, and multi-generational European craftsmanship.
          </p>
        </div>

        <div className="relative aspect-[21/9] bg-[#0A1C14] overflow-hidden border border-[#183C2A] rounded-xs shadow-2xl">
          <img
            src={heroImage}
            alt="Velora atelier craftsmanship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-90 contrast-105"
          />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <span className="font-mono-luxury text-[11px] text-[#D4AF37] uppercase tracking-wider block mb-2">
              Genesis • 2019
            </span>
            <h2 className="font-editorial text-3xl text-white font-normal leading-snug">
              In an era of fleeting trends, we chose permanence.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#9DB4A7] leading-relaxed font-sans">
            <p>
              Every garment carrying the Velora seal begins its journey not on a trend board, but in the archives of weaving mills in Yorkshire and Biella. We believe luxury is measured not by marketing volume, but by how a wool coat hangs from your shoulders after five winters of rain and snow.
            </p>
            <p>
              By producing in small, numbered drops, we eliminate overproduction inventory. Our partners are independent, family-owned ateliers where master cutters earn fair European wages and uphold centuries of tactile knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#0A1C14] border border-[#183C2A] space-y-4 rounded-xs shadow-md">
            <Feather size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
            <h3 className="font-editorial text-2xl text-white font-normal">Natural Traceability</h3>
            <p className="text-xs text-[#9DB4A7] leading-relaxed">
              We exclusively use GOTS-certified organic cotton, RMS-certified mohair, and vegetable-tanned Tuscan calfskin with zero toxic chromium runoff.
            </p>
          </div>

          <div className="p-8 bg-[#0A1C14] border border-[#183C2A] space-y-4 rounded-xs shadow-md">
            <Award size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
            <h3 className="font-editorial text-2xl text-white font-normal">Generational Ateliers</h3>
            <p className="text-xs text-[#9DB4A7] leading-relaxed">
              Our tailoring is executed in Yorkshire; our leather goods are stitched in Florence; our fine knitwear is spun in Hawick, Scotland.
            </p>
          </div>

          <div className="p-8 bg-[#0A1C14] border border-[#183C2A] space-y-4 rounded-xs shadow-md">
            <ShieldCheck size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
            <h3 className="font-editorial text-2xl text-white font-normal">Archive Care Pledge</h3>
            <p className="text-xs text-[#9DB4A7] leading-relaxed">
              We offer complimentary button replacement, seam re-stitching, and leather conditioning for all verified archive pieces.
            </p>
          </div>
        </div>
      </section>

      {/* Atelier Tour Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1C14] text-white p-8 sm:p-14 border border-[#183C2A] flex flex-col md:flex-row items-center justify-between gap-8 rounded-xs shadow-xl">
          <div>
            <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
              Private Salons
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
              Experience the craftsmanship in person.
            </h2>
            <p className="text-xs text-[#9DB4A7] mt-2 max-w-md">
              Book a private fitting appointment at our Mayfair, London or Rue du Faubourg Saint-Honoré, Paris locations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-[0.16em] font-sans font-bold transition-colors shrink-0 rounded-xs shadow-md"
          >
            Book Private Fitting
          </button>
        </div>
      </section>
    </div>
  );
};
