import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import FooterSection from "./components/FooterSection";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import notificationService from "./services/notificationService";
import { useEffect, useState } from "react";
import { AppProvider } from "./context/AppProvider";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";

function App() {
  const { loading } = useSelector((state) => state.loaderReducer);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    // Initialize notification service with offline support
    notificationService.initialize();
    const socket = notificationService.connect();

    // Setup offline/online handlers
    window.addEventListener("online", () =>
      notificationService.syncOfflineNotifications()
    );
    window.addEventListener("offline", () =>
      notificationService.enableOfflineMode()
    );

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      window.removeEventListener("online", () =>
        notificationService.syncOfflineNotifications()
      );
      window.removeEventListener("offline", () =>
        notificationService.enableOfflineMode()
      );
      if (socket) {
        socket.disconnect();
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <AnimatePresence>
          {showSplash && isHomePage && <SplashScreen />}
        </AnimatePresence>
        {loading && <Loader />}
        <Toaster position="top-center" reverseOrder={false} />
        {!showSplash && <Navigation />}{" "}
        {/* Only show Navigation when splash is hidden */}
        <div className="min-h-screen bg-gray-100 p-4">
          <Outlet /> {/* <-- This is essential for nested routes to render */}
        </div>
        <FooterSection />
      </div>
    </AppProvider>
  );
}

export default App;
