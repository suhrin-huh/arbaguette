import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

import SignContractBox from '@/components/boss/management/SignContractBox';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';

const ManagementRegisterScreen3 = () => {
  const pathRoute = (to: 'back' | 'next') => {
    switch (to) {
      case 'back':
        router.back();
        break;
      case 'next':
        router.push('/boss/contract/4');
        break;
    }
  };
  return (
    <ContainerView style={{ backgroundColor: Colors.WHITE, paddingTop: 20 }}>
      <CenterHeaderbar title="근로계약서 서명" right="none" onPressLeft={() => pathRoute('back')} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <SignContractBox pathRoute={pathRoute} />
      </ScrollView>
    </ContainerView>
  );
};

export default ManagementRegisterScreen3;
