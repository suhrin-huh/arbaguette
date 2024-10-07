import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { registerForPushNotificationsAsync } from '@/util/pushNoti/push';

const AppLayout = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(public)">
      <Stack.Screen name="(public)" />
      <Stack.Screen name="boss" />
      <Stack.Screen name="crew" />
      <Stack.Screen name="notification" />
    </Stack>
  );
};

export default AppLayout;
