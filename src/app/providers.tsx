'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "@/components/Header";

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
} 