import { Stack } from 'expo-router';

const NotificationLayout = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false }} initialRouteName="index">
      <Stack.Screen name="index" options={{ title: '알림' }} />
    </Stack>
  );
};

export default NotificationLayout;
