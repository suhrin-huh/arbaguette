import { Stack } from 'expo-router';

const BossRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="config">
      <Stack.Screen name="config" />
      <Stack.Screen name="main" />
    </Stack>
  );
};

export default BossRootLayout;
