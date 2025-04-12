import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNotificationNavigation } from "../hooks/useNotificationNavigation";
import notificationService from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationSound = new Audio("/notification.mp3");
  const { handleCourseClick } = useNotificationNavigation(); // Update the destructured function name
  const [lastNotificationId, setLastNotificationId] = useState(null);

  const notificationVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notifications) => {
      const notificationArray = Array.isArray(notifications)
        ? notifications
        : [];
      setNotifications(notificationArray);
      const unreadCount = notificationService.getUnreadCount();
      setUnreadCount(unreadCount);

      const latestNotification = notificationArray[0];
      if (
        latestNotification &&
        latestNotification.id !== lastNotificationId &&
        unreadCount > 0
      ) {
        setLastNotificationId(latestNotification.id);
        notificationSound
          .play()
          .catch((e) => console.error("Error playing sound:", e));
      }
    });

    const initialNotifications = notificationService.getNotifications();
    setNotifications(initialNotifications);
    setUnreadCount(notificationService.getUnreadCount());

    return () => unsubscribe();
  }, [lastNotificationId]);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    if (isOpen && notifications.length > 0 && unreadCount > 0) {
      try {
        notificationService.markAllAsRead();
        setUnreadCount(0);
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  const handleNotificationClickWithProps = (notification) => {
    if (notification.course?.id) {
      handleCourseClick(notification.course.id); // Use the correct function name
    }
    notificationService.markAsRead(notification.id);
    setUnreadCount((prev) => Math.max(0, prev - 1));
    setIsOpen(false);
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
