import { router, useLocalSearchParams } from 'expo-router';
import type { EventTypes } from 'react-native-month-year-picker';
import MonthPicker from 'react-native-month-year-picker';

const Calendar = () => {
  const { year, month } = useLocalSearchParams<Partial<{ year: string; month: string }>>();
  const now = new Date();
  const currentYear = Number(year) || now.getFullYear();
  const currentMonth = Number(month) || now.getMonth();

  const handleDateChange = (_: EventTypes, newDate: Date) => {
    const selectedYear = newDate ? newDate.getFullYear() : currentYear;
    const selectedMonth = newDate ? newDate.getMonth() : currentMonth;
    router.navigate({ pathname: '/crew/management/', params: { year: selectedYear, month: selectedMonth } });
  };

  return (
    <MonthPicker
      value={new Date(currentYear, currentMonth)}
      onChange={handleDateChange}
      minimumDate={new Date(1970, 1)}
      maximumDate={new Date()}
    />
  );
};

export default Calendar;
