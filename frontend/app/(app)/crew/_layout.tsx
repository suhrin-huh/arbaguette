import { Tabs } from 'expo-router';

const CrewMainLayout = () => {
  return (
    <Tabs initialRouteName="main" screenOptions={{ headerStyle: { backgroundColor: 'transparent', elevation: 0 } }}>
      <Tabs.Screen name="main" options={{ title: '홈' }} />
      <Tabs.Screen name="schedule" options={{ title: '스케줄' }} />
      <Tabs.Screen name="management" options={{ title: '직원 관리' }} />
      <Tabs.Screen name="banking" options={{ title: '뱅킹' }} />
    </Tabs>
  );
};

export default CrewMainLayout;
