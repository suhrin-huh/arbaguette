import { Stack } from 'expo-router';

const UploadLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="camera" />
    </Stack>
  );
};

export default UploadLayout;
