import styled from '@emotion/native';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';

import Button from '@/components/common/Button';
import DayCircle from '@/components/common/DayCircle';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const DateContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 15,
  borderRadius: 16,
}));

const DateBox = styled.View(({ theme }) => ({
  backgroundColor: theme.color.BACKGROUND,
  width: '87%',
  borderRadius: 16,
  flexDirection: 'row',
  height: 50,
  paddingHorizontal: 10,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TextContainer = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  width: 80,
  borderRadius: 10,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 15,
}));

const StartTimeText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'semibold',
  color: theme.color.GRAY[4],
}));

const MiddleLine = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.GRAY[4],
  paddingHorizontal: 5,
}));

const EndTimeText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'semibold',
  color: theme.color.GRAY[4],
}));

const DateWeek = styled.TouchableOpacity(({ theme }) => ({}));

const DatePickerButton = styled.TouchableOpacity(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
}));

const ScheduleAddCard = ({ data }: { data: WorkingDayInfo }) => {
  const { registWorkingDayInfoList, setRegistWorkingDayInfoList } = useRootStore();
  const deleteHandler = () => {
    setRegistWorkingDayInfoList(registWorkingDayInfoList.filter((item) => item.id !== data.id));
  };

  return (
    <DateContainer>
      <DateBox>
        <DateWeek>
          <DayCircle day={data.weekday} />
        </DateWeek>
        <DatePickerButton>
          <TextContainer>
            <StartTimeText>{data.startTime.slice(0, 5)}</StartTimeText>
          </TextContainer>
          <MiddleLine> ~ </MiddleLine>
          <TextContainer>
            <EndTimeText>{data.endTime.slice(0, 5)}</EndTimeText>
          </TextContainer>
        </DatePickerButton>
      </DateBox>
      <Button
        onPress={deleteHandler}
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
    </DateContainer>
  );
};

export default ScheduleAddCard;
