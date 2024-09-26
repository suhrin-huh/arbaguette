import styled from '@emotion/native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, Modal, ScrollView, StatusBar, Text, View } from 'react-native';

import CrewDetailCard from '@/components/boss/management/CrewDetailCard';
import SalaryReciptCard from '@/components/boss/management/SalaryReciptCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Loading from '@/components/common/Loading';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';

const mockData = {
  id: 1,
  name: ' 손다인',
  profileImage: 1,
  workingDays: [
    {
      weekday: 1,
      startTime: '11:00:00',
      endTime: '17:00:00',
    },
    {
      weekday: 3,
      startTime: '09:00:00',
      endTime: '17:00:00',
    },
    {
      weekday: 4,
      startTime: '09:00:00',
      endTime: '17:00:00',
    },
  ],
  salary: 87030,
  tax: 0,
  allowance: 0,
  workHours: 9,
  receipts: [
    {
      month: 8,
      originSalary: 80000,
      totalTime: 80,
    },
  ],
};

const CrewDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const handleDismiss = () => {
    router.back();
  };
  const [crewData, setCrewData] = useState<GetCrewMemberDetailResponseData | null>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.back();
      console.log('first');
      return true;
    });

    setCrewData(mockData);
    // id로 알바생 상세 정보 호출

    return () => {
      backHandler.remove();
    };
  }, []);

  if (!crewData) {
    return (
      <Modal visible={true} animationType="none">
        <ContainerView style={{ backgroundColor: Colors.BACKGROUND, gap: 20 }}>
          <Loading size={84} />
        </ContainerView>
      </Modal>
    );
  }

  return (
    <Modal visible={true} animationType="none">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerView style={{ backgroundColor: Colors.BACKGROUND, gap: 20, paddingBottom: 40 }}>
          <StatusBar barStyle="light-content" backgroundColor={Colors.BLACK} />
          <CenterHeaderbar
            left="back"
            title={<Text>직원 정보</Text>}
            onPressLeft={handleDismiss}
            right="none"
            bgColor="background"
          />
          <CrewDetailCard crewData={crewData} />
          <SalaryReciptCard receiptData={crewData.receipts[0]} crewId={crewData.id} />
        </ContainerView>
      </ScrollView>
    </Modal>
  );
};

export default CrewDetailScreen;
