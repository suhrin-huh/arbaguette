import 'react-native-reanimated';

import Styled from '@emotion/native';
import { ThemeProvider } from '@emotion/react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import usePretendardFonts from '@/hooks/usePretendardFonts';
import Theme from '@/styles/Theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = Styled.View(({ theme }) => ({
  flex: 1,
  alignSelf: 'stretch',
}));

export default function Root() {
  const [loaded, error] = usePretendardFonts();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={Theme}>
      <RootLayout>
        <Slot />
      </RootLayout>
    </ThemeProvider>
  );
}
