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

interface Certification {
  companyName: string;
  originSalary: number;
  tax: number;
  allowance: number;
  totalTime: number;
  salaryDate: number;
}

interface CertificationDocProps {
  certification: Certification;
}

const COLOR_SCALE = [Theme.color.PRIMARY, Theme.color.SECONDARY, Theme.color.GRAY['1']];

const CertificationChart = ({ certification }: CertificationDocProps) => {
  const formattedNumber = (number: number): string => number.toLocaleString('ko-KR');
  const { originSalary, tax, allowance } = certification;

  const calculateRatio = (amount: number, total: number) => {
    return Math.floor(amount - (amount / total) * tax);
  };

  const totalSalary = originSalary + allowance;

  const data = [
    { x: '기본급', y: calculateRatio(originSalary, totalSalary) },
    { x: '수당', y: calculateRatio(allowance, totalSalary) },
    { x: '세금', y: tax },
  ];
  return (
    <CardContainer style={{ alignItems: 'center', gap: 30 }}>
      <ChartContainer>
        <VictoryPie
          data={data}
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
          data={data.map((item) => ({
            name: `${item.x}\t\t${formattedNumber(item.y)}원`,
          }))}
          colorScale={COLOR_SCALE}
          width={140}
          height={100}
        />
      </ChartContainer>
    </CardContainer>
  );
};

export default CertificationChart;
