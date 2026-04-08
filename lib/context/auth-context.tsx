"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { User, Address } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "user-1",
  name: "Prateek Raiger",
  email: "prateek@example.com",
  phone: "+91 98765 43210",
  avatar: "/images/avatar-1.jpg",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      fullName: "Prateek Raiger",
      phone: "+91 98765 43210",
      addressLine1: "42, Park Avenue",
      addressLine2: "Near Central Mall",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      isDefault: true,
    },
  ],
  createdAt: "2024-01-01",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ ...mockUser, email });
    setIsLoading(false);
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setUser({ ...mockUser, name, email });
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: [
          ...prev.addresses,
          { ...address, id: `addr-${Date.now()}` },
        ],
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
