import styled from '@emotion/native';
import React, { useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';

import ContractContainerBox from '@/components/boss/management/ContractContainerBox';
import InfoContainer from '@/components/boss/management/InfoContainer';
import Button from '@/components/common/Button';
import DatePickerModal from '@/components/common/DatePickerModal';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ManagementRegisterScreen1 = () => {
  const { registName, registTel, registStartDate, registEndDate, setRegistStartDate, setRegistEndDate } =
    useRootStore();
  const telFormat = registTel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

  useEffect(() => {
    setRegistStartDate(new Date().toISOString().split('T')[0]);
    setRegistEndDate(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <ContainerView style={{ backgroundColor: Colors.WHITE }}>
        <CenterHeaderbar title="직원 정보 등록" right="none" />
        <InfoContainer title="직원 정보" topText={registName} bottomText={telFormat} />
        <ContractContainerBox />
      </ContainerView>
    </Modal>
  );
};

export default ManagementRegisterScreen1;
