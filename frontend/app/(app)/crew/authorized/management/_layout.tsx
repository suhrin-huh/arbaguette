import { Stack } from 'expo-router';

const ManagementLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="contract" options={{ presentation: 'modal' }} />
      <Stack.Screen name="calendar" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default ManagementLayout;
