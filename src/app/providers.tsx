"use client";

import AuthRefresh from "@/components/module/AuthRefresh";
import LoaderProvider from "./LoaderProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoaderProvider>
      <AuthRefresh />
      {children}
    </LoaderProvider>
  );
}
