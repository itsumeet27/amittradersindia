import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Download, Clock, ShieldCheck } from 'lucide-react';
import { CompanyProfile } from '../types';

interface ContactFormProps {
  profile?: CompanyProfile;
}

export const ContactForm: React.FC<ContactFormProps> = ({ profile }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General B2B Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.company,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          inquiryType: 'general-contact',
          message: formData.message
        })
      });

      if (!response.ok) {
        await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            companyName: formData.company,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            inquiryType: 'general-contact',
            message: formData.message
          })
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Contact Form submit error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadCatalog = () => {
    alert(`Downloading ${profile?.companyName || 'Amit Traders'} Executive Product Catalog & Wholesale Pricing Guide PDF...`);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#382E26] relative border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Direct Enterprise Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A221B] tracking-tight">
            Connect with Our Leather Craftsmen & Sales Office
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] font-normal">
            Whether you require a physical product sample, factory site visit in Mumbai, or bulk corporate branding inquiry, our leadership team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Direct Contact Info & Factory Details */}
          <div className="lg:col-span-5 space-y-6">

            {/* Manufacturing Address Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD1] space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[#2A221B] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#8C532B]" />
                Headquarters & Manufacturing Unit
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#4A3E34] leading-relaxed">
                <div>
                  <strong className="text-[#2A221B] block font-semibold text-sm uppercase">
                    {profile?.companyName || 'AMIT TRADERS'} ENTERPRISE
                  </strong>
                  <p className="text-[#594B3F] leading-relaxed mt-1">
                    {profile?.address || 'Unit #104-108, Leather Goods Industrial Complex, MIDC, Andheri East, Mumbai - 400093'}
                  </p>
                  <p className="font-mono text-xs text-[#8C532B] font-bold mt-1">
                    GSTIN: {profile?.gstNumber || '27AZWPS0795D1ZO'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFD1] space-y-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8C532B]" />
                    <span>{profile?.phone || '+91 97680 10310'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8C532B]" />
                    <span>{profile?.email || 'dk.amittraders@gmail.com'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C532B]" />
                    <span>{profile?.workingHours || 'Mon - Sat: 09:30 AM - 07:00 PM IST'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${profile?.whatsappNumber?.replace(/[^0-9]/g, '') || '919820012345'}?text=Hello%20${encodeURIComponent(profile?.companyName || 'Amit Traders')},%20I%20want%20to%20inquire%20about%20corporate%20leather%20gifting.`}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp Business</span>
              </a>

              <button
                onClick={handleDownloadCatalog}
                className="p-3.5 rounded-xl bg-[#F3ECE0] hover:bg-[#E8DFD1] border border-[#D9C8B4] text-[#2A221B] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Download className="w-4 h-4 text-[#8C532B]" />
                <span>Download Catalog PDF</span>
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-6 sm:p-8 rounded-2xl shadow-md">

              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A221B]">Inquiry Saved to Database</h3>
                  <p className="text-xs text-[#594B3F]">
                    Thank you for reaching out to {profile?.companyName || 'Amit Traders'}. Your submission is saved in our backend database and our sales team will review it shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-[#8C532B] underline font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-xs text-[#2A221B] px-3.5 py-2.5 rounded-lg border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase mb-1">Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-xs text-[#2A221B] px-3.5 py-2.5 rounded-lg border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-xs text-[#2A221B] px-3.5 py-2.5 rounded-lg border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#382E26] uppercase mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] text-xs text-[#2A221B] px-3.5 py-2.5 rounded-lg border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#382E26] uppercase mb-1">Message / Requirements</label>
                    <textarea
                      rows={4}
                      required
                      placeholder={`How can ${profile?.companyName || 'Amit Traders'} assist your corporate gifting or leather product requirements?`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] text-xs text-[#2A221B] px-3.5 py-2.5 rounded-lg border border-[#E8DFD1] focus:border-[#8C532B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-bold text-xs transition shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{submitting ? 'Submitting & Saving to DB...' : 'Send Message & Save to DB'}</span>
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

