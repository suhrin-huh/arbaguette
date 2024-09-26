import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable } from 'react-native';

interface ScheduleButtonProps {
  onPress: () => void;
}

const CalendarButton = ({ onPress }: ScheduleButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome5 name="calendar-alt" size={24} color="black" />
    </Pressable>
  );
};

export default CalendarButton;
