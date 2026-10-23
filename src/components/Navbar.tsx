import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ViewMode, CursorState, UserProfile } from '../types';
const thunderBrandLogo = '/images/logo.png';

// ponytail: login hidden from nav; /login still works by URL. Flip to true to restore.
export const SHOW_LOGIN_NAV = false;

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, categoryFilter?: 'MALE' | 'FEMALE' | 'ALL') => void;
  onOpenMenu: () => void;
  setCursorState: (state: CursorState) => void;
  activeGender?: 'MALE' | 'FEMALE' | 'ALL';
  onOpenSizeGuide?: () => void;
  currentUser?: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenMenu,
  setCursorState,
  activeGender,
  onOpenSizeGuide,
  currentUser,
}) => {
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-white/65 backdrop-blur-2xl backdrop-saturate-[190%] py-2.5 sm:py-3 border-b border-black/[0.07] shadow-[0_8px_32px_0_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)]'
          : 'bg-white/30 backdrop-blur-sm py-5 sm:py-6 md:py-7 border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-12 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* TOP LEFT: LOGO */}
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('HOME')}
            onMouseEnter={() => setCursorState({ type: 'button' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className="group flex items-center text-left focus:outline-none"
            aria-label="Thunder Home"
          >
            <span className="inline-flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-90">
              <Image
                src={thunderBrandLogo}
                alt="Thunder"
                width={1171}
                height={1171}
                sizes="64px"
                preload
                className={`w-auto object-contain select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? 'h-9 sm:h-11 md:h-12' : 'h-12 sm:h-14 md:h-16'
                }`}
                draggable={false}
              />
            </span>
          </button>
        </div>

        {/* TOP RIGHT - DESKTOP: MALE, FEMALE, CART */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => onNavigate('SHOP', 'MALE')}
            onMouseEnter={() => setCursorState({ type: 'button' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className={`text-[11px] tracking-[0.25em] uppercase transition-all duration-200 ${
              currentView === 'SHOP' && activeGender === 'MALE'
                ? 'text-black font-semibold underline underline-offset-8 decoration-1'
                : 'text-black/70 hover:text-black'
            }`}
          >
            MALE
          </button>

          <button
            onClick={() => onNavigate('SHOP', 'FEMALE')}
            onMouseEnter={() => setCursorState({ type: 'button' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className={`text-[11px] tracking-[0.25em] uppercase transition-all duration-200 ${
              currentView === 'SHOP' && activeGender === 'FEMALE'
                ? 'text-black font-semibold underline underline-offset-8 decoration-1'
                : 'text-black/70 hover:text-black'
            }`}
          >
            FEMALE
          </button>

          {onOpenSizeGuide && (
            <button
              onClick={onOpenSizeGuide}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="text-[11px] tracking-[0.25em] uppercase text-black/70 hover:text-black transition-colors"
            >
              SIZE CHART
            </button>
          )}

          {SHOW_LOGIN_NAV && (
            <button
              onClick={() => onNavigate('LOGIN')}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className={`text-[11px] tracking-[0.25em] uppercase transition-all duration-200 ${
                currentView === 'LOGIN'
                  ? 'text-black font-semibold underline underline-offset-8 decoration-1'
                  : 'text-black/70 hover:text-black'
              }`}
            >
              {currentUser ? 'ACCOUNT' : 'LOGIN'}
            </button>
          )}

          <button
            onClick={openCart}
            onMouseEnter={() => setCursorState({ type: 'button' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className="text-[11px] tracking-[0.25em] uppercase text-black hover:text-black/70 transition-colors flex items-center gap-1.5"
          >
            <span>CART</span>
            <span className="font-mono text-[10px] text-neutral-500">[{totalCount}]</span>
          </button>
        </nav>

        {/* TOP RIGHT - MOBILE */}
        <div className="flex md:hidden items-center gap-4">
          {SHOW_LOGIN_NAV && (
            <button
              onClick={() => onNavigate('LOGIN')}
              className={`text-[10px] tracking-[0.2em] uppercase font-mono px-2 py-0.5 border ${
                currentView === 'LOGIN'
                  ? 'bg-black text-white border-black'
                  : 'text-black/80 border-black/20'
              }`}
            >
              {currentUser ? 'ACC' : 'LOGIN'}
            </button>
          )}

          <button
            onClick={openCart}
            className="text-[11px] tracking-[0.25em] uppercase text-black flex items-center gap-1"
          >
            <span>CART</span>
            <span className="font-mono text-[10px] text-neutral-500">[{totalCount}]</span>
          </button>

          <button
            onClick={onOpenMenu}
            className="text-[11px] tracking-[0.25em] uppercase text-black font-medium px-2 py-1 border border-black/20"
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  );
};
