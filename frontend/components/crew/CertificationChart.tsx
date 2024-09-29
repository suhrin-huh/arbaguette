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

const data = [
  { x: '기본급', y: 13000 },
  { x: '수당', y: 16500 },
  { x: '세금', y: 4250 },
];

const COLOR_SCALE = [Theme.color.PRIMARY, Theme.color.SECONDARY, Theme.color.GRAY['1']];

const CertificationChart = () => {
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
            name: `${item.x}\t\t${item.y}원`,
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
