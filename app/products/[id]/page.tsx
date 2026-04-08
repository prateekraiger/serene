"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { products } from "@/lib/data/products";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Gift,
  Minus,
  Plus,
  Share2,
  ChevronRight,
  Eye,
  Sparkles,
  Box,
  Camera,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showAR, setShowAR] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);

  if (!product) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900">
            Product not found
          </h1>
          <Link
            href="/products"
            className="text-purple-600 text-sm mt-2 inline-block"
          >
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    setDeliveryInfo(
      `Delivery available! Expected by ${new Date(
        Date.now() + 4 * 86400000
      ).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}`
    );
  };

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-purple-600">
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                <Gift className="w-24 h-24 text-purple-200" />
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
                    NEW
                  </span>
                )}
                {product.discount && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                    -{product.discount}% OFF
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-lg">
                    BESTSELLER
                  </span>
                )}
              </div>
              {/* AR button */}
              {product.arModelUrl && (
                <button
                  onClick={() => setShowAR(!showAR)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                  View in AR
                </button>
              )}
            </div>

            {/* AR Preview Panel */}
            {showAR && (
              <div className="mb-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">
                    AR Product Preview
                  </h3>
                </div>
                <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-3">
                  <div className="text-center text-white">
                    <Box className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-70">
                      AR Preview will load here
                    </p>
                    <p className="text-xs opacity-50 mt-1">
                      Point your camera at a flat surface
                    </p>
                  </div>
                </div>
                <p className="text-xs text-purple-700">
                  Requires a device with AR capabilities. Tap the camera to see
                  how this product looks in your space.
                </p>
              </div>
            )}

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImageIdx === idx
                      ? "border-purple-500"
                      : "border-gray-200"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-purple-200" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-sm text-purple-600 font-medium capitalize">
                {product.category.replace(/-/g, " ")}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 rounded-lg">
                <span className="text-sm font-bold text-green-700">
                  {product.rating}
                </span>
                <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
              </div>
              <span className="text-sm text-gray-500">
                {product.reviewCount.toLocaleString()} ratings
              </span>
              {product.isBestseller && (
                <span className="text-sm text-orange-600 font-medium">
                  Bestseller
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-lg text-green-600 font-semibold">
                    {product.discount}% off
                  </span>
                </>
              )}
              <span className="text-xs text-gray-400">inclusive of taxes</span>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Tags */}
            {product.occasion && (
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Perfect for:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.occasion.map((occ) => (
                    <span
                      key={occ}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full capitalize"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2.5 text-sm font-semibold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  addItem(product, quantity);
                  toast.success(`${product.name} added to cart!`);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  toggleItem(product);
                  toast.success(
                    isInWishlist(product.id)
                      ? "Removed from wishlist"
                      : "Added to wishlist!"
                  );
                }}
                className={`p-3 rounded-xl border transition-colors ${
                  isInWishlist(product.id)
                    ? "bg-pink-50 border-pink-200 text-pink-500"
                    : "border-gray-200 text-gray-500 hover:text-pink-500"
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isInWishlist(product.id) ? "currentColor" : "none"}
                />
              </button>

              <button className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:text-purple-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Gift wrap */}
            <label className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600"
              />
              <Gift className="w-5 h-5 text-yellow-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Add Gift Wrapping
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  (+ ₹99 per item)
                </span>
              </div>
            </label>

            {/* Delivery Check */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  Check Delivery
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter pincode"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={checkDelivery}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
                >
                  Check
                </button>
              </div>
              {deliveryInfo && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {deliveryInfo}
                </p>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Free Delivery", sub: "Above ₹999" },
                { icon: RotateCcw, text: "Easy Returns", sub: "7 day policy" },
                { icon: Shield, text: "Secure Pay", sub: "UPI, Cards, COD" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="text-center p-3 bg-gray-50 rounded-xl"
                >
                  <b.icon className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-900">{b.text}</p>
                  <p className="text-[10px] text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    {product.rating}
                  </p>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.reviewCount} ratings
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-3">
                        {stars}
                      </span>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: `${
                              stars === 5
                                ? 60
                                : stars === 4
                                ? 25
                                : stars === 3
                                ? 10
                                : stars === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Reviews will be loaded from the backend API. This is a frontend preview.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Standard Delivery:</strong> 4-7 business days | Free
                above ₹999
              </p>
              <p>
                <strong>Express Delivery:</strong> 1-2 business days | ₹149
              </p>
              <p>
                <strong>Same Day Delivery:</strong> Available in select cities |
                ₹299
              </p>
              <p>
                <strong>Returns:</strong> 7-day hassle-free return policy
              </p>
              <p>
                <strong>Cash on Delivery:</strong> Available for orders under
                ₹10,000
              </p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.id}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-purple-200" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {rp.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      ₹{rp.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
