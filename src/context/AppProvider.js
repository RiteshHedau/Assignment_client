import React, { createContext, useEffect } from "react";
import notificationService from "../services/notificationService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  useEffect(() => {
    const initializeNotifications = () => {
      notificationService.connect();
    };

    // Initialize on mount
    initializeNotifications();

    // Listen for user login
    window.addEventListener("userLoggedIn", initializeNotifications);

    return () => {
      window.removeEventListener("userLoggedIn", initializeNotifications);
    };
  }, []);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
