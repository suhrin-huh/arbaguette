import axios from '@/configs/axios';

export default {
  /**
   * 이미지 파일 OCR 인식
   * @param image 인식할 이미지 파일
   */
  imageOcr: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    return axios.post<ImageOcrResponse>('/api/company/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  /**
   * 사업장 등록
   * @param companyRegisterForm 사업장 등록 폼
   */
  registCompany: async (companyRegisterForm: CompanyRegisterForm) => {
    return axios.post<RegistCompanyResponse>('/api/company', companyRegisterForm);
  },
  /**
   * 사업장 목록 조회
   */
  getCompanyList: async () => {
    return axios.get<GetCompanyListResponse>('/api/company');
  },
  /**
   * 알바생 등록
   * @param crewRegisterForm 알바생 등록 폼
   */
  registCrewMember: async (crewRegisterForm: CrewRegisterForm) => {
    return axios.post<RegistCrewMemberResponse>('/api/crew', crewRegisterForm);
  },
  /**
   * 알바생 전체 조회
   */
  getCrewMemberList: async () => {
    return axios.get<GetCrewMemberListResponse>('/api/boss/crew');
  },
};
