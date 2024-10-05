import styled from '@emotion/native';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Colors from '@/constants/Colors';

const MonthBarContainer = styled.View(({ theme }) => ({
  flex: 10,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.WHITE,
  borderRadius: 18,
  gap: 10,
  height: 56,
  width: '100%',
}));

const MonthText = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  paddingBottom: 5,
}));

interface MonthBarProps {
  year: Year;
  month: Month;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

const MonthBar = ({ year, month, onPressLeft, onPressRight }: MonthBarProps) => {
  return (
    <MonthBarContainer>
      <Pressable
        onPress={onPressLeft}
        style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}>
        <FontAwesome5 name="chevron-left" size={24} color={Colors.PRIMARY} />
      </Pressable>
      <MonthText>
        {year}년 {month}월
      </MonthText>
      <Pressable
        onPress={onPressRight}
        style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}>
        <FontAwesome5 name="chevron-right" size={24} color={Colors.PRIMARY} />
      </Pressable>
    </MonthBarContainer>
  );
};

export default MonthBar;
