"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import { products, categories, testimonials } from "@/lib/data/products";
import {
  Sparkles,
  ArrowRight,
  Star,
  ShoppingBag,
  Heart,
  Mic,
  Search,
  Gift,
  Truck,
  Shield,
  Headphones,
  Eye,
  TrendingUp,
  Zap,
  Brain,
  Camera,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="pt-[calc(4rem+28px)]">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <AIFeaturesSection />
      <BestsellersSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

/* ============ HERO ============ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>AI-Powered Gift Recommendations</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Perfect Gift
              </span>
              <br />
              for Every Moment
            </h1>

            <p className="text-lg text-purple-100 max-w-lg leading-relaxed">
              India&apos;s smartest gift shop powered by AI. Get personalized
              recommendations, preview gifts in AR, and shop with voice search.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-xl shadow-black/10"
              >
                <ShoppingBag className="w-5 h-5" />
                Explore Gifts
              </Link>
              <Link
                href="/ai-recommender"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                AI Gift Finder
              </Link>
            </div>

            {/* Search bar in hero */}
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder='Try "birthday gift for dad under ₹2000"'
                className="w-full pl-12 pr-12 py-4 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-100 rounded-lg text-purple-600 hover:bg-purple-200 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "10K+", label: "Gift Options" },
                { value: "4.8★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-purple-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Gift Cards visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative gift cards */}
              <div className="absolute top-8 left-8 w-64 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl transform -rotate-6 animate-float">
                <div className="p-6 text-white">
                  <Gift className="w-8 h-8 mb-4" />
                  <p className="text-2xl font-bold">Birthday</p>
                  <p className="text-sm opacity-80 mt-2">
                    Curated with love
                  </p>
                </div>
              </div>
              <div className="absolute top-20 right-4 w-64 h-80 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-2xl transform rotate-6 animate-float [animation-delay:1s]">
                <div className="p-6 text-white">
                  <Heart className="w-8 h-8 mb-4" />
                  <p className="text-2xl font-bold">Anniversary</p>
                  <p className="text-sm opacity-80 mt-2">
                    Made to cherish
                  </p>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-80 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl shadow-2xl animate-float [animation-delay:2s]">
                <div className="p-6 text-white">
                  <Sparkles className="w-8 h-8 mb-4" />
                  <p className="text-2xl font-bold">Festivals</p>
                  <p className="text-sm opacity-80 mt-2">
                    Celebrate together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CATEGORIES ============ */
function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Shop by Occasion
          </h2>
          <p className="text-gray-500 mt-2">
            Find the perfect gift for every celebration
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl group-hover:bg-purple-100 transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FEATURED PRODUCTS ============ */
function FeaturedProducts() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Gifts
            </h2>
            <p className="text-gray-500 mt-2">
              Handpicked by our AI for you
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {
                addItem(product);
                toast.success(`${product.name} added to cart!`);
              }}
              onToggleWishlist={() => toggleItem(product)}
              isWishlisted={isInWishlist(product.id)}
            />
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-purple-600 text-sm font-medium"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCT CARD ============ */
function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: {
  product: (typeof products)[0];
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden product-card-hover">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
          <Gift className="w-12 h-12 text-purple-300" />
        </div>

        {/* Badges */}
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
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-yellow-500 text-white text-[10px] font-bold rounded-md">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isWishlisted
                ? "bg-pink-500 text-white"
                : "bg-white/90 text-gray-600 hover:text-pink-500"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
          {product.arModelUrl && (
            <Link
              href={`/products/${product.id}?ar=true`}
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart();
            }}
            className="w-full py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <Link href={`/products/${product.id}`} className="block p-3 md:p-4">
        <p className="text-xs text-purple-600 font-medium mb-1 capitalize">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
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
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
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
  );
}

/* ============ AI FEATURES ============ */
function AIFeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Gift Recommender",
      desc: "Tell us the occasion, recipient & budget. Our AI finds the perfect match.",
      color: "from-purple-500 to-indigo-500",
      link: "/ai-recommender",
    },
    {
      icon: Camera,
      title: "AR Product Preview",
      desc: "See how gifts look in real life before buying with augmented reality.",
      color: "from-pink-500 to-rose-500",
      link: "/products",
    },
    {
      icon: MessageCircle,
      title: "AI Shopping Assistant",
      desc: "Chat with our AI bot for instant help, product suggestions & order tracking.",
      color: "from-amber-500 to-orange-500",
      link: "#",
    },
    {
      icon: Mic,
      title: "Voice Search",
      desc: 'Just say "birthday gift for mom under 2000" and let AI do the rest.',
      color: "from-green-500 to-emerald-500",
      link: "/products?voice=true",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Smart Shopping Features
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Experience the future of gift shopping with our AI-powered
            features that make finding the perfect gift effortless
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <Link
              key={feat.title}
              href={feat.link}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feat.desc}
              </p>
              <ArrowRight className="w-4 h-4 text-purple-600 mt-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ BESTSELLERS ============ */
function BestsellersSection() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-600">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/products?sort=bestsellers"
            className="hidden sm:flex items-center gap-1 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {
                addItem(product);
                toast.success(`${product.name} added to cart!`);
              }}
              onToggleWishlist={() => toggleItem(product)}
              isWishlisted={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ WHY CHOOSE US ============ */
function WhyChooseUs() {
  const points = [
    {
      icon: Gift,
      title: "AI-Curated Gifts",
      desc: "Personalized recommendations for every occasion",
    },
    {
      icon: Truck,
      title: "Pan-India Delivery",
      desc: "Free shipping on orders above ₹999",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "UPI, Cards, Net Banking & Cash on Delivery",
    },
    {
      icon: Headphones,
      title: "24/7 AI Support",
      desc: "Get instant help from our AI shopping assistant",
    },
  ];

  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="text-center p-6 bg-white rounded-2xl border border-purple-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-2">
            Trusted by 50,000+ happy gift-givers across India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CTA ============ */
function CTASection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 md:p-14 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative text-center text-white max-w-2xl mx-auto">
            <Zap className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let AI Find Your Perfect Gift
            </h2>
            <p className="text-purple-100 mb-8">
              Tell us about the occasion, who it&apos;s for, and your budget.
              Our AI will curate the best options for you in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-recommender"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Try AI Gift Finder
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
              >
                Browse All Gifts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
