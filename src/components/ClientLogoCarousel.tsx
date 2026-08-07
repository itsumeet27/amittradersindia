import React, { useState } from 'react';
import { CLIENT_PARTNERS } from '../data/clients';
import { ClientPartner } from '../types';
import { Building2 } from 'lucide-react';

interface ClientLogoCarouselProps {
  onSelectClient: (client: ClientPartner) => void;
}

export const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({ onSelectClient }) => {
  const [, setHoveredClient] = useState<ClientPartner | null>(null);

  // Duplicate list for infinite loop CSS animation
  const carouselItems = [...CLIENT_PARTNERS, ...CLIENT_PARTNERS];

  return (
    <section id="clients-section" className="py-16 bg-[#FAF7F2] text-[#382E26] border-b border-[#E8DFD1] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Prestigious Corporate Partnerships</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2A221B]">
            Trusted Vendor to Global Industry Leaders
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] font-normal">
            For over 18+ years, Amit Traders has supplied customized leather articles and corporate gift suites to Fortune 500 multinationals. Click any partner logo below to inspect their case study.
          </p>
        </div>

        {/* Animated Infinite Logo Carousel */}
        <div className="relative w-full overflow-hidden py-4 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD1] shadow-sm">
          
          {/* Gradient Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex w-max animate-marquee space-x-8 items-center py-2">
            {carouselItems.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                onClick={() => onSelectClient(partner)}
                onMouseEnter={() => setHoveredClient(partner)}
                onMouseLeave={() => setHoveredClient(null)}
                className="group cursor-pointer relative flex flex-col items-center justify-center p-4 w-44 h-24 bg-[#FAF7F2] hover:bg-[#F3ECE0] rounded-xl border border-[#E8DFD1] hover:border-[#8C532B] transition-all duration-300 shadow-sm transform hover:-translate-y-1"
              >
                {/* SVG Logo Container */}
                <div 
                  className="w-32 h-10 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity text-[#2A221B]"
                  dangerouslySetInnerHTML={{ __html: partner.logoSvg }}
                />

                {/* Subtitle Badge */}
                <span className="text-[10px] text-[#6E6257] group-hover:text-[#8C532B] mt-2 font-medium tracking-wide transition-colors">
                  {partner.partnershipYears} Partnership
                </span>

                {/* Quick Case Study Badge on Hover */}
                <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] bg-[#8C532B] text-white font-bold px-1.5 py-0.5 rounded">
                  Case Study
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Marquee Animation CSS Keyframes Injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
