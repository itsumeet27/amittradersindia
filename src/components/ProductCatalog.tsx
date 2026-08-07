import React, { useState, useMemo } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS, CATEGORIES } from '../data/products';
import { Product, InquiryBasketItem } from '../types';
import { Eye, Filter, Star, Check, Package, Plus } from 'lucide-react';

interface ProductCatalogProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToBasket: (item: InquiryBasketItem) => void;
  selectedCategory: string;
  onCategoryChange: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = DEFAULT_PRODUCTS,
  onSelectProduct,
  onAddToBasket,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  const [selectedLeatherGrade, setSelectedLeatherGrade] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const catalogProducts = products && products.length > 0 ? products : DEFAULT_PRODUCTS;

  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((p) => {
      // Category Filter
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      
      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.targetOccasions.some(o => o.toLowerCase().includes(q))
      );

      // Leather Grade
      const matchGrade = selectedLeatherGrade === 'all' || (p.specs?.leatherGrade && p.specs.leatherGrade.toLowerCase().includes(selectedLeatherGrade.toLowerCase()));

      return matchCat && matchSearch && matchGrade;
    });
  }, [catalogProducts, selectedCategory, searchQuery, selectedLeatherGrade]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToBasket({
      product,
      quantity: product.minOrderQuantity,
      selectedColor: product.availableColors[0]?.name || 'Default Leather'
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#382E26] relative border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EADF] border border-[#D9C8B4] text-[#8C532B] text-xs font-semibold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5 text-[#8C532B]" />
            <span>Product Catalog & Manufacturing Collections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A221B] tracking-tight">
            Handcrafted Leather Goods & Corporate Gift Articles
          </h2>
          <p className="text-sm sm:text-base text-[#6E6257] font-normal">
            Explore our customizable B2B product line. Every article can be personalized with custom corporate brand embossing and engraving based on the die or print received. Prices listed in INR (₹).
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? catalogProducts.length 
              : catalogProducts.filter(p => p.category === cat.id).length;


            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                  selectedCategory === cat.id
                    ? 'bg-[#8C532B] text-white border-[#8C532B] shadow-md'
                    : 'bg-[#FFFFFF] text-[#594B3F] hover:text-[#8C532B] border-[#E8DFD1] hover:border-[#D9C8B4]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  selectedCategory === cat.id ? 'bg-[#FAF7F2] text-[#8C532B]' : 'bg-[#F2EADF] text-[#6E6257]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-4 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#8C532B]" />
            <span className="text-xs text-[#6E6257] font-medium">Material Filter:</span>
            <select
              value={selectedLeatherGrade}
              onChange={(e) => setSelectedLeatherGrade(e.target.value)}
              className="bg-[#FAF7F2] text-xs text-[#2A221B] border border-[#E8DFD1] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8C532B]"
            >
              <option value="all">All Materials</option>
              <option value="full-grain">Full-Grain Cowhide</option>
              <option value="nappa">Nappa Leather</option>
              <option value="top-grain">Top-Grain Leather</option>
              <option value="nylon">Nylon Material</option>
            </select>
          </div>

          <div className="text-xs text-[#6E6257] font-medium">
            Showing <span className="text-[#2A221B] font-bold">{filteredProducts.length}</span> Manufactured Articles
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-2xl border border-[#E8DFD1]">
            <p className="text-base text-[#6E6257] mb-2">No product catalog items found for your active filter.</p>
            <button
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
                setSelectedLeatherGrade('all');
              }}
              className="text-xs text-[#8C532B] underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer bg-[#FFFFFF] border border-[#E8DFD1] hover:border-[#8C532B] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-[#F2EADF] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A221B]/40 via-transparent to-transparent opacity-40" />

                    {/* Featured / Sample Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {product.isFeatured && (
                        <span className="px-2.5 py-1 rounded bg-[#8C532B] text-white font-semibold text-[10px] uppercase tracking-wider shadow">
                          ★ B2B Choice
                        </span>
                      )}
                      <span className="px-2 py-1 rounded bg-white/90 backdrop-blur text-[#2A221B] text-[10px] border border-[#E8DFD1] font-semibold">
                        MOQ: {product.minOrderQuantity} Pcs
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/95 rounded-lg text-[11px] text-[#2A221B] font-semibold border border-[#E8DFD1] flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-[#8C532B] text-[#8C532B]" />
                      <span>{product.rating}</span>
                      <span className="text-[#6E6257]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C532B]">
                      {product.category.replace('-', ' ')}
                    </p>
                    <h3 className="text-lg font-bold text-[#2A221B] group-hover:text-[#8C532B] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#594B3F] line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-[#6E6257] font-medium">Colors:</span>
                      <div className="flex items-center gap-1">
                        {product.availableColors.map((color, idx) => (
                          <span
                            key={idx}
                            style={{ backgroundColor: color.hex }}
                            className="w-3 h-3 rounded-full border border-[#D9C8B4]"
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 mt-2 border-t border-[#E8DFD1] flex items-center justify-between gap-2 pt-4">
                  <span className="text-xs font-bold text-[#8C532B]">
                    {product.estimatedPricePerUnit}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2 rounded-lg bg-[#F3ECE0] hover:bg-[#E8DFD1] text-[#382E26] border border-[#E8DFD1] transition"
                      title="Inspect Specifications"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-sm ${
                        addedProductId === product.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#8C532B] hover:bg-[#A06334] text-white'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
