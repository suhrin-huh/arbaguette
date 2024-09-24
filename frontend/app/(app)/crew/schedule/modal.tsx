import Styled from '@emotion/native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import type { TimelineEventProps } from 'react-native-calendars';

import Button from '@/components/common/Button';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';

const Content = Styled.View(({ theme }) => ({
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
}));

const ScheduleModal = () => {
  const { event } = useLocalSearchParams<{ event: string }>();
  const { end, color, start, id, summary, title } = JSON.parse(event) as TimelineEventProps;

  return (
    <BottomSheetModal>
      <Content>
        <Text>{title}</Text>
        <Text>{summary}</Text>
        <Button>대타 요청</Button>
      </Content>
    </BottomSheetModal>
  );
};

export default ScheduleModal;
