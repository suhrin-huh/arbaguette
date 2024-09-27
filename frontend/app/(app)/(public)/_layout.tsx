import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const PublicLayout = () => {
  const { isLoggedIn, role } = useRootStore();

  if (isLoggedIn && role === 'BOSS') {
    return <Redirect href="/boss" />;
  }

  if (isLoggedIn && role === 'CREW') {
    return <Redirect href="/crew" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};

export default PublicLayout;
