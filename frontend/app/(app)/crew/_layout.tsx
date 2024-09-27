import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const CrewLayout = () => {
  const { isLoggedIn } = useRootStore();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="unauthorized">
      <Stack.Screen name="unauthorized" />
      <Stack.Screen name="authorized" />
    </Stack>
  );
};

export default CrewLayout;
