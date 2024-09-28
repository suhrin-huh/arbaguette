import styled from '@emotion/native';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Pressable, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Button from '@/components/common/Button';
import DayCircle from '@/components/common/DayCircle';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const Container = styled(View)(({ theme }) => ({
  backgroundColor: 'white',
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}));

const ModalHeader = styled(View)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
}));

const Title = styled(Text)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
}));

const WeekDayContainer = styled(View)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 80,
}));

const DateContainer = styled(View)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 160,
  marginBottom: 20,
}));

const DateTitle = styled(Text)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: 20,
}));

interface WeekModalType {
  weekday: number;
  name: string;
  isSelected: boolean;
}

const getKSTTime = (date: Date) => {
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + kstOffset);
  return kstDate.toISOString().split('T')[1].split('.')[0];
};

const weekdays: WeekModalType[] = [
  {
    weekday: 0,
    name: '월',
    isSelected: false,
  },
  {
    weekday: 1,
    name: '화',
    isSelected: false,
  },
  {
    weekday: 2,
    name: '수',
    isSelected: false,
  },
  {
    weekday: 3,
    name: '목',
    isSelected: false,
  },
  {
    weekday: 4,
    name: '금',
    isSelected: false,
  },
  {
    weekday: 5,
    name: '토',
    isSelected: false,
  },
  {
    weekday: 6,
    name: '일',
    isSelected: false,
  },
];
const DayBottomSheet = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const {
    registWorkingDayInfoList,
    setRegistWorkingDayInfoList,
    registWorkingDayInfoId,
    setRegistWorkingDayInfoId,
    setStep1,
  } = useRootStore();
  const [weekdayList, setWeekdayList] = useState<WeekModalType[]>(weekdays);
  const [isStartDate, setIsStartDate] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2024-06-01T09:00:00'));
  const [endDate, setEndDate] = useState(new Date('2024-06-01T18:00:00'));
  const slideAnim = useRef(new Animated.Value(0)).current;

  const nextStep = () => {
    Animated.timing(slideAnim, {
      toValue: -300, // 슬라이드할 거리 (픽셀 단위)
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsStartDate(false);
      slideAnim.setValue(300); // 애니메이션 초기화
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const addSchedule = () => {
    const selectedWeekdays = weekdayList.filter((weekday) => weekday.isSelected);
    let newScheduleList: WorkingDayInfo[] = [];
    let newId = registWorkingDayInfoId;

    if (!selectedWeekdays.length) {
      Alert.alert('요일을 선택하세요');
      return;
    }

    selectedWeekdays.forEach((weekday) => {
      newId += 1;
      const newSchedule: WorkingDayInfo = {
        id: newId,
        weekday: weekday.weekday,
        startTime: getKSTTime(startDate),
        endTime: getKSTTime(endDate),
      };
      newScheduleList.push(newSchedule);
    });

    setOpen(false);
    setStep1('next');
    setRegistWorkingDayInfoId(newId);
    setRegistWorkingDayInfoList([...registWorkingDayInfoList, ...newScheduleList]);
    setIsStartDate(true);
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  return (
    <Container>
      <ModalHeader>
        <Title>근무 일정 추가</Title>
        <Button
          onPress={() => {
            setOpen(false);
          }}
          type="primary"
          buttonStyle={{
            width: 25,
            height: 25,
            paddingHorizontal: 0,
            borderRadius: 20,
            backgroundColor: Colors.GRAY[2],
          }}>
          <FontAwesome6 name="xmark" size={12} color="white" />
        </Button>
      </ModalHeader>
      <WeekDayContainer>
        {weekdayList.map((weekday, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setWeekdayList((prev) =>
                prev.map((item, idx) => {
                  if (idx === weekday.weekday) {
                    return { ...item, isSelected: !item.isSelected };
                  }
                  return item;
                }),
              );
            }}>
            <DayCircle day={weekday.weekday} color={weekday.isSelected ? Colors.SECONDARY : Colors.GRAY[1]} />
          </Pressable>
        ))}
      </WeekDayContainer>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <DateTitle>{isStartDate ? '근무 시작 시간' : '근무 종료 시간'}</DateTitle>
        <DateContainer>
          {isStartDate ? (
            <DatePicker date={startDate} onDateChange={setStartDate} mode="time" minuteInterval={30} locale="ko" />
          ) : (
            <DatePicker date={endDate} onDateChange={setEndDate} mode="time" minuteInterval={30} locale="ko" />
          )}
        </DateContainer>
        {isStartDate ? (
          <Button type="primary" onPress={nextStep}>
            다음
          </Button>
        ) : (
          <Button type="primary" onPress={addSchedule}>
            추가
          </Button>
        )}
      </Animated.View>
    </Container>
  );
};

export default DayBottomSheet;
