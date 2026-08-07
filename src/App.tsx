import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientLogoCarousel } from './components/ClientLogoCarousel';
import { CaseStudyModal } from './components/CaseStudyModal';
import { QualityComparison } from './components/QualityComparison';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Testimonials } from './components/Testimonials';
import { SupplierInquirySection } from './components/SupplierInquirySection';
import { InquiryBasketDrawer } from './components/InquiryBasketDrawer';
import { ContactForm } from './components/ContactForm';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Footer } from './components/Footer';

import { Product, ClientPartner, InquiryBasketItem, CompanyProfile, InquiryRecord } from './types';

const DEFAULT_PROFILE: CompanyProfile = {
  companyName: 'AMIT TRADERS',
  tagline: 'Master Craftsmen & Exporters of Full-Grain Leather Goods',
  subtitle: 'Manufacturers of Luxury Executive Laptop Bags, Wallets, Passport Holders & Custom Corporate Gift Sets Since 2008',
  heroDescription: 'Over 18 years of manufacturing excellence supplying Fortune 500 corporate clients across Mumbai, India and internationally. Complete OEM/ODM customization, low MOQs, and certified full-grain leather craftsmanship.',
  phone: '+91 (022) 2834-9000 / +91 98200 12345',
  email: 'corporate@amittraders.in',
  address: 'Unit #104-108, Leather Goods Industrial Complex, Andheri-Kurla Road, MIDC Industrial Area, Andheri East, Mumbai - 400093, Maharashtra, India.',
  gstNumber: '27AABCA1234F1Z0',
  yearsInBusiness: '18+',
  workingHours: 'Mon - Sat: 09:30 AM - 07:00 PM IST',
  whatsappNumber: '+91 98200 12345'
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dynamic Backend Data State
  const [profile, setProfile] = useState<CompanyProfile>(DEFAULT_PROFILE);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingBackend, setLoadingBackend] = useState<boolean>(true);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientPartner | null>(null);
  const [basketOpen, setBasketOpen] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Inquiry Basket state
  const [basketItems, setBasketItems] = useState<InquiryBasketItem[]>([]);

  // Prefilled variables for inquiry
  const [prefilledProduct, setPrefilledProduct] = useState<string>('');
  const [prefilledClient, setPrefilledClient] = useState<string>('');

  // Fetch backend data on mount
  const fetchBackendData = async () => {
    try {
      setLoadingBackend(true);
      let companyRes = await fetch('/api/company');
      if (!companyRes.ok) {
        companyRes = await fetch('/api/profile');
      }

      const [productsRes, inquiriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/inquiries')
      ]);

      if (companyRes.ok) {
        const pData = await companyRes.json();
        if (pData && pData.companyName) setProfile(pData);
      }

      if (productsRes.ok) {
        const prodData = await productsRes.json();
        if (Array.isArray(prodData)) {
          setProducts(prodData);
        }
      }

      if (inquiriesRes.ok) {
        const inqData = await inquiriesRes.json();
        if (Array.isArray(inqData)) {
          setInquiries(inqData);
        }
      }
    } catch (err) {
      console.error('Failed fetching data from backend API:', err);
    } finally {
      setLoadingBackend(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  const handleSaveProfile = async (newProfile: CompanyProfile) => {
    let res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile)
    });
    if (!res.ok) {
      res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
    }
    if (res.ok) await fetchBackendData();
  };

  const handleAddProduct = async (newProd: Partial<Product>) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    });
    if (res.ok) await fetchBackendData();
  };

  const handleUpdateProduct = async (id: string, updatedProd: Partial<Product>) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProd)
    });
    if (res.ok) await fetchBackendData();
  };

  const handleDeleteProduct = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) await fetchBackendData();
  };

  const handleUpdateInquiryStatus = async (id: string, status: InquiryRecord['status']) => {
    const res = await fetch(`/api/inquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) await fetchBackendData();
  };

  const handleAddToBasket = (newItem: InquiryBasketItem) => {
    setBasketItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === newItem.product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveBasketItem = (index: number) => {
    setBasketItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBasketQuantity = (index: number, newQty: number) => {
    setBasketItems(prev => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleScrollToInquiry = (productName?: string, clientName?: string) => {
    if (productName) setPrefilledProduct(productName);
    if (clientName) setPrefilledClient(clientName);

    const el = document.getElementById('inquiry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382E26] font-sans selection:bg-[#8C532B] selection:text-white">
      
      {/* Sticky Executive Header */}
      <Header
        profile={profile}
        basketCount={basketItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenBasket={() => setBasketOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Hero Showcase Section */}
      <Hero
        profile={profile}
        onExploreCatalog={handleExploreCatalog}
        onRequestSample={() => handleScrollToInquiry('Executive Physical Leather Sample Kit')}
      />

      {/* Animated Infinite Client Logo Carousel & Partnerships */}
      <ClientLogoCarousel
        onSelectClient={(client) => setSelectedClient(client)}
      />

      {/* Why Our Product Quality is Superior Comparison Matrix */}
      <QualityComparison />

      {/* Product Catalog Showcase & Filters */}
      <ProductCatalog
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToBasket={handleAddToBasket}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Prominently Featured Client Testimonials */}
      <Testimonials />

      {/* Supplier & Wholesale Custom Order Inquiry Section */}
      <SupplierInquirySection
        basketItems={basketItems}
        onClearBasket={() => setBasketItems([])}
      />

      {/* Contact Office & Manufacturing Location */}
      <ContactForm profile={profile} />

      {/* Footer */}
      <Footer
        profile={profile}
        onSelectCategory={setSelectedCategory}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* Product Detail & Spec Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBasket={handleAddToBasket}
        onRequestSampleDirect={(pName) => handleScrollToInquiry(pName)}
      />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
        onRequestSimilarQuote={(clientName) => handleScrollToInquiry(undefined, clientName)}
      />

      {/* RFP / Inquiry Basket Slide-over Drawer */}
      <InquiryBasketDrawer
        isOpen={basketOpen}
        onClose={() => setBasketOpen(false)}
        basketItems={basketItems}
        onRemoveItem={handleRemoveBasketItem}
        onUpdateQuantity={handleUpdateBasketQuantity}
        onProceedToInquiryForm={() => handleScrollToInquiry()}
      />

      {/* Gemini AI Corporate Helper Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Backend Admin Management Portal */}
      <AdminPortalModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        profile={profile}
        products={products}
        inquiries={inquiries}
        onSaveProfile={handleSaveProfile}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onRefreshData={fetchBackendData}
      />

    </div>
  );
}

