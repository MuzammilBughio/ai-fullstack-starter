"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, fetchMe } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchMe().then(() => {
      const u = useAuth.getState().user;
      router.replace(u ? "/dashboard" : "/login");
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
