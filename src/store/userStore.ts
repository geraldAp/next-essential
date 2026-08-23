import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/UserType";

interface UserState {
  user: User | null;
  externalId: string | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (partial: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      externalId: null,
      token: null,
      setUser: (user) =>
        set({
          user,
          externalId: user.externalId,
          token: user.token,
        }),
      clearUser: () =>
        set({
          user: null,
          externalId: null,
          token: null,
        }),
      updateUser: (partial) =>
        set((state) => {
          if (!state.user) return state;
          const updated = { ...state.user, ...partial } as User;
          return {
            user: updated,
            externalId: updated.externalId ?? null,
            token: updated.token ?? null,
          };
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.externalId = state.user.externalId ?? null;
          state.token = state.user.token ?? null;
        }
      },
    }
  )
);
