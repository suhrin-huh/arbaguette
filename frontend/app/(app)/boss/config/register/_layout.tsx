import { Stack } from 'expo-router';

const RegisterStoreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="upload">
      <Stack.Screen name="upload" />
      <Stack.Screen name="preview" />
    </Stack>
  );
};

export default RegisterStoreLayout;
