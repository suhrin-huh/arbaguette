import Styled from '@emotion/native';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { View } from 'react-native';

import DeleteButton from '@/components/common/DeleteButton';

type InputContainerBaseProps = TextInputProps & {
  isFocused?: boolean;
  isValid?: boolean;
};

interface InputContainerWithDeleteButtonProps {
  enableDeleteButton: true;
  handleDeleteText: () => void;
}

interface InputContainerWithoutDeleteButtonProps {
  enableDeleteButton?: false;
}

export type InputContainerProps = InputContainerBaseProps &
  (InputContainerWithDeleteButtonProps | InputContainerWithoutDeleteButtonProps);

const InputContainer = Styled.TextInput<Omit<InputContainerProps, 'enableDeleteButton' | 'handleDeleteText'>>(
  ({ theme, isFocused, isValid }) => ({
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
    zIndex: theme.dimensions.BASE,
  }),
);

const Input = (props: InputContainerProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={{ position: 'relative' }}>
      <InputContainer {...props} onFocus={handleFocus} onBlur={handleBlur} isFocused={isFocused} />
      {props.enableDeleteButton && !!props.value?.length && <DeleteButton onPress={props.handleDeleteText} />}
    </View>
  );
};

export default Input;
