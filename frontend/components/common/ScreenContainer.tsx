import styled from '@emotion/native';
import React from 'react';
import { StatusBar } from 'react-native';

import Colors from '@/constants/Colors';

const Container = styled.View(({ theme }) => ({
  flexGrow: 1,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingTop: theme.layout.PADDING.VERTICAL - 10,
  gap: 15,
}));

const ContainerView = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
      {children}
    </Container>
  );
};

export default ContainerView;
