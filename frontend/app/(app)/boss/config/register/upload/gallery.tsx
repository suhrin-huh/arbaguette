import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import styled from '@emotion/native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/common/Button';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';

const GalleryScreen = () => {
  const { setCertifiedPaper } = useCertifiedPaperStore()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const [assets] = result.assets
      console.log(assets)
      setCertifiedPaper(assets.uri);
      router.push('./check');
    }
  };

  return (
    <GalleryScreenContainer>
      <Button onPress={pickImage}>
        <Text>갤러리에서 선택하기</Text>
      </Button>
    </GalleryScreenContainer>
  );
}

export default GalleryScreen

const GalleryScreenContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));