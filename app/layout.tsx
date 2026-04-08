import React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/context/auth-context";
import { CartProvider } from "@/lib/context/cart-context";
import { WishlistProvider } from "@/lib/context/wishlist-context";
import { ChatProvider } from "@/lib/context/chat-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AIChatbot } from "@/components/ai/chatbot";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GiftVault — Smart AI Gift Shop",
  description:
    "Discover the perfect gift with AI-powered recommendations, AR previews, and voice search. Premium gifts for every occasion with Indian payment options.",
  keywords: [
    "gifts",
    "AI shopping",
    "gift recommendations",
    "online gift shop",
    "India",
    "AR preview",
  ],
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ChatProvider>
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <AIChatbot />
                <Toaster position="bottom-right" richColors />
              </ChatProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
