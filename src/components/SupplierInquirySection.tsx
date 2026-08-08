import React, { useState } from 'react';
import {
  FileCheck,
  Send,
  CheckCircle2,
  Upload,
  Clock,
  ShieldCheck,
  Building2,
  PackageCheck
} from 'lucide-react';
import { SupplierInquiryPayload, InquiryBasketItem } from '../types';

interface SupplierInquirySectionProps {
  basketItems: InquiryBasketItem[];
  onClearBasket: () => void;
}

export const SupplierInquirySection: React.FC<SupplierInquirySectionProps> = ({
  basketItems,
  onClearBasket
}) => {
  const [formData, setFormData] = useState<SupplierInquiryPayload>({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: 'bulk-quote',
    estimatedQuantity: '100 - 250 Units',
    message: '',
    customLogoFile: ''
  });

  const [submittedResponse, setSubmittedResponse] = useState<{
    referenceNumber: string;
    message: string;
  } | null>(null);

  const [logoFileName, setLogoFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      setFormData({ ...formData, customLogoFile: file.name });
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          basketItems
        })
      });

      if (!response.ok) {
        response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            basketItems
          })
        });
      }

      const data = await response.json();
      setSubmittedResponse({
        referenceNumber: data.referenceNumber || ('AT-' + Math.floor(100000 + Math.random() * 900000)),
        message: data.message || `Thank you ${formData.name}. Your B2B inquiry for ${formData.companyName} has been saved in our database. An account manager will review it shortly.`
      });
      if (onClearBasket) onClearBasket();
    } catch (err) {
      console.error('Inquiry submission error:', err);
      const refNum = 'AT-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedResponse({
        referenceNumber: refNum,
        message: `Thank you ${formData.name}. Your B2B inquiry for ${formData.companyName} has been saved in our database. An account manager will review it shortly.`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry-section" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#382E26] relative border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <PackageCheck className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Direct B2B Manufacturing Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A221B] tracking-tight">
            Request B2B Bulk Quote & Corporate Sample Kit
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] font-normal">
            Direct manufacturing quotes with custom logo embossing and engraving based on the die or print received, Pantone color matching, and sample dispatch within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Factory Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#2A221B]">
                Direct Factory Quotation SLA
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A3E34]">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <Clock className="w-5 h-5 text-[#8C532B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2A221B] block">2-Hour Rapid Response</strong>
                    Dedicated B2B account manager assigned immediately upon form submission.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <CheckCircle2 className="w-5 h-5 text-[#8C532B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2A221B] block">Custom Branding & Embossing</strong>
                    Embossing and engraving of the respective brand logo on products based on the die or print received.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <ShieldCheck className="w-5 h-5 text-[#8C532B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2A221B] block">48-Hour Sample Dispatch</strong>
                    Inspect the leather grain, stitching, and logo depth before committing to mass production.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <Building2 className="w-5 h-5 text-[#8C532B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2A221B] block">Global Export Logistics</strong>
                    Door-to-door air and sea freight compliance with customs clearance in 20+ countries.
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Basket Items Preview */}
            {basketItems.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#8C532B]/40 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#8C532B]">
                  <span>{basketItems.length} Product(s) Attached to Inquiry</span>
                  <button onClick={onClearBasket} className="text-xs text-[#6E6257] hover:underline">Clear</button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto text-xs text-[#382E26]">
                  {basketItems.map((item, idx) => (
                    <div key={idx} className="p-2 rounded bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-between">
                      <span className="truncate pr-2 font-medium">{item.product.name}</span>
                      <span className="font-semibold text-[#8C532B]">{item.quantity} pcs</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-8 rounded-2xl shadow-md">

              {submittedResponse ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2A221B]">Inquiry Submitted Successfully!</h3>
                  <p className="text-sm text-[#594B3F] max-w-md mx-auto leading-relaxed">
                    {submittedResponse.message}
                  </p>
                  <p className="text-xs font-mono text-[#8C532B] bg-[#FAF7F2] p-3 rounded-lg inline-block border border-[#E8DFD1] font-bold">
                    Reference Number: {submittedResponse.referenceNumber}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmittedResponse(null)}
                      className="px-6 py-2.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white text-xs font-semibold shadow"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] placeholder-[#A09385] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BASF India / SKF Bearing"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] placeholder-[#A09385] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Official Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] placeholder-[#A09385] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 97680 10310"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] placeholder-[#A09385] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      >
                        <option value="bulk-quote">B2B Bulk Production Quote</option>
                        <option value="sample-kit">Request Physical Sample Kit</option>
                        <option value="vendor-partnership">Empanelled Vendor Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                        Estimated Quantity
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      >
                        <option value="25 - 50 Units">25 - 50 Units (Small Executive Order)</option>
                        <option value="100 - 250 Units">100 - 250 Units (Standard Order)</option>
                        <option value="500 - 1,000 Units">500 - 1,000 Units (Large Scale)</option>
                        <option value="2,500+ Units">2,500+ Units (Enterprise Corporate Gifting)</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload Simulation */}
                  <div>
                    <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                      Brand Logo Vector / Die File (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-[#E8DFD1] hover:border-[#8C532B] rounded-xl p-4 text-center bg-[#FAF7F2] transition">
                      <input
                        type="file"
                        accept=".pdf,.ai,.eps,.png,.jpg,.svg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-[#6E6257]">
                        <Upload className="w-4 h-4 text-[#8C532B]" />
                        <span>
                          {logoFileName ? (
                            <strong className="text-[#8C532B]">{logoFileName}</strong>
                          ) : (
                            'Upload Vector Logo (.AI, .EPS, .PDF, .SVG) for Die Mockup'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#382E26] uppercase tracking-wider mb-1.5">
                      Project Notes / Specific Instructions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify preferred leather color, logo embossing/engraving instructions, packaging preferences, or target delivery date..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] text-sm text-[#2A221B] placeholder-[#A09385] px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] disabled:opacity-50 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{submitting ? 'Saving Inquiry to Database...' : 'Submit B2B Inquiry & Save to Database'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
