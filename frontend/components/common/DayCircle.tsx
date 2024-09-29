import styled from '@emotion/native';
import React from 'react';

import Colors from '@/constants/Colors';

const Container = styled.View(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
}));

const CircleText = styled.Text(({ theme }) => ({
  color: theme.color.WHITE,
  fontSize: 12,
  fontWeight: 'bold',
  alignSelf: 'center',
  justifyContent: 'center',
  paddingBottom: 3,
}));

const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

interface DayCircleProps {
  day: Weekday;
  color?: string;
}

const DayCircle = ({ day, color = Colors.SECONDARY }: DayCircleProps) => {
  return (
    <Container style={{ backgroundColor: color }}>
      <CircleText>{dayOfWeek[day]}</CircleText>
    </Container>
  );
};

export default DayCircle;
