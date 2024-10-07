import Styled from '@emotion/native';
import ArrowIcon from '@expo/vector-icons/MaterialIcons';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import type { EventTypes } from 'react-native-month-year-picker';
import MonthPicker from 'react-native-month-year-picker';

import Text from '@/components/common/Text';

interface DateSelectorProps {
  date: Date;
  setDate: (newDate: Date) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: boolean) => setShow(value), []);
  const handleDateChange = useCallback(
    (_: EventTypes, newDate: Date) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, setDate, showPicker],
  );

  return (
    <View>
      <DatePicker onPress={() => showPicker(true)}>
        <Text size="base">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</Text>
        <ArrowIcon name="keyboard-arrow-down" size={12} color="black" />
      </DatePicker>
      {show && (
        <MonthPicker
          value={date}
          onChange={handleDateChange}
          minimumDate={new Date(1970, 1)}
          maximumDate={new Date()}
          locale="ko"
        />
      )}
    </View>
  );
};

const DatePicker = Styled.TouchableOpacity(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: 100,
  gap: 5,
}));

export default DateSelector;
