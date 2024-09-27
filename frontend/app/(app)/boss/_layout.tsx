import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const BossRootLayout = () => {
  const { isLoggedIn } = useRootStore();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="config">
      <Stack.Screen name="config" />
      <Stack.Screen name="main" />
    </Stack>
  );
};

export default BossRootLayout;
