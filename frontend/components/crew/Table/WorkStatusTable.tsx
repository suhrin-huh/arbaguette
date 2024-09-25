import Styled from '@emotion/native';

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

const TableContentText = Styled.Text({ fontSize: 20 });
const WorkStatusTable = () => {
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
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
      <TableContentContainer>
        <TableContentText>09.01 (월)</TableContentText>
        <TableContentText>8:58 - 12:00</TableContentText>
        <TableContentText>정상</TableContentText>
      </TableContentContainer>
    </Table>
  );
};

export default WorkStatusTable;
