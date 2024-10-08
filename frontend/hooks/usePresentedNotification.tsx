import { useQuery } from '@tanstack/react-query';
import { getPresentedNotificationsAsync } from 'expo-notifications';

import keys from '@/reactQuery/keys';

const MINUTE = 1000;

const usePresentedNotification = () => {
  const { data } = useQuery({
    queryKey: [keys.all, 'notification'],
    queryFn: getPresentedNotificationsAsync,
    refetchInterval: MINUTE * 3,
  });

  return data || [];
};

export default usePresentedNotification;
