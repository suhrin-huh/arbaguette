![image](/docs/main.png)
# 📱 아르바게트 소개
> Arbeit + Baguette
> "사장님과 알바생을 위한 월급정산, 근무스케줄 관리 및 뱅킹서비스"

## 📅 개발 기간
**24.08.19 ~ 24.10.11** (7주)
(SSAFY 특화 프로젝트 - 금융 도메인)

## 👶 팀원

|강창우|김보현|황민채|김지원|박지훈|손다인|
| -------- | -------- | -------- | -------- | -------- | -------- |
| **FE/팀장** | **FE** | **FE** | **BE** | **BE** | **BE** |

## 📃 문서
  ### **[💻 Notion](https://di-son.notion.site/fa8a40d9039b4c7496905a1d4ff3db85?pvs=4)**

# 2. 🔍 개발 환경

## 2-1. 환경 설정

  ### 🛠 **Frontend**
<img src="https://img.shields.io/badge/react native-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/zustand-FF7300?style=for-the-badge&logo=zustand&Color=white"> 

  ### 🛠 **Backend**
<img src="https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/SpringSecurity-DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/kafka-231F20?style=for-the-badge&logo=kafka&logoColor=white">

  ### 🛠 **DB**
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"> <img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white"> <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> 

  ### 🛠 **Infra**
<img src="https://img.shields.io/badge/aws ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&Color=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">

  ### 🛠 **협업 툴**
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 2-2. 개발문서
  ### **아키텍처**
  ![Archi](/docs/archi.png)


  ### **ERD**
  ![ERD](/docs/erd.png)


# 3. 💰 주요 기능

### 공통
![Loign](/docs/login.png)
- 로그인 및 회원가입
- 푸시 알림
### 🙋‍♀️ 사장님
![Contract](/docs/contract.png)
- 사업자 등록
    - 카메라 촬영 및 갤러리 선택을 통해 OCR인식
    - NFC 카드에 사업장 정보 등록
![Contract2](/docs/contract2.PNG)
- 근로계약서 생성 및 서명
    - 전자 서명을 통한 계약서 서명
    - 근로계약서를 PDF로 생성
- 직원 및 급여 관리
    - 직원 정보 조회 및 전화/메시지
    - 급여 송금
    - 급여명세서 조회 및 발송
- 근무 관리
    - 직원 대타 승인
    - 일별 출근 직원 근태 확인
    - 캘린더를 통한 월별 스케줄 / 타임라인을 통한 스케줄 확인
- 보너스
    - 게임형식의 보너스 지급 (빵뿌리기)

### 🙋‍♂️ 알바생 
- 출퇴근
    - NFC를 활용한 출퇴근 체크
    - 동료 직원 일정 공유
- 근무 관리
    - 대타 신청 및 수락
- 근로계약서 서명 및 조회
- 급여명세서 조회
- 보너스
    - 게임형식의 보너스 지급 (빵뿌리기)

