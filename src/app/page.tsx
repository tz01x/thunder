import { PRODUCTS } from '../data/products';
import { HomeView } from '../components/views';

export default function HomePage() {
  return <HomeView products={PRODUCTS} />;
}
