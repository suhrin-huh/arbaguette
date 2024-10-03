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
      <Stack.Screen name="banking" />
      <Stack.Screen name="contract" />
      {/* <Stack.Screen name="main/management/register/2" /> */}
      {/* <Stack.Screen name="main/management/register/3" /> */}
      {/* <Stack.Screen name="main/management/register/4" /> */}
    </Stack>
  );
};

export default BossRootLayout;
