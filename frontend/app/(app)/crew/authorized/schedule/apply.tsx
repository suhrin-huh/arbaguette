import Styled from '@emotion/native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text } from 'react-native';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';
import format from '@/util/format';

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

const ScheduleModal = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dismiss } = useBottomSheetModal();
  const queryClient = useQueryClient();
  const { mutate: takeSubstitute } = useMutation({
    mutationFn: arbaguette.takeSubstitute,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.common(), refetchType: 'all' });
      setIsApplied(true);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      Alert.alert('대타 승인 실패', '대타 승인 실패');
    },
  });

  const { end, start, id } = useLocalSearchParams();
  const numericId = parseInt(id as string, 10);

  const handleResponseSubstitute = () => {
    setIsLoading(true);
    takeSubstitute(numericId);
  };

  const handleComplete = () => {
    setIsApplied(false);
    dismiss();
  };
  return (
    <BottomSheetModal>
      {!isApplied ? (
        isLoading ? (
          <Container>
            <Content>
              <Loading size={100} />
            </Content>
          </Container>
        ) : (
          <Container>
            <Content>
              <ContentText>{format.dateToKrString(new Date(start as string))}</ContentText>
              <ContentText>부터</ContentText>
              <ContentText>{format.dateToKrString(new Date(end as string))}</ContentText>
              <ContentText>까지 대타를 수락하시겠습니까?</ContentText>
            </Content>
            <Button onPress={handleResponseSubstitute}>대타 요청</Button>
          </Container>
        )
      ) : (
        <Container>
          <Content>
            <ContentText>대타 요청이 완료되었습니다.</ContentText>
          </Content>
          <Button onPress={handleComplete}>닫기</Button>
        </Container>
      )}
    </BottomSheetModal>
  );
};

export default ScheduleModal;
