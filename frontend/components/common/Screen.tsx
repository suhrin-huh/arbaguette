import Styled from '@emotion/native';
import type { PropsWithChildren } from 'react';
import type { KeyboardAvoidingViewProps, StatusBarProps } from 'react-native';

import Theme from '@/styles/Theme';

const ScreenContainer = Styled.KeyboardAvoidingView(({ theme }) => ({
  paddingVertical: theme.layout.PADDING.VERTICAL,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  backgroundColor: theme.color.BACKGROUND,
  flex: 1,
}));

const ArbaguetteStatusBar = Styled.StatusBar(({ theme }) => ({ backgroundColor: theme.color.PRIMARY }));

type ScreenProps = PropsWithChildren<
  Partial<{
    viewOption: KeyboardAvoidingViewProps;
    statusbarOption: StatusBarProps;
  }>
>;

const Screen = ({ children, viewOption, statusbarOption }: ScreenProps) => {
  return (
    <ScreenContainer {...viewOption}>
      <ArbaguetteStatusBar animated={true} backgroundColor={Theme.color.PRIMARY} {...statusbarOption} />
      {children}
    </ScreenContainer>
  );
};

export default Screen;