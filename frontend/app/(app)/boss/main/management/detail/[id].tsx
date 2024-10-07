import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Modal, ScrollView, StatusBar, Text } from 'react-native';

import CrewDetailCard from '@/components/boss/management/CrewDetailCard';
import SalaryReciptCard from '@/components/boss/management/SalaryReciptCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Loading from '@/components/common/Loading';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import { useCrewMemeberDetail } from '@/reactQuery/querys';

const CrewDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { crewDetail } = useCrewMemeberDetail(Number(id));
  const handleDismiss = () => {
    router.back();
  };

  console.log(id);
  console.log(crewDetail);

  if (!crewDetail) {
    return (
      <Modal visible={true} animationType="none">
        <ContainerView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.BACKGROUND,
            gap: 20,
          }}>
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
          <CrewDetailCard crewData={crewDetail} />
          <SalaryReciptCard crewData={crewDetail} />
        </ContainerView>
      </ScrollView>
    </Modal>
  );
};

export default CrewDetailScreen;
