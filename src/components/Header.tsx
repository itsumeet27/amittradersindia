import React, { useState } from 'react';
import { Menu, X, PhoneCall, ShieldCheck, Building2, ShoppingBag, Database } from 'lucide-react';
import { CompanyProfile } from '../types';

interface HeaderProps {
  profile: CompanyProfile;
  basketCount: number;
  onOpenBasket: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  basketCount,
  onOpenBasket,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] text-[#382E26] shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#8C532B] text-white py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#F3ECE0] text-[#8C532B] px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider">
              {profile.yearsInBusiness} Yrs Heritage
            </span>
            <span className="truncate">{profile.tagline}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-[#F2EADF]">
            <span className="flex items-center gap-1 font-mono text-[11px] text-white bg-black/20 px-2 py-0.5 rounded">
              GSTIN: {profile.gstNumber}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F3ECE0]" /> ISO 9001:2015
            </span>
            <a href={`tel:${profile.phone}`} className="hover:text-white transition flex items-center gap-1 font-semibold text-white">
              <PhoneCall className="w-3 h-3" /> {profile.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div>
            <span className="font-bold text-2xl tracking-tight text-[#2A221B] uppercase">
              {profile.companyName}
            </span>
            <p className="text-[10px] text-[#8C532B] tracking-widest uppercase font-semibold">
              {profile.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#594B3F]">
          <button 
            onClick={() => scrollToSection('catalog-section')} 
            className="hover:text-[#8C532B] transition-colors py-1"
          >
            Product Catalog
          </button>

          <button 
            onClick={() => scrollToSection('quality-section')} 
            className="hover:text-[#8C532B] transition-colors py-1"
          >
            Why Our Quality
          </button>

          <button 
            onClick={() => scrollToSection('clients-section')} 
            className="hover:text-[#8C532B] transition-colors py-1"
          >
            Clients & Cases
          </button>

          <button 
            onClick={() => scrollToSection('inquiry-section')} 
            className="hover:text-[#8C532B] transition-colors py-1"
          >
            Bulk Orders
          </button>

          <button 
            onClick={() => scrollToSection('contact-section')} 
            className="hover:text-[#8C532B] transition-colors py-1"
          >
            Contact
          </button>
        </nav>

        {/* Header Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#F2EADF] text-[#382E26] hover:text-[#8C532B] border border-[#E8DFD1]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD1] px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2 text-sm font-medium pt-2">
            <button 
              onClick={() => scrollToSection('catalog-section')}
              className="p-2.5 rounded-lg bg-[#F3ECE0] border border-[#E8DFD1] text-left text-[#2A221B]"
            >
              Product Catalog
            </button>
            <button 
              onClick={() => scrollToSection('quality-section')}
              className="p-2.5 rounded-lg bg-[#F3ECE0] border border-[#E8DFD1] text-left text-[#2A221B]"
            >
              Why Our Quality
            </button>
            <button 
              onClick={() => scrollToSection('clients-section')}
              className="p-2.5 rounded-lg bg-[#F3ECE0] border border-[#E8DFD1] text-left text-[#2A221B]"
            >
              Key Clients
            </button>
            <button 
              onClick={() => scrollToSection('inquiry-section')}
              className="p-2.5 rounded-lg bg-[#F3ECE0] border border-[#E8DFD1] text-left text-[#2A221B]"
            >
              Bulk Orders
            </button>
            <button 
              onClick={() => scrollToSection('contact-section')}
              className="p-2.5 rounded-lg bg-[#F3ECE0] border border-[#E8DFD1] text-left text-[#2A221B]"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 border-t border-[#E8DFD1] text-xs text-[#6E6257]">
            <a href={`tel:${profile.phone}`} className="flex items-center gap-1 text-[#8C532B] font-semibold">
              <PhoneCall className="w-3.5 h-3.5" /> Call Sales Direct: {profile.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

