import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductSize, CursorState } from '../types';
import { useCart } from '../context/CartContext';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  setCursorState: (state: CursorState) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  setCursorState,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');
  const [addedNotice, setAddedNotice] = useState(false);
  const [[currentSlide, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const isDraggingRef = useRef(false);

  // Use the product's actual images directly from products.json
  const productImages = product.images && product.images.length > 0 ? product.images : [];

  // Sync state when switching product
  useEffect(() => {
    setSlide([0, 0]);
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setQuantity(1);
  }, [product]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productImages.length, currentSlide]);

  const goToNextSlide = () => {
    if (productImages.length <= 1) return;
    setIsZoomed(false);
    setSlide(([curr]) => [(curr + 1) % productImages.length, 1]);
  };

  const goToPrevSlide = () => {
    if (productImages.length <= 1) return;
    setIsZoomed(false);
    setSlide(([curr]) => [(curr - 1 + productImages.length) % productImages.length, -1]);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
    setIsZoomed((prev) => !prev);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => {
      if (!prev) {
        setZoomOrigin({ x: 50, y: 50 });
        return true;
      }
      return false;
    });
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div className="w-full min-h-screen pt-20 md:pt-24 pb-16 bg-white text-black">
      {/* Top Breadcrumb & Return Bar */}
      <div className="w-full px-4 sm:px-8 md:px-12 py-3 flex items-center justify-between border-b border-black/10 bg-white/90 backdrop-blur-md sticky top-16 md:top-20 z-20">
        <button
          onClick={onBack}
          onMouseEnter={() => setCursorState({ type: 'button' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 hover:text-black uppercase transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          <span>{product.index}</span>
          <span>•</span>
          <span>REF: {product.slug}</span>
        </div>

        <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
          FRAME 0{currentSlide + 1} / 0{productImages.length || 1}
        </div>
      </div>

      {/* Main Two-Column Viewport: Left Slideshow, Right Fixed Information */}
      <div className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: PRODUCT IMAGERY SLIDESHOW                   */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[65%] xl:w-[68%] flex flex-col items-center bg-white border-b lg:border-b-0 lg:border-r border-black/10 relative select-none">
          {/* Main Slide Presentation Stage with Left-to-Right Finger Slide */}
          <div
            className="relative w-full h-[500px] md:h-[72vh] lg:h-[calc(100vh-210px)] min-h-[500px] max-h-[820px] flex items-center justify-center p-0 md:p-8 lg:p-12 overflow-hidden bg-white select-none touch-pan-y"
          >
            {/* Subtle soft backdrop ambient light */}
            <div className="absolute inset-0 bg-radial from-black/[0.02] to-transparent pointer-events-none" />

            {/* Current Slide Image with Left-to-Right Finger Dragging */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {productImages.length > 0 && (
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.2 },
                  }}
                  drag={!isZoomed && productImages.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragStart={() => {
                    isDraggingRef.current = true;
                  }}
                  onDragEnd={(_, info) => {
                    const swipeThreshold = 40;
                    if (info.offset.x < -swipeThreshold || info.velocity.x < -250) {
                      goToNextSlide();
                    } else if (info.offset.x > swipeThreshold || info.velocity.x > 250) {
                      goToPrevSlide();
                    }
                    setTimeout(() => {
                      isDraggingRef.current = false;
                    }, 80);
                  }}
                  style={{ width: '450px', height: '500px', maxWidth: '100%' }}
                  className={`relative w-full max-w-[450px] h-[500px] flex items-center justify-center select-none overflow-hidden touch-pan-y ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-grab active:cursor-grabbing'
                  }`}
                  onClick={handleStageClick}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out will-change-transform pointer-events-none"
                    style={{
                      transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                    }}
                  >
                    <Image
                      src={productImages[currentSlide]}
                      alt={`${product.name} — Slide ${currentSlide + 1}`}
                      fill
                      sizes="(min-width: 768px) 450px, 100vw"
                      preload={currentSlide === 0}
                      className="object-cover md:object-contain md:drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] select-none pointer-events-none transition-all"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image zoom pan indicator when active */}
            {isZoomed && (
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="text-[9px] font-mono tracking-[0.15em] text-black uppercase bg-white/90 px-2.5 py-1.5 border border-black/20 backdrop-blur-md shadow-sm">
                  ZOOM ACTIVE • CLICK TO EXIT
                </span>
              </div>
            )}

            {/* Subtle Minimal Dots floating at Bottom of Stage */}
            {productImages.length > 1 && (
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                {productImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      currentSlide === idx ? 'w-5 bg-black' : 'w-1.5 bg-black/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: COMPLETE PRODUCT DATA SPECIFICATIONS       */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[35%] xl:w-[32%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white lg:sticky lg:top-28 lg:self-start lg:h-[calc(100vh-140px)] lg:overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Category & Stock Status */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              <span className="font-semibold text-neutral-700">{product.category}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                  }`}
                />
                <span className={product.inStock ? 'text-emerald-700 font-bold' : 'text-neutral-500'}>
                  {product.inStock ? 'AVAILABLE' : 'ARCHIVED'}
                </span>
              </div>
            </div>

            {/* PRODUCT NAME (With requested styles) */}
            <h1
              style={{
                fontSize: '21px',
                lineHeight: '27px',
                fontWeight: 'bold',
                fontStyle: 'normal',
                textDecorationLine: 'none',
                fontFamily: 'Verdana',
                textAlign: 'justify',
                width: '340.797px',
                height: '28px',
                borderStyle: 'outset',
              }}
              className="tracking-[0.2em] uppercase text-black"
            >
              {product.name}
            </h1>

            {/* PRICE & GSM SPECS */}
            <div className="flex items-baseline justify-between">
              <div className="text-xl md:text-2xl font-mono font-normal tracking-wider text-black">
                {product.currency} {product.price}
              </div>
              {product.gsm && (
                <span className="text-[10px] font-mono tracking-widest text-neutral-600 border border-black/20 px-2 py-0.5 uppercase">
                  {product.gsm}
                </span>
              )}
            </div>

            {/* COLORWAY & COLOR HEX SWATCH */}
            <div className="p-3 bg-neutral-50 border border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border border-black/30 shadow-xs inline-block"
                  style={{ backgroundColor: product.colorHex }}
                />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    COLORWAY
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase text-black">
                    {product.color}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                HEX {product.colorHex}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="pt-2 border-t border-black/10">
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* SILHOUETTE & FIT SPECIFICATION */}
            {product.fit && (
              <div className="p-3.5 bg-neutral-100/70 border-l-2 border-black flex flex-col gap-1 text-black">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500">
                  SILHOUETTE & FIT
                </span>
                <p className="text-[11px] font-sans leading-relaxed text-neutral-700">
                  {product.fit}
                </p>
              </div>
            )}

            {/* SIZES: XS S M L XL XXL */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
                  SELECT SIZE
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  onMouseEnter={() => setCursorState({ type: 'button' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="text-[10px] font-mono tracking-widest uppercase text-neutral-600 hover:text-black underline underline-offset-4"
                >
                  SIZE GUIDE
                </button>
              </div>

              {/* Minimal Size Selector */}
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      onMouseEnter={() => setCursorState({ type: 'button' })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className={`h-11 flex items-center justify-center text-xs font-mono transition-all duration-200 ${
                        isSelected
                          ? 'bg-black text-white font-semibold'
                          : 'bg-neutral-100 text-neutral-800 hover:text-black hover:bg-neutral-200 border border-black/10'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY PICKER */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-600">
                QUANTITY
              </span>
              <div className="flex items-center border border-black/15 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 flex items-center justify-center font-mono text-neutral-600 hover:text-black text-xs"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-xs text-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-9 h-9 flex items-center justify-center font-mono text-neutral-600 hover:text-black text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART ACTION */}
            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleAddToCart}
                onMouseEnter={() => setCursorState({ type: 'button' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className={`w-full py-4 text-xs font-semibold tracking-[0.3em] uppercase transition-colors flex items-center justify-center gap-2 ${
                  !product.inStock
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                {!product.inStock
                  ? 'SOLD OUT / ARCHIVED'
                  : addedNotice
                  ? 'ADDED TO CART'
                  : 'ADD TO CART'}
              </button>

              <div className="text-[9px] font-mono tracking-[0.15em] text-center text-neutral-500 uppercase mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>COMPLIMENTARY SECURE PACKAGING</span>
                <span>•</span>
                <span className="text-black font-semibold">RETURN POLICY: OPEN WITH THE DELIVERY MAN</span>
              </div>
            </div>

            {/* ACCORDION / TABS FOR EDITORIAL SPECIFICATIONS */}
            <div className="pt-6 border-t border-black/10 flex flex-col gap-3">
              <div className="flex items-center gap-6 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'details' ? 'text-black border-b border-black font-semibold' : 'hover:text-neutral-700'
                  }`}
                >
                  DETAILS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'care' ? 'text-black border-b border-black font-semibold' : 'hover:text-neutral-700'
                  }`}
                >
                  FABRIC & CARE
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'shipping' ? 'text-black border-b border-black font-semibold' : 'hover:text-neutral-700'
                  }`}
                >
                  DISPATCH
                </button>
              </div>

              <div className="text-xs text-neutral-600 leading-relaxed font-mono min-h-[70px]">
                {activeTab === 'details' && (
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-600">
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && (
                  <div className="text-[11px] space-y-1.5">
                    <p>
                      <strong className="text-black">COMPOSITION:</strong> {product.fabric}
                    </p>
                    {product.gsm && (
                      <p>
                        <strong className="text-black">WEIGHT:</strong> {product.gsm}
                      </p>
                    )}
                    <p>
                      <strong className="text-black">COLORWAY:</strong> {product.color} ({product.colorHex})
                    </p>
                    <p className="text-neutral-500">COLD MACHINE WASH GENTLE. DO NOT TUMBLE DRY. DRY FLAT IN SHADE.</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="text-[11px] space-y-1">
                    <p>SHIPS WITHIN 24 HOURS OF ORDER CONFIRMATION.</p>
                    <p>DELIVERY WITHIN 24–48 HOURS INSIDE DHAKA.</p>
                    <p>DELIVERY WITHIN 2–3 DAYS OUTSIDE DHAKA.</p>
                    <p>RETURN POLICY: OPEN WITH THE DELIVERY MAN.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productName={product.name}
        currentSelectedSize={selectedSize}
        onSelectSize={(newSize) => {
          if (product.sizes.includes(newSize as ProductSize)) {
            setSelectedSize(newSize as ProductSize);
          }
        }}
      />
    </div>
  );
};
