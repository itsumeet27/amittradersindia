import React from 'react';
import { Award, ArrowRight, PackageCheck, Building2, CheckCircle2 } from 'lucide-react';
import { CompanyProfile } from '../types';

interface HeroProps {
  profile?: CompanyProfile;
  onExploreCatalog: () => void;
  onRequestSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onExploreCatalog, onRequestSample }) => {
  return (
    <section className="relative bg-[#FAF7F2] text-[#382E26] overflow-hidden pt-10 pb-16 lg:py-20 border-b border-[#E8DFD1]">
      {/* Subtle luxury pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#8C532B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold tracking-wide">
              <Award className="w-4 h-4 text-[#8C532B]" />
              <span>{profile?.yearsInBusiness || '18+'} YEARS OF INDUSTRY EXPERTISE IN LEATHER MANUFACTURING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2A221B] leading-[1.15]">
              Master Craftsmen of <br />
              <span className="text-[#8C532B]">
                Full-Grain Leather Goods
              </span> <br />
              & Luxury Corporate Gifts
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#594B3F] max-w-2xl leading-relaxed font-normal">
              {profile?.subtitle || 'Amit Traders is a premier manufacturer and global exporter of bespoke executive leather laptop bags, trolley bags, wallets, passport holders, and customized corporate gift combos. Trusted by multinational industry leaders for craftsmanship and brand elegance.'}
            </p>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A3E34] font-medium pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C532B] shrink-0" />
                <span>100% Genuine Full-Grain Leather</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C532B] shrink-0" />
                <span>Low MOQs & Fast 48-Hr Sample Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C532B] shrink-0" />
                <span>Custom Logo Embossing & Laser Engraving</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8C532B] shrink-0" />
                <span>ISO 9001:2015 Quality Tested Manufacturing</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onExploreCatalog}
                className="px-7 py-3.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Product Catalog</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestSample}
                className="px-6 py-3.5 rounded-xl bg-[#F3ECE0] hover:bg-[#E8DFD1] text-[#2A221B] font-semibold text-sm border border-[#D9C8B4] transition flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4 text-[#8C532B]" />
                <span>Request Sample Kit</span>
              </button>
            </div>

            {/* Trusted Corporate Client Teaser */}
            <div className="pt-6 border-t border-[#E8DFD1] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6E6257]">
              <span className="font-semibold uppercase tracking-wider text-[#8C532B] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Preferred Vendor For:
              </span>
              <div className="flex flex-wrap items-center gap-3 font-semibold text-[#382E26]">
                <span>BASF</span> • <span>Clariant</span> • <span>NSDL</span> • <span>Rabobank</span> • <span>SKF Bearing</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-2.5 bg-[#FFFFFF] border border-[#E8DFD1] shadow-xl overflow-hidden group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                <img
                  src="/src/assets/images/hero_leather_catalog_1786125313308.jpg"
                  alt="Amit Traders Handcrafted Leather Catalog"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A221B]/60 via-transparent to-transparent opacity-60" />
                
                {/* Floating Craftsmanship Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8DFD1] flex items-center justify-between shadow-md">
                  <div>
                    <p className="text-xs font-bold text-[#2A221B]">The Sovereign Executive Suite</p>
                    <p className="text-[11px] text-[#594B3F]">Full-grain leather laptop bags & executive gift kits</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 bg-[#8C532B] text-white rounded">
                    INR Prices Available
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Metric Pill Card */}
            <div className="absolute -bottom-6 -left-4 sm:left-2 bg-white border border-[#E8DFD1] text-[#2A221B] p-3.5 rounded-xl shadow-lg flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#F3ECE0] border border-[#D9C8B4] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#8C532B]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#8C532B]">1,200,000+ Articles</p>
                <p className="text-[10px] text-[#6E6257]">Delivered with 99.8% QC Acceptance</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

