import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { initDB, saveDB } from './src/data/dbStore';
import { CompanyProfile, Product, InquiryRecord } from './src/types';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize DB in memory and file persistence
  let db = initDB();

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: db.profile.companyName,
      yearsInBusiness: db.profile.yearsInBusiness,
      gstNumber: db.profile.gstNumber,
      backendSyncConfigured: Boolean(process.env.BACKEND_API_URL)
    });
  });

  // --- COMPANY PROFILE ENDPOINTS ---
  const handleGetProfile = async (req: express.Request, res: express.Response) => {
    // If external backend configured, attempt fetch with fallback
    if (process.env.BACKEND_API_URL) {
      try {
        const baseUrl = process.env.BACKEND_API_URL.replace(/\/$/, '');
        let response = await fetch(`${baseUrl}/api/company`);
        if (!response.ok) {
          response = await fetch(`${baseUrl}/api/profile`);
        }
        if (response.ok) {
          const externalProfile = await response.json();
          db.profile = { ...db.profile, ...externalProfile };
          saveDB(db);
          return res.json(db.profile);
        }
      } catch (e) {
        console.warn('Failed to sync company profile from external BACKEND_API_URL, using local DB store:', e);
      }
    }
    res.json(db.profile);
  };

  const handlePutProfile = (req: express.Request, res: express.Response) => {
    const updatedProfile: CompanyProfile = req.body;
    db.profile = { ...db.profile, ...updatedProfile };
    saveDB(db);
    res.json({ success: true, profile: db.profile });
  };

  app.get('/api/company', handleGetProfile);
  app.get('/api/profile', handleGetProfile);

  app.put('/api/company', handlePutProfile);
  app.put('/api/profile', handlePutProfile);

  // --- PRODUCTS DB ENDPOINTS ---
  app.get('/api/products', async (req, res) => {
    // If external backend API URL configured, fetch and sync
    if (process.env.BACKEND_API_URL) {
      try {
        const response = await fetch(`${process.env.BACKEND_API_URL.replace(/\/$/, '')}/api/products`);
        if (response.ok) {
          const externalProducts = await response.json();
          if (Array.isArray(externalProducts) && externalProducts.length > 0) {
            db.products = externalProducts;
            saveDB(db);
            return res.json(db.products);
          }
        }
      } catch (e) {
        console.warn('Failed to sync products from BACKEND_API_URL, returning local DB products:', e);
      }
    }
    res.json(db.products);
  });

  app.post('/api/products', (req, res) => {
    const newProduct: Product = req.body;
    if (!newProduct.id) {
      newProduct.id = `p-custom-${Date.now()}`;
    }
    db.products.unshift(newProduct);
    saveDB(db);
    res.status(201).json({ success: true, product: newProduct });
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProductData: Partial<Product> = req.body;
    const index = db.products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.products[index] = { ...db.products[index], ...updatedProductData };
    saveDB(db);
    res.json({ success: true, product: db.products[index] });
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = db.products.length;
    db.products = db.products.filter(p => p.id !== id);

    if (db.products.length === initialLength) {
      return res.status(404).json({ error: 'Product not found' });
    }

    saveDB(db);
    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // --- INQUIRIES ENDPOINTS ---
  app.get('/api/inquiries', (req, res) => {
    res.json(db.inquiries);
  });

  app.put('/api/inquiries/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = db.inquiries.find(i => i.id === id);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    inquiry.status = status;
    saveDB(db);
    res.json({ success: true, inquiry });
  });

  // Supplier / Bulk Inquiry / Contact / Quote submission endpoint (Saves directly to DB)
  const handleInquirySubmission = async (req: express.Request, res: express.Response) => {
    const {
      name,
      companyName,
      company,
      email,
      phone,
      inquiryType,
      estimatedQuantity,
      quantity,
      subject,
      message,
      customLogoFile,
      basketItems
    } = req.body;

    const referenceNumber = `AT-${Math.floor(100000 + Math.random() * 900000)}`;

    const itemsSummary = Array.isArray(basketItems)
      ? basketItems.map((item: any) => ({
          productName: item.product?.name || 'Unknown Product',
          quantity: item.quantity || 1,
          color: item.selectedColor || 'Standard',
          logoType: item.customLogoType || 'Embossed'
        }))
      : [];

    const newInquiry: InquiryRecord = {
      id: `inq-${Date.now()}`,
      referenceNumber,
      createdAt: new Date().toISOString(),
      name: name || 'Valued Corporate Prospect',
      companyName: companyName || company || 'Independent Buyer',
      email: email || '',
      phone: phone || '',
      inquiryType: inquiryType || (req.path.includes('contact') ? 'general-contact' : 'bulk-quote'),
      estimatedQuantity: estimatedQuantity || (quantity ? String(quantity) : 'Custom Bulk'),
      message: message ? (subject ? `[${subject}] ${message}` : message) : (subject || ''),
      customLogoFile: customLogoFile || '',
      itemsSummary,
      status: 'new',
      emailSent: false
    };

    // Save inquiry into local DB store
    db.inquiries.unshift(newInquiry);
    saveDB(db);

    // If external backend configured, forward inquiry as well
    if (process.env.BACKEND_API_URL) {
      const baseUrl = process.env.BACKEND_API_URL.replace(/\/$/, '');
      const endpoint = req.path || '/api/contact';
      try {
        await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInquiry)
        });
      } catch (e) {
        // Fallback to /api/inquiry on remote if endpoint fails
        try {
          await fetch(`${baseUrl}/api/inquiry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newInquiry)
          });
        } catch (e2) {
          console.warn('Could not mirror inquiry to BACKEND_API_URL:', e2);
        }
      }
    }

    res.json({
      success: true,
      referenceNumber,
      message: `Thank you, ${newInquiry.name}! Your request (Ref: ${referenceNumber}) has been saved in the database. An account manager will review it shortly.`,
      status: 'Saved in database',
      inquiry: newInquiry
    });
  };

  app.post('/api/inquiry', handleInquirySubmission);
  app.post('/api/contact', handleInquirySubmission);
  app.post('/api/quote', handleInquirySubmission);

  // AI B2B Assistant endpoint using Gemini API
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: `Thank you for contacting ${db.profile.companyName}! We have been leading manufacturers of luxury leather goods for ${db.profile.yearsInBusiness} years in Mumbai, India (GSTIN: ${db.profile.gstNumber}). Reach out to us at ${db.profile.email} or ${db.profile.phone} for corporate orders starting at MOQs of 25-50 units!`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the Senior B2B Corporate Advisor for '${db.profile.companyName}', an elite manufacturer and exporter of luxury leather goods with ${db.profile.yearsInBusiness} years of industry experience.
Company Profile Details:
- Name: ${db.profile.companyName}
- Tagline: ${db.profile.tagline}
- Phone: ${db.profile.phone}
- Email: ${db.profile.email}
- Address: ${db.profile.address}
- GSTIN: ${db.profile.gstNumber}
- Working Hours: ${db.profile.workingHours}

MOQ: 25-50 units for custom corporate orders; sample kits dispatched in 48 hours.
Respond in a courteous, highly professional executive tone. Keep answers structured and concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nClient Query: ${prompt}` }] }
        ]
      });

      const reply = response.text || `I would be happy to assist you with custom leather solutions from ${db.profile.companyName}. Please let us know your requirements!`;
      res.json({ reply });
    } catch (error: any) {
      console.error('Gemini Assistant Error:', error);
      res.json({
        reply: `At ${db.profile.companyName}, we offer tailored manufacturing for full-grain leather articles with low MOQs and fast 48-hour sample turnarounds. Reach us at ${db.profile.email}!`
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Amit Traders Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

