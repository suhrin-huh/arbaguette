import styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Easing, Image, Modal, TouchableOpacity } from 'react-native';

import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
// import useBleScanner from '@/hooks/useBleScanner';
import arbaguette from '@/services/arbaguette';
import useRootStore from '@/zustand';

import gift from '../../../assets/images/gift.png';

const OutLineCircle = styled(Animated.View)(({ theme }) => ({
  width: 500,
  height: 500,
  borderRadius: 250,
  backgroundColor: theme.color.WHITE,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 80,
  left: -70,
  zIndex: 1,
}));

const MiddleCircle = styled(Animated.View)(({ theme }) => ({
  width: 325,
  height: 325,
  borderRadius: 175,
  backgroundColor: theme.color.WHITE,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
}));

const InnerCircle = styled(Animated.View)(({ theme }) => ({
  width: 135,
  height: 135,
  borderRadius: 75,
  backgroundColor: theme.color.WHITE,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 3,
}));

const UserContainer = styled.Pressable`
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 5; /* 원들보다 높은 z-index 설정 */
`;

const UserImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TextContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 50px;
`;

const FirstText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${Colors.WHITE};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FirstModal = styled(Modal)`
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.WHITE};
`;

const SeperationScreen = () => {
  const { type } = useLocalSearchParams();
  const { spreadBread, setSpreadBread } = useRootStore();
  const { mutate: throwBread } = useMutation({
    mutationFn: ({ money, companyId }: { money: Money; companyId: CompanyId }) =>
      arbaguette.throwBread({ money, companyId }),
    onSuccess: () => {
      Alert.alert('빵 뿌리기 성공');
    },
    onError: () => {
      console.log('빵 뿌리기 실패');
    },
  });
  const outerOpacity = useRef(new Animated.Value(0.3)).current;
  const middleOpacity = useRef(new Animated.Value(0.6)).current;
  const innerOpacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animateCircle = (animatedValue: Animated.Value, initialValue: number, finalValue: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: finalValue,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: initialValue,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateCircle(outerOpacity, 0.3, 0.5);
    animateCircle(middleOpacity, 0.6, 0.7);
    animateCircle(innerOpacity, 0.8, 0.8);
  }, [outerOpacity, middleOpacity, innerOpacity]);

  // 랜덤한 위치 생성 함수
  const getRandomPosition = (maxWidth: number, maxHeight: number) => {
    const componentWidth = 60; // 유저 이미지와 텍스트 크기를 고려한 값
    const top = Math.random() * (maxHeight - componentWidth); // 화면 높이 내에서 제한
    const left = Math.random() * (maxWidth - componentWidth); // 화면 너비 내에서 제한
    return { top, left };
  };

  const startAdvertise = () => {
    console.log(spreadBread);
    throwBread({ money: spreadBread, companyId: 2 });
  };

  useEffect(() => {
    setTimeout(() => {
      router.navigate({ pathname: '/seperation/firstModal' });
    }, 300);

    return () => setSpreadBread(0);
  }, [setSpreadBread]);

  return (
    <ContainerView style={{ backgroundColor: Colors.PRIMARY }}>
      <OutLineCircle style={{ opacity: outerOpacity }}>
        <MiddleCircle style={{ opacity: middleOpacity }}>
          <InnerCircle style={{ opacity: innerOpacity }} />
        </MiddleCircle>
      </OutLineCircle>
      <TouchableOpacity onPress={startAdvertise} style={{ position: 'absolute', top: 280, left: 130, zIndex: 10 }}>
        <Image style={{ width: 100, height: 100 }} source={gift} />
      </TouchableOpacity>
      <TextContainer>
        <FirstText>선물을 클릭하면{'\n'}선착순 이벤트를 시작해요!</FirstText>
      </TextContainer>
    </ContainerView>
  );
};

export default SeperationScreen;
