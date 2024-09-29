import styled from '@emotion/native';
import React from 'react';

import DayCircle from '@/components/common/DayCircle';

const ScheduleContainer = styled.View(({ theme }) => ({
  justifyContent: 'center',
  gap: 10,
}));

const Shcedule = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
}));

const TimeStamp = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
}));

const TimeText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const CrewScheduleList = ({ workingDays }: { workingDays: WorkingDay[] }) => {
  console.log(workingDays);
  return (
    <ScheduleContainer>
      {workingDays.map((workingDay) => (
        <Shcedule key={workingDay.weekday}>
          <DayCircle day={workingDay.weekday} />
          <TimeStamp>
            <TimeText>{workingDay.startTime.split(':').slice(0, 2).join(':')}</TimeText>
            <TimeText> - </TimeText>
            <TimeText>{workingDay.endTime.split(':').slice(0, 2).join(':')}</TimeText>
          </TimeStamp>
        </Shcedule>
      ))}
    </ScheduleContainer>
  );
};

export default CrewScheduleList;
