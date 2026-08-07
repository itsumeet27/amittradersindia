import React from 'react';
import { InquiryBasketItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';

interface InquiryBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  basketItems: InquiryBasketItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onProceedToInquiryForm: () => void;
}

export const InquiryBasketDrawer: React.FC<InquiryBasketDrawerProps> = ({
  isOpen,
  onClose,
  basketItems,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToInquiryForm
}) => {
  if (!isOpen) return null;

  const totalItemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#382E26] border-l border-[#E8DFD1] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[#F3ECE0] border-b border-[#E8DFD1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C532B]" />
              <h3 className="font-bold text-lg text-[#2A221B]">Inquiry & RFP Basket</h3>
              <span className="px-2 py-0.5 rounded bg-[#8C532B] text-white text-xs font-semibold">
                {basketItems.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E8DFD1] text-[#6E6257] hover:text-[#2A221B]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {basketItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Package className="w-12 h-12 text-[#D9C8B4] mx-auto" />
                <p className="text-sm text-[#6E6257]">Your RFP basket is currently empty.</p>
                <p className="text-xs text-[#8C532B]">
                  Explore our catalog to add laptop bags, wallets, passport holders, and corporate gift combos.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#8C532B] text-white text-xs font-semibold"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {basketItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-[#E8DFD1] space-y-3 relative group shadow-sm"
                  >
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="absolute top-3 right-3 text-[#A09385] hover:text-red-600 transition"
                      title="Remove from RFP"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E8DFD1] bg-[#FAF7F2]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pr-6">
                        <h4 className="text-sm font-bold text-[#2A221B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#6E6257]">
                          Color: <span className="text-[#8C532B] font-semibold">{item.selectedColor || 'Standard'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD1]">
                      <span className="text-xs text-[#6E6257] font-medium">B2B Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(item.product.minOrderQuantity, item.quantity - 25))}
                          className="w-6 h-6 rounded bg-[#FAF7F2] border border-[#E8DFD1] text-xs font-bold text-[#2A221B]"
                        >
                          -
                        </button>
                        <span className="font-semibold text-xs text-[#8C532B] w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 25)}
                          className="w-6 h-6 rounded bg-[#FAF7F2] border border-[#E8DFD1] text-xs font-bold text-[#2A221B]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {basketItems.length > 0 && (
            <div className="p-6 bg-[#F3ECE0] border-t border-[#E8DFD1] space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-[#382E26]">
                <span>Total Units Requested:</span>
                <span className="text-[#8C532B] font-bold text-sm">{totalItemCount} Units</span>
              </div>

              <button
                onClick={() => {
                  onProceedToInquiryForm();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-[#8C532B] hover:bg-[#A06334] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Submit RFP & Spec Sheet</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
