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
   * 알바생 추가
   * @param crewRegisterForm 알바생 추가 폼
   */
  registCrewMember: async (crewRegisterForm: CrewRegisterForm) => {
    return axios.post<RegistCrewMemberResponse>('/api/boss/crew', crewRegisterForm);
  },
  /**
   * 근로계약서 작성
   * @returns formData
   */
  signContract: async (signContractForm: FormData) => {
    return axios.post<FormData>('/api/contract/boss', signContractForm, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * 알바생 전체 목록 조회
   */
  getCrewMemberList: async () => {
    return axios.get<GetCrewMemberListResponse>('/api/boss/crews');
  },
  /**
   * 알바생 상세 조회
   * @param crewId 조회할 알바생 아이디
   */
  getCrewMemberDetail: async (crewId: CrewId) => {
    return axios.get<GetCrewMemberDetailResponse>(`/api/boss/crew/${crewId}`);
  },
  /**
   * 일별 사업장 스케쥴 조회
   * @param date 조회할 날짜
   * @param companyId 조회할 사업장 아이디
   */
  getDaySchedule: async (date: string, companyId: CompanyId) => {
    return axios.get<GetDailyScheduleResponseData>(`/api/schedule/day?companyId=${companyId}&date=${date}`);
  },
};
