// ==========================================
// GiftVault - Smart AI E-Commerce Types
// ==========================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  occasion?: string[];
  recipient?: string[];
  ageGroup?: string[];
  arModelUrl?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  giftWrap: boolean;
  giftMessage?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  trackingId?: string;
  trackingSteps: TrackingStep[];
  createdAt: string;
  estimatedDelivery: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface TrackingStep {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  createdAt: string;
  isVerified: boolean;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  products: Product[];
  reason: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  products?: Product[];
}

export interface GiftPreferences {
  occasion: string;
  recipient: string;
  ageGroup: string;
  budget: { min: number; max: number };
  interests: string[];
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: "upi" | "card" | "netbanking" | "wallet" | "cod";
  icon: string;
  description: string;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  occasions: string[];
  recipients: string[];
  sortBy: "relevance" | "price_low" | "price_high" | "rating" | "newest";
  search: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
}
