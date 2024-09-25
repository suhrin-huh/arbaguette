import styled from '@emotion/native';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';

import unknownPerson from '../../../assets/images/unknown_person.jpg';
import Button from '../../common/Button';
import CardContainer from '../../common/CardContainer';

type CrewCardType = 'crew' | 'add';

interface CrewCardProps {
  id: number;
  type: CrewCardType;
  name?: string;
  salary?: string;
  pressHandler?: () => void;
}

const StyledCardContainer = styled(CardContainer)(({ theme }) => ({
  width: '100%',
  elevation: 5,
  borderRadius: 20,
  height: 120,
  justifyContent: 'center',
  alignItems: 'center',
}));

const InnerContainer = styled.View(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 15,
  flexDirection: 'row',
}));

const ProfileContainer = styled.View(({ theme }) => ({
  gap: 5,
  alignItems: 'center',
}));

const CrewNameTitle = styled.Text(({ theme }) => ({
  fontSize: 14,
  fontWeight: 'bold',
}));

const CrewSalaryTitle = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  paddingLeft: 100,
}));

const SalaryDetailButton = styled(Button)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 20,
}));

const SalaryDetailText = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  color: Colors.WHITE,
}));

const CrewCard = ({ id, name, salary, pressHandler, ...props }: CrewCardProps) => {
  return (
    <Pressable onPress={pressHandler}>
      <StyledCardContainer>
        {props.type === 'add' ? (
          <InnerContainer>
            <ProfileContainer>
              <Entypo name="circle-with-plus" size={32} color={Colors.PRIMARY} />
              <CrewNameTitle>직원 추가</CrewNameTitle>
            </ProfileContainer>
          </InnerContainer>
        ) : (
          <InnerContainer>
            <ProfileContainer>
              <Image source={unknownPerson} style={{ width: 45, height: 45, borderRadius: 50 }} />
              <CrewNameTitle>{name}</CrewNameTitle>
            </ProfileContainer>
            <CrewSalaryTitle>{salary}</CrewSalaryTitle>
            <SalaryDetailButton onPress={() => console.log(id)}>
              <SalaryDetailText>상세</SalaryDetailText>
            </SalaryDetailButton>
          </InnerContainer>
        )}
      </StyledCardContainer>
    </Pressable>
  );
};

export default CrewCard;
