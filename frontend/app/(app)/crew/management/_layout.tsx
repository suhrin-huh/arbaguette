import { Stack } from 'expo-router';

import Theme from '@/styles/Theme';

const ManagementLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="contract" options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default ManagementLayout;
