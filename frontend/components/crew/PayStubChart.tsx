import Styled from '@emotion/native';
import { VictoryLegend, VictoryPie, VictoryTheme } from 'victory-native';

import CardContainer from '@/components/common/CardContainer';
import Theme from '@/styles/Theme';

const ChartContainer = Styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
}));

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

const COLOR_SCALE = [Theme.color.PRIMARY, Theme.color.SECONDARY, Theme.color.GRAY['1']];

const PayStubChart = ({ payStub }: PayStubDocProps) => {
  const formattedNumber = (number: number): string => number.toLocaleString('ko-KR');
  const { originSalary, tax, allowance } = payStub;

  const calculateRatio = (amount: number, total: number) => {
    return Math.floor(amount - (amount / total) * tax);
  };
  const originData = [
    {
      label: '기본급',
      amount: originSalary,
    },
    {
      label: '수당',
      amount: allowance,
    },
    {
      label: '세금',
      amount: tax,
    },
  ];
  const totalSalary = originSalary + allowance;

  const modifiedData = [
    { x: '기본급', y: calculateRatio(originSalary, totalSalary) },
    { x: '수당', y: calculateRatio(allowance, totalSalary) },
    { x: '세금', y: tax },
  ];
  return (
    <CardContainer style={{ alignItems: 'center', gap: 30 }}>
      <ChartContainer>
        <VictoryPie
          data={modifiedData}
          innerRadius={10}
          labels={() => null}
          padAngle={1}
          cornerRadius={5}
          theme={VictoryTheme.material}
          width={120}
          padding={0}
          height={120}
          colorScale={COLOR_SCALE}
        />
        <VictoryLegend
          padding={0}
          data={originData.map((item) => ({
            name: `${item.label}\t\t${formattedNumber(item.amount)}원`,
          }))}
          colorScale={COLOR_SCALE}
          width={140}
          height={100}
        />
      </ChartContainer>
    </CardContainer>
  );
};

export default PayStubChart;
