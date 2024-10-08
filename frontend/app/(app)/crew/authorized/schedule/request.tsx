import Styled from '@emotion/native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import Button from '@/components/common/Button';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';
import format from '@/util/format';

const ScheduleModal = () => {
  const [errorText, setErrorText] = useState('');
  const { dismiss } = useBottomSheetModal();
  const queryClient = useQueryClient();
  const { mutate: requestSubstitute } = useMutation({
    mutationFn: arbaguette.requestSubstitute,
    onSuccess: async () => {
      console.log('성공');
      await queryClient.invalidateQueries({ queryKey: keys.common(), refetchType: 'all' });
      dismiss();
    },
    onError: (error) => {
      setErrorText(error.response.data.message);
    },
  });

  const { end, start, id } = useLocalSearchParams();
  const numericId = parseInt(id as string, 10);
  const handleRequestSubstitute = () => {
    requestSubstitute(numericId);
  };

  return (
    <BottomSheetModal>
      {errorText ? (
        <Container>
          <Content>
            <ContentText>{errorText}</ContentText>
            <ContentText>다른 일정을 선택해주세요.</ContentText>
            <Button onPress={() => dismiss()}>닫기</Button>
          </Content>
        </Container>
      ) : (
        <Container>
          <Content>
            <ContentText>{format.dateToKrString(new Date(start as string))}</ContentText>
            <ContentText>부터</ContentText>
            <ContentText>{format.dateToKrString(new Date(end as string))}</ContentText>
            <ContentText>까지 대타를 신청하시겠습니까?</ContentText>
          </Content>
          <Button onPress={handleRequestSubstitute}>대타 요청</Button>
        </Container>
      )}
    </BottomSheetModal>
  );
};

const Container = Styled.View(({ theme }) => ({
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingBottom: theme.layout.PADDING.VERTICAL,
  flex: 1,
}));

const Content = Styled.View(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  gap: 10,
}));

const ContentText = Styled(Text)(({ theme }) => ({
  color: theme.color.PRIMARY,
  fontSize: 20,
  fontWeight: 600,
}));

export default ScheduleModal;
