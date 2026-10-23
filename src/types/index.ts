export type ProductCategory = 'ALL' | 'MALE' | 'FEMALE' | 'ARCHIVE';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  index: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  category: 'MALE' | 'FEMALE' | 'UNISEX';
  images: string[];
  description: string;
  fit: string;
  details: string[];
  fabric: string;
  color: string;
  colorHex: string;
  sizes: ProductSize[];
  inStock: boolean;
  edition: string;
  gsm?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: ProductSize;
  quantity: number;
}

export type ViewMode = 'HOME' | 'SHOP' | 'PRODUCT' | 'LOOKBOOK' | 'LOGIN';

export interface UserProfile {
  phone: string;
  countryCode: string;
  isVerified: boolean;
  loginTime: string;
}

export interface CursorState {
  type: 'default' | 'product' | 'button' | 'hidden';
  text?: string;
}
