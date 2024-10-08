import { Stack } from 'expo-router';

const NotificationLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default NotificationLayout;
