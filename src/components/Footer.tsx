import React from 'react';
import { Building2, ShieldCheck, Award, PhoneCall, Mail, MapPin, Sparkles } from 'lucide-react';
import { CompanyProfile } from '../types';

interface FooterProps {
  profile?: CompanyProfile;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onSelectCategory }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#382E26] border-t border-[#E8DFD1] text-xs">

      {/* Top Value Strip */}
      <div className="border-b border-[#E8DFD1] py-8 bg-[#F3ECE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#D9C8B4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#2A221B] text-sm">{profile?.yearsInBusiness || '18+'} Years Legacy</p>
              <p className="text-[11px] text-[#6E6257]">Master leather manufacturing since 2008</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#D9C8B4] text-[#8C532B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#2A221B] text-sm">ISO 9001:2015 Quality</p>
              <p className="text-[11px] text-[#6E6257]">5-stage physical leather inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#D9C8B4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#2A221B] text-sm">Preferred Corporate Vendor</p>
              <p className="text-[11px] text-[#6E6257]">Empanelled with BASF, SKF, NSDL, Rabobank</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#D9C8B4] text-[#8C532B] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#2A221B] text-sm">Custom Branding</p>
              <p className="text-[11px] text-[#6E6257]">Embossing & engraving based on die/print</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Col 1: Brand Info */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-[#2A221B] tracking-wide uppercase">{profile?.companyName || 'AMIT TRADERS'}</span>
          </div>

          <p className="text-xs text-[#594B3F] leading-relaxed">
            {profile?.tagline || 'Leading Indian manufacturer, wholesaler, and exporter of high-grade genuine leather goods, corporate gift sets, executive luggage, and promotional articles.'}
          </p>

          <p className="text-[11px] font-semibold text-[#8C532B]">
            GSTIN: {profile?.gstNumber || '27AZWPS0795D1ZO'} • Trusted Supplier
          </p>
        </div>

        {/* Col 2: Product Categories */}
        <div className="md:col-span-3 space-y-3">
          <p className="font-bold text-[#2A221B] uppercase tracking-wider text-xs">Product Categories</p>
          <ul className="space-y-2 text-xs text-[#594B3F]">
            <li>
              <button onClick={() => { onSelectCategory('laptop-bags'); scrollTo('catalog-section'); }} className="hover:text-[#8C532B] transition">
                Laptop Bags & Laptop Trolleys
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('gents-wallet'); scrollTo('catalog-section'); }} className="hover:text-[#8C532B] transition">
                Gents Wallets & Passport Holders
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('card-holder'); scrollTo('catalog-section'); }} className="hover:text-[#8C532B] transition">
                Card Holders & Leather Accessories
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('backpack-nylon'); scrollTo('catalog-section'); }} className="hover:text-[#8C532B] transition">
                Backpacks (Nylon Material)
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('annual-diary'); scrollTo('catalog-section'); }} className="hover:text-[#8C532B] transition">
                Annual Diaries & Executive Combos
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Client Case Studies */}
        <div className="md:col-span-2 space-y-3">
          <p className="font-bold text-[#2A221B] uppercase tracking-wider text-xs">Major Partners</p>
          <ul className="space-y-2 text-xs text-[#594B3F]">
            <li>BASF Chemical Group</li>
            <li>Clariant Specialities</li>
            <li>NSDL Financial Depository</li>
            <li>Rabobank International</li>
            <li>SKF Bearing India</li>
          </ul>
        </div>

        {/* Col 4: Sales Office Contact */}
        <div className="md:col-span-3 space-y-3">
          <p className="font-bold text-[#2A221B] uppercase tracking-wider text-xs">Sales & Manufacturing</p>
          <div className="space-y-2 text-xs text-[#594B3F]">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#8C532B]" /> {profile?.phone || '+91 97680 10310'}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8C532B]" /> {profile?.email || 'dk.amittraders@gmail.com'}
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8C532B] shrink-0 mt-0.5" />
              <span>{profile?.address || 'Andheri East MIDC, Mumbai, Maharashtra 400093, India'}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E8DFD1] py-4 bg-[#F3ECE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6E6257]">
          <p>© {new Date().getFullYear()} {profile?.companyName || 'Amit Traders'}. All Rights Reserved. Master Craftsmen of Leather Goods & Gift Articles.</p>
          <div className="flex items-center gap-4">
            <a href="#quality-section" className="hover:text-[#8C532B]">Quality Standards</a>
            <span>•</span>
            <a href="#inquiry-section" className="hover:text-[#8C532B]">Bulk Orders</a>
            <span>•</span>
            <a href="#contact-section" className="hover:text-[#8C532B]">Manufacturing Unit</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

