import styled from '@emotion/native';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, Linking, TouchableOpacity } from 'react-native';

import unknownPerson from '@/assets/images/unknown_person.jpg';
import Colors from '@/constants/Colors';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';

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
  const { name, tel, profileImage, workingDays, id, salary } = crewData;
  const linkingHandler = (phoneNumber: string, type: 'tel' | 'sms') => {
    Linking.openURL(`${type}:${phoneNumber}`);
  };

  const handleSalary = () => {
    if (salary) {
      router.push({
        pathname: './salary/1',
        params: { crewId: id, money: String(salary), name },
      });
      return;
    }
    Alert.alert('오류 발생', '송금할 급여가 없습니다.');
  };

  return (
    <InfoContainer>
      <ProfileContainer>
        <Image
          source={profileImage ? { uri: profileImage } : unknownPerson}
          style={{ width: 70, height: 70, borderRadius: 50 }}
        />
        <ProfileRightContainer>
          <CrewInfoName>{name}</CrewInfoName>
          <CrewInfoIconContainer>
            <TouchableOpacity
              onPress={() => {
                linkingHandler(tel, 'tel');
              }}>
              <Ionicons name="call" size={24} color={Colors.GRAY[3]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                linkingHandler(tel, 'sms');
              }}>
              <MaterialIcons name="message" size={25} color={Colors.GRAY[3]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSalary}>
              <FontAwesome6 name="dollar-sign" size={25} color={Colors.GRAY[3]} />
            </TouchableOpacity>
          </CrewInfoIconContainer>
        </ProfileRightContainer>
      </ProfileContainer>
      <CrewScheduleList workingDays={workingDays} />
    </InfoContainer>
  );
};

export default CrewDetailCard;
