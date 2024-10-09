import Styled from '@emotion/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { Alert, Image, Text } from 'react-native';

import TreasureBox from '@/assets/images/treasure-box.png';
import CoinAnimation from '@/assets/lottie/coin.json';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';

const generateUniqueId = () => Date.now() + Math.random();

interface Animation {
  id: number;
  source: typeof CoinAnimation;
}

const EventScreen = () => {
  const queryClient = useQueryClient();
  const { bonusId } = useLocalSearchParams<{ bonusId: string }>();
  const errorRef = useRef(false);
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [money, setMoney] = useState(0);
  const { mutate: getBread } = useMutation({
    mutationFn: arbaguette.getBread,
    onSuccess: () => {
      setMoney((prev) => prev + 100);
    },
    onError: async (error) => {
      if (errorRef.current) return;
      errorRef.current = true;
      await queryClient.invalidateQueries({ queryKey: [keys.all], refetchType: 'all' });
      Alert.alert('이벤트가 종료되었습니다.');
      router.back();
    },
  });

  const handlePress = () => {
    if (errorRef.current) return;

    const newAnimation = {
      id: generateUniqueId(),
      source: CoinAnimation,
    };
    setAnimations((prev) => [...prev, newAnimation]);
    getBread(Number(bonusId));

    setTimeout(() => {
      setAnimations((prev) => prev.filter((anim) => anim.id !== newAnimation.id));
    }, 2000);
  };

  return (
    <Container>
      <Button onPress={handlePress}>
        <Money>{money}원</Money>
        <ImageBox>
          {animations.map((animation) => (
            <Lottie
              key={animation.id}
              source={animation.source}
              autoPlay
              loop={false}
              style={{ position: 'absolute' }}
            />
          ))}
        </ImageBox>
        <Image
          source={TreasureBox}
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: [{ translateX: -100 }],
          }}
          resizeMode="contain"
        />
      </Button>
      <ButtonText>사장님이 돈을 뿌렸어요!</ButtonText>
    </Container>
  );
};

// Styled Components
const Container = Styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.WHITE,
}));

const Money = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  fontSize: 24,
  fontWeight: 'bold',
}));

const Button = Styled.TouchableOpacity({
  padding: 15,
  borderRadius: 10,
  marginBottom: 20,
  position: 'relative',
  alignItems: 'center',
});

const ButtonText = Styled(Text)({
  color: '#000',
  fontSize: 18,
});

const ImageBox = Styled.View({
  width: 300,
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#ddd',
});

const Lottie = Styled(LottieView)({
  width: '100%',
  height: '100%',
});

export default EventScreen;
