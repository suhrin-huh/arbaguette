import Styled from '@emotion/native';
import { useState } from 'react';

import NumberButton from '@/components/common/modal/PasswordModal/NumberButton';
import random from '@/util/random';

interface NumPadProps {
  onPress?: (value: number) => void;
}

const Container = Styled.View(({ theme }) => ({ backgroundColor: theme.color.WHITE }));

const Row = Styled.View(({ theme }) => ({
  flexDirection: 'row',
}));

const NumPad = ({ onPress }: NumPadProps) => {
  const [fakeNumber, setFakeNumber] = useState(-1);

  const handlePress = (value: string) => {
    if (!onPress) return;
    onPress(Number(value));
  };

  const handleSetFakeNumber = (value: string) => {
    const number = Number(value);
    setFakeNumber(random(number));
  };

  const handleResetFakeNumber = () => {
    setFakeNumber(-1);
  };

  return (
    <Container>
      <Row>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 1}>
          1
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 2}>
          2
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 3}>
          3
        </NumberButton>
      </Row>
      <Row>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 4}>
          4
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 5}>
          5
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 6}>
          6
        </NumberButton>
      </Row>
      <Row>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 7}>
          7
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 8}>
          8
        </NumberButton>
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 9}>
          9
        </NumberButton>
      </Row>
      <Row>
        <NumberButton />
        <NumberButton
          onPress={handlePress}
          onPressIn={handleSetFakeNumber}
          onPressOut={handleResetFakeNumber}
          pressed={fakeNumber === 0}>
          0
        </NumberButton>
        <NumberButton />
      </Row>
    </Container>
  );
};

export default NumPad;
