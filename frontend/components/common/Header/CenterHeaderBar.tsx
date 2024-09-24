import styled from '@emotion/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

type HeaderLeft = React.ReactNode | 'before' | 'store' | 'none';
type HeaderTitle = React.ReactNode;
type HeaderRight = 'bell' | 'none';

interface CenterHeaderbarProps {
  left: HeaderLeft;
  title: HeaderTitle;
  right: HeaderRight;
  onPressLeft?: () => void;
  onPressTitle?: () => void;
  onPressRight?: () => void;
}

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

const LeftContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
  paddingLeft: theme.layout.PADDING.HEADER,
  height: '100%',
}));

const TitleContainer = styled.View(({ theme }) => ({
  flex: 10,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 15,
  height: '100%',
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'semibold',
}));

const RightContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center', // 수직 중앙 정렬
  alignItems: 'center', // 수평 중앙 정렬
  paddingTop: 20,
  paddingRight: theme.layout.PADDING.HEADER,
  height: '100%',
}));

const WhiteSpace = styled.View(({ theme }) => ({
  width: 24,
  height: 24,
}));

const LeftIcon = ({ left }: { left: HeaderLeft }) => {
  switch (left) {
    case 'before':
      return <FontAwesome5 name="chevron-left" size={20} color={Colors.PRIMARY} />;
    case 'store':
      return <Ionicons name="storefront-sharp" size={24} color={Colors.GRAY[3]} />;
    case 'none':
      return <WhiteSpace />;
    default:
      return left;
  }
};

const CenterHeaderbar = ({
  left = 'before',
  title,
  right = 'bell',
  onPressLeft,
  onPressTitle,
  onPressRight,
}: CenterHeaderbarProps) => {
  return (
    <HeaderContainer>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.BACKGROUND} />
      <ContentContainer>
        <LeftContainer>
          <TouchableOpacity onPress={onPressLeft}>
            <LeftIcon left={left} />
          </TouchableOpacity>
        </LeftContainer>
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

export default CenterHeaderbar;
