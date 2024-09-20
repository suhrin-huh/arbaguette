import Styled from '@emotion/native';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';

type ButtonSize = 'fill' | 'hug' | number;
type ButtonType = 'primary' | 'outlined';

interface ButtonContainerProps {
  size: ButtonSize;
  type: ButtonType;
  disabled?: boolean;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

type ButtonProps = PressableProps & Partial<ButtonContainerProps>;

const ButtonContainer = Styled.View<Omit<ButtonContainerProps, 'textStyle' | 'buttonStyle'>>(
  ({ theme, size, type, disabled }) => {
    const ButtonStyle = {
      primary: {
        backgroundColor: disabled ? theme.color.GRAY['3'] : theme.color.PRIMARY,
      },
      outlined: {
        borderColor: disabled ? theme.color.GRAY['3'] : theme.color.PRIMARY,
        borderWidth: 1,
      },
    }[type];

    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      width: typeof size === 'number' ? size : undefined,
      height: 48,
      alignSelf: size === 'fill' ? 'stretch' : 'center',
      paddingHorizontal: 18,
      borderRadius: theme.layout.BORDER.SECONDARY,
      ...ButtonStyle,
    };
  },
);

const ButtonText = Styled.Text<Omit<ButtonContainerProps, 'size' | 'textStyle' | 'buttonStyle'>>(
  ({ theme, type, disabled }) => {
    const TextStyle = {
      primary: {
        color: theme.color.WHITE,
      },
      outlined: {
        color: disabled ? theme.color.GRAY['3'] : theme.color.PRIMARY,
      },
    }[type];

    return {
      fontSize: 20,
      ...TextStyle,
    };
  },
);

const Button = ({ children, size = 'fill', type = 'primary', buttonStyle, textStyle, ...props }: ButtonProps) => {
  return (
    <Pressable {...props} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      <ButtonContainer size={size} type={type} disabled={props.disabled} style={buttonStyle}>
        <View>
          <ButtonText type={type} disabled={props.disabled} style={textStyle}>
            {children as string}
          </ButtonText>
        </View>
      </ButtonContainer>
    </Pressable>
  );
};

export default Button;
