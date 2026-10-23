'use client';

// Client entry points for each route: wire shell context into the existing components
// and reproduce the original per-view enter transitions.
import { motion } from 'motion/react';
import { Product } from '../types';
import { useShell } from './AppShell';
import { HeroGallery } from './HeroGallery';
import { ProductGrid } from './ProductGrid';
import { ProductPage } from './ProductPage';
import { LookbookSection } from './LookbookSection';
import { LoginPage } from './LoginPage';

const ease = [0.16, 1, 0.3, 1] as const;
const slideUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease },
};

export function HomeView({ products }: { products: Product[] }) {
  const { selectProduct, setCursorState } = useShell();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease }}>
      <HeroGallery products={products} onSelectProduct={selectProduct} setCursorState={setCursorState} />
    </motion.div>
  );
}

export function ShopView({ products, category }: { products: Product[]; category: 'MALE' | 'FEMALE' | 'ALL' }) {
  const { selectProduct, setCursorState } = useShell();
  return (
    // Keyed so the grid re-reads initialCategory when the filter changes
    <motion.div key={category} {...slideUp}>
      <ProductGrid
        products={products}
        initialCategory={category}
        onSelectProduct={selectProduct}
        setCursorState={setCursorState}
      />
    </motion.div>
  );
}

export function ProductView({ product }: { product: Product }) {
  const { backToShop, setCursorState } = useShell();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease }}
    >
      <ProductPage product={product} onBack={backToShop} setCursorState={setCursorState} />
    </motion.div>
  );
}

export function LookbookView({ products }: { products: Product[] }) {
  const { selectProduct, setCursorState } = useShell();
  return (
    <motion.div {...slideUp}>
      <LookbookSection products={products} onSelectProduct={selectProduct} setCursorState={setCursorState} />
    </motion.div>
  );
}

export function LoginView() {
  const { currentUser, login, logout, navigate, setCursorState } = useShell();
  return (
    <motion.div {...slideUp}>
      <LoginPage
        currentUser={currentUser}
        onLoginSuccess={login}
        onLogout={logout}
        onBack={() => navigate('HOME')}
        setCursorState={setCursorState}
      />
    </motion.div>
  );
}
