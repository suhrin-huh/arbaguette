import { Stack } from 'expo-router';

const UploadLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="upload">
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default UploadLayout;
