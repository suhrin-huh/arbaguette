import 'react-native-reanimated';

import Styled from '@emotion/native';
import { ThemeProvider } from '@emotion/react';
import { Stack } from 'expo-router';
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

const Layout = Styled.View({ flex: 1, backgroundColor: '#000' });

export default function RootLayout() {
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
      <Stack screenOptions={{ headerShown: false }} initialRouteName="public">
        <Stack.Screen name="(public)" />
        <Stack.Screen name="boss" />
        <Stack.Screen name="crew" />
      </Stack>
    </ThemeProvider>
  );
}
