import { Stack } from 'expo-router';

const ManagementLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="detail/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="detail/sendModal" options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="register" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default ManagementLayout;
