import Styled from '@emotion/native';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import Colors from '@/constants/Colors';

interface PayStub {
  companyName: string;
  originSalary: number;
  tax: number;
  allowance: number;
  totalTime: number;
  salaryDate: number;
}

interface PayStubDocProps {
  payStub: PayStub;
}

const SalaryDocument = ({ payStub }: PayStubDocProps) => {
  const formattedNumber = (number: number): string => `${number.toLocaleString('ko-KR')} 원`;
  const { companyName, originSalary, tax, allowance, totalTime } = payStub;
  return (
    <View>
      <PayStubBox>
        <Text
          size="sub"
          weight="bold"
          textStyle={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.GRAY['1'] }}>
          기업정보
        </Text>
        <TextBox>
          <Text size="base">회사명</Text>
          <Text size="base">{companyName}</Text>
        </TextBox>
      </PayStubBox>
      <PayStubBox>
        <Text
          size="sub"
          weight="bold"
          textStyle={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.GRAY['1'] }}>
          지급내역
        </Text>
        <TextBox>
          <Text size="base">총 지급액</Text>
          <Text size="base">{formattedNumber(originSalary + allowance - tax)}</Text>
        </TextBox>
        <TextBox>
          <Text size="base">기본급</Text>
          <Text size="base">{formattedNumber(originSalary)}</Text>
        </TextBox>
        <Text color="gray" textStyle={{ fontSize: 12 }}>
          총 근무시간 : {totalTime} 시간
        </Text>
        <TextBox>
          <Text size="base">수당</Text>
          <Text size="base">{formattedNumber(allowance)}</Text>
        </TextBox>
        <Text color="gray" textStyle={{ fontSize: 12 }}>
          (주휴수당 및 야간수당 등을 포함한 금액입니다.)
        </Text>
        <TextBox>
          <Text size="base">세금</Text>
          <Text size="base">{formattedNumber(tax)}</Text>
        </TextBox>
      </PayStubBox>
    </View>
  );
};

const PayStubBox = Styled.View(() => ({
  marginTop: 30,
}));

const TextBox = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
}));

export default SalaryDocument;
