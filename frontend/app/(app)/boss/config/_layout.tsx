import { Stack } from 'expo-router';

const BossConfigLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default BossConfigLayout;
