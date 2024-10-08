import { useQuery } from '@tanstack/react-query';
import { getPresentedNotificationsAsync } from 'expo-notifications';

import keys from '@/reactQuery/keys';

const usePresentedNotification = () => {
  const { data } = useQuery({
    queryKey: [keys.all, 'notification'],
    queryFn: getPresentedNotificationsAsync,
  });

  return data || [];
};

export default usePresentedNotification;
