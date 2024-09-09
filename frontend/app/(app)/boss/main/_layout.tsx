import { Tabs } from 'expo-router';

const BossMainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="schedule" options={{ title: '스케쥴' }} />
      <Tabs.Screen name="management" options={{ title: '직원 관리' }} />
      <Tabs.Screen name="banking" options={{ title: '뱅킹' }} />
    </Tabs>
  );
};

export default BossMainLayout;
