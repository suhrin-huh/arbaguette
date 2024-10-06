import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import InfoContainer from '@/components/boss/management/InfoContainer';
import InsuContractBox from '@/components/boss/management/InsuContractBox';
import SalaryContractBox from '@/components/boss/management/SalaryContractBox';
import SalaryDateContractBox from '@/components/boss/management/SalaryDateContractBox';
import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ManagementRegisterScreen2 = () => {
  const { selectedCompanyName, selectedCompanyAddress, step2, setStep2 } = useRootStore();

  const fadeAnimCompany = useRef(new Animated.Value(0)).current;
  const slideAnimCompany = useRef(new Animated.Value(-50)).current;
  const fadeAnimSalary = useRef(new Animated.Value(0)).current;
  const slideAnimSalary = useRef(new Animated.Value(-50)).current;
  const fadeAnimDate = useRef(new Animated.Value(0)).current;
  const slideAnimDate = useRef(new Animated.Value(-50)).current;
  const fadeAnimInsu = useRef(new Animated.Value(0)).current;
  const slideAnimInsu = useRef(new Animated.Value(-50)).current;
  const fadeAnimButton = useRef(new Animated.Value(0)).current;
  const slideAnimButton = useRef(new Animated.Value(-50)).current;

  const pathRoute = (to: 'back' | 'next') => {
    switch (to) {
      case 'back':
        router.back();
        break;
      case 'next':
        router.push('/boss/contract/3');
        break;
    }
  };

  useEffect(() => {
    const steps: Step2[] = ['company', 'salary', 'date', 'insu'];
    let currentStep = 0;

    setStep2(steps[currentStep]);

    const timer = setInterval(() => {
      currentStep += 1;
      if (currentStep < steps.length) {
        setStep2(steps[currentStep]);
      } else {
        clearInterval(timer);
      }
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step2 === 'company') {
      Animated.parallel([
        Animated.timing(fadeAnimCompany, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimCompany, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step2 === 'salary') {
      Animated.parallel([
        Animated.timing(fadeAnimSalary, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimSalary, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step2 === 'date') {
      Animated.parallel([
        Animated.timing(fadeAnimDate, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimDate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step2 === 'insu') {
      Animated.parallel([
        Animated.timing(fadeAnimInsu, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimInsu, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (step2 === 'next') {
      Animated.parallel([
        Animated.timing(fadeAnimButton, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimButton, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [step2]);

  return (
    <ContainerView style={{ backgroundColor: Colors.WHITE, paddingTop: 20 }}>
      <CenterHeaderbar title="직원 정보 등록" right="none" onPressLeft={() => pathRoute('back')} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        {(step2 === 'company' || step2 === 'date' || step2 === 'salary' || step2 === 'insu' || step2 === 'next') && (
          <Animated.View style={{ opacity: fadeAnimCompany, transform: [{ translateY: slideAnimCompany }] }}>
            <InfoContainer
              title="직원 정보"
              topText={selectedCompanyName}
              bottomText={selectedCompanyAddress}
              bottomTextStyle={{ fontSize: 12 }}
            />
          </Animated.View>
        )}
        {(step2 === 'salary' || step2 === 'date' || step2 === 'insu' || step2 === 'next') && (
          <Animated.View style={{ opacity: fadeAnimSalary, transform: [{ translateY: slideAnimSalary }] }}>
            <SalaryContractBox />
          </Animated.View>
        )}
        {(step2 === 'salary' || step2 === 'date' || step2 === 'insu' || step2 === 'next') && (
          <Animated.View style={{ opacity: fadeAnimDate, transform: [{ translateY: slideAnimDate }] }}>
            <SalaryDateContractBox />
          </Animated.View>
        )}
        {(step2 === 'insu' || step2 === 'next') && (
          <Animated.View style={{ opacity: fadeAnimInsu, transform: [{ translateY: slideAnimInsu }] }}>
            <InsuContractBox />
          </Animated.View>
        )}
        {step2 === 'next' && (
          <Animated.View style={{ opacity: fadeAnimButton, transform: [{ translateY: slideAnimButton }] }}>
            <Button type="primary" onPress={() => pathRoute('next')}>
              다음
            </Button>
          </Animated.View>
        )}
      </ScrollView>
    </ContainerView>
  );
};

export default ManagementRegisterScreen2;
