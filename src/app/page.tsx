import { after } from 'next/server';
import { PRODUCTS } from '../data/products';
import { HomeView } from '../components/views';
import { pingDb } from '@/lib/db';

// Rendered per request so each visit lets pingDb() run; a static page would only ping at build time.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // After the response, so the landing page never waits on the database.
  after(pingDb);
  return <HomeView products={PRODUCTS} />;
}
