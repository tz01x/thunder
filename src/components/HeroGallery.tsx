import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product, CursorState } from '../types';

interface HeroGalleryProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  setCursorState: (state: CursorState) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  products,
  onSelectProduct,
  setCursorState,
}) => {
  // Display all products from products.json
  const displayProducts = products;

  return (
    <div
      id="home-4x4-grid"
      className="relative w-full min-h-screen bg-white pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-6 md:px-10 max-w-[1780px] mx-auto"
    >
      {/* PRODUCT PHOTO GRID POWERED BY PRODUCTS.JSON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {displayProducts.map((product, index) => {
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.03, 0.35),
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectProduct(product)}
              onMouseEnter={() => {
                setCursorState({ type: 'product', text: 'VIEW' });
              }}
              onMouseLeave={() => {
                setCursorState({ type: 'default' });
              }}
              className="group relative w-full aspect-[3/4] overflow-hidden cursor-pointer select-none bg-white"
            >
              {/* Product Photograph from products.json */}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                preload={index < 4}
                loading={index < 8 ? 'eager' : 'lazy'}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
