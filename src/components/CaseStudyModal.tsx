import React from 'react';
import { ClientPartner } from '../types';
import { X, PackageCheck, Quote } from 'lucide-react';

interface CaseStudyModalProps {
  client: ClientPartner | null;
  onClose: () => void;
  onRequestSimilarQuote: (clientName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  client,
  onClose,
  onRequestSimilarQuote
}) => {
  if (!client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF7F2] text-[#382E26] border border-[#E8DFD1] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F3ECE0] hover:bg-[#E8DFD1] text-[#6E6257] hover:text-[#2A221B] transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E8DFD1]">
          <div 
            className="w-24 h-12 p-2 bg-white rounded-xl border border-[#E8DFD1] flex items-center justify-center shrink-0"
            dangerouslySetInnerHTML={{ __html: client.logoSvg }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#F2EADF] text-[#8C532B] rounded">
                {client.partnershipYears} Partnership
              </span>
              <span className="text-xs text-[#6E6257]">{client.industry}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2A221B] mt-1">
              {client.name} Executive Partnership Case Study
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 text-sm text-[#4A3E34]">
          
          {/* Title */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFD1]">
            <p className="text-xs text-[#8C532B] font-bold uppercase tracking-wider mb-1">Project Name</p>
            <p className="text-base font-bold text-[#2A221B]">{client.caseStudy.title}</p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD1]">
              <p className="text-xs text-[#8C532B] font-bold uppercase tracking-wider mb-2">Corporate Challenge</p>
              <p className="text-xs text-[#594B3F] leading-relaxed">{client.caseStudy.challenge}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8DFD1]">
              <p className="text-xs text-[#8C532B] font-bold uppercase tracking-wider mb-2">Amit Traders Solution</p>
              <p className="text-xs text-[#594B3F] leading-relaxed">{client.caseStudy.solution}</p>
            </div>
          </div>

          {/* Delivered Volume & Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD1] flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-[#8C532B] shrink-0" />
              <div>
                <p className="text-[11px] text-[#6E6257] uppercase font-semibold">Total Volume Delivered</p>
                <p className="text-base font-bold text-[#2A221B]">{client.caseStudy.deliveredVolume}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD1]">
              <p className="text-[11px] text-[#6E6257] uppercase font-semibold mb-1">Custom Articles Manufactured</p>
              <div className="flex flex-wrap gap-1">
                {client.caseStudy.productTypes.map((type, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-[#FAF7F2] text-[#382E26] rounded border border-[#E8DFD1] font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Client Quote */}
          <div className="p-5 rounded-xl bg-white border border-[#8C532B]/30 relative my-4 shadow-sm">
            <Quote className="w-8 h-8 text-[#8C532B]/20 absolute top-3 right-3" />
            <p className="text-sm italic text-[#2A221B] relative z-10 leading-relaxed mb-3">
              "{client.caseStudy.quote}"
            </p>
            <div>
              <p className="text-xs font-bold text-[#8C532B]">{client.caseStudy.author}</p>
              <p className="text-[11px] text-[#6E6257]">{client.caseStudy.designation}</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6E6257]">
              Interested in similar corporate leather solutions for your organization?
            </p>
            <button
              onClick={() => {
                onRequestSimilarQuote(client.name);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-semibold text-xs shadow transition flex items-center justify-center gap-2"
            >
              <span>Request Quote for {client.name} Style Kit</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
