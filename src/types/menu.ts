export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  available: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  addons?: Addon[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  selectedAddons: Addon[];
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  area: string;
  address: string;
  notes: string;
}
