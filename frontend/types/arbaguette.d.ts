interface ArbaguetteResponse<T> {
  code: number;
  message: string;
  data: T;
}

type AccessToken = string;
type RefreshToken = string;
type Role = 'BOSS' | 'CREW';

type Email = string;
type Password = string;
type UserName = string;
type Tel = string;
type ProfileImage = number;

type Days = '월' | '화' | '수' | '목' | '금' | '토' | '일';

interface LoginForm {
  email: Email;
  password: Password;
}

interface SignUpForm {
  email: Email;
  password: Password;
  name: UserName;
  tel: Tel;
  role: Role;
  profileImage: ProfileImage;
}

type CompanyName = string;
type Address = string;
type Representative = string;

interface CompanyRegisterForm {
  name: CompanyName;
  address: Address;
  representative: Representative;
}

type CompanyId = number;
type CrewName = string;

interface CrewRegisterForm {
  companyId: CompanyId;
  name: CrewName;
  tel: Tel;
}

type BankAccount = string;
type Money = number;

interface RemittanceForm {
  account: BankAccount;
  money: Money;
}

interface LoginResponseData {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  role: Role;
}

interface ImageOcrResponseData {
  name: CompanyName;
  address: Address;
  representative: Representative;
}

interface Company {
  companyId: CompanyId;
  name: CompanyName;
  address: Address;
}

type CrewId = number;

interface Crew {
  id: CrewId;
  name: CrewName;
  profileImage: ProfileImage;
  salary: Money;
}

interface GetCompanyListResponseData {
  companies: Company[];
}

interface GetCrewMemberListResponseData {
  crews: Crew[];
}

type WorkStatus = string;
type Time = string;

interface CommuteCheckResponseData {
  workStatus: WorkStatus;
  time: Time;
}

type LoginResponse = ArbaguetteResponse<LoginResponseData>;
type SignUpResponse = ArbaguetteResponse<void>;
type EmailCheckResponse = ArbaguetteResponse<void>;
type ImageOcrResponse = ArbaguetteResponse<ImageOcrResponseData>;
type RegistCompanyResponse = ArbaguetteResponse<void>;
type GetCompanyListResponse = ArbaguetteResponse<GetCompanyListResponseData>;
type RegistCrewMemberResponse = ArbaguetteResponse<void>;
type GetCrewMemberListResponse = ArbaguetteResponse<GetCrewMemberListResponseData>;
type GetMonthlyAccumulatedSalaryResponse = ArbaguetteResponse<Money>;
type GetMonthlyEstimatedSalaryResponse = ArbaguetteResponse<Money>;
type CommuteCheckResponse = ArbaguetteResponse<CommuteCheckResponseData>;
