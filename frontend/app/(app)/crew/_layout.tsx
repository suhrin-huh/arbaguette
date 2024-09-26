import { Stack } from 'expo-router';

const CrewLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(unauthorized)/wait">
      <Stack.Screen name="authorized" />
      <Stack.Screen name="(unauthorized)/wait" />
      <Stack.Screen name="(unauthorized)/signature" />
    </Stack>
  );
};

export default CrewLayout;
