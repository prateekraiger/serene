"use client";

import Link from "next/link";
import { sampleOrder } from "@/lib/data/products";
import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  Gift,
  Search,
} from "lucide-react";

export default function OrdersPage() {
  const orders = [sampleOrder];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    out_for_delivery: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          {/* Track by ID */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Track by Order ID"
                className="pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-48"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      statusColors[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Order items preview */}
              <div className="flex gap-3 mb-4">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg flex items-center justify-center"
                  >
                    <Gift className="w-5 h-5 text-purple-300" />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                      +{order.items.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    {order.items.length} item(s)
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Est. {new Date(order.estimatedDelivery).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short" }
                    )}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>
          ))}

          {/* Empty state hint */}
          <div className="text-center py-8 text-gray-400 text-sm">
            <p>More orders will appear here as you shop.</p>
            <p className="mt-1">
              This is a demo with sample data — connect a backend for real orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
