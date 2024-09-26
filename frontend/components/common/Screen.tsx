import Styled from '@emotion/native';
import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StatusBarProps, StyleProp, ViewStyle } from 'react-native';

import Theme from '@/styles/Theme';

const ScreenContainer = Styled.KeyboardAvoidingView(({ theme }) => ({
  flex: 1,
}));

const ScrollView = Styled.ScrollView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
}));

const ArbaguetteStatusBar = Styled.StatusBar(({ theme }) => ({ backgroundColor: theme.color.PRIMARY }));

type ScreenProps = PropsWithChildren<
  Partial<{
    viewOption: ScrollViewProps & { style: StyleProp<ViewStyle> };
    statusbarOption: StatusBarProps;
  }>
>;

const Screen = ({ children, viewOption, statusbarOption }: ScreenProps) => {
  return (
    <ScreenContainer>
      <ArbaguetteStatusBar
        animated={true}
        backgroundColor={Theme.color.PRIMARY}
        barStyle="light-content"
        {...statusbarOption}
      />
      <ScrollView
        {...viewOption}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: 10,
          paddingVertical: Theme.layout.PADDING.VERTICAL,
          paddingHorizontal: Theme.layout.PADDING.HORIZONTAL,
        }}>
        {children}
      </ScrollView>
    </ScreenContainer>
  );
};

export default Screen;
