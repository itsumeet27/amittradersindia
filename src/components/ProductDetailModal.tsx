import React, { useState } from 'react';
import { Product, InquiryBasketItem } from '../types';
import { 
  X, 
  Check, 
  PackageCheck, 
  ShoppingBag
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBasket: (item: InquiryBasketItem) => void;
  onRequestSampleDirect: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToBasket,
  onRequestSampleDirect
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]?.name || 'Default');
  const [orderQuantity, setOrderQuantity] = useState(product.minOrderQuantity);
  const [selectedLogoStyle, setSelectedLogoStyle] = useState(product.customizationOptions[0] || 'Brand Embossing / Engraving');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = () => {
    onAddToBasket({
      product,
      quantity: orderQuantity,
      selectedColor,
      customLogoType: selectedLogoStyle
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF7F2] text-[#382E26] border border-[#E8DFD1] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F3ECE0] hover:bg-[#E8DFD1] text-[#6E6257] hover:text-[#2A221B] transition"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Lightbox */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#E8DFD1] relative">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded border border-[#E8DFD1] text-xs font-semibold text-[#8C532B]">
                MOQ: {product.minOrderQuantity} Pcs
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-[#8C532B]' : 'border-[#E8DFD1] opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Highlights Box */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] space-y-2 text-xs text-[#594B3F]">
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1.5">
                <span className="text-[#6E6257]">Material Grade:</span>
                <span className="font-semibold text-[#2A221B]">{product.specs.leatherGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1.5">
                <span className="text-[#6E6257]">Hardware Finish:</span>
                <span className="font-semibold text-[#2A221B]">{product.specs.hardware}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DFD1] pb-1.5">
                <span className="text-[#6E6257]">Inner Lining:</span>
                <span className="font-semibold text-[#2A221B]">{product.specs.lining}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6257]">Warranty:</span>
                <span className="font-semibold text-[#8C532B]">{product.specs.warranty}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order & Customization Options */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C532B]">
                Category: {product.category.replace('-', ' ')}
              </span>
              <h2 className="text-2xl font-bold text-[#2A221B] mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#6E6257] mt-1 italic">
                "{product.tagline}"
              </p>
              <p className="text-sm font-bold text-[#8C532B] mt-2">
                Estimated Price: {product.estimatedPricePerUnit}
              </p>
            </div>

            <p className="text-xs text-[#4A3E34] leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Features Checklist */}
            <div>
              <p className="text-xs font-bold text-[#2A221B] uppercase tracking-wider mb-2">Key Craft Features</p>
              <ul className="space-y-1.5 text-xs text-[#594B3F]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8C532B] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selector */}
            <div>
              <p className="text-xs font-bold text-[#2A221B] uppercase tracking-wider mb-2">Available Colors</p>
              <div className="flex items-center gap-3">
                {product.availableColors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition ${
                      selectedColor === col.name
                        ? 'border-[#8C532B] bg-[#F2EADF] text-[#2A221B] font-semibold'
                        : 'border-[#E8DFD1] bg-white text-[#6E6257]'
                    }`}
                  >
                    <span style={{ backgroundColor: col.hex }} className="w-3.5 h-3.5 rounded-full border border-black/10" />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Branding Style */}
            <div>
              <p className="text-xs font-bold text-[#2A221B] uppercase tracking-wider mb-2">Custom Branding Options</p>
              <div className="flex flex-wrap gap-2">
                {product.customizationOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLogoStyle(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      selectedLogoStyle === opt
                        ? 'border-[#8C532B] bg-[#8C532B] text-white'
                        : 'border-[#E8DFD1] bg-white text-[#594B3F]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#2A221B]">Select B2B Order Quantity</p>
                <p className="text-[10px] text-[#6E6257]">Min Order Quantity: {product.minOrderQuantity} Pcs</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOrderQuantity(Math.max(product.minOrderQuantity, orderQuantity - 25))}
                  className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] font-bold text-[#2A221B]"
                >
                  -
                </button>
                <span className="w-16 text-center font-bold text-sm text-[#8C532B]">
                  {orderQuantity}
                </span>
                <button
                  onClick={() => setOrderQuantity(orderQuantity + 25)}
                  className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] font-bold text-[#2A221B]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`w-full py-3 rounded-xl font-semibold text-xs transition shadow flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#8C532B] hover:bg-[#A06334] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Inquiry Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {orderQuantity} Pcs to RFP</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onRequestSampleDirect(product.name);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#F3ECE0] hover:bg-[#E8DFD1] text-[#2A221B] font-semibold text-xs border border-[#E8DFD1] transition flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4 text-[#8C532B]" />
                <span>Request Sample Article</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
