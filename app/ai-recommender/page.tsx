"use client";

import { useState } from "react";
import Link from "next/link";
import { products, occasions, recipients } from "@/lib/data/products";
import { useCart } from "@/lib/context/cart-context";
import { useWishlist } from "@/lib/context/wishlist-context";
import {
  Sparkles,
  Brain,
  Gift,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  Wand2,
  Users,
  Calendar,
  Wallet,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";

export default function AIRecommenderPage() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [aiReason, setAiReason] = useState("");
  const [preferences, setPreferences] = useState({
    occasion: "",
    recipient: "",
    budget: "",
    interests: [] as string[],
  });

  const budgetRanges = [
    { label: "Under ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 - ₹2,500", min: 1000, max: 2500 },
    { label: "₹2,500 - ₹5,000", min: 2500, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000+", min: 10000, max: 50000 },
  ];

  const interestOptions = [
    "Tech & Gadgets",
    "Home Decor",
    "Fashion",
    "Food & Sweets",
    "Plants",
    "Books",
    "Photography",
    "Music",
    "Fitness",
    "Art & Crafts",
    "Travel",
    "Cooking",
  ];

  const generateRecommendations = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const budgetRange = budgetRanges.find((b) => b.label === preferences.budget);
      let filtered = [...products];

      // Filter by budget
      if (budgetRange) {
        filtered = filtered.filter(
          (p) => p.price >= budgetRange.min && p.price <= budgetRange.max
        );
      }

      // Filter by occasion
      if (preferences.occasion) {
        const occMatched = filtered.filter((p) =>
          p.occasion?.some(
            (o) => o.toLowerCase() === preferences.occasion.toLowerCase()
          )
        );
        if (occMatched.length > 0) filtered = occMatched;
      }

      // Filter by recipient
      if (preferences.recipient) {
        const recMatched = filtered.filter((p) =>
          p.recipient?.some(
            (r) => r.toLowerCase() === preferences.recipient.toLowerCase()
          )
        );
        if (recMatched.length > 0) filtered = recMatched;
      }

      // Fallback to top rated
      if (filtered.length === 0) filtered = [...products];
      filtered.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
      const results = filtered.slice(0, 6);

      setRecommendations(results);
      setAiReason(
        `Based on your preferences — ${preferences.occasion || "any occasion"} gift for ${preferences.recipient || "someone special"} within ${preferences.budget || "any budget"} — our AI analyzed 10,000+ products and found these ${results.length} perfect matches with the highest satisfaction scores.`
      );
      setIsGenerating(false);
      setStep(4);
    }, 2500);
  };

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            AI Gift Recommender
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Let AI Find Your{" "}
            <span className="gradient-text">Perfect Gift</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Answer a few quick questions and our AI will curate personalized
            gift recommendations just for you.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-1 mx-1 rounded ${
                    step > s ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">
                What&apos;s the occasion?
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() =>
                    setPreferences({ ...preferences, occasion: occ })
                  }
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    preferences.occasion === occ
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!preferences.occasion}
              className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Recipient & Budget */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  Who is it for?
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipients.map((rec) => (
                  <button
                    key={rec}
                    onClick={() =>
                      setPreferences({ ...preferences, recipient: rec })
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      preferences.recipient === rec
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  What&apos;s your budget?
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {budgetRanges.map((b) => (
                  <button
                    key={b.label}
                    onClick={() =>
                      setPreferences({ ...preferences, budget: b.label })
                    }
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      preferences.budget === b.label
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!preferences.recipient || !preferences.budget}
                className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Any interests or hobbies?
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Select any that apply (optional, helps AI give better picks)
            </p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((int) => (
                <button
                  key={int}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      interests: prev.interests.includes(int)
                        ? prev.interests.filter((i) => i !== int)
                        : [...prev.interests, int],
                    }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    preferences.interests.includes(int)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={generateRecommendations}
                disabled={isGenerating}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is thinking...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Recommendations
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="animate-fade-in">
            {/* AI Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 mb-8 text-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">AI Recommendation</h3>
                  <p className="text-sm text-purple-100 leading-relaxed">
                    {aiReason}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Your Curated Picks
              </h2>
              <button
                onClick={() => {
                  setStep(1);
                  setRecommendations([]);
                  setPreferences({
                    occasion: "",
                    recipient: "",
                    budget: "",
                    interests: [],
                  });
                }}
                className="flex items-center gap-1 text-sm text-purple-600 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Start Over
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {recommendations.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden product-card-hover"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                    <Gift className="w-12 h-12 text-purple-300" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI PICK
                      </span>
                    </div>
                    <button
                      onClick={() => toggleItem(product)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                        isInWishlist(product.id)
                          ? "bg-pink-500 text-white"
                          : "bg-white/90 text-gray-600"
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={isInWishlist(product.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="p-3 md:p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-400">
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
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
