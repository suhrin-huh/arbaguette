import React from 'react'
import styled from '@emotion/native'

const UploadInitialScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Title>사업자 등록증을 업로드해주세요.</Title>
      {children}
    </Container>
  )
}

export default UploadInitialScreen

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  // paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 28,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
  marginTop: 80,
  marginBottom: 30,
}));
