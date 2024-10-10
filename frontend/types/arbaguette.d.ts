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
  crewId: CrewId;
  crewStatus: CrewStatus;
  email: Email;
}

type Email = string;
type Password = string;
type UserName = string;
type Tel = string;
type ProfileImage = string;

type Year = number;
type Month = number;
type Weekday = number;
type Time = string;
type WorkHours = number;
type DateString = string;

type TaxType = 'INCOME' | 'NONE' | 'INSU';

interface WorkingDay {
  weekday: Weekday;
  startTime: Time;
  endTime: Time;
}

interface WorkingDayInfo extends WorkingDay {
  id: number;
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
type CompanyAddress = string;

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
  money: string;
  password: Password;
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
type Period = number;

interface Crew {
  id: CrewId;
  name: CrewName;
  profileImage: ProfileImage;
  salary: Money;
}

interface CrewWithWeekdays extends Crew {
  weekdays: Weekday[];
  period: Period;
  endDate: DateString;
}

interface GetCompanyListResponseData {
  companies: Company[];
}

interface GetCrewMemberListResponseData {
  crews: CrewWithWeekdays[];
}

interface GetCrewMemberDetailResponseData {
  id: CrewId;
  name: CrewName;
  tel: Tel;
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
  salary: Money;
  totalTime: WorkHours;
  tax: Money;
  allowance: Money;
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

type OriginSalary = number;
type Tax = number;
type Allowance = number;
type TotalTime = number;
type SalaryDate = number;

interface GetPayStubResponseData {
  originSalary: OriginSalary;
  tax: Tax;
  allowance: Allowance;
  totalTime: TotalTime;
  companyName: CompanyName;
  salaryDate: SalaryDate;
}

type TotalCount = number;
type NormalCount = number;
type AbsentCount = number;
type YetCount = number;
type Status = 'NORMAL' | 'LATE' | 'ABSENT' | 'EARLY' | null;

interface CrewSchedule {
  name: CrewName;
  profileImage: ProfileImage;
  tel: Tel;
  startTime: StartTime;
  endTime: EndTime;
  status: Status;
}

interface GetDailyScheduleResponseData {
  totalCount: TotalCount;
  normalCount: NormalCount;
  absentCount: AbsentCount;
  yetCount: YetCount;
  crewScheduleInfos: CrewSchedule[];
}

interface GetExpectedPayrollResponseData {
  originSalary: OriginSalary;
  tax: Tax;
  allowance: Allowance;
}

interface DailySchedule {
  crewId: CrewId;
  name: CrewName;
  scheduleId: number;
  substituteRequest: boolean;
  startTime: StartTime;
  endTime: EndTime;
  hopeCrewId: CrewId | null;
  hopeCrewName: CrewName | null;
}

interface MonthlySchedule {
  date: number;
  dailySchedules: DailySchedule[];
}

interface GetMonthlyScheduleResponseData {
  monthlyScheduleList: MonthlySchedule[];
}

type ScheduleId = number;
type SubstituteId = number;

interface PostRequestSubstituteResponseData {
  substituteId: SubstituteId;
  scheduleId: ScheduleId;
}

interface GetWorkHistoryResponseData {
  companyName: CompanyName;
  targetDate: string;
  normal: number;
  absent: number;
  late: number;
  earlyLeave: number;
  commutes: { date: string; inTime: string; outTime: string; commuteStatus: CommuteStatus }[];
}

interface GetExpectedExpensesResponseData {
  originSalary: Money;
  tax: Money;
  allowance: Money;
}

interface SendSalaryReceiptResponseData {
  crewId: CrewId;
  month: Month;
  originSalary: Money;
  tax: Money;
  allowance: Money;
  totalTime: TotalTime;
}

type CommuteStatus = 'NORMAL' | 'ABSENT' | 'LATE';

type ContractId = number;

interface GetEmploymentContractResponseData {
  contractId: ContractId;
  companyName: CompanyName;
  address: CompanyAddress;
  representative: Representative;
  crewName: CrewName;
  tel: Tel;
  startDate: DateString;
  endDate: DateString;
  workingDayInfoList: { weekday: Weekday; startTime: string; endTime: string }[];
  salary: Money;
  salaryDate: SalaryDate;
  tax: TaxType;
  bossSign: string;
  crewSign: string;
  url: string;
}

interface ReissueResponseData {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

interface Transaction {
  transactionUniqueNo: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
  transactionMemo: string;
}

interface GetBankHistoryResponseData {
  totalCount: string;
  list: Transaction[] | [];
}

interface GetAccountBalanceResponseData {
  account: BankAccount;
  money: string;
}

interface ThrowBreadResponseData {
  money: Money;
  companyId: CompanyId;
}

interface CheckAccountUserResponseData {
  userName: UserName;
}

type LoginResponse = ArbaguetteResponse<LoginResponseData>;
type SignUpResponse = ArbaguetteResponse<void>;
type ReissueResponse = ArbaguetteResponse<ReissueResponseData>;
type EmailCheckResponse = ArbaguetteResponse<void>;
type ImageOcrResponse = ArbaguetteResponse<ImageOcrResponseData>;
type RegistCompanyResponse = ArbaguetteResponse<void>;
type GetCompanyListResponse = ArbaguetteResponse<GetCompanyListResponseData>;
type RegistCrewMemberResponse = ArbaguetteResponse<{ crewId: CrewId }>;
type SignContractResponse = ArbaguetteResponse<void>;
type GetCrewMemberListResponse = ArbaguetteResponse<GetCrewMemberListResponseData>;
type GetCrewMemberDetailResponse = ArbaguetteResponse<GetCrewMemberDetailResponseData>;
type GetMonthlyAccumulatedSalaryResponse = ArbaguetteResponse<Money>;
type GetMonthlyEstimatedSalaryResponse = ArbaguetteResponse<Money>;
type CommuteCheckResponse = ArbaguetteResponse<CommuteCheckResponseData>;
type GetNearCommuteInfoResponse = ArbaguetteResponse<NearCommuteInfoResponseData>;
type GetPayStubResponse = ArbaguetteResponse<GetPayStubResponseData>;
type GetDailyScheduleResponse = ArbaguetteResponse<GetDailyScheduleResponseData>;
type GetExpectedPayrollResponse = ArbaguetteResponse<GetExpectedPayrollResponseData>;
type GetMonthlyScheduleResponse = ArbaguetteResponse<GetMonthlyScheduleResponseData>;
type GetWorkHistoryResponse = ArbaguetteResponse<GetWorkHistoryResponseData>;
type PostRequestSubstituteResponse = ArbaguetteResponse<PostRequestSubstituteResponseData>;
type GetEmploymentContractResponse = ArbaguetteResponse<GetEmploymentContractResponseData>;
type AgreeSubstituteResponse = ArbaguetteResponse<ScheduleId>;
type GetBankHistoryResponse = ArbaguetteResponse<GetBankHistoryResponseData>;
type GetAccountBalanceResponse = ArbaguetteResponse<GetAccountBalanceResponseData>;
type RemittanceResponse = ArbaguetteResponse<void>;
type GetExpectedExpensesResponse = ArbaguetteResponse<GetExpectedExpensesResponseData>;
type SendSalaryReceiptResponse = ArbaguetteResponse<SendSalaryReceiptResponseData>;
type ThrowBreadResponse = ArbaguetteResponse<ThrowBreadResponseData>;
type TakeSubstituteResponse = ArbaguetteResponse<void>;
type CheckAccountUserResponse = ArbaguetteResponse<CheckAccountUserResponseData>;
type SendSalaryResponse = ArbaguetteResponse<void>;
