"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/context/wishlist-context";
import { useCart } from "@/lib/context/cart-context";
import {
  Heart,
  ShoppingBag,
  Trash2,
  Gift,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-pink-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Save your favorite gifts here for later
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700"
          >
            Explore Gifts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              {items.length} item(s) saved
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden product-card-hover"
            >
              <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                <Gift className="w-12 h-12 text-purple-300" />
                <button
                  onClick={() => {
                    removeItem(product.id);
                    toast.success("Removed from wishlist");
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {product.discount && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-md">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <div className="p-3 md:p-4">
                <Link href={`/products/${product.id}`}>
                  <p className="text-xs text-purple-600 font-medium mb-1 capitalize">
                    {product.category.replace(/-/g, " ")}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addItem(product);
                    toast.success("Added to cart!");
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
