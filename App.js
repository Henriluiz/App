import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import * as Notifications from "expo-notifications";
  
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const navigationRef = useRef(null);           // ← useRef simples, sem hook do react-navigation
  const pendingNotification = useRef(null);

  useEffect(() => {
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response) return;
      pendingNotification.current = response.notification.request.content.data;
    });

    const notificationSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificação recebida:", notification);
      });

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data?.screen && navigationRef.current?.isReady()) {
          navigationRef.current.navigate(data.screen, data.params ?? {});
        }
      });

    return () => {
      notificationSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const data = pendingNotification.current;
        if (data?.screen) {
          navigationRef.current.navigate(data.screen, data.params ?? {});
        }
      }}
    >
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}