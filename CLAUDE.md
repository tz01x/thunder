# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"thunder" — brutalist luxury streetwear storefront. Next.js 16 (App Router) + React 19 + Tailwind v4. Migrated from a Google AI Studio Vite SPA. Only backend piece is Supabase for checkout orders (see below). `@google/genai` is in `package.json` but unused; `README.md`, `GEMINI_API_KEY`/`APP_URL` in `.env.example` and `metadata.json` are AI Studio leftovers.

## Commands

```bash
npm install
npm run dev       # next dev on port 3000, host 0.0.0.0
npm run build     # next build (all routes statically generated)
npm run start     # serve production build
npm run lint      # tsc --noEmit (type check only; no ESLint/Prettier)
```

No test framework configured. `npm run clean` uses `rm -rf .next` (needs a POSIX shell; fails under cmd on Windows).

## Architecture

- **Routes** (`src/app/`): `/` home, `/shop`, `/shop/male|female`, `/product/[id]` (by product `id`, slugs aren't unique), `/lookbook` (no nav link, URL only), `/login`. Pages are Server Components that load `PRODUCTS` and render a client view from `src/components/views.tsx`.
- **`src/components/AppShell.tsx`** (client, mounted in `layout.tsx`) owns global UI: `CartProvider`, Navbar, MobileMenu, CartDrawer, global SizeGuideModal, SoundAtmosphere, CustomCursor. Exposes `useShell()`: `navigate(view, filter?)`, `selectProduct`, `backToShop`, `setCursorState`, `currentUser`, `login/logout`.
- **Existing components keep their Vite-era props** (`onNavigate(view: ViewMode, filter)`, `setCursorState`, `onSelectProduct`). `AppShell.navigate` maps `ViewMode` → URL via `router.push`; `parsePath` maps URL back to `currentView`/gender for Navbar highlighting. New page = route in `src/app/` + view in `views.tsx` + cases in `navigate`/`parsePath`.
- **Custom cursor**: `cursorState` lives only in AppShell (not in context value, to avoid re-rendering consumers on hover). Components call `setCursorState({ type: 'product' | 'button', text })`. `CustomCursor` toggles `body.has-custom-cursor` (hides native cursor via `globals.css`).
- **Page transitions**: enter-only `motion.div` per view in `views.tsx` (App Router unmounts the old page immediately, so original exit animations are gone).
- **Client state + SSR**: cart (`localStorage` `thunder_cart_v1`) and user (`thunder_user`) are loaded in `useEffect` after mount, never in `useState` initializers — that would cause hydration mismatches. Cart persistence waits for `isHydrated` so it doesn't overwrite saved cart with `[]`.
- **Cart**: items embed a full `Product` snapshot; product edits don't update saved carts. `addToCart` auto-opens the drawer.
- **Checkout → Supabase**: `CartDrawer` form calls server action `placeOrder` (`src/app/actions.ts`), which re-prices items from `products.json` (never trusts client prices), validates, and inserts into `orders` with `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SECRET_KEY` from `.env` (secret key server-only; never `NEXT_PUBLIC_`). Table DDL in `supabase/orders.sql`; RLS on with no policies, so only the secret key can access it. Cash on delivery only; staff read orders in the Supabase dashboard. `@supabase/ssr` is installed but unused (for future real auth).
- **Auth is mocked**: `LoginPage` simulates robot check + OTP with `setTimeout`, code generated client-side.
- **Sound**: `SoundAtmosphere` has its own Web Audio logic; `src/context/SoundContext.tsx` duplicates it and is not mounted.
- **Size guide**: `SizeGuideModal` (~1800 lines, data inline) picks garment category from `defaultCategory` or keyword-matching `productName` (SWEAT/JOGGER/TRACK → SWEATPANTS, PANT/SHORT/CARGO → PANTS, HOODIE, LONG/SLEEVE/THERMAL → FULLSLEEVE, else TEE).

## Product data

- Source of truth: `src/data/products.json`. `src/data/products.ts` normalizes it into `PRODUCTS` and **uses `fs`** — import it only from Server Components (pages), pass products to client components as props.
- Images live in `public/images/`. JSON image entries are matched **by filename only** (the `src/assets/images/` prefix in JSON is legacy and ignored) and served as `/images/<encoded filename>`. Unmatched filenames are silently dropped; if none resolve, the first file in `public/images` is used. `http(s)://` and `data:` URLs pass through.
- Adding an image: put file in `public/images/`, reference filename in JSON. Product pages are statically generated at build, so restart dev / rebuild after JSON changes.
- Prices are in BDT.

## Conventions

- Only `AppShell.tsx` and `views.tsx` carry `'use client'`; everything they import is client by extension. Don't import `src/data/products.ts` from client code.
- Images use `next/image` (source files are multi-MB; served as resized WebP via `/_next/image`, needs `sharp`). The original `object-contain` + `max-h/max-w-[N%]` pattern is reproduced as a `relative w-[N%] h-[N%]` wrapper with `fill` + `object-contain`; keep accurate `sizes` when changing grid layouts. Logos use fixed `width/height={1171}` (logo.png is 1171²) with CSS height + `w-auto`. Remote `http(s)` image URLs in `products.json` would need `images.remotePatterns` in a `next.config.ts` (none exists yet).
- Animations: `motion/react` (not `framer-motion`). Icons: `lucide-react`.
- Styling: Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`). Fonts via `next/font/google` in `layout.tsx` as CSS vars (`--font-cormorant`, `--font-space-mono`, `--font-inter`) used by `.font-brand`/`.font-price`/`.font-space`/`.font-inter` in `src/app/globals.css`. Body uses Tailwind `font-sans` (system stack), so Inter appears only where `font-inter` is applied. Monochrome palette.
- `@/*` alias → `src/*`.
