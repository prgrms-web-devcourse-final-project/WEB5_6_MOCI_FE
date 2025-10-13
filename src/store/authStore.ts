import { BASE_URL } from "@/api/constants/config";
import { create } from "zustand";

type User = {
  createdAt: string;
  digitalLevel: number;
  email: string | null;
  id: number;
  name: string;
  role: "USER" | "ADMIN" | "MENTOR";
  socialId: string;
  userId: string;
};

interface AuthState {
  user: User | null;
  setUser: (user: Partial<User> | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: Partial<User> | null) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : (user as User),
    })),
  isLoading: true,
  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset: UTF-8",
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        set({ user: data.data });
      } else if (res.status === 401) {
        set({ user: null });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.error(err);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        set({ user: null });
      } else {
        alert("로그아웃에 실패하였습니다");
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  },
}));
