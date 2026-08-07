export interface ComparisonPoint {
  id: string;
  featureName: string;
  otherVendorsShortfall: string;
  amitTradersStandard: string;
  technicalImpact: string;
}

export const OTHER_VENDORS_TITLE = "Standard Market Vendors";
export const AMIT_TRADERS_TITLE = "Amit Traders Standards";

export const COMPARISON_POINTS: ComparisonPoint[] = [
  {
    id: 'cp1',
    featureName: 'Leather Selection & Material',
    otherVendorsShortfall: 'Bonded leather, split leather with 0.2mm PU synthetic plastic film, or cheap faux leather that cracks, peels, and flakes within 6–12 months.',
    amitTradersStandard: '100% Hand-selected full-grain & top-grain genuine leather from ISO-certified tanneries. Develops a rich antique patina over time without peeling.',
    technicalImpact: 'Full-grain leather offers 5x longer structural lifespan, breathability, and natural luxury texture.'
  },
  {
    id: 'cp2',
    featureName: 'Stitching & Thread Tension',
    otherVendorsShortfall: 'Low-density 4–5 SPI polyester thread with unreinforced stress points, leading to unraveling, loose seams, and tearing under heavy loads.',
    amitTradersStandard: 'High-tensile bonded nylon waxed thread with 8–10 stitches per inch (SPI), double-needle saddle stitching, and reinforced load points.',
    technicalImpact: 'Holds structural shape under 25kg weight capacity tests, preserving seam strength for over 10 years of daily use.'
  },
  {
    id: 'cp3',
    featureName: 'Hardware & Zip Fasteners',
    otherVendorsShortfall: 'Thin hollow zinc castings with cheap nickel coating that oxidizes green, tarnishes, and snaps under minor tension.',
    amitTradersStandard: 'Solid custom brass & heavy-duty alloy hardware with electroplated anti-tarnish lacquer finish, paired with smooth Japanese YKK metal zippers.',
    technicalImpact: 'Guarantees smooth zipper glides for 50,000+ cycles with zero metallic corrosion or rust over time.'
  },
  {
    id: 'cp4',
    featureName: 'Inner Lining & Cushioning',
    otherVendorsShortfall: 'Paper-thin non-woven polypropylene liner that rips easily, revealing raw cardboard inner backing.',
    amitTradersStandard: 'Custom jacquard silk, heavy cotton twill, or micro-suede lining with high-density latex foam cushioning for drop protection.',
    technicalImpact: 'Protects delicate devices (laptops, tablets) while providing a luxurious tactile experience inside every pocket.'
  },
  {
    id: 'cp5',
    featureName: 'Quality Assurance & Packaging',
    otherVendorsShortfall: 'Bulk packed in plastic polybags without humidity control or batch inspection, resulting in damaged or moldy shipments.',
    amitTradersStandard: '5-Stage physical QA inspection, individual protective dust bags, silica desiccant pouches, and rigid presentation gift boxes.',
    technicalImpact: 'Ensures 99.8% QC acceptance rate upon arrival at client corporate facilities.'
  }
];
