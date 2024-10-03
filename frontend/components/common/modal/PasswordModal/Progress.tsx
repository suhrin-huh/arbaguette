import Styled from '@emotion/native';

interface ProgressProps {
  progress: number;
}

const ProgressContainer = Styled.View(({ theme }) => ({
  flexDirection: 'row',
  gap: 18,
}));

const Dot = Styled.View<{ step: number; current: number }>(({ theme, step, current }) => ({
  backgroundColor: step <= current ? theme.color.SECONDARY : theme.color.GRAY['1'],
  height: 10,
  width: 10,
  borderRadius: 5,
}));

const Progress = ({ progress }: ProgressProps) => {
  return (
    <ProgressContainer>
      <Dot step={1} current={progress} />
      <Dot step={2} current={progress} />
      <Dot step={3} current={progress} />
      <Dot step={4} current={progress} />
    </ProgressContainer>
  );
};

export default Progress;
