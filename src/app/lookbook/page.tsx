import type { Metadata } from 'next';
import { PRODUCTS } from '../../data/products';
import { LookbookView } from '../../components/views';

export const metadata: Metadata = { title: 'Lookbook' };

export default function LookbookPage() {
  return <LookbookView products={PRODUCTS} />;
}
