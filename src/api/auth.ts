import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { APIerror } from "./getChatMsgMento";
import { useEffect } from "react";

export const getUserInfo = async () => {
  const res = await fetch("http://localhost:8080/api/v1/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    const error: APIerror = { status: data.status, message: data.message };
    throw error;
  }
  return data.data;
};

export const useAuth = () => {
  const { user, setUser, logout } = useAuthStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUserInfo,
    retry: false,
    staleTime: 20 * 60 * 1000, // 20분
    gcTime: 30 * 60 * 1000, // 해당 쿼리를 쓰는 컴포넌트가 언마운트되고나서 30분간 캐시유지
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser, user]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return { user, isLoading, error, refetch, logout };
};
