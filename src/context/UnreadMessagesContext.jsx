import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const UnreadMessagesContext = createContext(null);

export function UnreadMessagesProvider({ children }) {
  const { token, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    if (!token || !user || user.role !== "admin") {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await api.get("/contact");
      const unreadMessages = response.data.filter(
        (message) => !message.isRead
      );
      setUnreadCount(unreadMessages.length);
    } catch (error) {
      console.error("Erreur récupération messages non lus :", error);
    }
  }, [token, user]);

  useEffect(() => {
    refreshUnreadCount();
  }, [refreshUnreadCount]);

  return (
    <UnreadMessagesContext.Provider
      value={{ unreadCount, refreshUnreadCount }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  );
}

export function useUnreadMessages() {
  const context = useContext(UnreadMessagesContext);

  if (!context) {
    throw new Error(
      "useUnreadMessages doit être utilisé dans UnreadMessagesProvider"
    );
  }

  return context;
}
