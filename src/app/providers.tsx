"use client";

import { SessionProvider } from "next-auth/react";

import AuthRefresh from "@/components/module/AuthRefresh";
import LoaderProvider from "./LoaderProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LoaderProvider>
        <AuthRefresh />
        {children}
      </LoaderProvider>
    </SessionProvider>
  );
}
