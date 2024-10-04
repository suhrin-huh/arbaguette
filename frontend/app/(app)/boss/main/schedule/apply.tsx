import Styled from '@emotion/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import type { TimelineEventProps } from 'react-native-calendars';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
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

const ContentText = Styled.Text(({ theme }) => ({
  color: theme.color.PRIMARY,
  fontSize: 20,
  fontWeight: 600,
}));

const BossScheduleApplyScreen = () => {
  const { event } = useLocalSearchParams<{ event: string }>();
  const { end, start, id } = JSON.parse(event) as TimelineEventProps;
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: agreeSubstitute } = useMutation({
    mutationFn: arbaguette.agreeSubstitute,
    onSuccess: async () => {
      setIsApplied(true);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      Alert.alert('대타 승인 실패', '대타 승인 실패');
    },
  });
  const applyHandler = () => {
    setIsLoading(true);
    agreeSubstitute(Number(id));
  };

  const completeHandler = () => {
    setIsApplied(false);
    router.navigate('/boss/main/schedule');
  };

  return (
    <BottomSheetModal>
      {!isApplied ? (
        <Container>
          {isLoading ? (
            <Content>
              <Loading size={100} />
            </Content>
          ) : (
            <>
              <Content>
                <ContentText>{format.dateToKrString(new Date(start))}</ContentText>
                <ContentText>부터</ContentText>
                <ContentText>{format.dateToKrString(new Date(end))}</ContentText>
                <ContentText>까지 대타를 승인하시겠습니까?</ContentText>
              </Content>
              <Button onPress={applyHandler}>대타 승인</Button>
            </>
          )}
        </Container>
      ) : (
        <Container>
          <Content>
            <ContentText>대타 승인이 완료되었습니다.</ContentText>
          </Content>
          <Button onPress={completeHandler}>닫기</Button>
        </Container>
      )}
    </BottomSheetModal>
  );
};

export default BossScheduleApplyScreen;
