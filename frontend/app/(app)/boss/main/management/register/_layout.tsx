import { Stack } from 'expo-router';

const ManagementRegisterScreen = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false, presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default ManagementRegisterScreen;
