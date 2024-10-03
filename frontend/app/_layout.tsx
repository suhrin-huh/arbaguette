import 'react-native-reanimated';

import Styled from '@emotion/native';
import { ThemeProvider } from '@emotion/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import usePretendardFonts from '@/hooks/usePretendardFonts';
import Theme from '@/styles/Theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('ReactotronConfig loaded'));
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = Styled.View(({ theme }) => ({
  flex: 1,
  alignSelf: 'stretch',
}));

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Slot />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </RootLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
