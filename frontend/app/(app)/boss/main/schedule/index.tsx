import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import type { DateData } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import ContainerView from '@/components/common/ScreenContainer';
import TimeTable from '@/components/common/TimeTable';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useMonthlySchedule } from '@/reactQuery/querys';
import Theme from '@/styles/Theme';
import format from '@/util/format';
import useRootStore from '@/zustand';

interface Schedule {
  crewId: number;
  name: string;
  scheduleId: number;
  substituteRequest: boolean;
  hopeCrewId: number | null;
  hopeCrewName: string | null;
  startTime: string;
  endTime: string;
  profileImage: string;
  status?: 'mine' | 'request';
}

interface DailySchedule {
  date: number;
  dailySchedules: Schedule[];
}

const BossScheduleScreen = () => {
  const { type, start, end, id } = useLocalSearchParams<{
    type?: string;
    start?: string;
    end?: string;
    id?: string;
  }>();
  const { selectedCompanyId } = useRootStore();
  const today = new Date();
  const [calendar, setCalendar] = useState<DateData>(format.DateToDateData(today));
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const selectedDateString = format.dateToString(selectedDate);
  const schedule = useMonthlySchedule(calendar.month, selectedCompanyId) as DailySchedule[];
  const selectedSchedule =
    schedule && schedule[selectedDate.getDate() - 1] ? schedule[selectedDate.getDate() - 1].dailySchedules : [];
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

  useEffect(() => {
    if (type !== 'apply') return;
    router.setParams({});
    router.navigate({ pathname: '/boss/main/schedule/apply', params: { start, end, id } });
  }, [end, id, start, type]);

  const handleMonthChange = (date: DateData) => {
    setCalendar(date);
    setSelectedDate(new Date(`${date.year}-${date.month}-${String(date.day).padStart(2, '0')}`));
  };

  const handleDayPress = (date: DateData) => {
    const nextDate = new Date(date.dateString);
    setSelectedDate(nextDate);
  };

  // 사장님은 scheduleid만 보내주면 된다!
  const handleEventPress = (scheduleId: number) => {
    const time = selectedSchedule.filter((item) => item.scheduleId === scheduleId)[0];
    const start = `${selectedDateString} ${time.startTime}`;
    const end = `${selectedDateString} ${time.endTime}`;
    const isRequested = time.substituteRequest && time.hopeCrewId && time.hopeCrewName;
    if (isRequested) {
      router.navigate({ pathname: '/(app)/boss/main/schedule/apply', params: { start, end, id: scheduleId } });
    }
  };

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
      {calendar && schedule && <TimeTable schedule={selectedSchedule} handleEventPress={handleEventPress} />}
    </ContainerView>
  );
};

export default BossScheduleScreen;
