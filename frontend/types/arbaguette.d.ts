interface ArbaguetteResponse<T> {
  code: number;
  message: string;
  data: T;
}

type AccessToken = string;
type RefreshToken = string;
type Role = 'BOSS' | 'CREW';
type CrewStatus = 'UNREGISTERED' | 'UNSIGNED' | 'SIGNED';

interface AccessTokenPayload {
  role: Role;
  crewStatus: CrewStatus;
  email: Email;
}

type Email = string;
type Password = string;
type UserName = string;
type Tel = string;
type ProfileImage = number;

type Year = number;
type Month = number;
type Weekday = number;
type Time = string;
type WorkHours = number;

interface WorkingDay {
  weekday: Weekday;
  startTime: Time;
  endTime: Time;
}

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

interface GetCrewMemberDetailResponseData {
  id: CrewId;
  name: CrewName;
  profileImage: ProfileImage;
  salary: Money;
  workingDays: WorkingDay[];
  tax: Money;
  allowance: Money;
  workHours: WorkHours;
  receipts: Receipt[];
}

interface Receipt {
  month: Month;
  originSalary: Money;
  totalTime: WorkHours;
}

type WorkStatus = string;

interface CommuteCheckResponseData {
  workStatus: WorkStatus;
  time: Time;
}

type StartTime = string;
type EndTime = string;

interface NearCommuteInfoResponseData {
  companyName: CompanyName;
  startTime: StartTime;
  endTime: EndTime;
}

interface ErrorResponse {
  code: number;
  message: string;
}

type LoginResponse = ArbaguetteResponse<LoginResponseData>;
type SignUpResponse = ArbaguetteResponse<void>;
type EmailCheckResponse = ArbaguetteResponse<void>;
type ImageOcrResponse = ArbaguetteResponse<ImageOcrResponseData>;
type RegistCompanyResponse = ArbaguetteResponse<void>;
type GetCompanyListResponse = ArbaguetteResponse<GetCompanyListResponseData>;
type RegistCrewMemberResponse = ArbaguetteResponse<void>;
type GetCrewMemberListResponse = ArbaguetteResponse<GetCrewMemberListResponseData>;
type GetCrewMemberDetailResponse = ArbaguetteResponse<GetCrewMemberDetailResponseData>;
type GetMonthlyAccumulatedSalaryResponse = ArbaguetteResponse<Money>;
type GetMonthlyEstimatedSalaryResponse = ArbaguetteResponse<Money>;
type CommuteCheckResponse = ArbaguetteResponse<CommuteCheckResponseData>;
type GetNearCommuteInfoResponse = ArbaguetteResponse<NearCommuteInfoResponseData>;
