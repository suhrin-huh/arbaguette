import type * as Notifications from 'expo-notifications';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import usePushNotification from '@/hooks/usePushNotification';

type NotificationContextProps = PropsWithChildren;

interface NotificationContextValue {
  notification: Notifications.Notification | undefined;
  expoPushToken: string;
}

const INITIAL_VALUE = {
  notification: undefined,
  expoPushToken: '',
};

const NotificationContext = createContext<NotificationContextValue>(INITIAL_VALUE);

const NotificationProvider = ({ children }: NotificationContextProps) => {
  const { notification, expoPushToken } = usePushNotification();

  return (
    <NotificationContext.Provider value={{ notification, expoPushToken }}>{children}</NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return { ...context };
};

export { NotificationProvider, useNotification };
