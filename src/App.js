import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import FooterSection from "./components/FooterSection";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import notificationService from "./services/notificationService";
import { useEffect } from "react";
import { AppProvider } from "./context/AppProvider";
import socketService from "./services/socketService";

function App() {
  const { loading } = useSelector((state) => state.loaderReducer);

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
    };
  }, []);

  return (
    <AppProvider>
      <div className="App">
        {loading && <Loader />}
        <Toaster position="top-center" reverseOrder={false} />
        <Navigation />
        <div className="min-h-screen bg-gray-100 p-4">
          {/* You can include navbar here */}
          <Outlet /> {/* <-- This is essential for nested routes to render */}
        </div>
        <FooterSection />
      </div>
    </AppProvider>
  );
}

export default App;
