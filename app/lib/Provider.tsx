"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import Footer from "../_comps/Footer";
import { usePathname } from "next/navigation";

function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const path = usePathname();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {path !== "/" && <Footer />}
    </QueryClientProvider>
  );
}

export default Provider;
