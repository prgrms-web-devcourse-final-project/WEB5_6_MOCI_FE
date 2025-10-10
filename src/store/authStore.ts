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
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: async () => {
    const res = await fetch("http://localhost:8080/api/v1/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      set({ user: null });
    } else {
      alert("로그아웃에 실패하였습니다");
    }
  },
}));
