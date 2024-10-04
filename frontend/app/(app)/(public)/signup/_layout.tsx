import { Stack } from 'expo-router';

const SignupLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="memberType">
      <Stack.Screen name="memberType" />
      <Stack.Screen name="profileImage" />
      <Stack.Screen name="1" />
      <Stack.Screen name="2" />
      <Stack.Screen name="3" />
      <Stack.Screen name="4" />
      <Stack.Screen name="5" />
    </Stack>
  );
};

export default SignupLayout;
