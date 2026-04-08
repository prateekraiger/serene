"use client";

import Link from "next/link";
import { sampleOrder } from "@/lib/data/products";
import {
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  Gift,
  Truck,
  CheckCircle2,
  Circle,
  Clock,
  Phone,
  Copy,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function OrderTrackingPage() {
  const order = sampleOrder;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(order.trackingId || "");
    toast.success("Tracking ID copied!");
  };

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{order.id}</h1>
              <p className="text-sm text-gray-500">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-full capitalize">
                {order.status.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Tracking ID */}
          {order.trackingId && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mb-6">
              <Truck className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-blue-600 font-medium">
                  Tracking ID
                </p>
                <p className="text-sm font-bold text-blue-900">
                  {order.trackingId}
                </p>
              </div>
              <button
                onClick={copyTrackingId}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          )}

          {/* Tracking Timeline */}
          <div className="relative">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.isCompleted
                        ? "bg-green-500 text-white"
                        : step.isCurrent
                        ? "bg-purple-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.isCurrent ? (
                      <Truck className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                  {idx < order.trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 mt-1 ${
                        step.isCompleted ? "bg-green-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p
                    className={`text-sm font-semibold ${
                      step.isCompleted || step.isCurrent
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.status}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      step.isCompleted || step.isCurrent
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {step.description}
                  </p>
                  {step.timestamp && (
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(step.timestamp).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {step.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {step.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-purple-600" />
              Delivery Address
            </h3>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 &&
                `, ${order.shippingAddress.addressLine2}`}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pincode}
            </p>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {order.shippingAddress.phone}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-purple-600" />
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-medium capitalize">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-purple-600" />
            Items in this Order
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                    {item.giftWrap && " | Gift Wrapped"}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
          <p className="text-sm text-purple-700">
            Need help with this order?{" "}
            <button className="font-semibold underline">
              Chat with our AI assistant
            </button>{" "}
            or call{" "}
            <a href="tel:+919876543210" className="font-semibold">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
