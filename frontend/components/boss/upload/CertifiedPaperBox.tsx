import React from 'react'
import styled from '@emotion/native'

type CertifiedPaperBoxProps = {
  children: React.ReactNode;
  uri: string;
}

const CertifiedPaperBox = ({ children, uri }: CertifiedPaperBoxProps) => {
  return (
    <IsPictureContainer>
      <TakedPictureContainer>
        <TakedPicture source={{ uri }} />
      </TakedPictureContainer>
      <ButtonBox>
        {children}
      </ButtonBox>
    </IsPictureContainer>
  )
}

export default CertifiedPaperBox


const IsPictureContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  gap: 40,
}));

const TakedPictureContainer = styled.View(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
}));

const TakedPicture = styled.Image(({ theme }) => ({
  width: '100%',
  height: 500,
}));

const ButtonBox = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  gap: 10,
}));

