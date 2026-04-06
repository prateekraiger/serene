"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function BentoSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const bentoItems = [
    {
      id: 1,
      title: "Nature's Purest",
      description: "Sustainably sourced botanical extracts for deep skin nourishment.",
      image: "/images/natural-ingredients.png",
      className: "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto",
    },
    {
      id: 2,
      title: "Ethically Crafted",
      description: "Our ritual, your results.",
      image: "/images/lifestyle-premium.png",
      className: "lg:col-span-1 lg:row-span-1 aspect-square",
    },
    {
      id: 3,
      title: "Science First",
      description: "Dermatologist tested.",
      image: "/images/product-serum-premium.png",
      className: "lg:col-span-1 lg:row-span-1 aspect-square font-display",
    },
    {
      id: 4,
      title: "Our Philosophy",
      description: "We believe in transparency and the power of simplicity in skincare.",
      className: "lg:col-span-2 lg:row-span-1 bg-[#F5F5F5] flex flex-col justify-center p-8 lg:p-12",
      isText: true
    },
  ];

  return (
    <section id="philosophy" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {bentoItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-1000 ${
                item.className
              } ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {item.isText ? (
                <div className="h-full flex flex-col justify-center">
                  <h3 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                    {item.title}
                  </h3>
                  <p className="text-[#737373] text-lg leading-relaxed max-w-lg font-body">
                    {item.description}
                  </p>
                </div>
              ) : (
                <>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white font-display text-2xl mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm font-body">{item.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
