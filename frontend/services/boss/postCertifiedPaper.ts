import instance from "@/configs/axios";

const postCertifiedPaper = async (paper: FormData) => {
  try {
    const response = await instance.post('/company/ocr', paper, {
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TEMP_ACCESSTOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;

  } catch (error) {
    throw error;
  }
};

export default postCertifiedPaper;
