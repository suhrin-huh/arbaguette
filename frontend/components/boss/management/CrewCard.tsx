import styled from '@emotion/native';
import React from 'react';
import { Image, Pressable } from 'react-native';

import DayCircle from '@/components/common/DayCircle';
import Colors from '@/constants/Colors';

import unknownPerson from '../../../assets/images/unknown_person.jpg';
import CardContainer from '../../common/CardContainer';

type CrewCardType = 'crew';

interface CrewCardProps {
  id: number;
  day: Weekday[];
  type: CrewCardType;
  name?: string;
  salary?: number;
  profileImage?: string;
  pressHandler?: () => void;
  period: number;
  endDate: string;
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
  flex: 1,
  paddingHorizontal: 10,
}));

const ProfileContainer = styled.View(({ theme }) => ({
  gap: 12,
  alignItems: 'center',
  flexDirection: 'row',
}));

const NameTitleContainer = styled.View(({ theme }) => ({
  gap: 13,
  alignItems: 'flex-start',
  paddingBottom: 2,
}));

const CrewNameTitle = styled.Text(({ theme }) => ({
  width: '100%',
  fontSize: 20,
  fontWeight: 'bold',
  alignItems: 'flex-start',
}));

const MiddleContainer = styled.View(({ theme }) => ({
  paddingTop: 10,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  flex: 1,
}));

const DayContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  gap: 5,
  justifyContent: 'flex-end',
  width: '100%',
}));

const ContractRemainText = styled.Text(({ theme }) => ({
  fontSize: 12,
  fontWeight: 'bold',
  color: Colors.GRAY[3],
}));

const HowWorkContainer = styled.View(({ theme }) => ({
  gap: 8,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: '100%',
}));

const HowWorkMonth = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: Colors.PRIMARY,
}));

const HowWorkTitle = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: Colors.GRAY[3],
}));

const CrewCard = ({ id, name, salary, day, pressHandler, profileImage, period, endDate }: CrewCardProps) => {
  return (
    <Pressable onPress={pressHandler}>
      <StyledCardContainer>
        <InnerContainer>
          <ProfileContainer>
            <Image
              source={profileImage ? { uri: profileImage } : unknownPerson}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
            <NameTitleContainer>
              <CrewNameTitle>{name}</CrewNameTitle>
              {endDate && (
                <ContractRemainText>
                  {endDate.slice(2, 4)}년 {parseInt(endDate.slice(5, 7), 10)}월까지
                </ContractRemainText>
              )}
            </NameTitleContainer>
          </ProfileContainer>
          <MiddleContainer>
            <DayContainer>{day && day.map((day) => <DayCircle day={day} key={day} />)}</DayContainer>
            <HowWorkContainer>
              <HowWorkTitle>근무</HowWorkTitle>
              <HowWorkMonth>{period}</HowWorkMonth>
              <HowWorkTitle>달째</HowWorkTitle>
            </HowWorkContainer>
          </MiddleContainer>
        </InnerContainer>
      </StyledCardContainer>
    </Pressable>
  );
};

export default CrewCard;
