import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import TimeTable from '@/components/common/TimeTable';
import { useMonthlySchedule } from '@/reactQuery/querys';
import Theme from '@/styles/Theme';
import format from '@/util/format';
import useRootStore from '@/zustand';

const CrewScheduleScreen = () => {
  const { crewId } = useRootStore();
  const today = new Date();
  const [calendar, setCalendar] = useState<DateData>();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const selectedDateString = useMemo(() => format.dateToString(selectedDate), [selectedDate]);
  const schedule = useMonthlySchedule(calendar?.month || today.getMonth() + 1) as DailySchedule[] | undefined;
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule[]>([]);

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
  // 캘린더에 일정에 따른 dot 표시하기
  const markedDates: MarkedDates =
    schedule?.reduce(
      (acc, { date, dailySchedules }) => ({
        ...acc,
        [`${calendar?.year}-${String(calendar?.month).padStart(2, '0')}-${String(date).padStart(2, '0')}`]: {
          marked: dailySchedules.some((schedule) => schedule.crewId === crewId),
          dots: dailySchedules.map((schedule) => {
            if (schedule.substituteRequest) {
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

  const handleMonthChange = useCallback((date: DateData) => {
    setCalendar(date);
    setSelectedDate(new Date(`${date.year}-${date.month}-01`));
  }, []);

  const handleDayPress = (date: DateData) => {
    const nextDate = new Date(date.dateString);
    const nextSchedule = schedule ? schedule[nextDate.getDate() - 1].dailySchedules : [];
    setSelectedDate(nextDate);
    setSelectedSchedule(nextSchedule);
  };

  const handleEventPress = (scheduleId: number) => {
    const time = selectedSchedule.filter((item) => item.scheduleId === scheduleId)[0];
    console.log(scheduleId, time.substituteRequest);
    const start = `${selectedDateString} ${time.startTime}`;
    const end = `${selectedDateString} ${time.endTime}`;

    if (new Date(start) < today) return;
    const isMyEvent = time.crewId === crewId;
    const isRequested = time.substituteRequest;

    /// 시작날짜, 끝날짜, scheduleid가 필요하다
    if (isMyEvent && !isRequested) {
      console.log('내 일정을 대타 신청합니다!');
      router.navigate({ pathname: '/crew/authorized/schedule/request', params: { start, end, id: scheduleId } });
    } else if (!isMyEvent && isRequested) {
      console.log('대타 하고싶어요!');
      router.navigate({ pathname: '/crew/authorized/schedule/apply', params: { start, end, id: scheduleId } });
    }
  };

  console.log(schedule);

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

      <TimeTable schedule={selectedSchedule} handleEventPress={handleEventPress} />
    </View>
  );
};

export default CrewScheduleScreen;
