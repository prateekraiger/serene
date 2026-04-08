"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Gift,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    removeItem,
    updateQuantity,
    toggleGiftWrap,
    setGiftMessage,
    clearCart,
  } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "GIFT10") {
      setCouponApplied(true);
      toast.success("Coupon applied! 10% off your order");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added any gifts yet. Let our AI help
            you find the perfect one!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
            <Link
              href="/ai-recommender"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-50 text-purple-700 font-medium rounded-xl hover:bg-purple-100"
            >
              <Sparkles className="w-4 h-4" />
              AI Gift Finder
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountAmount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = total - discountAmount;

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{itemCount} item(s)</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 md:p-6"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Gift className="w-8 h-8 text-purple-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-purple-600 line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                          {item.product.category.replace(/-/g, " ")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1.5 hover:bg-gray-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1.5 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ₹{item.product.price.toLocaleString("en-IN")} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gift Wrap Option */}
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.giftWrap}
                      onChange={() => toggleGiftWrap(item.id)}
                      className="w-3.5 h-3.5 rounded text-purple-600"
                    />
                    <Gift className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-xs text-gray-600">
                      Gift wrap this item (+ ₹99)
                    </span>
                  </label>
                  {item.giftWrap && (
                    <input
                      type="text"
                      placeholder="Add a gift message (optional)"
                      value={item.giftMessage || ""}
                      onChange={(e) => setGiftMessage(item.id, e.target.value)}
                      className="mt-2 w-full px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-28">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon (GIFT10)</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              {!couponApplied && (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Coupon code"
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Try: GIFT10 for 10% off
                  </p>
                </div>
              )}

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Free Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
