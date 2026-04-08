"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { CartItem, Product } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleGiftWrap: (itemId: string) => void;
  setGiftMessage: (itemId: string, message: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GIFT_WRAP_PRICE = 99;
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_CHARGE = 79;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity,
          giftWrap: false,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const toggleGiftWrap = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, giftWrap: !item.giftWrap } : item
      )
    );
  }, []);

  const setGiftMessage = useCallback((itemId: string, message: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, giftMessage: message } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const itemTotal = item.product.price * item.quantity;
        const wrapCost = item.giftWrap ? GIFT_WRAP_PRICE * item.quantity : 0;
        return sum + itemTotal + wrapCost;
      }, 0),
    [items]
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const tax = 0; // Inclusive pricing
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        tax,
        total,
        addItem,
        removeItem,
        updateQuantity,
        toggleGiftWrap,
        setGiftMessage,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
