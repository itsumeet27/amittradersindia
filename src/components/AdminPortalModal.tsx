import React, { useState, useEffect } from 'react';
import { CompanyProfile, Product, InquiryRecord, ProductCategory } from '../types';
import { X, Building, Package, Inbox, RefreshCw, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Save, ExternalLink } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CompanyProfile;
  products: Product[];
  inquiries: InquiryRecord[];
  onSaveProfile: (newProfile: CompanyProfile) => Promise<void>;
  onAddProduct: (newProd: Partial<Product>) => Promise<void>;
  onUpdateProduct: (id: string, updatedProd: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onUpdateInquiryStatus: (id: string, status: InquiryRecord['status']) => Promise<void>;
  onRefreshData: () => Promise<void>;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  profile,
  products,
  inquiries,
  onSaveProfile,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateInquiryStatus,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'inquiries'>('profile');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Editable Profile State
  const [profileForm, setProfileForm] = useState<CompanyProfile>(profile);

  // New / Editing Product State
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'laptop-bags',
    tagline: '',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    description: '',
    minOrderQuantity: 25,
    estimatedPricePerUnit: '₹2,500 - ₹3,800 / unit',
    specs: {
      leatherGrade: '100% Full-Grain Vegetable Tanned Cowhide',
      dimensions: '40cm x 30cm x 8cm',
      hardware: 'Solid Antique Brass',
      lining: 'Custom Jacquard Twill',
      warranty: '5-Year Manufacturer Warranty'
    },
    availableColors: [
      { name: 'Cognac Brown', hex: '#8B4513' },
      { name: 'Obsidian Black', hex: '#1C1B1A' }
    ]
  });

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSaveProfile(profileForm);
      showNotification('Company profile updated successfully in Database!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    setLoading(true);
    try {
      if (editingProductId) {
        await onUpdateProduct(editingProductId, productForm);
        showNotification('Product updated in Database!');
      } else {
        await onAddProduct(productForm);
        showNotification('New product added to Database & Catalog!');
      }
      setIsProductFormOpen(false);
      setEditingProductId(null);
      setProductForm({
        name: '',
        category: 'laptop-bags',
        tagline: '',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
        description: '',
        minOrderQuantity: 25,
        estimatedPricePerUnit: '₹2,500 - ₹3,800 / unit',
        specs: {
          leatherGrade: '100% Full-Grain Vegetable Tanned Cowhide',
          dimensions: '40cm x 30cm x 8cm',
          hardware: 'Solid Antique Brass',
          lining: 'Custom Jacquard Twill',
          warranty: '5-Year Manufacturer Warranty'
        },
        availableColors: [
          { name: 'Cognac Brown', hex: '#8B4513' },
          { name: 'Obsidian Black', hex: '#1C1B1A' }
        ]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setIsProductFormOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] text-[#382E26] border border-[#E8DFD1] rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#2A221B] text-white flex items-center justify-between border-b border-[#382E26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C532B] flex items-center justify-center text-white font-bold text-lg shadow-md">
              AT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white">Amit Traders Backend & DB Portal</h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#8C532B]/30 border border-[#8C532B] text-[#E8DFD1] font-semibold">
                  Live DB Sync Active
                </span>
              </div>
              <p className="text-xs text-[#D9C8B4]">
                Manage Company Profile, Product Catalog & View Form Submissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                setLoading(true);
                await onRefreshData();
                setLoading(false);
                showNotification('Data re-synced with Database!');
              }}
              className="p-2 rounded-lg bg-[#382E26] hover:bg-[#4A3E34] text-[#E8DFD1] transition flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh DB Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#382E26] hover:bg-[#4A3E34] text-[#E8DFD1] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F3ECE0] border-b border-[#E8DFD1] px-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 font-semibold text-xs border-b-2 flex items-center gap-2 transition ${
              activeTab === 'profile'
                ? 'border-[#8C532B] text-[#8C532B] bg-[#FAF7F2]'
                : 'border-transparent text-[#6E6257] hover:text-[#2A221B]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Company Profile & GST Details</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 font-semibold text-xs border-b-2 flex items-center gap-2 transition ${
              activeTab === 'products'
                ? 'border-[#8C532B] text-[#8C532B] bg-[#FAF7F2]'
                : 'border-transparent text-[#6E6257] hover:text-[#2A221B]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-4 font-semibold text-xs border-b-2 flex items-center gap-2 transition ${
              activeTab === 'inquiries'
                ? 'border-[#8C532B] text-[#8C532B] bg-[#FAF7F2]'
                : 'border-transparent text-[#6E6257] hover:text-[#2A221B]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Form Submissions & Email Logs ({inquiries.length})</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-[#E2F1E4] border-b border-[#B8E0BD] px-6 py-2.5 text-xs font-bold text-[#1E562A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1E562A]" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: COMPANY PROFILE EDIT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-[#2A221B] border-b border-[#E8DFD1] pb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#8C532B]" />
                  Core Business & Header Branding
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Company Name</label>
                    <input
                      type="text"
                      value={profileForm.companyName}
                      onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] font-semibold text-[#2A221B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">GSTIN Number</label>
                    <input
                      type="text"
                      value={profileForm.gstNumber}
                      onChange={(e) => setProfileForm({ ...profileForm, gstNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] font-mono text-[#8C532B] font-bold"
                      placeholder="27AABCA1234F1Z0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#594B3F] mb-1">Header Tagline</label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#594B3F] mb-1">Main Subtitle</label>
                  <textarea
                    rows={2}
                    value={profileForm.subtitle}
                    onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-[#2A221B] border-b border-[#E8DFD1] pb-2">
                  Contact & Office Location Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Official Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Phone Numbers</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#594B3F] mb-1">Manufacturing Address</label>
                  <textarea
                    rows={2}
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Years in Industry</label>
                    <input
                      type="text"
                      value={profileForm.yearsInBusiness}
                      onChange={(e) => setProfileForm({ ...profileForm, yearsInBusiness: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={profileForm.workingHours}
                      onChange={(e) => setProfileForm({ ...profileForm, workingHours: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Company Profile to DB</span>
              </button>
            </form>
          )}

          {/* TAB 2: MANAGE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#2A221B]">Product Catalog DB Management</h3>
                  <p className="text-xs text-[#6E6257]">
                    Add new products or edit existing items stored in DB.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({
                      name: '',
                      category: 'laptop-bags',
                      tagline: '',
                      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
                      description: '',
                      minOrderQuantity: 25,
                      estimatedPricePerUnit: '₹2,500 - ₹3,800 / unit',
                      specs: {
                        leatherGrade: '100% Full-Grain Vegetable Tanned Cowhide',
                        dimensions: '40cm x 30cm x 8cm',
                        hardware: 'Solid Antique Brass',
                        lining: 'Custom Jacquard Twill',
                        warranty: '5-Year Manufacturer Warranty'
                      },
                      availableColors: [
                        { name: 'Cognac Brown', hex: '#8B4513' },
                        { name: 'Obsidian Black', hex: '#1C1B1A' }
                      ]
                    });
                    setIsProductFormOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-bold text-xs shadow transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product to DB</span>
                </button>
              </div>

              {/* Add / Edit Product Form Panel */}
              {isProductFormOpen && (
                <form onSubmit={handleProductSubmit} className="p-6 rounded-2xl bg-white border border-[#8C532B]/30 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1]">
                    <h4 className="font-bold text-sm text-[#8C532B]">
                      {editingProductId ? 'Edit Product Details' : 'Add New Product to Database'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsProductFormOpen(false)}
                      className="text-[#6E6257] hover:text-[#2A221B]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#594B3F] mb-1">Product Title</label>
                      <input
                        type="text"
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] font-semibold text-[#2A221B]"
                        placeholder="e.g. Executive Leather Portfolio"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#594B3F] mb-1">Category</label>
                      <select
                        value={productForm.category || 'laptop-bags'}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] font-semibold text-[#2A221B]"
                      >
                        <option value="laptop-bags">Laptop Bags</option>
                        <option value="laptop-trolley-bags">Laptop Trolley Bags</option>
                        <option value="gents-wallet">Gents Wallets</option>
                        <option value="passport-holder">Passport Holders</option>
                        <option value="card-holder">Card Holders</option>
                        <option value="backpack-nylon">Nylon Backpacks</option>
                        <option value="annual-diary">Annual Diaries & Folders</option>
                        <option value="combo">Gift Combos</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#594B3F] mb-1">Estimated Unit Price</label>
                      <input
                        type="text"
                        value={productForm.estimatedPricePerUnit || ''}
                        onChange={(e) => setProductForm({ ...productForm, estimatedPricePerUnit: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#8C532B] font-bold"
                        placeholder="₹1,200 - ₹2,500 / unit"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#594B3F] mb-1">Min Order Quantity (MOQ)</label>
                      <input
                        type="number"
                        value={productForm.minOrderQuantity || 25}
                        onChange={(e) => setProductForm({ ...productForm, minOrderQuantity: parseInt(e.target.value, 10) || 25 })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#594B3F] mb-1">Image URL</label>
                      <input
                        type="text"
                        value={productForm.image || ''}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={productForm.tagline || ''}
                      onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      placeholder="Short 1-line headline"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#594B3F] mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] text-[#2A221B]"
                      placeholder="Detailed manufacturing specification..."
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsProductFormOpen(false)}
                      className="px-4 py-2 rounded-lg bg-[#FAF7F2] text-[#6E6257] hover:bg-[#E8DFD1] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2 rounded-lg bg-[#8C532B] hover:bg-[#A06334] text-white text-xs font-bold shadow"
                    >
                      {editingProductId ? 'Save Changes' : 'Create Product'}
                    </button>
                  </div>
                </form>
              )}

              {/* Products List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-xl bg-white border border-[#E8DFD1] flex gap-4 items-center shadow-sm relative group">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-lg object-cover border border-[#E8DFD1] shrink-0"
                    />
                    <div className="flex-1 min-w-0 pr-16">
                      <span className="text-[10px] uppercase font-bold text-[#8C532B] px-1.5 py-0.5 rounded bg-[#F2EADF]">
                        {prod.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#2A221B] truncate mt-1">{prod.name}</h4>
                      <p className="text-[11px] text-[#6E6257] truncate">{prod.tagline}</p>
                      <p className="text-[11px] font-bold text-[#8C532B] mt-1">{prod.estimatedPricePerUnit} | MOQ: {prod.minOrderQuantity} Units</p>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <button
                        onClick={() => startEditProduct(prod)}
                        className="p-1.5 rounded bg-[#FAF7F2] hover:bg-[#E8DFD1] text-[#382E26]"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete product "${prod.name}" from DB?`)) {
                            await onDeleteProduct(prod.id);
                            showNotification('Product removed from Database!');
                          }
                        }}
                        className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIEW INQUIRIES & SUBMISSIONS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#2A221B]">Customer Form Submissions</h3>
                  <p className="text-xs text-[#6E6257]">
                    All RFP form submissions are stored directly in the backend database.
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 p-6 rounded-2xl bg-white border border-[#E8DFD1]">
                  <Inbox className="w-12 h-12 text-[#D9C8B4] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#2A221B]">No submissions yet</p>
                  <p className="text-xs text-[#6E6257] mt-1">
                    When visitors submit quotes or request samples on the website, their details are saved in the backend database and will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-5 rounded-xl bg-white border border-[#E8DFD1] shadow-sm space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD1] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#8C532B] px-2 py-0.5 rounded bg-[#F2EADF]">
                              Ref #{inq.referenceNumber}
                            </span>
                            <span className="text-xs font-bold text-[#2A221B]">{inq.name}</span>
                            <span className="text-xs text-[#6E6257]">({inq.companyName || 'Individual'})</span>
                          </div>
                          <p className="text-[11px] text-[#8C532B] font-semibold mt-0.5">
                            Received: {new Date(inq.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* DB Saved Status Indicator */}
                          <span className="text-[10px] px-2 py-1 rounded font-semibold flex items-center gap-1 bg-green-100 text-green-800 border border-green-200">
                            <CheckCircle2 className="w-3 h-3 text-green-600" /> Saved in Database
                          </span>

                          <select
                            value={inq.status || 'new'}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as InquiryRecord['status'])}
                            className="text-xs px-2.5 py-1 rounded-lg border border-[#E8DFD1] bg-[#FAF7F2] font-semibold text-[#2A221B]"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="fulfilled">Status: Fulfilled</option>
                            <option value="archived">Status: Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#594B3F]">
                        <div>
                          <span className="text-[#8C532B] font-semibold">Email: </span>
                          <a href={`mailto:${inq.email}`} className="underline font-medium hover:text-[#8C532B]">{inq.email}</a>
                        </div>
                        <div>
                          <span className="text-[#8C532B] font-semibold">Phone: </span>
                          <a href={`tel:${inq.phone}`} className="font-medium hover:text-[#8C532B]">{inq.phone}</a>
                        </div>
                        <div>
                          <span className="text-[#8C532B] font-semibold">Inquiry Type: </span>
                          <span className="font-semibold uppercase text-[#2A221B]">{inq.inquiryType}</span>
                        </div>
                      </div>

                      {/* Requested Items */}
                      {inq.itemsSummary && inq.itemsSummary.length > 0 && (
                        <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] text-xs space-y-1">
                          <p className="font-bold text-[#2A221B] text-[11px] uppercase tracking-wider">Requested Items:</p>
                          <ul className="list-disc list-inside space-y-0.5 text-[#594B3F]">
                            {inq.itemsSummary.map((item, idx) => (
                              <li key={idx}>
                                <span className="font-semibold text-[#2A221B]">{item.productName}</span> - Quantity: <span className="font-bold text-[#8C532B]">{item.quantity}</span> ({item.color})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Message */}
                      <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] text-xs">
                        <p className="text-[11px] font-bold text-[#8C532B] uppercase mb-1">Client Message / Specs:</p>
                        <p className="text-[#382E26] whitespace-pre-line">{inq.message || 'No additional message provided.'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
