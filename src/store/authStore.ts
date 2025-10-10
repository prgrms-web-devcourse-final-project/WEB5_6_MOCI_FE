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
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/me`, {
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
        console.error("사용자 정보를 가져오는데 실패하였습니다");
        set({ user: null });
      }
    } catch (err) {
      console.error(err);
      set({ user: null });
    }
  },
  logout: async () => {
    const res = await fetch(`http://localhost:8080/api/v1/auth/logout`, {
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
