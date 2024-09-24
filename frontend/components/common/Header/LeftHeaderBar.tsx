import styled from '@emotion/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

const HeaderContainer = styled.View(({ theme }) => ({
  height: 90,
  backgroundColor: Colors.BACKGROUND,
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContentContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 80,
}));

const TitleContainer = styled.View(({ theme }) => ({
  flex: 4,
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: 20,
  height: '100%',
  paddingLeft: theme.layout.PADDING.HORIZONTAL,
}));

const RightContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center', // 수직 중앙 정렬
  alignItems: 'center', // 수평 중앙 정렬
  paddingTop: 20,
  paddingRight: theme.layout.PADDING.HEADER,
  height: '100%',
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
}));

const WhiteSpace = styled.View(({ theme }) => ({
  width: 24,
  height: 24,
}));

type HeaderTitle = React.ReactNode;
type HeaderRight = 'bell' | 'none';

interface CenterHeaderbarProps {
  title: HeaderTitle;
  right: HeaderRight;
  onPressTitle?: () => void;
  onPressRight?: () => void;
}

const LeftHeaderbar = ({ title, right = 'bell', onPressTitle, onPressRight }: CenterHeaderbarProps) => {
  return (
    <HeaderContainer>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.BACKGROUND} />
      <ContentContainer>
        <TitleContainer>
          <TouchableOpacity onPress={onPressTitle}>
            <Title>{title}</Title>
          </TouchableOpacity>
        </TitleContainer>
        <RightContainer>
          {right === 'bell' ? (
            <TouchableOpacity onPress={onPressRight}>
              <Fontisto name="bell-alt" size={24} color={Colors.SECONDARY} />
            </TouchableOpacity>
          ) : (
            <WhiteSpace />
          )}
        </RightContainer>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default LeftHeaderbar;
