import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Space_Mono } from 'next/font/google';
import { AppShell } from '../components/AppShell';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['italic'],
  variable: '--font-cormorant',
});
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' });
const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600'], variable: '--font-inter' });

const title = 'thunder — Luxury Brutalist Streetwear';
const description = 'Ultra-minimal brutalist luxury streetwear and editorial fashion platform.';

export const metadata: Metadata = {
  title: { default: title, template: '%s — thunder' },
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceMono.variable} ${inter.variable} bg-white text-black antialiased selection:bg-black selection:text-white`}
    >
      <body className="bg-white text-black overflow-x-hidden font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
