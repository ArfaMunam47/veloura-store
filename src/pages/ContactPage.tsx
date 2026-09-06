import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiries & Product Advice',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been received by our Concierge. We respond within 4 business hours.');
    setFormData({ name: '', email: '', subject: 'General Inquiries & Product Advice', message: '' });
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16 text-[#FAF9F5] bg-[#06110B]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
          Client Concierge & Salons
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-1">
          How may we assist your curation?
        </h1>
        <p className="text-xs sm:text-sm text-[#9DB4A7] mt-3 font-sans">
          Our senior stylists and atelier team are available Monday through Saturday to assist with sizing, bespoke inquiries, and worldwide shipping.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0A1C14] p-6 sm:p-10 border border-[#183C2A] rounded-xs shadow-xl">
          <h2 className="font-editorial text-2xl text-white font-normal mb-6">Send an Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Your Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full bg-[#06110B] border border-[#183C2A] p-3 text-white placeholder:text-[#9DB4A7]/60 focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                required
              />
            </div>
            <div>
              <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                className="w-full bg-[#06110B] border border-[#183C2A] p-3 text-white placeholder:text-[#9DB4A7]/60 focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                required
              />
            </div>
            <div>
              <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Inquiry Type</label>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#06110B] border border-[#183C2A] p-3 text-white focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
              >
                <option value="General Inquiries & Product Advice">General Inquiries & Product Advice</option>
                <option value="Private Salon Fitting Appointment">Private Salon Fitting Appointment</option>
                <option value="Order Status & Delivery Logistics">Order Status & Delivery Logistics</option>
                <option value="Returns & Archive Garment Care">Returns & Archive Garment Care</option>
                <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
              </select>
            </div>
            <div>
              <label className="block font-mono-luxury uppercase text-[10.5px] text-[#9DB4A7] mb-1">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe the pieces or assistance required..."
                className="w-full bg-[#06110B] border border-[#183C2A] p-3 text-white placeholder:text-[#9DB4A7]/60 focus:outline-hidden focus:border-[#D4AF37] rounded-xs"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C583] text-[#06110B] text-xs uppercase tracking-[0.16em] font-sans font-bold flex items-center justify-center gap-2 transition-colors shadow-md rounded-xs"
            >
              <Send size={13} strokeWidth={2} />
              <span>Transmit Inquiry</span>
            </button>
          </form>
        </div>

        {/* Boutique Salons & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A1C14] p-6 border border-[#183C2A] space-y-4 rounded-xs shadow-xl">
            <h3 className="font-editorial text-xl text-white font-normal">Global Atelier Salons</h3>
            <div className="space-y-4 text-xs text-[#9DB4A7]">
              <div className="pb-3 border-b border-[#183C2A]">
                <b className="text-[#D4AF37] block font-mono-luxury uppercase text-[11px]">LONDON MAYFAIR SALON</b>
                <p className="text-white">14 Mayfair Square, London W1J 8AJ, UK</p>
                <p className="text-[11px] text-[#9DB4A7] mt-0.5">Hours: Mon–Sat: 10:00 – 19:00</p>
                <p className="text-[11px] text-[#9DB4A7]">Tel: +44 (0) 20 7946 0912</p>
              </div>

              <div className="pb-3 border-b border-[#183C2A]">
                <b className="text-[#D4AF37] block font-mono-luxury uppercase text-[11px]">PARIS SAINT-HONORÉ SALON</b>
                <p className="text-white">742 Rue du Faubourg Saint-Honoré, 75008 Paris, France</p>
                <p className="text-[11px] text-[#9DB4A7] mt-0.5">Hours: Mon–Sat: 10:30 – 19:30</p>
                <p className="text-[11px] text-[#9DB4A7]">Tel: +33 1 42 68 55 00</p>
              </div>

              <div>
                <b className="text-[#D4AF37] block font-mono-luxury uppercase text-[11px]">MILAN VIA MONTENAPOLEONE</b>
                <p className="text-white">Via Montenapoleone 22, 20121 Milano, Italy</p>
                <p className="text-[11px] text-[#9DB4A7] mt-0.5">Hours: Tue–Sat: 10:00 – 19:00</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1C14] text-white p-6 border border-[#183C2A] text-xs space-y-1.5 rounded-xs shadow-xl">
            <span className="text-[#D4AF37] font-mono-luxury uppercase text-[10px] tracking-wider block">Direct Concierge Hotline</span>
            <p className="font-editorial text-lg text-[#E5C583] font-normal">+44 (0) 800 917 2840</p>
            <p className="text-[#9DB4A7] text-[11px]">Direct concierge response within 15 minutes during European business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
