import Styled from '@emotion/native';
import { AntDesign } from '@expo/vector-icons';
import type { PressableProps } from 'react-native';
import { Pressable } from 'react-native';

const DeleteButton = Styled.View(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 26,
  height: 26,
  right: 0,
  bottom: 8,
  borderRadius: 13,
  backgroundColor: theme.color.GRAY['2'],
  zIndex: theme.dimensions.FOREGROUND,
}));

const Button = (props: PressableProps) => {
  return (
    <Pressable {...props} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      <DeleteButton>
        <AntDesign name="close" size={22} color="white" />
      </DeleteButton>
    </Pressable>
  );
};

export default Button;
