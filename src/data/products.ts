// Server-only: reads public/images from disk, so import this from Server Components (pages) only.
import fs from 'node:fs';
import path from 'node:path';
import { Product } from '../types';
import productsData from './products.json';

// Product images live in public/images and are matched by filename only
const IMAGE_EXT = /\.(jpe?g|png|webp|svg|gif|avif)$/i;
const imageFiles = fs
  .readdirSync(path.join(process.cwd(), 'public', 'images'))
  .filter((file) => IMAGE_EXT.test(file));
const imageSet = new Set(imageFiles);

const toImageUrl = (filename: string) => `/images/${encodeURIComponent(filename)}`;

function resolveImagePath(imagePath: string): string | null {
  if (!imagePath) return null;

  // If already an absolute or web URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  // Extract just the file name (e.g. "IMG_0560.jpg" from "src/assets/images/IMG_0560.jpg")
  const filename = imagePath.split('/').pop() || '';
  return imageSet.has(filename) ? toImageUrl(filename) : null;
}

export const PRODUCTS: Product[] = (productsData as any[]).map((product) => {
  const resolvedImages = (product.images || [])
    .map(resolveImagePath)
    .filter((url: string | null): url is string => Boolean(url));

  // If for any reason no images resolved (e.g. invalid paths), use available images as fallback
  const finalImages = resolvedImages.length > 0
    ? resolvedImages
    : imageFiles.slice(0, 1).map(toImageUrl);

  return {
    id: product.id,
    index: product.index,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    currency: product.currency || '$',
    category: product.category,
    fabric: product.fabric,
    gsm: product.gsm,
    color: product.color || 'Standard',
    colorHex: product.colorHex || '#1c1c1c',
    sizes: (product.sizes || []).map((s: string) => s.toUpperCase()),
    inStock: Boolean(product.inStock),
    edition: product.edition,
    fit: product.fit,
    description: product.description,
    details: product.details || [],
    images: finalImages,
  };
});

export default PRODUCTS;
