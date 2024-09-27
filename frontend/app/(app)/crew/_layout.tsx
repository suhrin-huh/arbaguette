import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const CrewLayout = () => {
  const { isLoggedIn } = useRootStore();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(unauthorized)/wait">
      <Stack.Screen name="authorized" />
      <Stack.Screen name="(unauthorized)/wait" />
      <Stack.Screen name="(unauthorized)/signature" />
    </Stack>
  );
};

export default CrewLayout;
