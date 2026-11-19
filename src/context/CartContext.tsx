import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Addon, CartItem, Product } from '../types/menu';
import { getItemLineTotal } from '../utils/whatsapp';

const STORAGE_KEY = 'lokmet_mazag_cart_v1';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  activeProduct: Product | null;
  toastMessage: string | null;
  addToCart: (product: Product, quantity?: number, selectedAddons?: Addon[]) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function createCartItemId(productId: string, addons: Addon[]): string {
  const sortedAddonIds = [...addons]
    .map((a) => a.id)
    .sort()
    .join(',');
  return `${productId}__${sortedAddonIds}`;
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.cartItemId === 'string' &&
        typeof item.productId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.basePrice === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        Array.isArray(item.selectedAddons)
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedAddons: Addon[] = []) => {
      if (!product.available || quantity <= 0) return;

      const sortedAddons = [...selectedAddons].sort((a, b) =>
        a.id.localeCompare(b.id)
      );
      const cartItemId = createCartItemId(product.id, sortedAddons);

      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            basePrice: product.price,
            quantity,
            selectedAddons: sortedAddons,
          },
        ];
      });

      setToastMessage(`تمت إضافة "${product.name}" إلى السلة`);
    },
    []
  );

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const openProductModal = useCallback((product: Product) => setActiveProduct(product), []);
  const closeProductModal = useCallback(() => setActiveProduct(null), []);
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getItemLineTotal(item), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      isDrawerOpen,
      activeProduct,
      toastMessage,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
      openProductModal,
      closeProductModal,
      dismissToast,
    }),
    [
      items,
      totalItems,
      subtotal,
      isDrawerOpen,
      activeProduct,
      toastMessage,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
      openProductModal,
      closeProductModal,
      dismissToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
