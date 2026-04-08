"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/cart-context";
import { useAuth } from "@/lib/context/auth-context";
import { paymentGateways } from "@/lib/data/products";
import {
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Gift,
  ChevronRight,
  Check,
  Smartphone,
  Building2,
  Wallet,
  Banknote,
  Lock,
  Package,
} from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const paymentIcons: Record<string, React.ReactNode> = {
    upi: <Smartphone className="w-5 h-5" />,
    card: <CreditCard className="w-5 h-5" />,
    netbanking: <Building2 className="w-5 h-5" />,
    wallet: <Wallet className="w-5 h-5" />,
    cod: <Banknote className="w-5 h-5" />,
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">No items to checkout</h1>
          <Link href="/products" className="text-purple-600 text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mb-2">
            Order ID: <strong>GV-2024-{Math.floor(Math.random() * 90000 + 10000)}</strong>
          </p>
          <p className="text-sm text-gray-400 mb-6">
            You&apos;ll receive a confirmation email shortly with tracking details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/orders"
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700"
            >
              Track Order
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }
    if (selectedPayment === "upi" && !upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }
    toast.loading("Processing payment...");
    setTimeout(() => {
      toast.dismiss();
      clearCart();
      setOrderPlaced(true);
      toast.success("Payment successful!");
    }, 2000);
  };

  const steps = [
    { num: 1, label: "Address" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Review" },
  ];

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  step >= s.num
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s.num ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{s.num}</span>
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Delivery Address
                </h2>

                {!isAuthenticated && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-purple-700">
                      <Link
                        href="/login"
                        className="font-semibold underline"
                      >
                        Sign in
                      </Link>{" "}
                      for a faster checkout with saved addresses
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      placeholder="+91"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) =>
                        setAddress({ ...address, addressLine1: e.target.value })
                      }
                      placeholder="House no., Building, Street"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) =>
                        setAddress({ ...address, addressLine2: e.target.value })
                      }
                      placeholder="Landmark, Area"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select State</option>
                      {[
                        "Rajasthan",
                        "Maharashtra",
                        "Delhi",
                        "Karnataka",
                        "Tamil Nadu",
                        "Uttar Pradesh",
                        "Gujarat",
                        "West Bengal",
                        "Kerala",
                        "Telangana",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                        })
                      }
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
                      toast.error("Please fill all required fields");
                      return;
                    }
                    setStep(2);
                  }}
                  className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {paymentGateways.map((pg) => (
                    <div key={pg.id}>
                      <button
                        onClick={() => setSelectedPayment(pg.type)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === pg.type
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedPayment === pg.type
                              ? "bg-purple-100 text-purple-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {paymentIcons[pg.type]}
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {pg.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {pg.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPayment === pg.type
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === pg.type && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </button>

                      {/* UPI form */}
                      {selectedPayment === "upi" && pg.type === "upi" && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl animate-fade-in">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter UPI ID
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@upi"
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <div className="flex gap-2 mt-3">
                            {["Google Pay", "PhonePe", "Paytm"].map((app) => (
                              <button
                                key={app}
                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Card form */}
                      {selectedPayment === "card" && pg.type === "card" && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3 animate-fade-in">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Expiry
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                placeholder="***"
                                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Net Banking */}
                      {selectedPayment === "netbanking" && pg.type === "netbanking" && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl animate-fade-in">
                          <div className="grid grid-cols-2 gap-2">
                            {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((bank) => (
                              <button
                                key={bank}
                                onClick={() => setSelectedBank(bank)}
                                className={`px-3 py-2.5 rounded-lg text-sm font-medium border ${
                                  selectedBank === bank
                                    ? "bg-purple-50 border-purple-300 text-purple-700"
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {bank} Bank
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedPayment) {
                        toast.error("Please select a payment method");
                        return;
                      }
                      setStep(3);
                    }}
                    className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Review Your Order
                </h2>

                {/* Address summary */}
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      Delivery Address
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-purple-600 font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.fullName}, {address.addressLine1}
                    {address.addressLine2 ? `, ${address.addressLine2}` : ""},
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{address.phone}</p>
                </div>

                {/* Payment summary */}
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      Payment: {paymentGateways.find((pg) => pg.type === selectedPayment)?.name}
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-purple-600 font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg flex items-center justify-center">
                        <Gift className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                          {item.giftWrap ? " | Gift Wrapped" : ""}
                        </p>
                      </div>
                      <span className="text-sm font-bold">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Pay ₹{total.toLocaleString("en-IN")}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secured by Razorpay | 256-bit SSL encryption
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-28">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
