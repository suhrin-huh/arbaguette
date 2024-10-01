import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import type { DateData, TimelineEventProps } from 'react-native-calendars';
import { Calendar, Timeline } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import { useMonthlySchedule } from '@/reactQuery/querys';
import Theme from '@/styles/Theme';
import format from '@/util/format';
import useRootStore from '@/zustand';

const CrewScheduleScreen = () => {
  const { crewId } = useRootStore();
  const today = new Date();
  const [calendar, setCalendar] = useState<DateData>();
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedDateString = format.dateToString(selectedDate);
  const schedule = useMonthlySchedule(calendar?.month || today.getMonth() + 1);
  const markedDates: MarkedDates =
    schedule?.reduce(
      (acc, { date, dailySchedules }) => ({
        ...acc,
        [`${calendar?.year}-${String(calendar?.month).padStart(2, '0')}-${String(date).padStart(2, '0')}`]: {
          marked: dailySchedules.some((schedule) => schedule.crewId === crewId),
          dots: dailySchedules.map((schedule) => {
            if (schedule.SubstituteRequest) {
              return { key: 'substitute', color: Theme.color.SECONDARY };
            }
            if (schedule.crewId === crewId) {
              return { key: 'crew', color: Theme.color.PRIMARY };
            }
            return {};
          }),
        },
      }),
      {},
    ) || {};
  if (markedDates[selectedDateString]) markedDates[selectedDateString]['selected'] = true;

  const timeLineEvents: TimelineEventProps[] = schedule
    ? schedule[selectedDate.getDate() - 1].dailySchedules.map((time) => ({
        title: time.name,
        start: `${selectedDateString} ${time.startTime}`,
        end: `${selectedDateString} ${time.endTime}`,
        id: String(time.scheduleId),
        summary: String(time.crewId),
        color: time.SubstituteRequest
          ? Theme.color.SECONDARY
          : time.crewId === crewId
            ? Theme.color.PRIMARY
            : Theme.color.GRAY['2'],
      }))
    : [];

  const handleMonthChange = (date: DateData) => {
    setCalendar(date);
    setSelectedDate(new Date(`${date.year}-${date.month}-01`));
  };

  const handleDayPress = (date: DateData) => {
    setSelectedDate(new Date(date.dateString));
  };

  const handleEventPress = (event: TimelineEventProps) => {
    if (new Date(event.start) < today) return;

    const isRequested = schedule
      ? schedule.some((day) =>
          day.dailySchedules.some((schedule) => Number(event.id) === schedule.scheduleId && schedule.SubstituteRequest),
        )
      : false;
    const isMyEvent = Number(event.summary) === Number(crewId);

    const serializedEvent = JSON.stringify(event);

    if (isMyEvent && !isRequested) {
      router.navigate({ pathname: '/crew/authorized/schedule/request', params: { event: serializedEvent } });
    } else if (!isMyEvent && isRequested) {
      router.navigate({ pathname: '/crew/authorized/schedule/apply', params: { event: serializedEvent } });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        theme={{ arrowColor: Theme.color.PRIMARY }}
        initialDate={format.dateToString(today)}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        markedDates={markedDates}
        markingType="multi-dot"
      />
      <Timeline
        onEventPress={handleEventPress}
        events={timeLineEvents}
        date={selectedDateString}
        showNowIndicator
        scrollToNow
      />
    </View>
  );
};

export default CrewScheduleScreen;
