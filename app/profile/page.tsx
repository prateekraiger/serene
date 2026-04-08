"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit3,
  Plus,
  ChevronRight,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!isAuthenticated) {
    return (
      <div className="pt-[calc(4rem+28px)] min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Sign in to view your profile
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Access your orders, wishlist, and saved addresses
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const quickLinks = [
    {
      icon: Package,
      label: "My Orders",
      desc: "Track, return, or buy things again",
      href: "/orders",
    },
    {
      icon: Heart,
      label: "Wishlist",
      desc: "Your saved items",
      href: "/wishlist",
    },
    {
      icon: MapPin,
      label: "Addresses",
      desc: "Save addresses for checkout",
      href: "#",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      desc: "Manage saved payment options",
      href: "#",
    },
    {
      icon: Bell,
      label: "Notifications",
      desc: "Manage notification preferences",
      href: "#",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      desc: "Manage account security",
      href: "#",
    },
  ];

  return (
    <div className="pt-[calc(4rem+28px)] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400">
                  Member since{" "}
                  {new Date(user?.createdAt || "").toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {user?.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {user?.phone || "Not added"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                {user?.addresses?.[0]?.city || "No address"}
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <link.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {link.label}
                </p>
                <p className="text-xs text-gray-500">{link.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </Link>
          ))}
        </div>

        {/* Saved Addresses */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Saved Addresses
            </h2>
            <button className="flex items-center gap-1 text-sm text-purple-600 font-medium">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {user?.addresses && user.addresses.length > 0 ? (
            <div className="space-y-3">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-xs text-green-600 font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-900 font-medium">
                    {addr.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {addr.addressLine1}
                    {addr.addressLine2 && `, ${addr.addressLine2}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No saved addresses yet.</p>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            toast.success("Logged out successfully");
          }}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
