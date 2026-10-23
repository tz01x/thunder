import type { Metadata } from 'next';
import { PRODUCTS } from '../../../data/products';
import { ShopView } from '../../../components/views';

const CATEGORIES = { male: 'MALE', female: 'FEMALE' } as const;
type CategorySlug = keyof typeof CATEGORIES;

type Props = { params: Promise<{ category: CategorySlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: `Shop ${category === 'male' ? 'Male' : 'Female'}` };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params;
  return <ShopView products={PRODUCTS} category={CATEGORIES[category]} />;
}
