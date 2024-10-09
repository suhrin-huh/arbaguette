import * as Notifications from 'expo-notifications';
import { dismissNotificationAsync } from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import { registerForPushNotificationsAsync } from '@/configs/notification';
import ReactQueryClient from '@/configs/queryClient';
import keys from '@/reactQuery/keys';

function redirect(notification: Notifications.Notification) {
  const { url } = notification.request.content.data;
  console.log(url);
  if (url) {
    router.push(url);
  }
}

const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
      console.log(notification.request.content.data.url);
      await ReactQueryClient.instance.invalidateQueries({ queryKey: keys.all });
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      await dismissNotificationAsync(response.notification.request.identifier);
      redirect(response.notification);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { expoPushToken, notification };
};

export default usePushNotification;
