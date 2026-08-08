import fs from 'fs';
import path from 'path';
import { CompanyProfile, Product, InquiryRecord } from '../types';
import { PRODUCTS } from './products';

export interface DBData {
  profile: CompanyProfile;
  products: Product[];
  inquiries: InquiryRecord[];
}

export const DEFAULT_PROFILE: CompanyProfile = {
  companyName: 'AMIT TRADERS',
  tagline: 'Manufacturers and Suppliers of Leather Goods and Corporate Gift articles',
  subtitle: 'Manufacturers of Luxury Executive Laptop Bags, Wallets, Passport Holders & Custom Corporate Gift Sets Since 2008',
  heroDescription: 'Over 18 years of manufacturing excellence supplying Fortune 500 corporate clients across Mumbai, India and internationally. Complete OEM/ODM customization, low MOQs, and certified full-grain leather craftsmanship.',
  phone: '+91 97680 10310',
  email: 'dk.amittraders@gmail.com',
  address: 'B-1403, Kakad Paradise, Mahajanwadi, Penkarpada, Mira Road (E), Thane - 401107',
  gstNumber: '27AZWPS0795D1ZO',
  yearsInBusiness: '18+',
  workingHours: 'Mon - Sat: 09:30 AM - 07:00 PM IST',
  whatsappNumber: '+91 97680 10310'
};

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'db.json');

export function initDB(): DBData {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
        products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : PRODUCTS,
        inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : []
      };
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }

  const defaultDb: DBData = {
    profile: DEFAULT_PROFILE,
    products: PRODUCTS,
    inquiries: []
  };

  saveDB(defaultDb);
  return defaultDb;
}

export function saveDB(data: DBData): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
}
