import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  role: null | 'BOSS' | 'CREW';
  login: (authData: LoginResponseData) => void;
  logout: () => void;
}

const INITIAL_STATE: Omit<AuthState, 'login' | 'logout'> = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  role: null,
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      login: (authData: LoginResponseData) =>
        set({
          isLoggedIn: true,
          ...authData,
        }),
      logout: () => set({ ...INITIAL_STATE }),
    }),
    { name: 'auth', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useAuthStore;
