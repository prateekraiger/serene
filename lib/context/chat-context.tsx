"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { ChatMessage, Product } from "@/lib/types";
import { products } from "@/lib/data/products";

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function getAIResponse(msg: string): { text: string; prods?: Product[] } {
  const lower = msg.toLowerCase();

  if (lower.includes("birthday")) {
    return {
      text: "Happy vibes! Here are some amazing birthday gift ideas I found for you. These are our most loved picks:",
      prods: products.filter((p) => p.occasion?.includes("birthday")).slice(0, 3),
    };
  }
  if (lower.includes("anniversary") || lower.includes("couple")) {
    return {
      text: "Anniversary gifts should be extra special! Here are some romantic picks that our customers absolutely love:",
      prods: products.filter((p) => p.occasion?.includes("anniversary")).slice(0, 3),
    };
  }
  if (lower.includes("diwali") || lower.includes("festival")) {
    return {
      text: "Festival season calls for special gifts! Check out these festive favorites:",
      prods: products.filter((p) => p.occasion?.includes("diwali")).slice(0, 3),
    };
  }
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("under")) {
    const budget = products.filter((p) => p.price < 1500).slice(0, 3);
    return {
      text: "Great gifts don't have to break the bank! Here are some wonderful options under ₹1,500:",
      prods: budget,
    };
  }
  if (lower.includes("recommend") || lower.includes("suggest") || lower.includes("help")) {
    return {
      text: "I'd love to help! Tell me about the occasion (birthday, anniversary, Diwali, etc.), who it's for, and your budget. I'll find the perfect gift!",
    };
  }
  if (lower.includes("track") || lower.includes("order")) {
    return {
      text: "You can track your order from the 'My Orders' page. Just click on any order to see real-time tracking updates. Need help with anything else?",
    };
  }
  if (lower.includes("return") || lower.includes("refund")) {
    return {
      text: "We have a hassle-free 7-day return policy! If you're not satisfied, initiate a return from the order details page. Refunds are processed within 5-7 business days.",
    };
  }
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return {
      text: "Hello! Welcome to GiftVault! I'm your AI shopping assistant. I can help you find the perfect gift, track orders, or answer any questions. What are you looking for today?",
    };
  }

  return {
    text: "That's interesting! I can help you find gifts by occasion, recipient, or budget. Try asking me something like 'birthday gift for mom under 2000' or 'best anniversary gifts'. What would you like to explore?",
    prods: products.filter((p) => p.isBestseller).slice(0, 2),
  };
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm GiftVault AI, your personal shopping assistant. I can help you find the perfect gift for any occasion. What are you looking for today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1200));

    const response = getAIResponse(content);
    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: "assistant",
      content: response.text,
      timestamp: new Date().toISOString(),
      products: response.prods,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Chat cleared! How can I help you find the perfect gift today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
