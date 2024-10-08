import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import type { DateData, TimelineEventProps } from 'react-native-calendars';
import { Calendar, Timeline } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useMonthlySchedule } from '@/reactQuery/querys';
import Theme from '@/styles/Theme';
import format from '@/util/format';
import useRootStore from '@/zustand';

const BossScheduleScreen = () => {
  const { selectedCompanyId } = useRootStore();
  const today = new Date();
  const [calendar, setCalendar] = useState<DateData>();
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedDateString = format.dateToString(selectedDate);
  const schedule = useMonthlySchedule(calendar?.month || today.getMonth() + 1, selectedCompanyId);

  const markedDates: MarkedDates =
    schedule?.reduce(
      (acc, { date, dailySchedules }) => ({
        ...acc,
        [`${calendar?.year}-${String(calendar?.month).padStart(2, '0')}-${String(date).padStart(2, '0')}`]: {
          marked: dailySchedules.some((schedule) => schedule.crewId),
          dots: dailySchedules.map((schedule) => {
            if (schedule.hopeCrewId && schedule.hopeCrewName) {
              return { key: schedule.scheduleId.toString(), color: Theme.color.SECONDARY };
            }
            if (schedule.crewId) {
              return { key: schedule.scheduleId.toString(), color: Theme.color.PRIMARY };
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
        color: time.hopeCrewId && time.hopeCrewName ? Theme.color.SECONDARY : Theme.color.PRIMARY,
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
          day.dailySchedules.some(
            (schedule) => Number(event.id) === schedule.scheduleId && schedule.hopeCrewId && schedule.hopeCrewName,
          ),
        )
      : false;

    const serializedEvent = JSON.stringify(event);

    if (isRequested) {
      router.navigate({ pathname: '/(app)/boss/main/schedule/apply', params: { event: serializedEvent } });
    }
  };

  useEffect(() => {
    if (schedule) {
      schedule.forEach((dayObject) => {
        console.log(dayObject.date);
        console.log(dayObject.dailySchedules);
      });
    }
  }, [schedule]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     refetch(); // 페이지가 포커스될 때마다 refetch 호출
  //   }, [refetch]),
  // );

  return (
    <ContainerView style={{ paddingVertical: Layout.PADDING.VERTICAL, backgroundColor: Colors.WHITE }}>
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
    </ContainerView>
  );
};

export default BossScheduleScreen;
