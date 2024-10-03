import Styled from '@emotion/native';
import { useState } from 'react';
import { Pressable } from 'react-native';

interface NumberProps {
  pressed?: boolean;
  onPress?: (value: string) => void;
  onPressIn?: (value: string) => void;
  onPressOut?: () => void;
  children?: string;
}

const Button = Styled.View<{ pressed?: boolean }>(({ theme, pressed }) => ({
  height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: pressed ? theme.color.PRIMARY : 'transparent',
  width: '100%',
}));

const ButtonText = Styled.Text<{ pressed?: boolean }>(({ theme, pressed }) => ({
  color: pressed ? theme.color.WHITE : theme.color.GRAY['5'],
  fontSize: 20,
}));

const Number = ({ children, pressed, onPress, onPressIn, onPressOut }: NumberProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (!children || !onPress) return;
    setIsPressed(true);

    if (!onPressIn) return;
    onPressIn(children);
  };

  const handlePressOut = () => {
    if (!children || !onPress) return;
    setIsPressed(false);
    onPress(children);

    if (!onPressOut) return;
    onPressOut();
  };

  return (
    <Pressable onPressOut={handlePressOut} onPressIn={handlePressIn} style={{ flex: 1 }}>
      <Button pressed={isPressed || pressed}>
        <ButtonText pressed={isPressed || pressed}>{children}</ButtonText>
      </Button>
    </Pressable>
  );
};

export default Number;
