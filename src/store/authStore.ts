// type User = {
//   createdAt: string;
//   digitalLevel: number;
//   email: string | null;
//   id: number;
//   name: string;
//   role: "USER" | "ADMIN" | "MENTOR";
//   socialId: string;
//   userId: string;
// };

// interface AuthState {
//   user: User | null;
//   setUser: (user: User) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   setUser: (user: User) => set({ user }),
//   logout: () => set({ user: null }),
// }));
