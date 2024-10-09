import styled from '@emotion/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, Text } from 'react-native';

import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';

// import useBleScanner from '@/hooks/useBleScanner';
import gift from '../../../assets/images/gift.png';
import person from '../../../assets/images/unknown_person.jpg';

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

const FirstScreen = () => {
  // const { bleDevices } = useBleScanner();
  // console.log(bleDevices);
  const { type } = useLocalSearchParams();
  console.log(type);
  // const aroundUser = [
  //   { id: 0, name: '오렌지', profileImage: person },
  //   { id: 1, name: '김딸기', profileImage: person },
  //   { id: 2, name: '박수박', profileImage: person },
  //   { id: 3, name: '강사과', profileImage: person },
  //   { id: 4, name: '손감귤', profileImage: person },
  //   { id: 5, name: '황참외', profileImage: person },
  // ];
  // const aroundUser = bleDevices.map((device) => ({
  //   id: device.id,
  //   name: device.name,
  //   profileImage: person,
  // }));

  const outerOpacity = useRef(new Animated.Value(0.3)).current;
  const middleOpacity = useRef(new Animated.Value(0.6)).current;
  const innerOpacity = useRef(new Animated.Value(0.8)).current;

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // 화면 크기

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

  return (
    <ContainerView style={{ backgroundColor: Colors.PRIMARY }}>
      <OutLineCircle style={{ opacity: outerOpacity }}>
        <MiddleCircle style={{ opacity: middleOpacity }}>
          <InnerCircle style={{ opacity: innerOpacity }} />
        </MiddleCircle>
      </OutLineCircle>
      <Image style={{ width: 100, height: 100, position: 'absolute', top: 280, left: 130, zIndex: 10 }} source={gift} />

      {/* 유저 프로필 표시 */}
      {/* {aroundUser &&
        aroundUser.map((user) => {
          const { top, left } = getRandomPosition(screenWidth, screenHeight); // 화면 내에서 위치 지정
          return (
            <UserContainer
              onPress={() => {
                console.log('first');
              }}
              key={user.id}
              style={{ top, left }}>
              <UserImage source={user.profileImage} />
              <Text>{user.name}</Text>
            </UserContainer>
          );
        })} */}
    </ContainerView>
  );
};

export default FirstScreen;
