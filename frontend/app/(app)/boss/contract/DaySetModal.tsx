import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import DayBottomSheet from '@/components/boss/management/DayBottomSheet';

const DaySetModal = () => {
  return (
    <Modal
      isVisible={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={600} // 나타날 때 애니메이션 지속 시간 (밀리초)
      animationOutTiming={600} // 사라질 때 애니메이션 지속 시간 (밀리초)
      style={{ margin: 0, justifyContent: 'flex-end' }}
      onBackdropPress={() => router.back()}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <DayBottomSheet closeHandler={() => router.back()} />
      </View>
    </Modal>
  );
};

export default DaySetModal;
