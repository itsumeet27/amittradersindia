export type ProductCategory = 
  | 'laptop-bags' 
  | 'laptop-trolley-bags' 
  | 'gents-wallet' 
  | 'passport-holder' 
  | 'card-holder' 
  | 'backpack-nylon' 
  | 'annual-diary' 
  | 'combo';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: {
    leatherGrade: string;
    dimensions: string;
    hardware: string;
    lining: string;
    warranty: string;
  };
  minOrderQuantity: number;
  sampleAvailable: boolean;
  estimatedPricePerUnit: string;
  availableColors: { name: string; hex: string }[];
  customizationOptions: string[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  targetOccasions: string[];
}

export interface ClientPartner {
  id: string;
  name: string;
  logoSvg: string;
  industry: string;
  partnershipYears: string;
  caseStudy: {
    title: string;
    challenge: string;
    solution: string;
    deliveredVolume: string;
    productTypes: string[];
    quote: string;
    author: string;
    designation: string;
  };
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  companyName: string;
  industry: string;
  rating: number;
  quote: string;
  productSupplied: string;
  orderVolume: string;
  verifiedBuyer: boolean;
  avatarUrl?: string;
}

export interface QualityComparison {
  id: string;
  title: string;
  category: string;
  amitTradersStandard: string;
  marketStandardFeature: string;
  technicalImpact: string;
  iconName: string;
}

export interface InquiryBasketItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customLogoType?: string;
  notes?: string;
}

export interface SupplierInquiryPayload {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  inquiryType: 'bulk-quote' | 'sample-kit' | 'custom-design' | 'vendor-partnership';
  estimatedQuantity: string;
  targetDate?: string;
  message: string;
  customLogoFile?: string;
  basketItems?: InquiryBasketItem[];
}

export interface CompanyProfile {
  companyName: string;
  tagline: string;
  subtitle: string;
  heroDescription: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  yearsInBusiness: string;
  workingHours: string;
  whatsappNumber: string;
}

export interface InquiryRecord extends SupplierInquiryPayload {
  id: string;
  referenceNumber: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'fulfilled' | 'archived';
  emailSent: boolean;
  emailError?: string;
  itemsSummary?: { productName: string; quantity: number; color?: string; logoType?: string }[];
}


