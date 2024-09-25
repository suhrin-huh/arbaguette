import styled from '@emotion/native';
import React from 'react';
import { Text, View } from 'react-native';

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

interface DayCircleProps {
  day: Days;
}

const DayCircle = ({ day }: DayCircleProps) => {
  return (
    <Container>
      <CircleText>{day}</CircleText>
    </Container>
  );
};

export default DayCircle;
