import type { CameraView } from 'expo-camera';

const takePictureToFormData = async (cameraRef: React.RefObject<CameraView>) => {
  try {
    if (cameraRef.current) {
      const newPhoto = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
        exif: true,
      });
      if (newPhoto) {
        const formData = new FormData();
        formData.append('image', {
          uri: newPhoto.uri,
          type: 'image/jpeg',
          name: `photo_${Date.now()}.jpeg`,
        } as any);

        return {
          formData,
          uri: newPhoto.uri,
        };
      }
    }
  } catch (error) {
    console.error('Error taking picture: ', error);
  }
};

export default takePictureToFormData;
