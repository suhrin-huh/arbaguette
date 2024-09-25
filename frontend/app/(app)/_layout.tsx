import { Stack } from 'expo-router';

import Theme from '@/styles/Theme';

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="public">
      <Stack.Screen name="public" />
      <Stack.Screen name="boss" />
      <Stack.Screen name="crew" options={{ contentStyle: { paddingHorizontal: Theme.layout.PADDING.HORIZONTAL } }} />
    </Stack>
  );
};

export default AppLayout;
