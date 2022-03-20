import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { ChatProvider } from "./contexts/chat/ChatContext";
import { SocketProvider } from "./contexts/SocketContext";
import { AppRouter } from "./routers/AppRouter";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
