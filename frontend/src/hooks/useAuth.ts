import { create } from "zustand";
import api from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    const me = await api.get("/auth/me");
    set({ user: me.data, loading: false });
  },

  register: async (name, email, password) => {
    set({ loading: true });
    await api.post("/auth/register", { name, email, password });
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    const me = await api.get("/auth/me");
    set({ user: me.data, loading: false });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null });
    window.location.href = "/login";
  },

  fetchMe: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data });
    } catch {
      localStorage.clear();
    }
  },
}));
