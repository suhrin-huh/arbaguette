import type { StateCreator } from 'zustand';

const INITIAL_STATE: Omit<AuthSlice, 'login' | 'logout'> = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  role: null,
};

const createAuthSlice: StateCreator<RootState, [], [], AuthSlice> = (set) => ({
  ...INITIAL_STATE,
  login: (authData: LoginResponseData) =>
    set({
      isLoggedIn: true,
      ...authData,
    }),
  logout: () => set({ ...INITIAL_STATE }),
});

export default createAuthSlice;
