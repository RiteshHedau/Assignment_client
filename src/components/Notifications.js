import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import socketService from "../services/socketService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useNotificationNavigation } from "../hooks/useNotificationNavigation";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const notificationSound = new Audio("/notification.mp3"); // Add a notification sound file to public folder
  const { handleCourseNotification } = useNotificationNavigation(
    setNotifications,
    () => setIsOpen(false)
  );

  const notificationVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    const socket = socketService.getSocket();

    const handleConnectionStatus = (status) => {
      setConnected(status === "connected");
      console.log("Socket status:", status);
    };

    socketService.addListener(handleConnectionStatus);

    socketService.onNewCourse((data) => {
      console.log("New course notification:", data);
      const newNotification = {
        id: Date.now(),
        message: data.message,
        course: {
          id: data.course.id,
          title: data.course.title,
        },
        time: new Date(),
        read: false,
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
      setUnreadCount((prev) => prev + 1);

      // Play sound and show toast
      notificationSound
        .play()
        .catch((e) => console.error("Error playing sound:", e));
      toast.success("New course added!", {
        duration: 3000,
        position: "top-right",
      });
    });

    return () => {
      socketService.removeListener(handleConnectionStatus);
      socket.off("newCourse");
    };
  }, [navigate]);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setUnreadCount(0);
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      localStorage.setItem(
        "notifications",
        JSON.stringify(notifications.map((n) => ({ ...n, read: true })))
      );
    }
  };

  const handleNotificationNavigation = async (notification) => {
    if (notification.course?.id) {
      await handleCourseNotification(notification.course.id);
      setIsOpen(false);

      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notification.id ? { ...n, read: true } : n
        )
      );
    }
  };

  const handleNotificationClickWithProps = (notification) => {
    handleCourseNotification(notification);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNotificationClick}
        className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors"
      >
        <FaBell size={20} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaBell className="mr-2 text-blue-500" />
                Notifications
              </h3>
              {notifications.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center py-8"
                >
                  No notifications yet
                </motion.p>
              ) : (
                <motion.div layout>
                  {notifications.map((notification, index) => (
                    <motion.div
                      layout
                      key={notification.id}
                      variants={notificationVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                      onClick={() =>
                        handleNotificationClickWithProps(notification)
                      }
                      className={`p-4 mb-3 rounded-lg cursor-pointer transform transition-all duration-200
                        ${
                          notification.read
                            ? "bg-gray-50"
                            : "bg-blue-50 shadow-md"
                        }
                        hover:bg-blue-100 hover:shadow-lg hover:-translate-y-0.5`}
                    >
                      <p className="text-sm font-medium mb-1">
                        {notification.message}
                      </p>
                      <p className="text-sm font-semibold text-blue-600 mb-1">
                        {notification.course?.title}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <time>
                          {new Date(notification.time).toLocaleString()}
                        </time>
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
