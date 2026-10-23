import React, { useState } from 'react';
import { Product, CursorState, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  initialCategory?: 'MALE' | 'FEMALE' | 'ALL';
  onSelectProduct: (product: Product) => void;
  setCursorState: (state: CursorState) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  initialCategory = 'ALL',
  onSelectProduct,
  setCursorState,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MALE') return p.category === 'MALE' || p.category === 'UNISEX';
    if (selectedCategory === 'FEMALE') return p.category === 'FEMALE' || p.category === 'UNISEX';
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="w-full min-h-screen pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-[1500px] mx-auto">
      {/* Editorial Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10 mb-12">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
            COLLECTION 01 // ARCHIVE PIECES
          </div>
          <h1 className="text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-black">
            CATALOG // READY TO WEAR
          </h1>
        </div>

        {/* Clean Filter Controls without Pills */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <div className="flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase">
            <button
              onClick={() => setSelectedCategory('ALL')}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className={`transition-colors ${
                selectedCategory === 'ALL'
                  ? 'text-black font-semibold border-b border-black pb-0.5'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              ALL [{products.length}]
            </button>
            <button
              onClick={() => setSelectedCategory('MALE')}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className={`transition-colors ${
                selectedCategory === 'MALE'
                  ? 'text-black font-semibold border-b border-black pb-0.5'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              MALE
            </button>
            <button
              onClick={() => setSelectedCategory('FEMALE')}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className={`transition-colors ${
                selectedCategory === 'FEMALE'
                  ? 'text-black font-semibold border-b border-black pb-0.5'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              FEMALE
            </button>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
            <span>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-black border-b border-neutral-300 pb-0.5 outline-none text-[10px] font-mono tracking-widest cursor-pointer"
            >
              <option value="default" className="bg-white text-black">CATALOG ORDER</option>
              <option value="price-asc" className="bg-white text-black">PRICE [LOW-HIGH]</option>
              <option value="price-desc" className="bg-white text-black">PRICE [HIGH-LOW]</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2-Column Desktop Grid / 1-Column Mobile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            setCursorState={setCursorState}
          />
        ))}
      </div>

      {/* Subtle bottom archival statement */}
      <div className="mt-20 pt-10 border-t border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between text-neutral-500 text-[10px] font-mono tracking-[0.2em] uppercase gap-4">
        <div>ALL GARMENTS DESIGNED IN HEAVY MONOCHROME FORM</div>
        <div>GLOBAL CARBON-OFFSET SHIPMENTS FROM CENTRAL ARCHIVE</div>
      </div>
    </div>
  );
};
