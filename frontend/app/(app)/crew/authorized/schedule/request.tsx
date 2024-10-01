import Styled from '@emotion/native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import type { TimelineEventProps } from 'react-native-calendars';

import Button from '@/components/common/Button';
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
  const { dismiss } = useBottomSheetModal();
  const queryClient = useQueryClient();
  const { mutate: requestSubstitute } = useMutation({
    mutationFn: arbaguette.requestSubstitute,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.common(), refetchType: 'all' });
      dismiss();
    },
  });

  const { event } = useLocalSearchParams<{ event: string }>();
  const { end, start, id } = JSON.parse(event) as TimelineEventProps;

  const handleRequestSubstitute = () => {
    requestSubstitute(Number(id));
  };

  return (
    <BottomSheetModal>
      <Container>
        <Content>
          <ContentText>{format.dateToKrString(new Date(start))}</ContentText>
          <ContentText>부터</ContentText>
          <ContentText>{format.dateToKrString(new Date(end))}</ContentText>
          <ContentText>까지 대타를 신청하시겠습니까?</ContentText>
        </Content>
        <Button onPress={handleRequestSubstitute}>대타 요청</Button>
      </Container>
    </BottomSheetModal>
  );
};

export default ScheduleModal;
