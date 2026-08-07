import React from 'react';
import { COMPARISON_POINTS } from '../data/qualityComparison';
import { XCircle, CheckCircle2, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export const QualityComparison: React.FC = () => {
  return (
    <section id="quality-section" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#382E26] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Manufacturing Excellence & Quality Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A221B] tracking-tight">
            Why Our Product Quality is Superior
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] leading-relaxed font-normal">
            With 18+ years of specialized leather manufacturing experience, Amit Traders rejects cheap shortcuts. Compare our craftsmanship standards directly against common market suppliers.
          </p>
        </div>

        {/* Two Distinct Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT CARD: Standard Market Vendors */}
          <div className="bg-[#FFF8F8] border-2 border-[#F3D5D5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#F5E0E0]">
                <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#7F1D1D] tracking-tight">
                    Standard Market Vendors
                  </h3>
                  <p className="text-xs text-[#991B1B] font-medium">
                    Common compromise shortcuts in mass market supplies
                  </p>
                </div>
              </div>

              {/* Pointers List */}
              <div className="space-y-5">
                {COMPARISON_POINTS.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-xl bg-white border border-[#F8E2E2] space-y-1.5 shadow-2xl shadow-red-950/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="font-bold text-[#2A221B]">{idx + 1}. {item.featureName}</span>
                    </div>
                    <p className="text-xs text-[#6B5A5A] leading-relaxed pl-6">
                      {item.otherVendorsShortfall}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F5E0E0] text-center text-xs font-medium text-red-700/80">
              ⚠️ Common risk: Peeling leather, broken zippers, and torn linings within 6 months.
            </div>
          </div>

          {/* RIGHT CARD: Amit Traders Quality Standards */}
          <div className="bg-[#FFFFFF] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7EEDD] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-[#E8DFD1]">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE0] border border-[#D9C8B4] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#8C532B]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2A221B] tracking-tight">
                    Amit Traders Standards
                  </h3>
                  <p className="text-xs text-[#8C532B] font-semibold">
                    100% Genuine leather & engineered long-term durability
                  </p>
                </div>
              </div>

              {/* Pointers List */}
              <div className="space-y-5">
                {COMPARISON_POINTS.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] space-y-1.5 shadow-sm hover:border-[#8C532B]/40 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#8C532B]">
                        <CheckCircle2 className="w-4 h-4 text-[#8C532B] shrink-0" />
                        <span className="font-bold text-[#2A221B]">{idx + 1}. {item.featureName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8C532B] bg-[#F2EADF] px-2 py-0.5 rounded font-medium">
                        Verified QC
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3E34] leading-relaxed pl-6">
                      {item.amitTradersStandard}
                    </p>
                    <div className="pl-6 pt-1 text-[11px] text-[#8C532B] font-medium flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-[#8C532B]" />
                      <span>{item.technicalImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E8DFD1] text-center text-xs font-semibold text-[#8C532B]">
              ✨ Guaranteed: 10+ year product lifespan with 99.8% corporate client acceptance rate.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
