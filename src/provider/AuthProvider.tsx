"use client";

import Spinner from "@/shared/components/Spinner";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <Spinner userLoading />;
  else return <>{children}</>;
}

export default AuthProvider;
