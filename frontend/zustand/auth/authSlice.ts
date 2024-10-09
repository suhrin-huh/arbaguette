import { jwtDecode } from 'jwt-decode';
import type { StateCreator } from 'zustand';

const INITIAL_STATE: Omit<AuthSlice, 'login' | 'logout' | 'updateTokens'> = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  role: null,
  crewId: null,
  crewStatus: null,
};

const createAuthSlice: StateCreator<RootState, [], [], AuthSlice> = (set) => ({
  ...INITIAL_STATE,
  login: (authData: LoginResponseData) => {
    const { crewId, crewStatus, role } = jwtDecode<AccessTokenPayload>(authData.accessToken);
    set({
      ...authData,
      isLoggedIn: true,
      crewId,
      role,
      crewStatus,
    });
  },
  logout: () => set({ ...INITIAL_STATE }),
  updateTokens: (accessToken: string, refreshToken: string) => {
    const { crewId, crewStatus, role } = jwtDecode<AccessTokenPayload>(accessToken);
    console.log('crewStatus', crewStatus);
    set((state) => ({
      ...state,
      accessToken,
      refreshToken,
      crewId,
      crewStatus,
      role,
    }));
  },
});

export default createAuthSlice;
