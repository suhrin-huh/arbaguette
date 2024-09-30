import Styled from '@emotion/native';

import Day from '@/constants/Day';

interface WorkStatusTableProps {
  commuteData: GetWorkHistoryResponseData['commutes'];
  targetDate: GetWorkHistoryResponseData['targetDate'];
}

const Table = Styled.View({ gap: 20, paddingVertical: 10 });

const TableTitle = Styled.Text({ fontSize: 24, fontWeight: 600 });

const TableTitleContainer = Styled.View(({ theme }) => ({
  borderBottomColor: theme.color.BLACK,
  borderBottomWidth: 1,
  paddingBottom: 10,
}));

const TableContentTitleContainer = Styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 20,
});
const TableContentTitleText = Styled.Text({ fontSize: 20, fontWeight: 600 });

const TableContentContainer = Styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const TableContentText = Styled.Text<{ alert?: boolean }>(({ theme, alert }) => ({
  fontSize: 20,
  color: alert ? theme.color.DANGER : theme.color.BLACK,
}));

const STATUS: { [K in CommuteStatus]: string } = {
  NORMAL: '정상',
  LATE: '지각',
  ABSENT: '결근',
} as const;

const WorkStatusTable = ({ commuteData, targetDate }: WorkStatusTableProps) => {
  return (
    <Table>
      <TableTitleContainer>
        <TableTitle>근무현황</TableTitle>
      </TableTitleContainer>
      <TableContentTitleContainer>
        <TableContentTitleText>날짜</TableContentTitleText>
        <TableContentTitleText>시간</TableContentTitleText>
        <TableContentTitleText>상태</TableContentTitleText>
      </TableContentTitleContainer>
      {!!commuteData.length &&
        commuteData.map((commute) => (
          <TableContentContainer key={commute.inTime + commute.outTime + commute.date}>
            <TableContentText alert={commute.commuteStatus === 'LATE' || commute.commuteStatus === 'ABSENT'}>
              {commute.date.replace('-', '.')} ({Day[new Date(targetDate + '-' + commute.date.split('-')[1]).getDay()]})
            </TableContentText>
            <TableContentText alert={commute.commuteStatus === 'LATE' || commute.commuteStatus === 'ABSENT'}>
              {commute.inTime} - {commute.outTime}
            </TableContentText>
            <TableContentText alert={commute.commuteStatus === 'LATE' || commute.commuteStatus === 'ABSENT'}>
              {STATUS[commute.commuteStatus]}
            </TableContentText>
          </TableContentContainer>
        ))}
    </Table>
  );
};

export default WorkStatusTable;
