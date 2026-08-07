import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. LAPTOP BAGS
  {
    id: 'p-lb-01',
    name: 'The Sovereign Full-Grain Leather Laptop Bag',
    category: 'laptop-bags',
    tagline: 'Handcrafted Full-Grain Leather Executive Laptop Briefcase',
    image: '/src/assets/images/hero_leather_catalog_1786125313308.jpg',
    gallery: [
      '/src/assets/images/hero_leather_catalog_1786125313308.jpg',
      '/src/assets/images/craftsmanship_detail_1786125326715.jpg',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The flagship executive laptop briefcase designed for corporate directors and C-suite leaders. Crafted from hand-selected full-grain Italian leather, featuring padded compartments for 16" laptops, RFID-protected passport slots, and anti-tarnish solid brass hardware.',
    features: [
      'Padded shock-absorbent 16-inch laptop compartment',
      'Detachable padded leather shoulder strap with heavy brass hooks',
      'Trolley strap on back for seamless airport travel',
      'Reinforced handles with heavy-duty stitching',
      'Internal organizer for pens, power banks, and business cards'
    ],
    specs: {
      leatherGrade: '100% Full-Grain Vegetable Tanned Cowhide',
      dimensions: '41cm x 30cm x 10cm (Weight: 1.4 kg)',
      hardware: 'Solid Antique Brass with Anti-Tarnish Coating',
      lining: 'Custom Jacquard Silk Twill with Microfiber Padding',
      warranty: '5-Year Manufacturer Warranty'
    },
    minOrderQuantity: 25,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹2,850 - ₹4,200 / unit',
    availableColors: [
      { name: 'Cognac Brown', hex: '#8B4513' },
      { name: 'Obsidian Black', hex: '#1C1B1A' },
      { name: 'Saddle Tan', hex: '#A0522D' },
      { name: 'Navy Blue', hex: '#1B2A4A' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Metallic Logo Plate Placement',
      'Branded Watermarked Inner Silk Lining'
    ],
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    targetOccasions: ['Executive Onboarding', 'Leadership Awards', 'VIP Client Appreciation', 'Corporate Gifting']
  },
  {
    id: 'p-lb-02',
    name: 'Consul Slim Executive Leather Laptop Briefcase',
    category: 'laptop-bags',
    tagline: 'Sleek Leather Messenger Bag for 15.6" Laptops & Documents',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A modern lightweight laptop bag engineered for corporate commuting. Fits 15.6" laptops, charger, files, and stationery in a compact, water-resistant leather structure.',
    features: [
      'Dedicated padded sleeve for 15.6-inch laptop',
      'Dual external zipper quick-access pockets',
      'Ergonomic adjustable leather strap with padded shoulder pad',
      'Scratch-resistant oil-tanned leather finish'
    ],
    specs: {
      leatherGrade: 'Top-Grain Bovine Nappa Leather',
      dimensions: '39cm x 28cm x 8cm',
      hardware: 'Gunmetal Metal Alloy Zippers & Hooks',
      lining: 'High-Density Polyester Twill',
      warranty: '3-Year Warranty'
    },
    minOrderQuantity: 30,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹2,450 - ₹3,650 / unit',
    availableColors: [
      { name: 'Mocha Brown', hex: '#4A2E1B' },
      { name: 'Classic Black', hex: '#111111' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Brand Dust Bag'
    ],
    rating: 4.8,
    reviewsCount: 98,
    isFeatured: false,
    targetOccasions: ['Employee Anniversaries', 'Corporate Conferences']
  },

  // 2. LAPTOP TROLLEY BAGS
  {
    id: 'p-ltb-01',
    name: 'Ambassador Executive Leather Laptop Trolley Case',
    category: 'laptop-trolley-bags',
    tagline: 'Premium Leather Cabin Trolley Bag with Telescopic Handle & Laptop Compartment',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      '/src/assets/images/hero_leather_catalog_1786125313308.jpg'
    ],
    description: 'Designed for frequent corporate travelers and senior executives. Combines a 17" padded laptop compartment with 35L clothing storage capacity, smooth 360-degree silent spinner wheels, and aircraft-grade aluminum telescopic handle.',
    features: [
      'Heavy-duty 3-stage aluminum retractable pull handle',
      'Padded shockproof compartment for up to 17-inch laptop & tablet',
      'TSA-approved combination lock mechanism',
      'Smooth 360-degree Japanese spinner wheels',
      'Separate overnight apparel section with tie-down straps'
    ],
    specs: {
      leatherGrade: 'Full-Grain Oil-Waxed Pull-Up Leather',
      dimensions: '50cm x 36cm x 22cm (Cabin Approved, 35L)',
      hardware: 'Heavy Duty Anodized Aluminum & YKK Zippers',
      lining: 'Water-Repellent Custom Jacquard Lining',
      warranty: '5-Year International Warranty'
    },
    minOrderQuantity: 15,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹5,400 - ₹7,800 / unit',
    availableColors: [
      { name: 'Chestnut Brown', hex: '#63381B' },
      { name: 'Midnight Black', hex: '#0F0F0F' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Monogrammed Leather Luggage Tag'
    ],
    rating: 5.0,
    reviewsCount: 88,
    isFeatured: true,
    targetOccasions: ['Senior Executive Promotions', 'Global Leadership Summits', 'Annual Performance Awards']
  },
  {
    id: 'p-ltb-02',
    name: 'Voyager Cabin Rollable Laptop Trolley Bag',
    category: 'laptop-trolley-bags',
    tagline: 'Sleek Executive 2-Wheel Leather Business Travel Trolley',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Compact 2-wheel leather trolley bag tailored for overnight business trips. Stores a 15.6" laptop, tablet, clothing set, and documents seamlessly.',
    features: [
      'Inline skate smooth-rolling rubber wheels',
      'Concealable telescopic trolley handle channel',
      'Front quick-access organizer for passport & boarding pass',
      'Fits under airplane seats & overhead cabins'
    ],
    specs: {
      leatherGrade: 'Genuine Top-Grain Bovine Leather',
      dimensions: '45cm x 34cm x 20cm',
      hardware: 'Reinforced Metal Alloy Frame & Zippers',
      lining: 'Heavy Cotton Canvas',
      warranty: '3-Year Warranty'
    },
    minOrderQuantity: 20,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹4,800 - ₹6,900 / unit',
    availableColors: [
      { name: 'Dark Tan', hex: '#8B4513' },
      { name: 'Onyx Black', hex: '#1C1C1C' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.9,
    reviewsCount: 64,
    isFeatured: false,
    targetOccasions: ['Corporate Sales Offsites', 'Delegate Appreciation']
  },

  // 3. GENTS WALLET
  {
    id: 'p-gw-01',
    name: 'Paragon RFID Full-Grain Leather Gents Wallet',
    category: 'gents-wallet',
    tagline: 'Slimline Classic Bifold Gents Wallet with Metallic RFID Shielding',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted for daily executive utility and modern security. Engineered with certified metallic Faraday lining that blocks RFID signals, protecting credit cards and IDs.',
    features: [
      '8 dedicated card slots + 2 currency bill compartments',
      'Certified RFID-blocking inner safety mesh',
      'Hand-turned rounded corners that won’t fray pockets',
      'Ultra-slim profile under 1.2cm thickness when loaded'
    ],
    specs: {
      leatherGrade: '100% Full-Grain Nappa Bovine Leather',
      dimensions: '11.5cm x 9.2cm x 1.2cm',
      hardware: 'Pure Leather Stitch Construction',
      lining: 'RFID Military-Grade Protective Mesh + Silk',
      warranty: '3-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹650 - ₹950 / unit',
    availableColors: [
      { name: 'Classic Black', hex: '#0F0F0F' },
      { name: 'Saddle Brown', hex: '#8B5A2B' },
      { name: 'Oxblood Red', hex: '#4A0000' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Tin Box / Rigid Packaging with Logo'
    ],
    rating: 4.8,
    reviewsCount: 310,
    isFeatured: true,
    targetOccasions: ['Employee Gifting', 'Diwali Hampers', 'Loyalty Rewards', 'Event Favors']
  },
  {
    id: 'p-gw-02',
    name: 'Sovereign Classic Slimline Leather Gents Wallet',
    category: 'gents-wallet',
    tagline: 'Minimalist Bifold Leather Wallet with Flip-ID Window',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A timeless bifold wallet featuring a flip-out clear window for corporate ID or driving license, 6 card slots, and dual cash dividers.',
    features: [
      'Transparent mesh flip window for instant ID presentation',
      'Dual cash dividers for currency and receipts',
      'Rich natural leather aroma and patina finish'
    ],
    specs: {
      leatherGrade: 'Soft Grain Genuine Leather',
      dimensions: '11cm x 9cm x 1.4cm',
      hardware: 'None',
      lining: 'Satin Silk Lining',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 100,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹550 - ₹850 / unit',
    availableColors: [
      { name: 'Dark Tan', hex: '#7A3E1D' },
      { name: 'Jet Black', hex: '#111111' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.7,
    reviewsCount: 185,
    isFeatured: false,
    targetOccasions: ['Festive Gifting', 'Corporate Rewards']
  },

  // 4. PASSPORT HOLDER
  {
    id: 'p-ph-01',
    name: 'Executive Travel Leather Passport Holder',
    category: 'passport-holder',
    tagline: 'Handcrafted Leather Passport Sleeve with Card Slots & Boarding Pass Pocket',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An essential corporate travel accessory designed to protect international passports, flight boarding passes, SIM cards, and frequent flyer cards in one sleek leather sleeve.',
    features: [
      'Snug pocket fitting all standard international passports',
      '4 card slots + dedicated boarding pass sleeve',
      'Integrated micro SD & nano SIM card storage slots',
      'Ultra-thin construction that fits jacket inner pockets'
    ],
    specs: {
      leatherGrade: 'Top-Grain Vegetable Tanned Leather',
      dimensions: '14.2cm x 10.5cm x 0.8cm',
      hardware: 'None',
      lining: 'Soft Microfiber Suede',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹480 - ₹750 / unit',
    availableColors: [
      { name: 'Cognac Leather', hex: '#8B4513' },
      { name: 'Navy Blue', hex: '#112244' },
      { name: 'Obsidian Black', hex: '#111111' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Foil Stamping'
    ],
    rating: 4.9,
    reviewsCount: 195,
    isFeatured: true,
    targetOccasions: ['International Trade Summits', 'Corporate Travel Kits', 'Global Delegations']
  },
  {
    id: 'p-ph-02',
    name: 'Monarch Zippered Travel Document & Passport Organizer',
    category: 'passport-holder',
    tagline: 'Perimeter Zippered Leather Wallet for Family & Executive Passports',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'All-in-one zippered travel wallet holding up to 2 passports, foreign currency bills, credit cards, coins, and pen holder.',
    features: [
      'Full perimeter YKK zipper closure for total security',
      'Holds 2 passports, 8 cards, and foreign cash bills',
      'Wristlet strap attachment included'
    ],
    specs: {
      leatherGrade: 'Soft Nappa Leather',
      dimensions: '22cm x 12cm x 2cm',
      hardware: 'YKK Metal Zipper & Puller',
      lining: 'Jacquard Silk Lining',
      warranty: '3-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹680 - ₹980 / unit',
    availableColors: [
      { name: 'Saddle Tan', hex: '#964B00' },
      { name: 'Royal Black', hex: '#1C1C1C' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.8,
    reviewsCount: 112,
    isFeatured: false,
    targetOccasions: ['Travel Incentives', 'Executive Gifts']
  },

  // 5. CARD HOLDER
  {
    id: 'p-ch-01',
    name: 'Premier Leather & Brass Visiting Card Holder',
    category: 'card-holder',
    tagline: 'Magnetic Closure Pocket Leather Visiting Card Case',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An elegant professional card holder combining polished stainless brass trim with rich textured leather. Holds up to 25 business cards neatly without bending corners.',
    features: [
      'Holds 20-25 standard business cards',
      'Concealed magnetic snap closure',
      'Polished anti-scratch metal accent bar',
      'Fits inside shirt or jacket pocket effortlessly'
    ],
    specs: {
      leatherGrade: 'Full-Grain Bovine Leather Outer',
      dimensions: '9.8cm x 6.5cm x 1.2cm',
      hardware: 'Polished Stainless Brass Accent',
      lining: 'Velvet Felt Interior',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 100,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹380 - ₹620 / unit',
    availableColors: [
      { name: 'Black & Silver', hex: '#1A1A1A' },
      { name: 'Brown & Brass', hex: '#7B3F00' },
      { name: 'Tan & Gold', hex: '#A52A2A' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Laser Engraving on Metal Accent'
    ],
    rating: 4.9,
    reviewsCount: 240,
    isFeatured: true,
    targetOccasions: ['Trade Shows', 'Welcome Kits', 'Promotional Giveaways']
  },
  {
    id: 'p-ch-02',
    name: 'Ultra-Slim Pop-Up RFID Leather Credit Card Holder',
    category: 'card-holder',
    tagline: 'Aluminum Ejector Mechanism Card Wallet with Leather Wrap',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Features a single-click bottom lever that fans out 6 credit cards instantly for quick access, encased in a premium leather jacket with cash clip.',
    features: [
      'One-click pop-up mechanism for 5-6 cards',
      'Heavy-duty aluminum inner casing with RFID block',
      'External leather sleeve for extra cards and cash'
    ],
    specs: {
      leatherGrade: 'Oil-Waxed Genuine Leather',
      dimensions: '10cm x 6.8cm x 1.5cm',
      hardware: 'Anodized Aviation Aluminum Case',
      lining: 'Anti-Skid Internal Friction Pads',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹450 - ₹680 / unit',
    availableColors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Vintage Brown', hex: '#5C3317' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.8,
    reviewsCount: 168,
    isFeatured: false,
    targetOccasions: ['Tech Conferences', 'Corporate Souvenirs']
  },

  // 6. BACKPACK (NYLON MATERIAL)
  {
    id: 'p-bn-01',
    name: 'ArmorTech Water-Resistant Nylon Executive Laptop Backpack',
    category: 'backpack-nylon',
    tagline: '1680D Ballistic Nylon Laptop Backpack with Leather Trim & USB Port',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for high-durability corporate usage. Made from heavy-duty 1680D ballistic nylon material with full-grain leather accents, padded 15.6" laptop compartment, air-mesh back ventilation, and luggage strap.',
    features: [
      'Ultra-durable 1680D ballistic waterproof nylon material',
      'Leather top handle and leather zipper pulls',
      'Dedicated shockproof 15.6-inch laptop & tablet sleeve',
      'Ergonomic 3D breathable mesh padded back panel',
      'Integrated external USB charging port pass-through'
    ],
    specs: {
      leatherGrade: 'High-Grade Ballistic Nylon + Genuine Leather Accents',
      dimensions: '44cm x 31cm x 16cm (Capacity: 24L)',
      hardware: 'Rust-Proof YKK Zippers & Heavy Alloy Buckles',
      lining: '210D Water-Resistant Polyester',
      warranty: '3-Year Manufacturer Warranty'
    },
    minOrderQuantity: 30,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹1,650 - ₹2,450 / unit',
    availableColors: [
      { name: 'Charcoal Black', hex: '#1E1E1E' },
      { name: 'Navy Blue', hex: '#1B2A4A' },
      { name: 'Space Grey', hex: '#3A3A3A' }
    ],
    customizationOptions: [
      'Rubber Badge / Leather Patch Logo Embossing & Engraving',
      'Custom Zip Pullers with Logo Branding'
    ],
    rating: 4.9,
    reviewsCount: 210,
    isFeatured: true,
    targetOccasions: ['New Employee Welcome Kits', 'IT Corporate Offsites', 'Annual Employee Appreciation']
  },
  {
    id: 'p-bn-02',
    name: 'Commuter High-Density Nylon Business Backpack',
    category: 'backpack-nylon',
    tagline: 'Lightweight Weatherproof Nylon Backpack for Work & Travel',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A versatile nylon business backpack designed for daily urban commutes. Features water-repellent nylon fabric, hidden anti-theft back pocket, and side water bottle holders.',
    features: [
      'High-density 900D water-repellent nylon material',
      'Padded compartment for 15" laptop',
      'Hidden zipper anti-theft pocket on back panel',
      'Expandable side pockets for umbrella/bottle'
    ],
    specs: {
      leatherGrade: '900D Nylon Fabric + Microfiber Leather Pullers',
      dimensions: '42cm x 29cm x 14cm',
      hardware: 'Heavy Duty Smooth Zippers',
      lining: 'Nylon Lining',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹1,450 - ₹2,100 / unit',
    availableColors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Navy Blue', hex: '#0B1D3A' }
    ],
    customizationOptions: [
      'Custom Printed Logo / Embossed Leather Badge'
    ],
    rating: 4.8,
    reviewsCount: 145,
    isFeatured: false,
    targetOccasions: ['Onboarding Kits', 'Team Offsite Rewards']
  },

  // 7. ANNUAL DIARY
  {
    id: 'p-ad-01',
    name: 'Consul Executive Leather Annual Diary & Planner',
    category: 'annual-diary',
    tagline: 'A5 Size Hardcover Leather Diary with Metallic Bookmark & Pen Loop',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An executive annual diary designed for C-suite managers and planners. Wrapped in soft leatherette/leather cover with gold gilt page edges, 365 daily dated pages, monthly planners, and world maps.',
    features: [
      '365 dated pages with 80 GSM fountain-pen safe natural shade paper',
      'Gold foil gilded page margins & ribbon bookmark',
      'Magnetic lock flap with built-in pen holder loop',
      'Includes year planner, ISD codes, project tracker, and expenses sheet'
    ],
    specs: {
      leatherGrade: 'Bespoke Bonded Leather / PU Leather Cover',
      dimensions: 'A5 Standard (21.5cm x 15cm x 2.2cm)',
      hardware: 'Magnetic Brass Snap Lock',
      lining: '80 GSM Natural Cream Acid-Free Paper',
      warranty: '1-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹650 - ₹1,100 / unit',
    availableColors: [
      { name: 'Rich Tan', hex: '#8B4513' },
      { name: 'Midnight Black', hex: '#0F0F0F' },
      { name: 'Burgundy Red', hex: '#58111A' },
      { name: 'Forest Green', hex: '#1C3A27' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received',
      'Custom Branded Watermarked Pages Insert',
      '24K Gold Foil Stamping on Cover'
    ],
    rating: 4.9,
    reviewsCount: 280,
    isFeatured: true,
    targetOccasions: ['New Year Corporate Gifting', 'Diwali Hampers', 'Annual General Meetings']
  },
  {
    id: 'p-ad-02',
    name: 'Heritage Refillable Leather Planner Annual Diary',
    category: 'annual-diary',
    tagline: 'Hand-Bound Full Grain Leather Cover Diary with Brass Latch',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A refillable rustic leather journal annual diary that lasts for years. Replace the inner booklet each year while keeping the aged leather cover.',
    features: [
      '100% Genuine vegetable-tanned leather wrap cover',
      'Includes 192-page dated annual planner insert booklet',
      'Antique brass buckle latch for secure closing'
    ],
    specs: {
      leatherGrade: 'Full-Grain Crazy Horse Leather',
      dimensions: '22cm x 15cm x 2.5cm',
      hardware: 'Solid Antique Brass Buckle',
      lining: '100 GSM Unbleached Recycled Paper',
      warranty: '3-Year Warranty'
    },
    minOrderQuantity: 30,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹780 - ₹1,250 / unit',
    availableColors: [
      { name: 'Rustic Saddle', hex: '#7B3F00' },
      { name: 'Dark Espresso', hex: '#2B1A0E' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.9,
    reviewsCount: 162,
    isFeatured: false,
    targetOccasions: ['Leadership Gifts', 'Strategy Retreats']
  },

  // 8. COMBO
  {
    id: 'p-cb-01',
    name: 'Grand 3-Piece Executive Combo Set (Gents Wallet, Leather Belt & Key Chain)',
    category: 'combo',
    tagline: 'Luxury Corporate Gift Box containing RFID Gents Wallet, Reversible Belt & Braided Key Chain',
    image: '/src/assets/images/luxury_gift_set_1786125339356.jpg',
    gallery: [
      '/src/assets/images/luxury_gift_set_1786125339356.jpg',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The ultimate corporate gift suite. Includes a 100% genuine leather bifold RFID gents wallet, a formal reversible leather belt with automatic brass pin buckle, and a heavy brass braided leather keyring, all packed in a rigid velvet-lined presentation box.',
    features: [
      'RFID-blocking genuine leather gents wallet with 8 card slots',
      'Full-grain leather reversible belt (Black/Tan) with micro-adjust metal buckle',
      'Zinc-brass heavy-duty braided leather keychain',
      'Rigid satin-lined magnetic luxury presentation gift box'
    ],
    specs: {
      leatherGrade: '100% Genuine Top-Grain Bovine Leather',
      dimensions: 'Box: 28cm x 22cm x 6cm',
      hardware: 'Gunmetal Electroplated Alloy Buckle & Clasp',
      lining: 'Royal Black Velvet Cushioning Tray',
      warranty: '2-Year Manufacturer Warranty'
    },
    minOrderQuantity: 30,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹1,450 - ₹2,200 / set',
    availableColors: [
      { name: 'Classic Black & Tan', hex: '#1A1A1A' },
      { name: 'Cognac Brown Set', hex: '#8B4513' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received on all 3 articles',
      'Custom Foil Hot Stamping on Outer Gift Box',
      'Custom Greeting Card Insert'
    ],
    rating: 5.0,
    reviewsCount: 310,
    isFeatured: true,
    targetOccasions: ['Diwali Corporate Hampers', 'Annual Day Employee Rewards', 'VIP Client Appreciation']
  },
  {
    id: 'p-cb-02',
    name: 'Signature 2-Piece Classic Combo Set (Gents Wallet & Key Chain)',
    category: 'combo',
    tagline: 'Elegant 2-Piece Corporate Gift Box with Leather Wallet & Key Chain',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An elegant budget-friendly 2-piece corporate gift set pairing a slim RFID bifold gents wallet with a matching braided leather keyring.',
    features: [
      'RFID Bifold gents wallet with cash & card dividers',
      'Braided leather key fob with heavy ring clasp',
      'Presented in rigid window presentation box'
    ],
    specs: {
      leatherGrade: 'Soft Grain Genuine Leather',
      dimensions: 'Box: 20cm x 15cm x 4cm',
      hardware: 'Polished Gunmetal Keyring',
      lining: 'Velvet Tray',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 50,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹850 - ₹1,350 / set',
    availableColors: [
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Saddle Tan', hex: '#8B4513' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.8,
    reviewsCount: 220,
    isFeatured: false,
    targetOccasions: ['Employee Onboarding', 'Festival Gifting']
  },
  {
    id: 'p-cb-03',
    name: 'Elite 2-Piece Executive Combo Set (Gents Wallet & Belt)',
    category: 'combo',
    tagline: 'Premium 2-Piece Leather Box Set containing Gents Wallet & Reversible Formal Belt',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A formal executive gift set featuring a genuine leather bifold gents wallet and a 35mm formal reversible leather belt with twist-buckle.',
    features: [
      'Bifold gents wallet with 8 card slots',
      '35mm Reversible full-grain formal belt (Black/Brown)',
      'Luxury rigid box with custom logo foil branding'
    ],
    specs: {
      leatherGrade: 'Full-Grain Bovine Leather',
      dimensions: 'Box: 24cm x 18cm x 5cm',
      hardware: 'Reversible Alloy Belt Buckle',
      lining: 'Satin Velvet Tray',
      warranty: '2-Year Warranty'
    },
    minOrderQuantity: 40,
    sampleAvailable: true,
    estimatedPricePerUnit: '₹1,250 - ₹1,850 / set',
    availableColors: [
      { name: 'Black & Dark Tan', hex: '#1C1C1C' }
    ],
    customizationOptions: [
      'Embossing & Engraving of Brand Logo Based on Die / Print Received'
    ],
    rating: 4.9,
    reviewsCount: 175,
    isFeatured: false,
    targetOccasions: ['Festive Gifting', 'Milestone Celebrations']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'laptop-bags', name: 'Laptop Bags' },
  { id: 'laptop-trolley-bags', name: 'Laptop Trolley Bags' },
  { id: 'gents-wallet', name: 'Gents Wallet' },
  { id: 'passport-holder', name: 'Passport Holder' },
  { id: 'card-holder', name: 'Card Holder' },
  { id: 'backpack-nylon', name: 'Backpack (Nylon Material)' },
  { id: 'annual-diary', name: 'Annual Diary' },
  { id: 'combo', name: 'Combo Sets' },
];
