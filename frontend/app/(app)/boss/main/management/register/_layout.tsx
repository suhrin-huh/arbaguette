import { Stack } from 'expo-router';

const ManagementRegisterScreen = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false, presentation: 'transparentModal' }} />
      <Stack.Screen name="1" options={{ headerShown: false }} />
      <Stack.Screen name="2" />
      <Stack.Screen name="3" />
      <Stack.Screen name="4" />
      <Stack.Screen name="5" />
    </Stack>
  );
};

export default ManagementRegisterScreen;
