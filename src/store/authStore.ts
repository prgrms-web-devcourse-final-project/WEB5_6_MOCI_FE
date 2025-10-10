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
    try {
      console.log("fetchUser 시작 - API 호출 시도");
      const res = await fetch(`http://localhost:8080/api/v1/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset: UTF-8",
        },
        credentials: "include",
      });

      console.log("fetchUser 응답 상태:", res.status, res.statusText);

      if (res.ok) {
        const data = await res.json();
        console.log("fetchUser 성공 - 사용자 데이터:", data);
        set({ user: data.data });
      } else if (res.status === 401) {
        console.log("fetchUser - 인증 실패 (401)");
        set({ user: null });
      } else {
        console.error("사용자 정보를 가져오는데 실패하였습니다. 상태:", res.status);
        set({ user: null });
      }
    } catch (err) {
      console.error("fetchUser 에러:", err);
      
      // API 연결 실패 시 임시 사용자 데이터 사용 (개발용)
      console.log("API 연결 실패, 임시 사용자 데이터 사용");
      const mockUser: User = {
        id: 1,
        name: "테스트멘토",
        role: "MENTOR",
        email: "test@example.com",
        userId: "test_mentor",
        socialId: "test_social",
        digitalLevel: 3,
        createdAt: "2024-01-01T00:00:00Z"
      };
      set({ user: mockUser });
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
