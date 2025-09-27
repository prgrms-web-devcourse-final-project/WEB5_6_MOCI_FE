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
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  fetchUser: async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) set({ user: null });
    else {
      const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset: UTF-8",
        },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        set({ user: data.user });
      } else {
        set({ user: null });
        localStorage.removeItem("userId");
      }
    }
  },
  logout: () => set({ user: null }),
}));
