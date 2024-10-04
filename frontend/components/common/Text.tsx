import Styled from '@emotion/native';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';

type TextSize = 'base' | 'sub' | 'title';
type TextWeight = 'bold' | null;
type TextColor = 'black' | 'gray' | 'white' | 'primary' | 'danger';

interface CustomProps {
  size: TextSize;
  weight?: TextWeight;
  color: TextColor;
  textStyle?: StyleProp<TextStyle>;
}

type CustomTextProps = TextProps & Partial<CustomProps>;

const Text = Styled(RNText)<CustomProps>(({ theme, size, weight, color }) => {
  const fontSize = {
    title: theme.font.TITLE,
    sub: theme.font.SUB,
    base: theme.font.BASE,
  }[size];

  const fontWeight = weight === 'bold' ? 'bold' : 'normal';

  const textColor = {
    black: theme.color.BLACK,
    gray: theme.color.GRAY[3],
    white: theme.color.WHITE,
    primary: theme.color.PRIMARY,
    danger: theme.color.DANGER,
  }[color];

  return {
    fontSize,
    fontWeight,
    color: textColor,
  };
});

const CustomText = ({ children, size = 'base', weight, color = 'black', textStyle }: CustomTextProps) => {
  return (
    <Text size={size} weight={weight} color={color} style={textStyle}>
      {children}
    </Text>
  );
};

export default CustomText;
