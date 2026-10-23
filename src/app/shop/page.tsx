import type { Metadata } from 'next';
import { PRODUCTS } from '../../data/products';
import { ShopView } from '../../components/views';

export const metadata: Metadata = { title: 'Shop' };

export default function ShopPage() {
  return <ShopView products={PRODUCTS} category="ALL" />;
}
