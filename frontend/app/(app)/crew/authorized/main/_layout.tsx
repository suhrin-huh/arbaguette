import { Stack } from 'expo-router';

const MainLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="modal" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default MainLayout;
