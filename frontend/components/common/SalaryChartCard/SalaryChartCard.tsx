import Styled from '@emotion/native';
import { VictoryLegend, VictoryPie, VictoryTheme } from 'victory-native';

import CardContainer from '@/components/common/CardContainer';
import Theme from '@/styles/Theme';

const Text = Styled.Text(({ theme }) => ({ color: theme.color.BLACK, fontSize: 16, fontWeight: 500 }));

const ChartContainer = Styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
}));

const COLOR_SCALE = [Theme.color.PRIMARY, Theme.color.SECONDARY, Theme.color.GRAY['1']];

type SalaryChartCardTitle = '저번달 받은 임금' | '이번달 예상 지출' | '급여명세서';

interface SalaryChartCardProps {
  title?: SalaryChartCardTitle;
  originSalary: OriginSalary;
  tax: Tax;
  allowance: Allowance;
}

const SalaryChartCard = ({ title, originSalary, tax, allowance }: SalaryChartCardProps) => {
  const data = [
    { x: '기본급', y: originSalary },
    { x: '수당', y: tax },
    { x: '세금', y: allowance },
  ];

  return (
    <CardContainer style={{ alignItems: 'center', gap: 30 }}>
      {!!title && <Text>{title}</Text>}
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
          data={[{ name: '기본급\t\t100000원' }, { name: '수당\t\t100원' }, { name: '세금\t\t10000원' }]}
          colorScale={COLOR_SCALE}
          width={140}
          height={100}
        />
      </ChartContainer>
    </CardContainer>
  );
};

export default SalaryChartCard;
