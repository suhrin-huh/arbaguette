import Styled from '@emotion/native';
import { View } from 'react-native';

import type { InputContainerProps } from '@/components/common/Input';
import Input from '@/components/common/Input';

type LabeledInputProps = InputContainerProps & { label: string };

const Label = Styled.Text(({ theme }) => ({
  fontSize: 14,
  color: theme.color.GRAY['2'],
}));

const LabeledInput = ({ label, ...props }: LabeledInputProps) => {
  return (
    <View>
      <Label>{label}</Label>
      <Input {...props} />
    </View>
  );
};

export default LabeledInput;
