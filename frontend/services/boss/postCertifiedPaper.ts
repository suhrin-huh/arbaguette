import instance from '@/configs/axios';

const postCertifiedPaper = async (paper: FormData) => {
  const response = await instance.post('/company/ocr', paper, {
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TEMP_ACCESSTOKEN}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export default postCertifiedPaper;
