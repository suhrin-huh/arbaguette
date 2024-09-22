import UploadInitialScreen from '@/components/boss/upload/UploadInitialScreen';
import { Stack } from 'expo-router';

const UploadLayout = () => {
  return (
    <UploadInitialScreen>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="check" />
      </Stack>
    </UploadInitialScreen>
  );
};

export default UploadLayout;
