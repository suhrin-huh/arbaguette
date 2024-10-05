import styled from '@emotion/native';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import unknownPerson from '@/assets/images/unknown_person.jpg';
import Colors from '@/constants/Colors';

import CrewScheduleList from './CrewScheduleList';

const InfoContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  borderRadius: 16,
  alignItems: 'center',
  gap: 20,
  paddingBottom: 30,
}));

const ProfileContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  marginTop: 40,
  flexDirection: 'row',
  width: '80%',
  justifyContent: 'center',
  paddingRight: 10,
  gap: 30,
}));

const ProfileRightContainer = styled.View(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.WHITE,
  gap: 12,
}));

const CrewInfoName = styled.Text(({ theme }) => ({
  fontSize: 26,
  fontWeight: 'bold',
  color: theme.color.BLACK,
  textAlign: 'center',
  justifyContent: 'center',
}));

const CrewInfoIconContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.WHITE,
  gap: 12,
}));

interface CrewDetailCardProps {
  crewData: GetCrewMemberDetailResponseData;
}

const CrewDetailCard = ({ crewData }: CrewDetailCardProps) => {
  const linkingHandler = (phoneNumber: string, type: 'tel' | 'sms') => {
    Linking.openURL(`${type}:${phoneNumber}`);
  };

  const handleSalary = () => {
    console.log(crewData.id);
    // id로 해당 알바생 송금페이지로 이동
  };

  return (
    <InfoContainer>
      <ProfileContainer>
        <Image
          source={crewData.profileImage ? { uri: crewData.profileImage } : unknownPerson}
          style={{ width: 70, height: 70, borderRadius: 50 }}
        />
        <ProfileRightContainer>
          <CrewInfoName>{crewData.name}</CrewInfoName>
          <CrewInfoIconContainer>
            <TouchableOpacity
              onPress={() => {
                linkingHandler('01012345678', 'tel');
              }}>
              <Ionicons name="call" size={24} color={Colors.GRAY[3]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                linkingHandler('01012345678', 'sms');
              }}>
              <MaterialIcons name="message" size={25} color={Colors.GRAY[3]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSalary}>
              <FontAwesome6 name="dollar-sign" size={25} color={Colors.GRAY[3]} />
            </TouchableOpacity>
          </CrewInfoIconContainer>
        </ProfileRightContainer>
      </ProfileContainer>
      <CrewScheduleList workingDays={crewData.workingDays} />
    </InfoContainer>
  );
};

export default CrewDetailCard;
