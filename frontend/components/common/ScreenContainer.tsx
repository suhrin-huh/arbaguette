import styled from '@emotion/native';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

const Container = styled.View(({ theme }) => ({
  flexGrow: 1,
  paddingHorizontal: 30,
  gap: 15,
}));

const ContainerView = ({ children, ...props }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
  return <Container style={props.style}>{children}</Container>;
};

export default ContainerView;
