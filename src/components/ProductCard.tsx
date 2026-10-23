import React from 'react';
import Image from 'next/image';
import { Product, CursorState } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  setCursorState: (state: CursorState) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  setCursorState,
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setCursorState({ type: 'product', text: 'VIEW' })}
      onMouseLeave={() => setCursorState({ type: 'default' })}
      className="group relative cursor-pointer flex flex-col bg-white border border-black overflow-hidden"
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/5] bg-neutral-50 overflow-hidden flex items-center justify-center p-6 md:p-8 border-b border-black">
        <div className="relative w-[88%] h-[88%]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Top left edition stamp */}
        <div className="absolute top-3 left-3 font-space text-[9px] tracking-[0.1em] text-black/60 uppercase">
          {product.index}
        </div>

        {/* Top right GSM / Fabric Tag */}
        {product.gsm && (
          <div className="absolute top-3 right-3 font-space text-[9px] tracking-[0.1em] border border-black px-2 py-0.5 text-black bg-white">
            {product.gsm}
          </div>
        )}
      </div>

      {/* Metadata Below Image */}
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3 bg-white">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-space text-[9px] text-black/60 uppercase tracking-[0.1em] flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/30 inline-block"
                style={{ backgroundColor: product.colorHex }}
                title={`${product.color} (${product.colorHex})`}
              />
              <span>{product.color}</span>
            </span>

            <span className="text-[9px] font-mono text-neutral-400 uppercase">
              {product.edition.split('—')[0]?.trim()}
            </span>
          </div>

          <h3 className="text-[13px] md:text-[14px] font-normal uppercase tracking-tight text-black group-hover:opacity-75 transition-opacity">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-black/10">
          <span className="font-price text-[20px] md:text-[22px] tracking-[-0.01em] text-black">
            {product.currency === '$' ? `$${product.price}.00` : `${product.currency} ${product.price}`}
          </span>
          <span className="font-space text-[9px] uppercase tracking-[0.1em] text-black underline underline-offset-4 group-hover:opacity-70">
            {product.sizes.length} SIZES // SPECS →
          </span>
        </div>
      </div>
    </div>
  );
};
