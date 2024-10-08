import type * as Notifications from 'expo-notifications';
import { getPresentedNotificationsAsync } from 'expo-notifications';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

const usePresentedNotification = () => {
  const [notification, setNotification] = useState<Notifications.Notification[]>([]);

  const fetchPresentedNotifications = useCallback(async () => {
    const notifications = await getPresentedNotificationsAsync();
    setNotification(notifications);
  }, []);

  useFocusEffect(() => {
    (async () => fetchPresentedNotifications())();
  });

  return notification;
};

export default usePresentedNotification;
