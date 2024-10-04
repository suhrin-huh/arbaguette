import Styled from '@emotion/native';
import ArrowIcon from '@expo/vector-icons/MaterialIcons';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

import Text from '@/components/common/Text';

interface DateSelectorProps {
  date: Date;
  setDate: (newDate: Date) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value: boolean): void => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      setDate(selectedDate);
      showPicker(false);
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
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(2000, 1)}
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
