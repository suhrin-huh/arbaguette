import { router } from 'expo-router';
import { View } from 'react-native';
import type { TimelineEventProps } from 'react-native-calendars';
import { Calendar, Timeline } from 'react-native-calendars';

const CrewScheduleScreen = () => {
  const handleEventPress = (event: TimelineEventProps) => {
    console.log(event);
    router.navigate({ pathname: '/crew/schedule/modal', params: { event: JSON.stringify(event) } });
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar />
      <Timeline
        onEventPress={handleEventPress}
        events={[
          {
            title: '싸피',
            start: '2024-09-24 11:00:00',
            end: '2024-09-24 21:00:00',
            summary: '싸피',
          },
          {
            title: '싸피',
            start: '2024-09-24 11:00:00',
            end: '2024-09-24 21:00:00',
            summary: '싸피',
          },
          {
            title: '싸피',
            start: '2024-09-24 11:00:00',
            end: '2024-09-24 15:00:00',
            summary: '싸피',
          },
        ]}
        date="2024-09-24"
        initialTime={{ hour: 11, minutes: 0 }}
        showNowIndicator
        scrollToNow
      />
    </View>
  );
};

export default CrewScheduleScreen;
