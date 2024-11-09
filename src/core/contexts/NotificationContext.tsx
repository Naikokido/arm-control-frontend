import React, {
  createContext,
  useState,
  type ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Notification, {
  type INotificationProps,
} from "../../components/ui/feedback/Notification.tsx";

interface NotificationContextType {
  setNotification: (
    notification: Omit<INotificationProps, "onCLoseNotification"> | null
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<INotificationProps | null>(
    null
  );

  const handleOnCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        handleOnCloseNotification();
      }, 4000);
    }
  }, [handleOnCloseNotification, notification]);

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {notification && (
        <Notification
          {...notification}
          onCLoseNotification={handleOnCloseNotification}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
