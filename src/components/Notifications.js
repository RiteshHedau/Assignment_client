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
  const notificationSound = new Audio("./../../public/notification.wav");
  const { handleCourseClick } = useNotificationNavigation(); // Update the destructured function name
  const [lastNotificationId, setLastNotificationId] = useState(null);

  const notificationVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95 },
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
  };

  const handleNotificationClickWithProps = (notification) => {
    if (!notification.read) {
      try {
        notificationService.markAsRead(notification.id);
        const updatedNotifications = notifications.map(n => 
          n.id === notification.id ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    if (notification.course?.id) {
      handleCourseClick(notification.course.id);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.8 }}
        animate={{ rotate: isOpen ? [0, -10, 0] : 0 }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 10 },
          rotate: { duration: 0.5, ease: "easeInOut" },
        }}
        onClick={handleNotificationClick}
        className="relative p-2 sm:p-3 text-gray-600 hover:text-blue-500 transition-all duration-300 
        bg-white/30 backdrop-blur-sm rounded-full shadow-lg hover:shadow-blue-200"
      >
        <FaBell size={20} className="sm:w-6 sm:h-6" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: { type: "spring", stiffness: 500, damping: 15 },
              }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 
              text-white text-xs rounded-full w-5 h-5 flex items-center justify-center 
              shadow-lg ring-2 ring-white"
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed sm:absolute right-0 left-0 sm:left-auto top-20 sm:top-auto sm:right-0 mt-0 sm:mt-3 
            w-full sm:w-80 md:w-96 bg-white/90 backdrop-blur-md rounded-none sm:rounded-2xl 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 max-h-[calc(100vh-4rem)] sm:max-h-[80vh] overflow-y-auto 
            border-t sm:border border-gray-100/20"
          >
            <div className="p-3 sm:p-4">
              <h3
                className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center justify-between 
              border-b border-gray-200/50 pb-3"
              >
                <div className="flex items-center gap-2">
                  <FaBell className="text-blue-500" />
                  <span
                    className="bg-gradient-to-r from-blue-600 to-purple-600 
                  text-transparent bg-clip-text"
                  >
                    Notifications
                  </span>
                </div>
                {unreadCount > 0 && (
                  <span
                    className="text-sm bg-blue-100 text-blue-700 px-2 py-1 
                  rounded-full font-normal"
                  >
                    {unreadCount} new
                  </span>
                )}
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
                <motion.div layout className="space-y-2 sm:space-y-3">
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
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transform transition-all duration-300
                        ${
                          notification.read
                            ? "bg-gray-50/50 hover:bg-gray-100/80 active:bg-gray-200/80"
                            : "bg-gradient-to-r from-blue-50/90 to-indigo-50/90 shadow-md"
                        }
                        hover:shadow-xl hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm 
                        border border-gray-100/20`}
                    >
                      <p className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text mb-1 sm:mb-2">
                        {notification.course?.title}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <time className="flex items-center">
                          <span className="mr-1">🕒</span>
                          {new Date(notification.time).toLocaleString()}
                        </time>
                        {!notification.read && (
                          <span className="flex items-center">
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="ml-1 text-blue-500 font-medium">
                              New
                            </span>
                          </span>
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
