import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode, UserProfile } from '../types';
import { useCart } from '../context/CartContext';
import { ThunderLogo } from './ThunderLogo';
import { SHOW_LOGIN_NAV } from './Navbar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode, categoryFilter?: 'MALE' | 'FEMALE' | 'ALL') => void;
  onOpenSizeGuide?: () => void;
  currentUser?: UserProfile | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSizeGuide,
  currentUser,
}) => {
  const { totalCount, openCart } = useCart();

  const handleLink = (view: ViewMode, filter?: 'MALE' | 'FEMALE' | 'ALL') => {
    onNavigate(view, filter);
    onClose();
  };

  const handleOpenSizeChart = () => {
    onClose();
    if (onOpenSizeGuide) {
      onOpenSizeGuide();
    }
  };

  const handleCart = () => {
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-8 text-black"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ThunderLogo className="h-10 w-auto" />
            </div>
            <button
              onClick={onClose}
              className="text-[11px] tracking-[0.25em] uppercase text-neutral-600 hover:text-black px-2 py-1 border border-black/20"
            >
              CLOSE
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-7 my-auto">
            <button
              onClick={() => handleLink('HOME')}
              className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => handleLink('SHOP', 'MALE')}
              className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors"
            >
              MALE
            </button>
            <button
              onClick={() => handleLink('SHOP', 'FEMALE')}
              className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors"
            >
              FEMALE
            </button>
            {onOpenSizeGuide && (
              <button
                onClick={handleOpenSizeChart}
                className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors"
              >
                SIZE CHART
              </button>
            )}
            {SHOW_LOGIN_NAV && (
              <button
                onClick={() => handleLink('LOGIN')}
                className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors"
              >
                {currentUser ? 'ACCOUNT PROFILE' : 'SIGN IN // OTP'}
              </button>
            )}
            <button
              onClick={handleCart}
              className="text-left text-2xl font-light tracking-[0.2em] uppercase text-black hover:text-neutral-500 transition-colors flex items-center gap-3"
            >
              <span>CART</span>
              <span className="text-sm font-mono text-neutral-500">[{totalCount}]</span>
            </button>
          </div>

          {/* Bottom Info */}
          <div className="border-t border-black/10 pt-6 flex flex-col gap-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-mono">
              THUNDER ARCHIVE // COLLECTION 01
            </p>
            <p className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase">
              WORLDWIDE ARCHIVAL SHIPPING AVAILABLE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
