"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return <>{children}</>;
}

export default AuthProvider;
