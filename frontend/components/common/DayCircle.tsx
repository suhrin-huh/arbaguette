import styled from '@emotion/native';
import React from 'react';

const Container = styled.View(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 50,
  backgroundColor: theme.color.SECONDARY,
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
}

const DayCircle = ({ day }: DayCircleProps) => {
  return (
    <Container>
      <CircleText>{dayOfWeek[day]}</CircleText>
    </Container>
  );
};

export default DayCircle;
