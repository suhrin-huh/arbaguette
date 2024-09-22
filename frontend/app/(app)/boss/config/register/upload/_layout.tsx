import UploadInitialScreen from '@/components/boss/upload/UploadInitialScreen';
import { Stack } from 'expo-router';

const UploadLayout = () => {
  return (
    <UploadInitialScreen title='사업자 등록증을 업로드해주세요.'>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="check" />
      </Stack>
    </UploadInitialScreen>
  );
};

export default UploadLayout;
