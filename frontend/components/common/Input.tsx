import Styled from '@emotion/native';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';

export type InputContainerProps = TextInputProps & {
  isFocused?: boolean;
  isValid?: boolean;
};

const InputContainer = Styled.TextInput<InputContainerProps>(({ theme, isFocused, isValid }) => ({
  borderBottomWidth: 2,
  borderColor: isValid
    ? theme.color.PRIMARY
    : isValid === false
      ? theme.color.DANGER
      : isFocused
        ? theme.color.PRIMARY
        : theme.color.GRAY['0'],
  color: theme.color.BLACK,
  fontSize: 24,
  paddingBottom: 4,
  underlineColorAndroid: 'transparent',
}));

const Input = (props: Omit<InputContainerProps, 'isFocused'>) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return <InputContainer {...props} onFocus={handleFocus} onBlur={handleBlur} isFocused={isFocused} />;
};

export default Input;
