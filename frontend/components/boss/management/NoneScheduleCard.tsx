import styled from '@emotion/native';
import React from 'react';
import { ScrollView } from 'react-native';

import CardContainer from '@/components/common/CardContainer';

const InnerContainer = styled(ScrollView)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const StatusTitle = styled.Text(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.color.GRAY[3],
}));

const StatusBox = styled.View(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  height: 90,
  borderRadius: 10,
  alignItems: 'center',
  paddingHorizontal: 30,
}));

const NoneCard = ({ title, fontSize = 16 }: { title: string; fontSize?: number }) => {
  return (
    <CardContainer>
      <InnerContainer>
        <StatusBox>
          <StatusTitle style={{ fontSize }}>{title}</StatusTitle>
        </StatusBox>
      </InnerContainer>
    </CardContainer>
  );
};

export default NoneCard;
