import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, ShieldCheck, Building2, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = ['all', 'Specialty Chemicals', 'Financial Infrastructure', 'Global Banking', 'Industrial Engineering', 'Infrastructure & Tech'];

  const filteredTestimonials = TESTIMONIALS.filter((t) => 
    selectedIndustry === 'all' || t.industry === selectedIndustry
  );

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] text-[#382E26] border-b border-[#E8DFD1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Prominently Featured Client Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A221B] tracking-tight">
            Endorsed by Global Enterprise Leaders
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] font-normal">
            Read how procurement leaders and brand managers at BASF, Clariant, NSDL, Rabobank, and SKF Bearing evaluate our leather goods manufacturing and supply performance.
          </p>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                selectedIndustry === ind
                  ? 'bg-[#8C532B] text-white shadow-sm'
                  : 'bg-white text-[#594B3F] hover:text-[#8C532B] border border-[#E8DFD1]'
              }`}
            >
              {ind === 'all' ? 'All Corporate Clients' : ind}
            </button>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD1] hover:border-[#8C532B] transition duration-300 flex flex-col justify-between shadow-sm relative group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#8C532B] text-[#8C532B]" />
                    ))}
                  </div>

                  {item.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-[#F2EADF] text-[#8C532B] rounded">
                      <ShieldCheck className="w-3 h-3 text-[#8C532B]" /> Verified Partner
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <Quote className="w-6 h-6 text-[#8C532B]/30 mb-2" />
                <p className="text-xs text-[#4A3E34] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#E8DFD1] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#2A221B]">
                      {item.authorName}
                    </h4>
                    <p className="text-[11px] text-[#8C532B] font-semibold">
                      {item.authorRole}
                    </p>
                    <p className="text-xs font-semibold text-[#6E6257] flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-[#8C532B]" /> {item.companyName}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] text-[10px] text-[#594B3F] flex items-center justify-between font-medium">
                  <span>Order: <strong className="text-[#2A221B]">{item.productSupplied}</strong></span>
                  <span className="font-semibold text-[#8C532B]">{item.orderVolume}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
