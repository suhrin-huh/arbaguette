import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import createAuthSlice from '@/zustand/auth/authSlice';
import { createCertifiedPaperSlice } from '@/zustand/boss/certifiedPaperSlice';
import { createCompanyInfoSlice } from '@/zustand/boss/companyInfoSlice';
import { createRegistCrewSlice } from '@/zustand/boss/registCrewSlice';

import { createSelectedCompanySlice } from './boss/selectedCompanySlice';

const useRootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createCompanyInfoSlice(...a),
      ...createSelectedCompanySlice(...a),
      ...createCertifiedPaperSlice(...a),
      ...createRegistCrewSlice(...a),
    }),
    {
      name: 'z',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
        role: state.role,
        crewId: state.crewId,
        crewStatus: state.crewStatus,
      }),
    },
  ),
);

export default useRootStore;
