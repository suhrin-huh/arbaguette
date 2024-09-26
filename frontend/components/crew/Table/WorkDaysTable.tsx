import Styled from '@emotion/native';

interface WorkDaysTableProps {
  normal: number;
  absent: number;
  late: number;
  earlyLeave: number;
}

const Table = Styled.View({ gap: 10, paddingVertical: 10 });

const TableTitle = Styled.Text({ fontSize: 24, fontWeight: 700 });

const TableTitleContainer = Styled.View(({ theme }) => ({
  borderBottomColor: theme.color.BLACK,
  borderBottomWidth: 1,
  paddingBottom: 10,
}));

const TableContentContainer = Styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const TableContentText = Styled.Text({ fontSize: 20 });

const WorkDaysTable = ({ late, normal, earlyLeave, absent }: WorkDaysTableProps) => {
  return (
    <Table>
      <TableTitleContainer>
        <TableTitle>근무일수</TableTitle>
      </TableTitleContainer>
      <TableContentContainer>
        <TableContentText>정상</TableContentText>
        <TableContentText>{normal}일</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>결근</TableContentText>
        <TableContentText>{absent}일</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>지각</TableContentText>
        <TableContentText>{late}일</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>조퇴</TableContentText>
        <TableContentText>{earlyLeave}일</TableContentText>
      </TableContentContainer>
    </Table>
  );
};

export default WorkDaysTable;
