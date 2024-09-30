import Styled from '@emotion/native';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

import ArrowImage from '@/assets/images/arrow.png';
import Text from '@/components/common/Text';

const DateSelector = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: Date): void => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <View>
      <DatePicker onPress={() => showPicker(true)}>
        <Text size="base">{`${date.getFullYear()}년 ${date.getMonth()}월`}</Text>
      </DatePicker>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
    </View>
  );
};

const DatePicker = Styled.TouchableOpacity(() => ({
  flexDirection: 'row',
  width: 100,
  gap: 10,
}));
export default DateSelector;
