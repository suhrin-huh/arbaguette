import { Stack } from 'expo-router';

const ScheduleLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="apply" options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="request" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default ScheduleLayout;
