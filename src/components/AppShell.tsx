'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CartProvider } from '../context/CartContext';
import { Product, ViewMode, CursorState, UserProfile } from '../types';
import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';
import { MobileMenu } from './MobileMenu';
import { CustomCursor } from './CustomCursor';
import { SoundAtmosphere } from './SoundAtmosphere';
import { SizeGuideModal } from './SizeGuideModal';

type Gender = 'MALE' | 'FEMALE' | 'ALL';

interface ShellContextType {
  setCursorState: (state: CursorState) => void;
  navigate: (view: ViewMode, filter?: Gender) => void;
  selectProduct: (product: Product) => void;
  backToShop: () => void;
  currentUser: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'thunder_user';

const shopPath = (gender: Gender) => (gender === 'ALL' ? '/shop' : `/shop/${gender.toLowerCase()}`);

// Maps the URL back to the view/gender the existing components expect
function parsePath(pathname: string): { view: ViewMode; gender?: Gender } {
  const [, segment, param] = pathname.split('/');
  switch (segment) {
    case 'shop':
      return { view: 'SHOP', gender: param === 'male' ? 'MALE' : param === 'female' ? 'FEMALE' : 'ALL' };
    case 'product':
      return { view: 'PRODUCT' };
    case 'lookbook':
      return { view: 'LOOKBOOK' };
    case 'login':
      return { view: 'LOGIN' };
    default:
      return { view: 'HOME' };
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { view: currentView, gender } = parsePath(pathname);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlobalSizeGuideOpen, setIsGlobalSizeGuideOpen] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Remember the last shop filter so "back to shop" returns to it
  const lastGenderRef = useRef<Gender>('ALL');
  if (gender) lastGenderRef.current = gender;

  // Load after mount (localStorage is unavailable during server render)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch {}
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const shell = useMemo<ShellContextType>(() => {
    const navigate = (view: ViewMode, filter?: Gender) => {
      switch (view) {
        case 'SHOP':
          router.push(shopPath(filter ?? lastGenderRef.current));
          break;
        case 'LOOKBOOK':
          router.push('/lookbook');
          break;
        case 'LOGIN':
          router.push('/login');
          break;
        default:
          router.push('/');
      }
    };

    return {
      setCursorState,
      navigate,
      selectProduct: (product) => router.push(`/product/${product.id}`),
      backToShop: () => navigate('SHOP'),
      currentUser,
      login: (user) => {
        setCurrentUser(user);
        try {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } catch {}
      },
      logout: () => {
        setCurrentUser(null);
        try {
          localStorage.removeItem(USER_STORAGE_KEY);
        } catch {}
      },
    };
  }, [router, currentUser]);

  return (
    <CartProvider>
      <ShellContext.Provider value={shell}>
        <div className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden font-sans">
          {/* Custom Interactive Desktop Cursor */}
          <CustomCursor cursorState={cursorState} />

          {/* Global Minimal Header */}
          <Navbar
            currentView={currentView}
            onNavigate={shell.navigate}
            onOpenMenu={() => setIsMobileMenuOpen(true)}
            setCursorState={setCursorState}
            activeGender={gender}
            onOpenSizeGuide={() => setIsGlobalSizeGuideOpen(true)}
            currentUser={currentUser}
          />

          {/* Fullscreen Mobile Overlay Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={shell.navigate}
            onOpenSizeGuide={() => setIsGlobalSizeGuideOpen(true)}
            currentUser={currentUser}
          />

          {/* Main Content Area (route pages) */}
          <main className="relative w-full min-h-screen">{children}</main>

          {/* Slide-out Minimal Cart Drawer */}
          <CartDrawer
            setCursorState={setCursorState}
            onExploreProducts={() => shell.navigate('SHOP', 'ALL')}
          />

          {/* Global Size Guide Modal */}
          <SizeGuideModal
            isOpen={isGlobalSizeGuideOpen}
            onClose={() => setIsGlobalSizeGuideOpen(false)}
          />

          {/* Ambient Brutalist Soundscape Toggle */}
          <SoundAtmosphere setCursorState={setCursorState} />
        </div>
      </ShellContext.Provider>
    </CartProvider>
  );
}

export const useShell = () => {
  const context = useContext(ShellContext);
  if (!context) {
    throw new Error('useShell must be used within AppShell');
  }
  return context;
};
