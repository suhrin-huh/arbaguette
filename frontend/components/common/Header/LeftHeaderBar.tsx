import styled from '@emotion/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

const HeaderContainer = styled.View(({ theme }) => ({
  height: 70,
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContentContainer = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingTop: 20,
}));

const TitleContainer = styled.View(({ theme }) => ({
  flex: 10,
  justifyContent: 'center',
  alignItems: 'flex-start',
  // paddingTop: 15,
  height: '100%',
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
}));

const RightContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center', // 수직 중앙 정렬
  alignItems: 'flex-end', // 수평 중앙 정렬
  // paddingTop: 20,
  paddingRight: theme.layout.PADDING.HEADER,
  height: '100%',
}));

const WhiteSpace = styled.View(({ theme }) => ({
  width: 24,
  height: 24,
}));

type HeaderTitle = React.ReactNode;
type HeaderRight = 'bell' | 'none';
type HeaderBgColor = 'white' | 'primary' | 'background' | 'transparent';

interface CenterHeaderbarProps {
  title: HeaderTitle;
  right: HeaderRight;
  bgColor?: HeaderBgColor;
  onPressTitle?: () => void;
}

const LeftHeaderbar = ({ title, right = 'bell', bgColor = 'white', onPressTitle }: CenterHeaderbarProps) => {
  const pushNoticePage = () => {
    // router.push()
    console.log('알림 페이지로 이동');
  };

  return (
    <HeaderContainer style={{ backgroundColor: `${bgColor === 'background' ? Colors.BACKGROUND : bgColor}` }}>
      <ContentContainer>
        <TitleContainer>
          <TouchableOpacity onPress={onPressTitle}>
            <Title>{title}</Title>
          </TouchableOpacity>
        </TitleContainer>
        <RightContainer>
          {right === 'bell' ? (
            <TouchableOpacity onPress={pushNoticePage}>
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
