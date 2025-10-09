"use client";
import { useAuth } from "@/api/auth";
import Spinner from "@/shared/components/Spinner";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading && !user) return <Spinner />;
  return <>{children}</>;
}

export default AuthProvider;
