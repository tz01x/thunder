import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product, CursorState } from '../types';

interface LookbookSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  setCursorState: (state: CursorState) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  onSelectProduct,
  setCursorState,
}) => {
  return (
    <div className="w-full min-h-screen pt-28 md:pt-36 pb-28 px-6 md:px-16 max-w-[1400px] mx-auto text-black">
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-black/10 gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
            EDITORIAL CAMPAIGN 01
          </span>
          <h1 className="text-2xl md:text-4xl font-light tracking-[0.25em] uppercase text-black mt-1">
            MONOLITH // FORM & TEXTURE
          </h1>
        </div>
        <div className="text-[11px] font-mono text-neutral-600 max-w-md leading-relaxed">
          An exploration of heavyweight architectural drape, unadorned silhouettes, and raw mineral shades.
          Engineered for permanent rotation.
        </div>
      </div>

      {/* Alternating Editorial Feed */}
      <div className="space-y-32 md:space-y-48 mt-24">
        {products.map((product, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Massive Editorial Photo Container */}
              <div
                onClick={() => onSelectProduct(product)}
                onMouseEnter={() => setCursorState({ type: 'product', text: 'VIEW' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="w-full lg:w-3/5 aspect-[3/4] max-h-[85vh] bg-neutral-100 border border-black/10 overflow-hidden relative flex items-center justify-center p-8 md:p-16 cursor-pointer group"
              >
                <div className="absolute w-3/4 h-16 bottom-8 rounded-full bg-black/10 blur-2xl pointer-events-none" />

                <div className="relative w-[90%] h-[90%]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute top-6 left-6 text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                  LOOK {product.index.replace('PRODUCT ', '')}
                </div>
              </div>

              {/* Editorial Prose & Metadata */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-6">
                <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                  {product.category} // {product.edition}
                </div>

                <h2
                  onClick={() => onSelectProduct(product)}
                  onMouseEnter={() => setCursorState({ type: 'button' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  {product.name}
                </h2>

                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-2 text-[11px] font-mono text-neutral-600 space-y-1">
                  <div>SILHOUETTE: {product.fit}</div>
                  <div>FABRIC: {product.fabric}</div>
                </div>

                <div className="pt-4 flex items-center gap-6">
                  <span className="text-sm font-mono text-black">
                    {product.currency === '$' ? `$${product.price} USD` : `${product.currency} ${product.price}`}
                  </span>
                  <button
                    onClick={() => onSelectProduct(product)}
                    onMouseEnter={() => setCursorState({ type: 'button' })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="text-[10px] font-mono tracking-[0.25em] uppercase text-black border-b border-black pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
                  >
                    PURCHASE SPECIFICATION →
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Campaign Footer */}
      <div className="mt-32 pt-16 border-t border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase gap-6">
        <span>THUNDER CAMPAIGN 01 // SHOT IN MONOCHROME AMBIENCE</span>
        <span>ALL RIGHTS RESERVED // TOKYO & LOS ANGELES ARCHIVES</span>
      </div>
    </div>
  );
};
