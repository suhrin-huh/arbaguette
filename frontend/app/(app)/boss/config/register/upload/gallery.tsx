import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import styled from '@emotion/native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/common/Button';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';

const createFileObject = (uri: string, fileName: string, type: string) => {
  return {
    uri,            // 로컬 파일 경로
    type,           // MIME 타입 (예: image/jpeg)
    name: fileName  // 파일 이름 (예: photo.jpg)
  };
};

const GalleryScreen = () => {
  const { setCertifiedPaper, setPaperUri } = useCertifiedPaperStore()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],

      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // 파일 확장자 추출 (기본값: jpeg)
      const fileExtension = asset.uri.split('.').pop();
      const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
      const fileName = asset.fileName || `photo.${fileExtension}`;

      // 파일 객체 생성
      const file = createFileObject(asset.uri, fileName, mimeType);

      const formData = new FormData();
      formData.append('image', file as any);

      setCertifiedPaper(formData);
      setPaperUri(asset.uri);
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