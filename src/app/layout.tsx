"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import React from "react";
import { UserProvider } from "@/provider/User-provider"

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setLoading(false); 
    }
  }, []);

  const { decodedToken, isExpired } = useJwt(token as string);

  useEffect(() => {
    if (!loading) {
      console.log("Token on page load: ", token); 

      if (!token || isExpired) {
        console.log("Redirecting to login page");
        router.push("/login");
      }
    }
  }, [token, isExpired, loading, router]); 

  return (
    <>
      <html lang="en">
        <body>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ToastContainer />
            </QueryClientProvider>
          </UserProvider>
        </body>
      </html>
    </>
  );
}
