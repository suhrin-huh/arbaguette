import styled from '@emotion/native';
import { useEffect } from 'react';

import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  gap: 20,
  paddingHorizontal: 10,
  width: '100%',
  marginBottom: 30,
}));
const InfoHeader = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
}));

const SalaryContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  gap: 10,
  paddingTop: 2,
}));

const InfoTitle = styled.Text(({ theme }) => ({ fontSize: 20, fontWeight: 'bold', color: theme.color.BLACK }));

const SalaryKindText = styled.Text(({ theme }) => ({
  fontSize: 14,
  fontWeight: 'bold',
  color: theme.color.PRIMARY,
}));

const SalaryAmountText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.PRIMARY,
}));

const StyledView = styled.View({
  height: 30,
  paddingHorizontal: 10,
  paddingBottom: 2,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.GRAY[0],
});

const SalaryDateContractBox = () => {
  const SALARY_DATE = 15;
  const { setRegistSalaryDate } = useRootStore();
  useEffect(() => {
    setRegistSalaryDate(SALARY_DATE);
  }, []);

  return (
    <ContractContainer>
      <InfoHeader>
        <InfoTitle>급여 날짜</InfoTitle>
        <SalaryContainer>
          <StyledView>
            <SalaryKindText>매달</SalaryKindText>
          </StyledView>
          <StyledView>
            <SalaryAmountText>15일</SalaryAmountText>
          </StyledView>
        </SalaryContainer>
      </InfoHeader>
    </ContractContainer>
  );
};

export default SalaryDateContractBox;
