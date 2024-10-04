import Styled from '@emotion/native';
import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StatusBarProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import Theme from '@/styles/Theme';

const ScreenContainer = Styled.KeyboardAvoidingView(({ theme }) => ({
  flex: 1,
}));

const ScrollView = Styled.ScrollView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
}));

const View = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
  paddingVertical: Theme.layout.PADDING.VERTICAL,
  paddingHorizontal: Theme.layout.PADDING.HORIZONTAL,
}));

const ArbaguetteStatusBar = Styled.StatusBar(({ theme }) => ({ backgroundColor: theme.color.PRIMARY }));

type CustomScrollViewProps = { type: 'scroll' } & Partial<{
  viewOption: ScrollViewProps & { style: StyleProp<ViewStyle> };
  statusbarOption: StatusBarProps;
}>;

type CustomViewProps = { type: 'view' } & Partial<{
  viewOption: ViewProps & { style: StyleProp<ViewStyle> };
  statusbarOption: StatusBarProps;
}>;

type ScreenProps = PropsWithChildren<CustomScrollViewProps | CustomViewProps>;

const Screen = ({ children, type, viewOption, statusbarOption }: ScreenProps) => {
  const ScreenComponent = type === 'view' ? View : ScrollView;

  return (
    <ScreenContainer>
      <ArbaguetteStatusBar
        animated={true}
        backgroundColor={Theme.color.PRIMARY}
        barStyle="light-content"
        {...statusbarOption}
      />
      <ScreenComponent
        {...viewOption}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: 10,
          paddingVertical: Theme.layout.PADDING.VERTICAL,
          paddingHorizontal: Theme.layout.PADDING.HORIZONTAL,
        }}>
        {children}
      </ScreenComponent>
    </ScreenContainer>
  );
};

export default Screen;
