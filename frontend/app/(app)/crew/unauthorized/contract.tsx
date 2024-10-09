import Styled from '@emotion/native';
import { router } from 'expo-router';

import Button from '@/components/common/Button';
import Screen from '@/components/common/Screen';
import { useEmploymentContract } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const Content = Styled.View(({ theme }) => ({ flex: 9, paddingTop: 20 }));

const ButtonContainer = Styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
  flex: 1,
}));

const Title = Styled.Text(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 10,
}));

const Contract = Styled.View(({ theme }) => ({ gap: 10 }));

const Row = Styled.View(({ theme }) => ({
  width: '100%',
  height: 50,
  flexDirection: 'row',
}));

const Key = Styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
}));

const Value = Styled.View(({ theme }) => ({
  flex: 1.6,
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
}));

const KeyText = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  fontSize: 16,
  fontWeight: 600,
}));

const ValueText = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  fontSize: 16,
  fontWeight: 400,
}));

const SignatureScreen = () => {
  const { crewId } = useRootStore();
  const contract = useEmploymentContract(crewId || -1);

  if (!contract) return null;

  return (
    <Screen type="scroll">
      <Content>
        <Title>근로조건을 확인하고</Title>
        <Title>서명해주세요.</Title>
        <Contract>
          <Row>
            <Key>
              <KeyText>업체명</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.companyName}</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>주소</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.address}</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>대표자</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.representative}</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>근로자</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.crewName}</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>시작일자</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.startDate.replaceAll('-', '.')}</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>종료일자</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.endDate.replaceAll('-', '.')}</ValueText>
            </Value>
          </Row>
          {!!contract.workingDayInfoList.length &&
            contract.workingDayInfoList.map((info, index) => (
              <Row key={info.weekday + info.startTime}>
                <Key>
                  <KeyText>{index === 0 && '근무일'}</KeyText>
                </Key>
                <Value>
                  <ValueText numberOfLines={1}>
                    {info.startTime.slice(0, 5)} - {info.endTime.slice(0, 5)}
                  </ValueText>
                </Value>
              </Row>
            ))}
          <Row>
            <Key>
              <KeyText>시급</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>{contract.salary}원</ValueText>
            </Value>
          </Row>
          <Row>
            <Key>
              <KeyText>급여지급일</KeyText>
            </Key>
            <Value>
              <ValueText numberOfLines={1}>매월 {contract.salaryDate}일</ValueText>
            </Value>
          </Row>
        </Contract>
      </Content>
      <ButtonContainer>
        <Button
          buttonStyle={{ flex: 1, height: 48 }}
          type="outlined"
          onPress={() => router.navigate({ pathname: '/crew/unauthorized/pdf', params: { url: contract.url } })}>
          근로계약서
        </Button>
        <Button buttonStyle={{ flex: 1, height: 48 }} onPress={() => router.navigate('/crew/unauthorized/signature')}>
          서명하기
        </Button>
      </ButtonContainer>
    </Screen>
  );
};

export default SignatureScreen;
