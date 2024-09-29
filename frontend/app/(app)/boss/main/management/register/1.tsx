import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView } from 'react-native';

import ContractContainerBox from '@/components/boss/management/ContractContainerBox';
import ContractScheduleBox from '@/components/boss/management/ContractScheduleBox';
import InfoContainer from '@/components/boss/management/InfoContainer';
import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

export interface WorkingDayInfo extends WorkingDay {
  id: number;
}

const ManagementRegisterScreen1 = () => {
  const {
    step1,
    setStep1,
    registName,
    registTel,
    setRegistStartDate,
    setRegistEndDate,
    registWorkingDayInfoList,
    setRegistWorkingDayInfoId,
    setRegistWorkingDayInfoList,
  } = useRootStore();
  const telFormat = registTel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  const scrollViewRef = useRef(null);

  // 각 컴포넌트에 대한 애니메이션 값 ref
  const fadeAnimInfo = useRef(new Animated.Value(0)).current;
  const slideAnimInfo = useRef(new Animated.Value(-50)).current;
  const fadeAnimContract = useRef(new Animated.Value(0)).current;
  const slideAnimContract = useRef(new Animated.Value(-50)).current;
  const fadeAnimSchedule = useRef(new Animated.Value(0)).current;
  const slideAnimSchedule = useRef(new Animated.Value(-50)).current;
  const fadeAnimButton = useRef(new Animated.Value(0)).current;
  const slideAnimButton = useRef(new Animated.Value(-50)).current;

  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // UI 구현용 더미데이터
    setRegistWorkingDayInfoId(0);
    setRegistStartDate('근무 시작일');
    setRegistEndDate('근무 종료일');
    setIsReady(true); // 네비게이션이 준비되었음을 설정
    setRegistWorkingDayInfoList([]);
    setStep1('name');

    return () => {};
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      (scrollViewRef.current as any).scrollTo({ y: 0, animated: true });
    }
  }, [registWorkingDayInfoList]);

  // 애니메이션 코드. 나중에 커스텀 훅으로 뺄 것.
  useEffect(() => {
    const timer = setTimeout(() => setStep1('date'), 1000);
    if (step1 === 'name') {
      Animated.parallel([
        Animated.timing(fadeAnimInfo, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimInfo, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step1 === 'date') {
      Animated.parallel([
        Animated.timing(fadeAnimContract, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimContract, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step1 === 'time') {
      Animated.parallel([
        Animated.timing(fadeAnimSchedule, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimSchedule, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step1 === 'next') {
      Animated.parallel([
        Animated.timing(fadeAnimButton, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimButton, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => clearTimeout(timer);
  }, [step1]);

  const routeBack = () => {
    if (isReady) {
      router.push('/boss/main/management/');
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <ContainerView style={{ backgroundColor: Colors.WHITE }}>
        <CenterHeaderbar title="직원 정보 등록" right="none" onPressLeft={routeBack} />
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, gap: 20, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          {(step1 === 'name' || step1 === 'date' || step1 === 'time' || step1 === 'next') && (
            <Animated.View style={{ opacity: fadeAnimInfo, transform: [{ translateY: slideAnimInfo }] }}>
              <InfoContainer title="직원 정보" topText={registName} bottomText={telFormat} />
            </Animated.View>
          )}
          {(step1 === 'date' || step1 === 'time' || step1 === 'next') && (
            <Animated.View style={{ opacity: fadeAnimContract, transform: [{ translateY: slideAnimContract }] }}>
              <ContractContainerBox />
            </Animated.View>
          )}
          {(step1 === 'time' || step1 === 'next') && (
            <Animated.View style={{ opacity: fadeAnimSchedule, transform: [{ translateY: slideAnimSchedule }] }}>
              <ContractScheduleBox />
            </Animated.View>
          )}
          {step1 === 'next' ||
            (registWorkingDayInfoList.length > 0 && (
              <Animated.View style={{ opacity: fadeAnimButton, transform: [{ translateY: slideAnimButton }] }}>
                <Button type="primary">다음</Button>
              </Animated.View>
            ))}
        </ScrollView>
      </ContainerView>
    </Modal>
  );
};

export default ManagementRegisterScreen1;
