import styled from '@emotion/native';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image } from 'react-native';
import type { SignatureViewRef } from 'react-native-signature-canvas';
import Signature from 'react-native-signature-canvas';

import Button from '@/components/common/Button';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  paddingHorizontal: 10,
  width: '100%',
  height: '100%',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  marginBottom: 30,
}));

const ContextBox = styled.View(({ theme }) => ({
  flex: 1,
  marginTop: 60,
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'stretch',
  justifyContent: 'space-between',
}));

const InfoHeader = styled.View(({ theme }) => ({
  gap: 15,
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

const SignContainer = styled.View(({ theme }) => ({
  width: '100%',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: theme.color.WHITE,
  height: 250,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: theme.color.PRIMARY,
}));

const ButtonBox = styled.View(({ theme }) => ({
  gap: 10,
  paddingTop: 2,
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const SignContractBox = ({ pathRoute }: { pathRoute: (to: 'back' | 'next') => void }) => {
  const ref = useRef<SignatureViewRef>(null);
  const [signatureURI, setSignatureURI] = useState<string | null>(null);

  // 서명이 완료되었을 때 호출되는 콜백
  const handleOK = async (signature: string) => {
    try {
      if (!signature) {
        Alert.alert('오류', '서명 데이터가 비어 있습니다.');
        return;
      }

      // Base64 문자열에서 헤더 제거
      const base64Data = signature.replace('data:image/png;base64,', '');
      const fileName = `sign_${Date.now()}.png`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      // Base64 데이터를 파일로 저장
      await FileSystem.writeAsStringAsync(filePath, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 파일 정보 가져오기
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error('파일 저장 실패');
      }

      // 파일 URI 상태 업데이트
      setSignatureURI(fileInfo.uri);

      Alert.alert('성공', '서명이 저장되었습니다.');
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '서명을 저장하는 중 오류가 발생했습니다.');
    }
  };

  // 서명 완료 버튼을 눌렀을 때 서명 데이터를 가져와 handleOK 호출
  const handleConfirm = () => {
    ref.current?.readSignature();
  };

  // 서명 캔버스 초기화
  const handleClear = () => {
    ref.current?.clearSignature();
    setSignatureURI(null);
  };

  useEffect(() => {
    console.log('signatureURI : ', signatureURI);
  }, [signatureURI]);

  // 서버로 서명 이미지 전송
  const sendContrantHandler = async () => {
    // 이미지 전송 로직 추가

    pathRoute('next');
    //   if (!signatureURI) {
    //     Alert.alert('오류', '서명된 이미지가 없습니다.');
    //     return;
    //   }
    //   try {
    //     const formData = new FormData();
    //     formData.append('signature', {
    //       uri: signatureURI,
    //       name: `signature_${Date.now()}.png`,
    //       type: 'image/png',
    //     });
    //     const response = await fetch('https://your-server.com/upload', {
    //       method: 'POST',
    //       body: formData,
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     if (response.ok) {
    //       Alert.alert('성공', '서명이 서버에 업로드되었습니다.');
    //     } else {
    //       Alert.alert('오류', '서명을 서버에 업로드하는 데 실패했습니다.');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     Alert.alert('오류', '서명을 업로드하는 중 오류가 발생했습니다.');
    //   }
  };

  return (
    <ContractContainer>
      <ContextBox>
        <InfoHeader>
          <InfoTitle>서명을 입력해주세요.</InfoTitle>
          <InfoTitle>서명이 완료되면</InfoTitle>
          <InfoTitle>직원이 계약서를 전달받아요.</InfoTitle>
        </InfoHeader>
        <SignContainer>
          {!signatureURI ? (
            <Signature
              ref={ref}
              onOK={handleOK} // 서명 완료 시 handleOK 호출
              onEmpty={() => Alert.alert('서명', '서명이 비어있습니다.')}
              descriptionText="서명을 입력해주세요."
              penColor="black"
              clearText="지우기"
              confirmText="저장"
              webStyle={style}
              autoClear={false}
            />
          ) : (
            <Image resizeMode="contain" style={{ flex: 1, width: '100%' }} source={{ uri: signatureURI }} />
          )}
        </SignContainer>
        <ButtonBox>
          {signatureURI ? (
            <Button type="outlined" onPress={handleClear}>
              다시 서명하기
            </Button>
          ) : (
            <Button type="outlined" onPress={handleClear}>
              초기화
            </Button>
          )}
          {!signatureURI ? (
            <Button type="primary" onPress={handleConfirm}>
              서명 완료
            </Button>
          ) : (
            <Button type="primary" onPress={sendContrantHandler}>
              계약서 전달하기
            </Button>
          )}
        </ButtonBox>
      </ContextBox>
    </ContractContainer>
  );
};

const style = `
  .m-signature-pad {
    box-shadow: none; 
    border: none; 
    width: 100%;
    height: 100%;
  }
  .m-signature-pad--footer {
    display: none;
    margin: 0px;
  }
`;

export default SignContractBox;
