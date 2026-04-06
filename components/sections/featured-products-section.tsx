"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const categories = ["All", "New Arrivals", "Best Sellers", "Serums", "Moisturizers", "Treatments"];

const products = [
  {
    id: 1,
    name: "DermaVerde Cream",
    price: 89,
    image: "/images/product-moisturizer-premium.png",
    category: "Moisturizers",
  },
  {
    id: 2,
    name: "PureGlow Serum",
    price: 129,
    image: "/images/product-serum-glass-premium.png",
    category: "Serums",
  },
  {
    id: 3,
    name: "Beauty Essentials Set",
    price: 159,
    image: "/images/product-serum-premium.png",
    category: "Best Sellers",
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    price: 95,
    image: "/images/product-serum-glass-premium.png",
    category: "Serums",
  },
  {
    id: 5,
    name: "Hyaluronic Hydrator",
    price: 75,
    image: "/images/product-moisturizer-premium.png",
    category: "Moisturizers",
  },
  {
    id: 6,
    name: "Retinol Night Treatment",
    price: 110,
    image: "/images/product-cleanser-premium.png",
    category: "Treatments",
  },
  {
    id: 7,
    name: "Radiant Glow Duo",
    price: 145,
    image: "/images/product-serum-glass-premium.png",
    category: "New Arrivals",
  },
  {
    id: 8,
    name: "Ceramide Repair Set",
    price: 175,
    image: "/images/product-moisturizer-premium.png",
    category: "New Arrivals",
  },
  {
    id: 9,
    name: "Daily Defense SPF",
    price: 68,
    image: "/images/product-cleanser-premium.png",
    category: "Best Sellers",
  },
  {
    id: 10,
    name: "Niacinamide Essence",
    price: 85,
    image: "/images/product-serum-glass-premium.png",
    category: "Serums",
  },
  {
    id: 11,
    name: "Rose Water Toner",
    price: 52,
    image: "/images/product-cleanser-premium.png",
    category: "Treatments",
  },
  {
    id: 12,
    name: "Collagen Boost Cream",
    price: 98,
    image: "/images/product-moisturizer-premium.png",
    category: "Moisturizers",
  },
  {
    id: 13,
    name: "AHA/BHA Exfoliant",
    price: 72,
    image: "/images/product-cleanser-premium.png",
    category: "Treatments",
  },
  {
    id: 14,
    name: "Peptide Power Set",
    price: 165,
    image: "/images/product-serum-premium.png",
    category: "Best Sellers",
  },
  {
    id: 15,
    name: "Squalane Facial Oil",
    price: 88,
    image: "/images/product-serum-glass-premium.png",
    category: "Serums",
  },
  {
    id: 16,
    name: "Eye Renewal Cream",
    price: 79,
    image: "/images/product-moisturizer-premium.png",
    category: "Treatments",
  },
  {
    id: 17,
    name: "Barrier Repair Moisturizer",
    price: 92,
    image: "/images/product-moisturizer-premium.png",
    category: "New Arrivals",
  },
  {
    id: 18,
    name: "Complete Routine Bundle",
    price: 199,
    image: "/images/product-serum-premium.png",
    category: "Best Sellers",
  },
];

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
            Explore Serene Shop
          </h2>
          <p className="text-[#737373] text-base font-body">
            Discover our products made just for you.
          </p>
        </div>

        {/* Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Categories */}
          <div
            className={`lg:w-48 flex-shrink-0 lg:sticky lg:top-24 lg:self-start transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-row lg:flex-col gap-0 border-t border-[#E5E5E5]">
              {categories.map((category) => (
                <div key={category} className="border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left py-4 px-2 text-sm transition-colors font-body ${
                      activeCategory === category
                        ? "text-[#1A1A1A] font-medium"
                        : "text-[#737373] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href="#"
                  className={`group transition-all duration-700 text-center ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Product Image */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#737373] text-sm font-body">
                    INR ₹{product.price * 83}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
