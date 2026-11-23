export type ProductCategory = 'todos' | 'jugos' | 'kekes' | 'combos';

export interface Product {
  id: string;
  name: string;
  badge: 'Recién exprimido' | 'Horneado hoy' | 'Combo Especial' | 'Edición Limitada' | 'Casero & Fresco' | '100% Pura Fruta';
  badgeType: 'juice' | 'cake' | 'combo';
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  prepTime: string;
  category: 'jugos' | 'kekes' | 'combos';
  imageUri?: string;
  localImage?: any;
  squareImage?: any;
  accentColor: string;
  ingredients: string[];
  freshnessNote: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  deliveryMode: 'takeaway' | 'dinein';
  icePreference?: 'con_hielo' | 'sin_hielo' | 'frappe';
  notes?: string;
}
