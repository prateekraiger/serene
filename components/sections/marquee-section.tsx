"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const newArrivals = [
  {
    id: 1,
    name: "Serum Vitale",
    price: 189,
    image: "/images/product-serum-glass-premium.png",
  },
  {
    id: 2,
    name: "Derma Refresh",
    price: 749,
    image: "/images/product-cleanser-premium.png",
  },
  {
    id: 3,
    name: "Botanica Set",
    price: 299,
    image: "/images/product-serum-premium.png",
  },
];

export function NewArrivalsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
              New Products
            </h2>
            <p className="text-[#737373] text-sm uppercase tracking-wider mt-2 font-body">
              Our Selections
            </p>
          </div>
          
          <Link
            href="#shop"
            className={`text-sm text-[#737373] hover:text-[#1A1A1A] transition-all duration-700 font-body underline underline-offset-4 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            View All products
          </Link>
        </div>

        {/* Products Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((product, index) => (
            <Link
              key={product.id}
              href="#"
              className={`group transition-all duration-700 text-center ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
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
    </section>
  );
}
