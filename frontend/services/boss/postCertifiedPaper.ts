import instance from "@/configs/axios";

const postCertifiedPaper = async (paper: FormData) => {
  console.log('paper : ', paper);
  try {
    const response = await instance.post('/company/ocr', paper, {
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TEMP_ACCESSTOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('response : ', response.data);

  } catch (error) {

    console.error(error);
    throw error;
  }
};

export default postCertifiedPaper;
