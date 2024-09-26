import { Stack } from 'expo-router';

const ManagementLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default ManagementLayout;
