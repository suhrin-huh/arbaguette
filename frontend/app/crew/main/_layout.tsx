import { Tabs } from 'expo-router';

const CrewMainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="management" options={{ title: '근무 내역' }} />
      <Tabs.Screen name="schedule" options={{ title: '스케줄' }} />
      <Tabs.Screen name="banking" options={{ title: '뱅킹' }} />
    </Tabs>
  );
};

export default CrewMainLayout;
