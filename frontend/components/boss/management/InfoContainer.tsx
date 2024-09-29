import styled from '@emotion/native';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';

const Container = styled.View(({ theme }) => ({
  gap: 20,
  paddingHorizontal: 10,
  width: '100%',
  height: 180,
  justifyContent: 'center',
}));

const InfoHeader = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  alignItems: 'flex-start',
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const InfoContent = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.WHITE,
}));

const InfoTopBox = styled.View(({ theme }) => ({
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: theme.color.GRAY['2'],
  paddingHorizontal: 10,
  borderTopEndRadius: 16,
  borderTopStartRadius: 16,
  borderBottomWidth: 0,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

const InfoBottomBox = styled.View(({ theme }) => ({
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: theme.color.GRAY['2'],
  borderBottomEndRadius: 16,
  borderBottomStartRadius: 16,
  paddingHorizontal: 10,
  borderBottomWidth: 2,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

const InfoText = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'semibold',
  color: theme.color.GRAY[3],
  paddingLeft: 10,
}));

interface InfoContainerProps {
  title: string;
  topText: string;
  bottomText: string;
  bottomTextStyle?: StyleProp<TextStyle>;
}

const InfoContainer = ({ title, topText, bottomText, bottomTextStyle }: InfoContainerProps) => {
  return (
    <Container>
      <InfoHeader>
        <InfoTitle>{title}</InfoTitle>
      </InfoHeader>
      <InfoContent>
        <InfoTopBox>
          <InfoText>{topText}</InfoText>
        </InfoTopBox>
        <InfoBottomBox>
          <InfoText style={bottomTextStyle}>{bottomText}</InfoText>
        </InfoBottomBox>
      </InfoContent>
    </Container>
  );
};

export default InfoContainer;
