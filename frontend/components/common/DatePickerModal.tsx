import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

interface DatePickerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setDate: (date: DateString) => void; // 변경: DateString -> string
}

const DatePickerModal = ({ open, setOpen, setDate }: DatePickerModalProps) => {
  const [pickedDate, setPickedDate] = useState(new Date());

  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={pickedDate}
      onConfirm={(valueDate) => {
        setOpen(false);
        setPickedDate(valueDate);
        // 로컬 시간대로 변환
        const localDate = new Date(valueDate.getTime() - valueDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0];
        setDate(localDate);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};

export default DatePickerModal;
