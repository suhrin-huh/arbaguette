import styled from '@emotion/native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';

import Button from '@/components/common/Button';
import useRootStore from '@/zustand';

import DayBottomSheet from './DayBottomSheet';
import ScheduleAddCard from './ScheduleAddCard';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  gap: 20,
  paddingHorizontal: 10,
  width: '100%',
}));

const InfoHeader = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const InfoContent = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 15,
}));

const NoneSchedule = styled.View(({ theme }) => ({
  width: '100%',
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
}));

const NoneScheduleText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.GRAY[3],
}));

const ContractScheduleBox = () => {
  const [open, setOpen] = useState(false);
  const { registWorkingDayInfoList } = useRootStore();
  return (
    <ContractContainer>
      <InfoHeader>
        <InfoTitle>근무 일정</InfoTitle>
        <Button
          onPress={() => setOpen(true)}
          type="primary"
          buttonStyle={{ width: 25, height: 25, paddingHorizontal: 0, borderRadius: 20 }}
          textStyle={{ fontSize: 12 }}>
          <Entypo name="plus" size={16} color="white" />
        </Button>
      </InfoHeader>
      <InfoContent>
        {registWorkingDayInfoList.length === 0 && (
          <NoneSchedule style={{ height: 100 }}>
            <NoneScheduleText>일정이 없습니다.</NoneScheduleText>
          </NoneSchedule>
        )}
        {registWorkingDayInfoList.map((info) => (
          <ScheduleAddCard key={info.id} data={info} />
        ))}
      </InfoContent>
      <Modal
        isVisible={open}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600} // 나타날 때 애니메이션 지속 시간 (밀리초)
        animationOutTiming={600} // 사라질 때 애니메이션 지속 시간 (밀리초)
        style={{ margin: 0, justifyContent: 'flex-end' }}
        onBackdropPress={() => setOpen(false)}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <DayBottomSheet setOpen={setOpen} />
        </View>
      </Modal>
    </ContractContainer>
  );
};

export default ContractScheduleBox;
