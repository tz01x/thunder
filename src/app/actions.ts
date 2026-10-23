'use server';

import { randomInt } from 'node:crypto';
import { after } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import productsData from '../data/products.json';
import { notifyOrder } from '@/lib/notifiers';

export interface OrderInput {
  name: string;
  phone: string;
  location: string;
  city: string;
  address: string;
  captchaToken: string;
  items: { productId: string; size: string; quantity: number }[];
}

export type OrderResult = { ref: string } | { error: string };

const LOCATIONS = ['INSIDE_DHAKA', 'OUTSIDE_DHAKA'];
// Bangladeshi mobile: prefixes 013–019 + 8 digits; optional 88 / +88 / 0088 country code
const PHONE = /^(?:\+?88|0088)?01[3-9]\d{8}$/;

// Read text field, trimmed and capped; '' if missing
const text = (value: unknown, max = 300) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// reCAPTCHA v3 score: 1.0 = likely human, 0.0 = likely bot. Fails closed if the secret is missing.
async function isHuman(token: string) {
  if (!token || !process.env.RECAPTCHA_SECRET_KEY) return false;
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: token }),
    });
    const data = await res.json();
    return data.success === true && data.action === 'checkout' && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verify failed', error);
    return false;
  }
}

export async function placeOrder(input: OrderInput): Promise<OrderResult> {
  if (!(await isHuman(text(input?.captchaToken, 4000)))) {
    return { error: 'COULD NOT VERIFY YOU ARE HUMAN — PLEASE TRY AGAIN' };
  }

  const name = text(input?.name, 120);
  const phone = text(input?.phone, 30).replace(/[\s-]/g, '');
  const city = text(input?.city, 120);
  const address = text(input?.address, 500);
  const location = text(input?.location, 20);

  if (!name || !city || !address || !PHONE.test(phone) || !LOCATIONS.includes(location)) {
    return { error: 'PLEASE CHECK YOUR DELIVERY DETAILS' };
  }
  if (!Array.isArray(input.items) || input.items.length === 0 || input.items.length > 50) {
    return { error: 'YOUR CART IS EMPTY' };
  }

  // Prices come from products.json, never from the browser
  const items = [];
  for (const { productId, size, quantity } of input.items) {
    const product = productsData.find((p) => p.id === productId);
    const sizes = (product?.sizes ?? []).map((s) => s.toUpperCase());
    if (!product || !product.inStock || !sizes.includes(size) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { error: 'AN ITEM IN YOUR CART IS NO LONGER AVAILABLE' };
    }
    items.push({ product_id: product.id, name: product.name, size, quantity, price: Number(product.price) });
  }
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Secret key bypasses RLS; orders table has no public policies, so only this server code can write to it
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false },
  });

  // Retry on order_ref collision (unique violation 23505)
  for (let attempt = 0; attempt < 3; attempt++) {
    const ref = `TH-${randomInt(100000, 1000000)}`;
    const { error } = await supabase.from('orders').insert({
      order_ref: ref,
      customer_name: name,
      phone,
      location,
      city,
      address,
      payment_method: 'COD',
      items,
      subtotal,
    });
    if (!error) {
      // Runs after the response is sent, so the customer doesn't wait on Telegram etc.
      after(() => notifyOrder({ ref, name, phone, location, city, address, items, subtotal }));
      return { ref };
    }
    if (error.code !== '23505') {
      console.error('placeOrder insert failed', error);
      break;
    }
  }
  return { error: 'COULD NOT PLACE ORDER — PLEASE TRY AGAIN' };
}
