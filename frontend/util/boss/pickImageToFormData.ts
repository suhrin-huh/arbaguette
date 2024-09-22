import * as ImagePicker from 'expo-image-picker';

const createFileObject = (uri: string, fileName: string, type: string) => {
  return {
    uri,            // 로컬 파일 경로
    type,           // MIME 타입 (예: image/jpeg)
    name: fileName  // 파일 이름 (예: photo.jpg)
  };
};

const pickImageToFormData = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
  });

  if (!result.canceled) {
    const asset = result.assets[0];

    const fileExtension = asset.uri.split('.').pop();
    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
    const fileName = asset.fileName || `photo.${fileExtension}`;

    // 파일 객체 생성 -> formData에 추가
    const file = createFileObject(asset.uri, fileName, mimeType);

    const formData = new FormData();
    formData.append('image', file as any);

    return { // formData와 uri를 반환
      formData,
      uri: asset.uri
    };
  }
};

export default pickImageToFormData;
