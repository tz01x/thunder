import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  Wind,
  Maximize2,
  Link2,
  Gem,
  Check,
} from 'lucide-react';

export type SizeCategory = 'PANTS' | 'HOODIE' | 'TEE' | 'FULLSLEEVE' | 'SWEATPANTS';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  defaultCategory?: 'PANTS' | 'HOODIE' | 'TEE' | 'FULLSLEEVE' | 'SWEATPANTS' | 'TOPS';
  onSelectSize?: (size: string) => void;
  currentSelectedSize?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  productName = 'THUNDER COLLECTION',
  defaultCategory,
  onSelectSize,
  currentSelectedSize,
}) => {
  // Determine if initial view should be pants, hoodie, tee, full sleeve, or sweatpants based on product name
  const isSweatpantsProduct =
    defaultCategory === 'SWEATPANTS' ||
    (productName &&
      (productName.toUpperCase().includes('SWEAT') ||
        productName.toUpperCase().includes('JOGGER') ||
        productName.toUpperCase().includes('TRACK')));

  const isPantsProduct =
    defaultCategory === 'PANTS' ||
    (productName &&
      (productName.toUpperCase().includes('PANT') ||
        productName.toUpperCase().includes('SHORT') ||
        productName.toUpperCase().includes('CARGO')));

  const isHoodieProduct =
    defaultCategory === 'HOODIE' ||
    (productName && productName.toUpperCase().includes('HOODIE'));

  const isFullSleeveProduct =
    defaultCategory === 'FULLSLEEVE' ||
    (productName &&
      (productName.toUpperCase().includes('LONG') ||
        productName.toUpperCase().includes('SLEEVE') ||
        productName.toUpperCase().includes('THERMAL')));

  const getInitialCategory = (): SizeCategory => {
    if (isSweatpantsProduct) return 'SWEATPANTS';
    if (isPantsProduct) return 'PANTS';
    if (isHoodieProduct) return 'HOODIE';
    if (isFullSleeveProduct) return 'FULLSLEEVE';
    return 'TEE';
  };

  const [activeCategory, setActiveCategory] = useState<SizeCategory>(getInitialCategory());
  const [unit, setUnit] = useState<'INCH' | 'CM'>('INCH');
  const [highlightedSize, setHighlightedSize] = useState<string>(
    currentSelectedSize || (isPantsProduct || isSweatpantsProduct ? '32' : 'L')
  );

  useEffect(() => {
    if (isOpen) {
      if (isSweatpantsProduct) {
        setActiveCategory('SWEATPANTS');
        if (!currentSelectedSize || ['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(currentSelectedSize)) {
          setHighlightedSize('32');
        } else {
          setHighlightedSize(currentSelectedSize);
        }
      } else if (isPantsProduct) {
        setActiveCategory('PANTS');
        if (!currentSelectedSize || ['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(currentSelectedSize)) {
          setHighlightedSize('32');
        } else {
          setHighlightedSize(currentSelectedSize);
        }
      } else if (isHoodieProduct) {
        setActiveCategory('HOODIE');
        if (!currentSelectedSize || ['30', '32', '34', '36', '38', '40', '42'].includes(currentSelectedSize)) {
          setHighlightedSize('L');
        } else {
          setHighlightedSize(currentSelectedSize);
        }
      } else if (isFullSleeveProduct) {
        setActiveCategory('FULLSLEEVE');
        if (!currentSelectedSize || ['30', '32', '34', '36', '38', '40', '42'].includes(currentSelectedSize)) {
          setHighlightedSize('L');
        } else {
          setHighlightedSize(currentSelectedSize);
        }
      } else {
        setActiveCategory('TEE');
        if (!currentSelectedSize || ['30', '32', '34', '36', '38', '40', '42'].includes(currentSelectedSize)) {
          setHighlightedSize('L');
        } else {
          setHighlightedSize(currentSelectedSize);
        }
      }
    }
  }, [isOpen, productName, isPantsProduct, isHoodieProduct, isFullSleeveProduct, isSweatpantsProduct, currentSelectedSize]);

  // CARGO BAGGY PANT DATA
  const cargoPantsData = [
    { size: '30', waistInch: 30, hipInch: 40, lengthInch: 39, legOpeningInch: 18 },
    { size: '32', waistInch: 32, hipInch: 42, lengthInch: 39, legOpeningInch: 19 },
    { size: '34', waistInch: 34, hipInch: 44, lengthInch: 40, legOpeningInch: 20 },
    { size: '36', waistInch: 36, hipInch: 46, lengthInch: 40, legOpeningInch: 20 },
    { size: '38', waistInch: 38, hipInch: 48, lengthInch: 41, legOpeningInch: 22 },
    { size: '40', waistInch: 40, hipInch: 50, lengthInch: 41, legOpeningInch: 22 },
    { size: '42', waistInch: 42, hipInch: 52, lengthInch: 41, legOpeningInch: 23 },
  ];

  // STRAIGHT LEG SWEATPANTS DATA (Exactly identical to baggy pant size charts)
  const sweatpantsData = [
    { size: '30', waistInch: 30, hipInch: 40, lengthInch: 39, legOpeningInch: 18 },
    { size: '32', waistInch: 32, hipInch: 42, lengthInch: 39, legOpeningInch: 19 },
    { size: '34', waistInch: 34, hipInch: 44, lengthInch: 40, legOpeningInch: 20 },
    { size: '36', waistInch: 36, hipInch: 46, lengthInch: 40, legOpeningInch: 20 },
    { size: '38', waistInch: 38, hipInch: 48, lengthInch: 41, legOpeningInch: 22 },
    { size: '40', waistInch: 40, hipInch: 50, lengthInch: 41, legOpeningInch: 22 },
    { size: '42', waistInch: 42, hipInch: 52, lengthInch: 41, legOpeningInch: 23 },
  ];

  // HOODIE DATA
  const hoodieData = [
    { size: 'S', lengthInch: 25, chestInch: 40, hemInch: 38, sleeveInch: 24.5 },
    { size: 'M', lengthInch: 26, chestInch: 42, hemInch: 40, sleeveInch: 25.5 },
    { size: 'L', lengthInch: 27, chestInch: 44, hemInch: 42, sleeveInch: 26.5 },
    { size: 'XL', lengthInch: 28, chestInch: 46, hemInch: 44, sleeveInch: 27 },
    { size: 'XLL', lengthInch: 29, chestInch: 48, hemInch: 46, sleeveInch: 27.5 },
    { size: 'Xlll', lengthInch: 29, chestInch: 50, hemInch: 48, sleeveInch: 28 },
  ];

  // T-SHIRT DATA (Same size as Tee chart)
  const tshirtData = [
    { size: 'S', chestInch: 40, lengthInch: 25 },
    { size: 'M', chestInch: 42, lengthInch: 26 },
    { size: 'L', chestInch: 44, lengthInch: 27 },
    { size: 'XL', chestInch: 46, lengthInch: 28 },
    { size: 'XLL', chestInch: 48, lengthInch: 29 },
    { size: 'Xlll', chestInch: 50, lengthInch: 29 },
  ];

  // FULL SLEEVE TEE DATA (Same size measurements as Tee chart with sleeve & hem specs)
  const fullSleeveData = [
    { size: 'S', lengthInch: 25, chestInch: 40, hemInch: 40, sleeveInch: 24 },
    { size: 'M', lengthInch: 26, chestInch: 42, hemInch: 42, sleeveInch: 25 },
    { size: 'L', lengthInch: 27, chestInch: 44, hemInch: 44, sleeveInch: 26 },
    { size: 'XL', lengthInch: 28, chestInch: 46, hemInch: 46, sleeveInch: 26.5 },
    { size: 'XLL', lengthInch: 29, chestInch: 48, hemInch: 48, sleeveInch: 27 },
    { size: 'Xlll', lengthInch: 29, chestInch: 50, hemInch: 50, sleeveInch: 27.5 },
  ];

  const formatVal = (inchVal: number) => {
    if (unit === 'CM') {
      return `${Math.round(inchVal * 2.54)} CM`;
    }
    return `${inchVal}"`;
  };

  const handleSizeClick = (sz: string) => {
    setHighlightedSize(sz);
    if (onSelectSize) {
      onSelectSize(sz);
    }
  };

  const currentAvailableSizes =
    activeCategory === 'PANTS' || activeCategory === 'SWEATPANTS'
      ? cargoPantsData.map((d) => d.size)
      : hoodieData.map((d) => d.size);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-[#0c0c0c] border border-white/10 p-5 sm:p-8 md:p-10 text-white shadow-2xl my-auto max-h-[92vh] overflow-y-auto rounded-none"
          >
            {/* ========================================================= */}
            {/* 1. TOP HEADER & CATEGORY TABS */}
            {/* ========================================================= */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
              {/* Brand Title */}
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-12 bg-white self-stretch" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-[0.08em] uppercase text-white leading-none">
                    SIZE CHART
                  </h2>
                  <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-neutral-400 uppercase mt-1">
                    {activeCategory === 'PANTS'
                      ? 'BAGGY PANT'
                      : activeCategory === 'SWEATPANTS'
                      ? 'STRAIGHT LEG SWEATPANTS'
                      : activeCategory === 'HOODIE'
                      ? 'OVERSIZED HOODIE'
                      : activeCategory === 'TEE'
                      ? 'BOXYFIT TEE'
                      : 'FULL SLEEVE TEE'}
                  </p>
                </div>
              </div>

              {/* Right Controls: Category Toggle + Unit Switcher + Close */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-end sm:self-auto">
                {/* Category Switcher */}
                <div className="flex flex-wrap items-center bg-black/60 border border-white/10 p-0.5 text-[10px] font-mono">
                  <button
                    onClick={() => {
                      setActiveCategory('PANTS');
                      setHighlightedSize('32');
                    }}
                    className={`px-3 py-1.5 transition-colors uppercase ${
                      activeCategory === 'PANTS'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    BAGGY PANT
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('SWEATPANTS');
                      setHighlightedSize('32');
                    }}
                    className={`px-3 py-1.5 transition-colors uppercase ${
                      activeCategory === 'SWEATPANTS'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    SWEATPANTS
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('HOODIE');
                      setHighlightedSize('L');
                    }}
                    className={`px-3 py-1.5 transition-colors uppercase ${
                      activeCategory === 'HOODIE'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    HOODIE
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('TEE');
                      setHighlightedSize('L');
                    }}
                    className={`px-3 py-1.5 transition-colors uppercase ${
                      activeCategory === 'TEE'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    TEE
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('FULLSLEEVE');
                      setHighlightedSize('L');
                    }}
                    className={`px-3 py-1.5 transition-colors uppercase ${
                      activeCategory === 'FULLSLEEVE'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    FULL SLEEVE
                  </button>
                </div>

                {/* Unit Switcher: INCH / CM */}
                <div className="flex items-center bg-black/60 border border-white/10 p-0.5 text-[10px] font-mono">
                  <button
                    onClick={() => setUnit('INCH')}
                    className={`px-2 py-1.5 transition-colors ${
                      unit === 'INCH'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    INCH
                  </button>
                  <button
                    onClick={() => setUnit('CM')}
                    className={`px-2 py-1.5 transition-colors ${
                      unit === 'CM'
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    CM
                  </button>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white px-3 py-1.5 border border-white/20 hover:border-white transition-colors"
                >
                  [CLOSE]
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. TOP END SIZE SWITCHER (EACH END HAS A SIZE SWITCHER)   */}
            {/* ========================================================= */}
            <div className="py-3 px-4 my-4 bg-[#141414] border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                  SWITCH SIZE:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentAvailableSizes.map((sz) => {
                    const isSelected = highlightedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeClick(sz)}
                        className={`min-w-[34px] h-7 px-2 flex items-center justify-center text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-black/60 text-neutral-300 border border-white/10 hover:border-white hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
                SELECTED: <span className="text-white font-bold">{highlightedSize}</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. VIEW CONTENT A: CARGO BAGGY PANT SIZE CHART            */}
            {/* ========================================================= */}
            {activeCategory === 'PANTS' && (
              <div className="space-y-6">
                {/* Main Specs & Visual Diagram Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Technical Diagram with A, B, C, D Callouts */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-4 sm:p-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/5] max-h-[300px] flex items-center justify-center">
                      <svg viewBox="0 0 220 270" className="w-full h-full text-white/95" fill="none">
                        <g>
                          {/* Back Waistband Arc */}
                          <path
                            d="M 68 36 C 88 32 132 32 152 36"
                            fill="#121318"
                            stroke="#ffffff"
                            strokeWidth="1.4"
                          />

                          {/* Front Waistband Band */}
                          <polygon
                            points="68,36 64,50 156,50 152,36"
                            fill="#1c1d24"
                            stroke="#ffffff"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />

                          {/* Center Waistband Rivet Button */}
                          <circle cx="110" cy="43" r="3.2" fill="#2a2b34" stroke="#ffffff" strokeWidth="1.2" />
                          <circle cx="110" cy="43" r="1.1" fill="#ffffff" />

                          {/* Belt Loops */}
                          <rect x="74" y="34" width="3.5" height="17" fill="#24252e" stroke="#ffffff" strokeWidth="1.1" />
                          <rect x="94" y="35" width="3.5" height="16" fill="#24252e" stroke="#ffffff" strokeWidth="1.1" />
                          <rect x="122" y="35" width="3.5" height="16" fill="#24252e" stroke="#ffffff" strokeWidth="1.1" />
                          <rect x="142" y="34" width="3.5" height="17" fill="#24252e" stroke="#ffffff" strokeWidth="1.1" />

                          {/* Pants Body & Wide Legs Silhouette */}
                          <path
                            d="M 64 50 Q 56 80 56 98 L 46 236 L 96 236 L 109 114 Q 110 112 111 114 L 124 236 L 174 236 L 164 98 Q 164 80 156 50 Z"
                            fill="#17181e"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />

                          {/* Outer Side Seam Double-Stitch Lines */}
                          <line x1="49" y1="98" x2="49" y2="231" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2,2" />
                          <line x1="171" y1="98" x2="171" y2="231" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2,2" />

                          {/* Hem Fold Double-Stitch Lines */}
                          <line x1="46" y1="231" x2="96" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />
                          <line x1="124" y1="231" x2="174" y2="231" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />

                          {/* Front Scoop Pocket - Left (Viewer's Left) */}
                          <path d="M 78 50 Q 80 66 60 74" fill="none" stroke="#ffffff" strokeWidth="1.4" />
                          <path d="M 76 50 Q 77 64 58 72" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Coin / Watch Pocket nested inside Left Scoop */}
                          <rect x="66" y="52" width="13" height="14" rx="0.5" fill="#20222a" stroke="#ffffff" strokeWidth="1.2" />
                          <circle cx="78" cy="53" r="0.9" fill="#ffffff" />

                          {/* Front Scoop Pocket - Right (Viewer's Right) */}
                          <path d="M 142 50 Q 140 66 160 74" fill="none" stroke="#ffffff" strokeWidth="1.4" />
                          <path d="M 144 50 Q 143 64 162 72" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Center Fly Seam & J-Stitch */}
                          <line x1="110" y1="50" x2="110" y2="108" stroke="#ffffff" strokeWidth="1.5" />
                          <path d="M 115 50 L 115 100 Q 115 108 110 108" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,1.5" />

                          {/* ========================================= */}
                          {/* MEASUREMENT CALLOUTS (A, B, C, D)         */}
                          {/* ========================================= */}

                          {/* A: WAIST WIDTH (Top horizontal line) */}
                          <line x1="68" y1="20" x2="152" y2="20" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="110"
                            y="14"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            A
                          </text>

                          {/* B: HIP WIDTH (Across crotch level) */}
                          <line x1="56" y1="98" x2="164" y2="98" stroke="#ffffff" strokeWidth="1.6" />
                          <rect x="105" y="86" width="11" height="11" fill="#17181e" />
                          <text
                            x="110.5"
                            y="95"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            B
                          </text>

                          {/* C: INSEAM LENGTH (Along inner left leg) */}
                          <line x1="108" y1="118" x2="96" y2="234" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="92"
                            y="178"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="end"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            C
                          </text>

                          {/* D: LEG OPENING (Horizontal under left hem) */}
                          <line x1="46" y1="245" x2="96" y2="245" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="71"
                            y="257"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            D
                          </text>
                        </g>
                      </svg>
                    </div>

                    {/* Metric Legend Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 font-mono text-[9px] text-neutral-400">
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">A: WAIST</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">B: HIP</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">C: INSEAM</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">D: LEG OPENING</span>
                    </div>

                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white mt-2">
                      BAGGY DENIM PANTS // SPEC
                    </span>
                  </div>

                  {/* Right: The Data Table */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="border border-white/20 overflow-hidden">
                      <div className="bg-white text-black py-2.5 px-4 text-center font-black tracking-[0.18em] text-sm uppercase">
                        BAGGY PANT SIZE CHART
                      </div>
                      <table className="w-full text-center font-mono text-xs text-neutral-200">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold">
                            <th className="py-2.5 px-2 border-r border-white/10">SIZE</th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              A: WAIST ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              B: HIP ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              C: LENGTH ({unit})
                            </th>
                            <th className="py-2.5 px-2">
                              D: LEG OPENING ({unit})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {cargoPantsData.map((row) => {
                            const isSelected = highlightedSize === row.size;
                            return (
                              <tr
                                key={row.size}
                                onClick={() => handleSizeClick(row.size)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-white/15 text-white font-bold'
                                    : 'hover:bg-white/5 text-neutral-300'
                                }`}
                              >
                                <td className="py-2.5 px-2 font-bold text-white border-r border-white/10 flex items-center justify-center gap-1">
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                  <span>{row.size}</span>
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.waistInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.hipInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.lengthInch)}
                                </td>
                                <td className="py-2.5 px-2">
                                  {formatVal(row.legOpeningInch)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fabric description block */}
                    <div className="mt-4 p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">
                          FABRIC
                        </span>
                        <h4 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                          DENIM COTTON 12 OUNCE
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Durable. Breathable. Made for everyday wear.
                        </p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-400 border border-white/15 px-3 py-1.5 uppercase">
                        FIT: BARREL LOOSE
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Highlight Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  {/* Badge 1: Strong Stitching */}
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Link2 className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      STRONG STITCHING
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Built to last.
                    </p>
                  </div>

                  {/* Badge 2: Comfortable Fit */}
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      COMFORTABLE FIT
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      All day comfort.
                    </p>
                  </div>

                  {/* Badge 3: Breathable Fabric */}
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      BREATHABLE FABRIC
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Keeps you cool.
                    </p>
                  </div>

                  {/* Badge 4: Premium Quality */}
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Gem className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      PREMIUM QUALITY
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Every detail matters.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2B. VIEW CONTENT: STRAIGHT LEG SWEATPANTS SIZE CHART      */}
            {/* ========================================================= */}
            {activeCategory === 'SWEATPANTS' && (
              <div className="space-y-6">
                {/* Main Specs & Visual Diagram Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Technical Pattern Diagram with A, B, C matching user photo */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-4 sm:p-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/5] max-h-[300px] flex items-center justify-center">
                      <svg viewBox="0 0 220 280" className="w-full h-full text-white/95" fill="none">
                        <g>
                          {/* Elastic Gathered Waistband */}
                          {/* Back Waist Arc */}
                          <path
                            d="M 72 34 C 90 30 130 30 148 34"
                            fill="#121318"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                          />

                          {/* Front Elastic Waistband Band */}
                          <polygon
                            points="72,34 70,48 150,48 148,34"
                            fill="#1c1d24"
                            stroke="#ffffff"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />

                          {/* Elastic Waistband Gathering / Shirring Rib Lines */}
                          <line x1="76" y1="34" x2="76" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="82" y1="34" x2="82" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="88" y1="34" x2="88" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="94" y1="34" x2="94" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="100" y1="34" x2="100" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="106" y1="34" x2="106" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="114" y1="34" x2="114" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="120" y1="34" x2="120" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="126" y1="34" x2="126" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="132" y1="34" x2="132" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="138" y1="34" x2="138" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
                          <line x1="144" y1="34" x2="144" y2="48" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />

                          {/* Straight Leg Sweatpants Silhouette (Open Straight Hem) */}
                          <path
                            d="M 70 48 Q 60 80 58 100 L 52 240 L 98 240 L 109 120 Q 110 118 111 120 L 122 240 L 168 240 L 162 100 Q 160 80 150 48 Z"
                            fill="#17181e"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />

                          {/* Center Front Seam from waistband to crotch */}
                          <line x1="110" y1="48" x2="110" y2="120" stroke="#ffffff" strokeWidth="1.5" />

                          {/* Left Open Hem Double-Stitch Line */}
                          <line x1="52" y1="235" x2="98" y2="235" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />

                          {/* Right Open Hem Double-Stitch Line */}
                          <line x1="122" y1="235" x2="168" y2="235" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />

                          {/* Outer Side Seam Stitch Guide Lines */}
                          <line x1="56" y1="100" x2="54" y2="235" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2,2" />
                          <line x1="164" y1="100" x2="166" y2="235" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2,2" />

                          {/* ========================================= */}
                          {/* DIMENSION CALLOUTS (A, B, C) FROM PHOTO   */}
                          {/* ========================================= */}

                          {/* A: WAISTBAND WIDTH (Horizontal line across waistband) */}
                          <line x1="72" y1="22" x2="148" y2="22" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="110"
                            y="15"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            A
                          </text>

                          {/* B: LEG OPENING (Horizontal line under left leg hem) */}
                          <line x1="52" y1="250" x2="98" y2="250" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="75"
                            y="262"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            B
                          </text>

                          {/* C: TOTAL LENGTH / OUTSEAM (Line along outer left leg) */}
                          <line x1="64" y1="36" x2="46" y2="240" stroke="#ffffff" strokeWidth="1.6" />
                          <rect x="36" y="138" width="10" height="12" fill="#0c0c0c" />
                          <text
                            x="41"
                            y="148"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="bold"
                            textAnchor="end"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            C
                          </text>
                        </g>
                      </svg>
                    </div>

                    {/* Metric Legend Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 font-mono text-[9px] text-neutral-400">
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">A: WAIST</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">B: LEG OPENING</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">C: LENGTH</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">HIP</span>
                    </div>

                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white mt-2">
                      STRAIGHT LEG SWEATPANTS // SPEC
                    </span>
                  </div>

                  {/* Right: The Data Table (Exact Baggy Pant Size Chart values) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="border border-white/20 overflow-hidden">
                      <div className="bg-white text-black py-2.5 px-4 text-center font-black tracking-[0.18em] text-sm uppercase">
                        STRAIGHT LEG SWEATPANTS SIZE CHART
                      </div>
                      <table className="w-full text-center font-mono text-xs text-neutral-200">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold">
                            <th className="py-2.5 px-2 border-r border-white/10">SIZE</th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              A: WAIST ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              B: LEG OPENING ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              C: LENGTH ({unit})
                            </th>
                            <th className="py-2.5 px-2">
                              HIP ({unit})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {sweatpantsData.map((row) => {
                            const isSelected = highlightedSize === row.size;
                            return (
                              <tr
                                key={row.size}
                                onClick={() => handleSizeClick(row.size)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-white/15 text-white font-bold'
                                    : 'hover:bg-white/5 text-neutral-300'
                                }`}
                              >
                                <td className="py-2.5 px-2 font-bold text-white border-r border-white/10 flex items-center justify-center gap-1">
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                  <span>{row.size}</span>
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.waistInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.legOpeningInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.lengthInch)}
                                </td>
                                <td className="py-2.5 px-2">
                                  {formatVal(row.hipInch)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fabric description block */}
                    <div className="mt-4 p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">
                          FABRIC & WEIGHT
                        </span>
                        <h4 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                          400 GSM HEAVYWEIGHT FRENCH TERRY
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Encased elastic waistband with internal drawstrings. Open straight hem.
                        </p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-400 border border-white/15 px-3 py-1.5 uppercase">
                        FIT: RELAXED STRAIGHT LEG
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      400 GSM FRENCH TERRY
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Substantial heavyweight hand feel.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      ELASTIC WAISTBAND
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Encased elastic with interior drawstring.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      STRAIGHT LEG CUT
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Wide open hem drape over footwear.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      PRE-SHRUNK
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">True to size wash after wash.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. VIEW CONTENT B: HOODIE SIZE CHART                      */}
            {/* ========================================================= */}
            {activeCategory === 'HOODIE' && (
              <div className="space-y-6">
                {/* Main Specs & Visual Diagram Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Technical Diagram with CHEST and LENGTH */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-4 sm:p-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                      <svg viewBox="0 0 215 195" className="w-full h-full max-h-[185px] text-white/95" fill="none">
                        <g>
                          {/* Torso Base Body */}
                          <path
                            d="M 80 52 L 56 60 L 60 92 L 64 154 L 136 154 L 140 92 L 144 60 L 120 52 Z"
                            fill="#16171d"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />

                          {/* Left Relaxed Dropped Sleeve */}
                          <path
                            d="M 56 60 Q 36 98 24 146 L 38 156 Q 52 118 60 92 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          {/* Left Ribbed Wrist Cuff */}
                          <polygon
                            points="24,146 38,156 34,163 20,153"
                            fill="#20222c"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <line x1="23" y1="148" x2="36" y2="157" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="21.5" y1="150" x2="34.5" y2="159" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

                          {/* Right Relaxed Dropped Sleeve */}
                          <path
                            d="M 144 60 Q 164 98 176 146 L 162 156 Q 148 118 140 92 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          {/* Right Ribbed Wrist Cuff */}
                          <polygon
                            points="176,146 162,156 166,163 180,153"
                            fill="#20222c"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <line x1="177" y1="148" x2="164" y2="157" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="178.5" y1="150" x2="165.5" y2="159" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

                          {/* Curved Armhole Seams */}
                          <path d="M 56 60 Q 64 76 60 92" stroke="#ffffff" strokeWidth="1.4" />
                          <path d="M 144 60 Q 136 76 140 92" stroke="#ffffff" strokeWidth="1.4" />
                          <line x1="80" y1="52" x2="56" y2="60" stroke="#ffffff" strokeWidth="1.4" />
                          <line x1="120" y1="52" x2="144" y2="60" stroke="#ffffff" strokeWidth="1.4" />

                          {/* Ribbed Hem Waistband */}
                          <polygon
                            points="64,154 136,154 134,168 66,168"
                            fill="#20222c"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          {/* Ribbed Waistband Texture Hatch Lines */}
                          <line x1="72" y1="154" x2="72" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="78" y1="154" x2="78" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="84" y1="154" x2="84" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="90" y1="154" x2="90" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="96" y1="154" x2="96" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="104" y1="154" x2="104" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="110" y1="154" x2="110" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="116" y1="154" x2="116" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="122" y1="154" x2="122" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />
                          <line x1="128" y1="154" x2="128" y2="168" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

                          {/* Kangaroo Pouch Pocket */}
                          <path
                            d="M 80 114 L 120 114 L 129 142 L 126 154 L 74 154 L 71 142 Z"
                            fill="#1e2028"
                            stroke="#ffffff"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          {/* Pocket Opening Double Stitches */}
                          <line x1="80" y1="114" x2="120" y2="114" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,1.5" />
                          <line x1="78.5" y1="117" x2="70" y2="142" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="1.5,1.5" />
                          <line x1="121.5" y1="117" x2="130" y2="142" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="1.5,1.5" />

                          {/* Hood Structure */}
                          {/* Outer Hood Dome */}
                          <path
                            d="M 80 52 C 64 36 68 18 100 18 C 132 18 136 36 120 52 Z"
                            fill="#16171d"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />

                          {/* Inner Hood Depth & Inverted V Fold */}
                          <path
                            d="M 82 28 L 100 52 L 118 28"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            fill="none"
                          />

                          {/* Throat Crossover Wrap Neckline */}
                          <path
                            d="M 76 50 Q 88 60 100 56 Q 112 60 124 50"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 80 52 L 100 56 L 120 52"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            fill="none"
                          />

                          {/* ========================================= */}
                          {/* MEASUREMENT CALLOUTS (A, B, C, D)         */}
                          {/* ========================================= */}

                          {/* A: BODY LENGTH (Right vertical dimension with horizontal guide lines) */}
                          <line x1="120" y1="44" x2="198" y2="44" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="2.5,2" />
                          <line x1="134" y1="168" x2="198" y2="168" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="2.5,2" />
                          <line x1="198" y1="44" x2="198" y2="168" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="204"
                            y="110"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="bold"
                            textAnchor="start"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            A
                          </text>

                          {/* B: CHEST WIDTH (Horizontal line across underarms) */}
                          <line x1="60" y1="92" x2="140" y2="92" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="100"
                            y="85"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            B
                          </text>

                          {/* C: BOTTOM HEM WIDTH (Horizontal line under ribbed hem) */}
                          <line x1="66" y1="172" x2="134" y2="172" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="100"
                            y="184"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            C
                          </text>

                          {/* D: SLEEVE LENGTH (Solid line running parallel along top of left sleeve) */}
                          <line x1="54" y1="52" x2="16" y2="140" stroke="#ffffff" strokeWidth="1.6" />
                          <rect x="25" y="85" width="10" height="12" fill="#0c0c0c" />
                          <text
                            x="30"
                            y="95"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            D
                          </text>
                        </g>
                      </svg>
                    </div>

                    {/* Metric Legend Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 font-mono text-[9px] text-neutral-400">
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">A: LENGTH</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">B: CHEST</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">C: HEM</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">D: SLEEVE</span>
                    </div>

                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white mt-2">
                      OVERSIZED HOODIE // SPEC
                    </span>
                  </div>

                  {/* Right: The Data Table */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="border border-white/20 overflow-hidden">
                      <div className="bg-white text-black py-2.5 px-4 text-center font-black tracking-[0.18em] text-sm uppercase">
                        HOODIE SIZE CHART
                      </div>
                      <table className="w-full text-center font-mono text-xs text-neutral-200">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold">
                            <th className="py-2.5 px-2 border-r border-white/10">SIZE</th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              A: LENGTH ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              B: CHEST ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              C: HEM ({unit})
                            </th>
                            <th className="py-2.5 px-2">
                              D: SLEEVE ({unit})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {hoodieData.map((row) => {
                            const isSelected = highlightedSize === row.size;
                            return (
                              <tr
                                key={row.size}
                                onClick={() => handleSizeClick(row.size)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-white/15 text-white font-bold'
                                    : 'hover:bg-white/5 text-neutral-300'
                                }`}
                              >
                                <td className="py-2.5 px-2 font-bold text-white border-r border-white/10 flex items-center justify-center gap-1">
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                  <span>{row.size}</span>
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.lengthInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.chestInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.hemInch)}
                                </td>
                                <td className="py-2.5 px-2">
                                  {formatVal(row.sleeveInch)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fabric description block */}
                    <div className="mt-4 p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">
                          FABRIC & WEIGHT
                        </span>
                        <h4 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                          400 GSM HEAVYWEIGHT FRENCH TERRY
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Brushed interior. Pre-shrunk cotton. Structured drape.
                        </p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-400 border border-white/15 px-3 py-1.5 uppercase">
                        FIT: OVERSIZED BOXY
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      400 GSM FRENCH TERRY
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Heavy, ultra-dense cotton fleece.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      CROSSOVER HOOD
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Clean wrap collar without drawstrings.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      DROPPED SHOULDERS
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Relaxed body drape & wider armholes.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      POUCH POCKET
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Reinforced bartack stitching.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. VIEW CONTENT C: TEE SIZE CHART                         */}
            {/* ========================================================= */}
            {activeCategory === 'TEE' && (
              <div className="space-y-6">
                {/* Main Specs & Visual Diagram Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Technical Diagram with CHEST and LENGTH */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-4 sm:p-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                      <svg viewBox="0 0 210 200" className="w-full h-full max-h-[175px] text-white/95" fill="none">
                        <g>
                          {/* Torso Base Body */}
                          <path
                            d="M 80 42 L 46 54 L 58 92 L 58 170 L 142 170 L 142 92 L 154 54 L 120 42 Z"
                            fill="#16171d"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />

                          {/* Left Short Dropped Sleeve */}
                          <path
                            d="M 46 54 L 20 106 L 46 114 L 58 92 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <line x1="22" y1="102" x2="44" y2="109" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Right Short Dropped Sleeve */}
                          <path
                            d="M 154 54 L 180 106 L 154 114 L 142 92 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <line x1="178" y1="102" x2="156" y2="109" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Dropped Shoulder Seamlines */}
                          <line x1="46" y1="54" x2="58" y2="92" stroke="#ffffff" strokeWidth="1.4" strokeDasharray="2.5,1.5" />
                          <line x1="154" y1="54" x2="142" y2="92" stroke="#ffffff" strokeWidth="1.4" strokeDasharray="2.5,1.5" />
                          <line x1="80" y1="42" x2="46" y2="54" stroke="#ffffff" strokeWidth="1.4" />
                          <line x1="120" y1="42" x2="154" y2="54" stroke="#ffffff" strokeWidth="1.4" />

                          {/* Crew Neckline Rib Collar */}
                          <path
                            d="M 80 42 C 86 54 114 54 120 42"
                            stroke="#ffffff"
                            strokeWidth="2.8"
                            fill="#22242e"
                          />
                          <path
                            d="M 80 42 C 86 36 114 36 120 42"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            fill="#0d0e12"
                          />

                          {/* Bottom Hem Double-Stitch Line */}
                          <line x1="58" y1="164" x2="142" y2="164" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />

                          {/* CHEST Dimension Arrow & Badge */}
                          <line x1="58" y1="96" x2="142" y2="96" stroke="#ffffff" strokeWidth="1.8" />
                          <polygon points="58,96 64,93 64,99" fill="#ffffff" />
                          <polygon points="142,96 136,93 136,99" fill="#ffffff" />
                          <rect
                            x="78"
                            y="89"
                            width="44"
                            height="14"
                            fill="#000000"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                          />
                          <text
                            x="100"
                            y="99.5"
                            fill="#ffffff"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            CHEST
                          </text>

                          {/* LENGTH Dimension Arrow & Badge */}
                          <line x1="140" y1="42" x2="182" y2="42" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />
                          <line x1="142" y1="170" x2="182" y2="170" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />
                          <line x1="180" y1="42" x2="180" y2="170" stroke="#ffffff" strokeWidth="1.8" />
                          <polygon points="180,42 177,48 183,48" fill="#ffffff" />
                          <polygon points="180,170 177,164 183,164" fill="#ffffff" />
                          <g transform="translate(191, 106) rotate(-90)">
                            <rect
                              x="-22"
                              y="-7"
                              width="44"
                              height="14"
                              fill="#000000"
                              stroke="#ffffff"
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="3"
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              LENGTH
                            </text>
                          </g>
                        </g>
                      </svg>
                    </div>

                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white mt-2">
                      BOXYFIT TEE // SPEC
                    </span>
                  </div>

                  {/* Right: The Data Table */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="border border-white/20 overflow-hidden">
                      <div className="bg-white text-black py-2.5 px-4 text-center font-black tracking-[0.18em] text-sm uppercase">
                        T-SHIRT SIZE CHART
                      </div>
                      <table className="w-full text-center font-mono text-xs text-neutral-200">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[10px] tracking-wider uppercase font-semibold">
                            <th className="py-2.5 px-3 border-r border-white/10">SIZE</th>
                            <th className="py-2.5 px-3 border-r border-white/10">CHEST ({unit})</th>
                            <th className="py-2.5 px-3">LENGTH ({unit})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {tshirtData.map((row) => {
                            const isSelected = highlightedSize === row.size;
                            return (
                              <tr
                                key={row.size}
                                onClick={() => handleSizeClick(row.size)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-white/15 text-white font-bold'
                                    : 'hover:bg-white/5 text-neutral-300'
                                }`}
                              >
                                <td className="py-2.5 px-3 font-bold text-white border-r border-white/10 flex items-center justify-center gap-1.5">
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                  <span>{row.size}</span>
                                </td>
                                <td className="py-2.5 px-3 border-r border-white/10">
                                  {formatVal(row.chestInch)}
                                </td>
                                <td className="py-2.5 px-3">{formatVal(row.lengthInch)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fabric description block */}
                    <div className="mt-4 p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">
                          FABRIC & WEIGHT
                        </span>
                        <h4 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                          240 GSM HEAVYWEIGHT COMBED COTTON
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Dense jersey weave. 1.25" bound ribbed collar. Anti-shrink finish.
                        </p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-400 border border-white/15 px-3 py-1.5 uppercase">
                        FIT: BOXY RELAXED
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      240 GSM COMBED COTTON
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Substantial heavyweight hand feel.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      THICK RIBBED COLLAR
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Sturdy neckband that retains its shape.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      BOXY RELAXED FIT
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Roomy torso with dropped sleeve hem.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      PRE-SHRUNK
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">True to size wash after wash.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 5. VIEW CONTENT D: FULL SLEEVE TEE SIZE CHART             */}
            {/* ========================================================= */}
            {activeCategory === 'FULLSLEEVE' && (
              <div className="space-y-6">
                {/* Main Specs & Visual Diagram Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Technical Pattern Diagram with A, B, C, D */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-4 sm:p-5 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                      <svg viewBox="0 0 250 200" className="w-full h-full max-h-[180px] text-white/95" fill="none">
                        <g>
                          {/* Torso Base Body */}
                          <path
                            d="M 86 42 L 64 48 L 64 162 L 156 162 L 156 48 L 134 42 Z"
                            fill="#16171d"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />

                          {/* Left Full Length Sleeve */}
                          <path
                            d="M 64 48 L 12 118 L 24 138 L 64 96 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          {/* Left Wrist Cuff */}
                          <line x1="14" y1="115" x2="26" y2="135" stroke="#ffffff" strokeWidth="1.2" />
                          <line x1="16" y1="113" x2="28" y2="133" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Right Full Length Sleeve */}
                          <path
                            d="M 156 48 L 208 118 L 196 138 L 156 96 Z"
                            fill="#181920"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          {/* Right Wrist Cuff */}
                          <line x1="206" y1="115" x2="194" y2="135" stroke="#ffffff" strokeWidth="1.2" />
                          <line x1="204" y1="113" x2="192" y2="133" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                          {/* Dropped Shoulder / Armhole Seamlines */}
                          <path d="M 64 48 Q 68 72 64 96" stroke="#ffffff" strokeWidth="1.4" />
                          <path d="M 156 48 Q 152 72 156 96" stroke="#ffffff" strokeWidth="1.4" />
                          <line x1="86" y1="42" x2="64" y2="48" stroke="#ffffff" strokeWidth="1.4" />
                          <line x1="134" y1="42" x2="156" y2="48" stroke="#ffffff" strokeWidth="1.4" />

                          {/* Ribbed Crewneck Collar Outer Ring */}
                          <path
                            d="M 86 42 C 92 56 128 56 134 42"
                            stroke="#ffffff"
                            strokeWidth="2.8"
                            fill="#20222c"
                          />
                          <path
                            d="M 86 42 C 92 36 128 36 134 42"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            fill="#0d0e12"
                          />
                          {/* Fine Collar Ribbing Hatch Lines */}
                          <line x1="94" y1="42" x2="95" y2="48" stroke="#ffffff" strokeWidth="0.7" />
                          <line x1="102" y1="44" x2="103" y2="50" stroke="#ffffff" strokeWidth="0.7" />
                          <line x1="110" y1="45" x2="110" y2="51" stroke="#ffffff" strokeWidth="0.7" />
                          <line x1="118" y1="44" x2="117" y2="50" stroke="#ffffff" strokeWidth="0.7" />
                          <line x1="126" y1="42" x2="125" y2="48" stroke="#ffffff" strokeWidth="0.7" />

                          {/* Bottom Hem Double-Stitch Line */}
                          <line x1="64" y1="157" x2="156" y2="157" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />

                          {/* ========================================= */}
                          {/* CALLOUT LINES (A, B, C, D) MATCHING PHOTO */}
                          {/* ========================================= */}

                          {/* A: BODY LENGTH (Right vertical dimension with horizontal guide lines) */}
                          <line x1="134" y1="42" x2="228" y2="42" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="2.5,2" />
                          <line x1="156" y1="162" x2="228" y2="162" stroke="#ffffff" strokeWidth="0.9" strokeDasharray="2.5,2" />
                          <line x1="228" y1="42" x2="228" y2="162" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="234"
                            y="105"
                            fill="#ffffff"
                            fontSize="10.5"
                            fontWeight="bold"
                            textAnchor="start"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            A
                          </text>

                          {/* B: CHEST WIDTH (Horizontal line across underarms) */}
                          <line x1="64" y1="96" x2="156" y2="96" stroke="#ffffff" strokeWidth="1.6" />
                          <rect x="105" y="84" width="10" height="11" fill="#16171d" />
                          <text
                            x="110"
                            y="93"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            B
                          </text>

                          {/* C: BOTTOM HEM WIDTH (Horizontal line under bottom hem) */}
                          <line x1="64" y1="167" x2="156" y2="167" stroke="#ffffff" strokeWidth="1.6" />
                          <text
                            x="110"
                            y="179"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            C
                          </text>

                          {/* D: SLEEVE LENGTH (Solid line running along top of left sleeve) */}
                          <line x1="64" y1="40" x2="12" y2="110" stroke="#ffffff" strokeWidth="1.6" />
                          <rect x="33" y="66" width="10" height="11" fill="#0c0c0c" />
                          <text
                            x="38"
                            y="75"
                            fill="#ffffff"
                            fontSize="9.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                          >
                            D
                          </text>
                        </g>
                      </svg>
                    </div>

                    {/* Metric Legend Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 font-mono text-[9px] text-neutral-400">
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">A: LENGTH</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">B: CHEST</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">C: HEM</span>
                      <span className="bg-white/10 px-1.5 py-0.5 text-white font-semibold">D: SLEEVE</span>
                    </div>

                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white mt-2">
                      LONG SLEEVE // SPEC
                    </span>
                  </div>

                  {/* Right: The Data Table */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="border border-white/20 overflow-hidden">
                      <div className="bg-white text-black py-2.5 px-4 text-center font-black tracking-[0.18em] text-sm uppercase">
                        FULL SLEEVE TEE SIZE CHART
                      </div>
                      <table className="w-full text-center font-mono text-xs text-neutral-200">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold">
                            <th className="py-2.5 px-2 border-r border-white/10">SIZE</th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              A: LENGTH ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              B: CHEST ({unit})
                            </th>
                            <th className="py-2.5 px-2 border-r border-white/10">
                              C: HEM ({unit})
                            </th>
                            <th className="py-2.5 px-2">
                              D: SLEEVE ({unit})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {fullSleeveData.map((row) => {
                            const isSelected = highlightedSize === row.size;
                            return (
                              <tr
                                key={row.size}
                                onClick={() => handleSizeClick(row.size)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-white/15 text-white font-bold'
                                    : 'hover:bg-white/5 text-neutral-300'
                                }`}
                              >
                                <td className="py-2.5 px-2 font-bold text-white border-r border-white/10 flex items-center justify-center gap-1">
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                  <span>{row.size}</span>
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.lengthInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.chestInch)}
                                </td>
                                <td className="py-2.5 px-2 border-r border-white/10">
                                  {formatVal(row.hemInch)}
                                </td>
                                <td className="py-2.5 px-2">
                                  {formatVal(row.sleeveInch)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fabric description block */}
                    <div className="mt-4 p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase block">
                          FABRIC & WEIGHT
                        </span>
                        <h4 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                          280 GSM HEAVYWEIGHT COMBED COTTON
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Dense jersey knit. Ribbed wrist cuffs & bound crew collar.
                        </p>
                      </div>
                      <div className="text-right font-mono text-[10px] text-neutral-400 border border-white/15 px-3 py-1.5 uppercase">
                        FIT: RELAXED FULL SLEEVE
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      280 GSM COMBED COTTON
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Substantial heavyweight hand feel.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      REINFORCED CUFFS
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Stretchy ribbed cuffs retain snug fit.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      FULL SLEEVE CUT
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">All-season comfort & coverage.</p>
                  </div>

                  <div className="flex flex-col items-center p-3 rounded bg-white/[0.02] border border-white/5">
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center mb-2 text-white">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">
                      PRE-SHRUNK
                    </h5>
                    <p className="text-[10px] text-neutral-400 mt-1">True to size wash after wash.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. BOTTOM END SIZE SWITCHER (EACH END HAS A SIZE SWITCHER) */}
            {/* ========================================================= */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111111] p-3.5 border">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                  SIZE PICKER:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentAvailableSizes.map((sz) => {
                    const isSelected = highlightedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeClick(sz)}
                        className={`min-w-[34px] h-7 px-2 flex items-center justify-center text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-black/60 text-neutral-300 border border-white/15 hover:border-white hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  CLICK ROW OR BUTTON TO SELECT
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-mono px-4 py-1.5 bg-white text-black font-bold hover:bg-neutral-200 transition-colors uppercase"
                >
                  APPLY & CLOSE
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. FOOTER SIGNATURE */}
            {/* ========================================================= */}
            <div className="pt-4 mt-3 text-center">
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
                THUNDER &nbsp;/&nbsp; STREETWEAR FOR THE FUTURE
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
