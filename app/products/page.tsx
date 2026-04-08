"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { products, categories, occasions, recipients } from "@/lib/data/products";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Gift,
  Mic,
  MicOff,
  Grid3X3,
  List,
  ChevronDown,
  Sparkles,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const showVoice = searchParams.get("voice") === "true";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isListening, setIsListening] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.tags.some((t) => t.includes(s))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedOccasions.length > 0) {
      result = result.filter((p) =>
        p.occasion?.some((o) =>
          selectedOccasions.includes(o.toLowerCase())
        )
      );
    }

    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [search, selectedCategory, priceRange, selectedOccasions, sortBy]);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Voice search is not supported in your browser");
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      toast.success(`Heard: "${transcript}"`);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Could not recognize speech. Please try again.");
    };

    recognition.start();
  };

  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory
                  ? categories.find((c) => c.slug === selectedCategory)?.name ||
                    "All Gifts"
                  : "All Gifts"}
              </h1>
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Search + Voice */}
            <div className="flex gap-2 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search gifts... try "photo frame"'
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white"
                />
              </div>
              <button
                onClick={handleVoiceSearch}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? "bg-red-50 border-red-200 text-red-500 animate-pulse"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 ${
                    viewMode === "grid"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 ${
                    viewMode === "list"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter toggle mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"
            } lg:block lg:static lg:w-64 lg:shrink-0`}
          >
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Category
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.slug ? "" : cat.slug
                      )
                    }
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-purple-50 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {cat.productCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Price Range
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Under ₹1,000", range: [0, 1000] as [number, number] },
                  { label: "₹1,000 - ₹2,000", range: [1000, 2000] as [number, number] },
                  { label: "₹2,000 - ₹5,000", range: [2000, 5000] as [number, number] },
                  { label: "₹5,000 - ₹10,000", range: [5000, 10000] as [number, number] },
                  { label: "Above ₹10,000", range: [10000, 15000] as [number, number] },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPriceRange(p.range)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      priceRange[0] === p.range[0] && priceRange[1] === p.range[1]
                        ? "bg-purple-50 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                <button
                  onClick={() => setPriceRange([0, 15000])}
                  className="text-xs text-purple-600 px-3 mt-1"
                >
                  Reset price
                </button>
              </div>
            </div>

            {/* Occasion filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Occasion
              </h4>
              <div className="flex flex-wrap gap-2">
                {occasions.slice(0, 8).map((occ) => (
                  <button
                    key={occ}
                    onClick={() =>
                      setSelectedOccasions((prev) =>
                        prev.includes(occ.toLowerCase())
                          ? prev.filter((o) => o !== occ.toLowerCase())
                          : [...prev, occ.toLowerCase()]
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedOccasions.includes(occ.toLowerCase())
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">
                  AI Pick
                </span>
              </div>
              <p className="text-xs text-purple-700 mb-3">
                Not sure what to get? Let AI help you find the perfect gift!
              </p>
              <Link
                href="/ai-recommender"
                className="block text-center py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try AI Gift Finder
              </Link>
            </div>

            {/* Mobile close */}
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden w-full mt-6 py-3 bg-purple-600 text-white font-medium rounded-xl"
            >
              Apply Filters ({filteredProducts.length} results)
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                    setPriceRange([0, 15000]);
                    setSelectedOccasions([]);
                  }}
                  className="px-6 py-2.5 bg-purple-600 text-white text-sm rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden product-card-hover"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                        <Gift className="w-12 h-12 text-purple-300" />
                      </div>
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-md">
                            NEW
                          </span>
                        )}
                        {product.discount && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-md">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleItem(product)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isInWishlist(product.id)
                              ? "bg-pink-500 text-white"
                              : "bg-white/90 text-gray-600 hover:text-pink-500"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={
                              isInWishlist(product.id) ? "currentColor" : "none"
                            }
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <button
                          onClick={() => {
                            addItem(product);
                            toast.success("Added to cart!");
                          }}
                          className="w-full py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="block p-3"
                    >
                      <p className="text-xs text-purple-600 font-medium mb-1 capitalize">
                        {product.category.replace(/-/g, " ")}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
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
                        </div>
                        <span className="text-xs text-gray-400">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl flex items-center justify-center shrink-0">
                      <Gift className="w-8 h-8 text-purple-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-purple-600 font-medium capitalize">
                        {product.category.replace(/-/g, " ")}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-bold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-500">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                        toast.success("Added to cart!");
                      }}
                      className="self-center px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 shrink-0"
                    >
                      Add to Cart
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
