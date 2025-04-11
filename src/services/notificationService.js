import socketService from "./socketService";

class NotificationService {
  constructor() {
    const userId = localStorage.getItem("userId");
    this.storageKey = `notifications_${userId}`;
    this.hasPendingKey = `hasPending_${userId}`;
    this.listeners = new Set();
    this.hasPendingNotifications = JSON.parse(
      localStorage.getItem(this.hasPendingKey) || "false"
    );
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.notifications = Array.isArray(parsedData.notifications)
          ? parsedData.notifications
          : [];
        this.offlineQueue = parsedData.offlineQueue || [];
      } else {
        this.notifications = [];
        this.offlineQueue = [];
      }
      this.hasPendingNotifications = this.notifications.some((n) => !n.read);
    } catch (error) {
      console.error("Error loading notifications:", error);
      this.notifications = [];
      this.offlineQueue = [];
    }
    this.isConnected = false;
    this.lastSyncTimestamp =
      localStorage.getItem("lastNotificationSync") || Date.now();
    this.offlineQueue = [];
    this.isInitialized = false;
    this.socket = null;
    this.isOffline = !navigator.onLine;
    this.initialize(); // Call initialize immediately in constructor
    this.setupOfflineDetection();
    // Ensure socket connection stays alive
    setInterval(() => this.keepSocketAlive(), 30000);
    this.initializeSocket();
    this.lastNotificationId = null;
    this.lastNotificationTimestamp = 0;
  }

  connect() {
    this.socket = socketService.getSocket();
    if (this.socket && !this.isInitialized) {
      this.initialize();
    }
    return this.socket;
  }

  keepSocketAlive() {
    if (!this.isConnected) {
      console.log("Keeping socket alive...");
      const socket = socketService.getSocket();
      if (socket) {
        socket.connect();
      }
    }
  }

  setupOfflineDetection() {
    window.addEventListener("online", () => {
      console.log("Browser is online, syncing notifications...");
      this.syncMissedNotifications();
      this.syncOfflineNotifications();
    });

    window.addEventListener("offline", () => {
      console.log("Browser is offline");
      this.isConnected = false;
      this.enableOfflineMode();
    });
  }

  enableOfflineMode() {
    this.isOffline = true;
    console.log("Entering offline mode");
  }

  addNotification(notification) {
    // Prevent duplicate notifications within 2 seconds
    const now = Date.now();
    if (now - this.lastNotificationTimestamp < 2000) {
      console.log("Notification debounced - too soon after last one");
      return;
    }

    this.lastNotificationTimestamp = now;

    // Prevent duplicate notifications
    if (this.lastNotificationId === notification.id) {
      console.log("Duplicate notification prevented:", notification.id);
      return;
    }

    this.lastNotificationId = notification.id;

    if (this.isOffline) {
      this.offlineQueue.push(notification);
      console.log("Added to offline queue:", notification);
    }

    this.notifications.unshift(notification);
    this.forcePersistNotifications();
    this.notifyListeners(this.notifications);
  }

  syncOfflineNotifications() {
    this.isOffline = false;
    console.log("Back online, syncing notifications");

    if (this.offlineQueue.length > 0) {
      this.offlineQueue.forEach((notification) => {
        this.socket?.emit("sync_notification", notification);
      });
      this.offlineQueue = [];
    }
  }

  initialize() {
    if (this.isInitialized) return;

    if (!this.socket) {
      this.socket = this.connect();
    }

    if (this.socket) {
      this.socket.on("connect", () => {
        console.log("Socket connected in notification service");
        this.isConnected = true;
        this.syncMissedNotifications();
        // Re-subscribe to notifications after reconnection
        this.socket.emit("subscribe_notifications", {
          userId: localStorage.getItem("userId"),
        });
        this.verifyAndInitStorage();
      });

      this.socket.on("disconnect", () => {
        console.log("Socket disconnected in notification service");
        this.isConnected = false;
      });

      this.socket.on("notification", (data) => {
        try {
          const notification = {
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false,
            userId: localStorage.getItem("userId"),
          };

          console.log("Storing notification:", notification);
          this.notifications.unshift(notification); // Add to beginning of array
          this.hasPendingNotifications = true;

          // Force immediate storage
          this.forcePersistNotifications();
          console.log("Current notifications:", this.getNotifications());

          this.notifyListeners();
        } catch (error) {
          console.error("Error processing notification:", error);
        }
      });

      // Add handler for missed notifications
      this.socket.on("missed_notifications", (notifications) => {
        console.log("Received missed notifications:", notifications);
        this.notifications.push(...notifications);
        this.hasPendingNotifications = true;
        this.notifyListeners();
      });

      // Handle errors
      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        this.reconnect();
      });

      // Ensure we're always subscribed
      const userId = localStorage.getItem("userId");
      if (userId) {
        this.socket.emit("subscribe_notifications", { userId });
      }

      this.isInitialized = true;
    }
  }

  initializeSocket() {
    const socket = socketService.getSocket();
    if (socket) {
      this.socket = socket;

      socket.on("newCourse", (data) => {
        // Prevent duplicate course notifications
        const existingNotification = this.notifications.find(
          (n) =>
            n.course?.id === data.course.id &&
            Date.now() - new Date(n.time).getTime() < 2000
        );

        if (existingNotification) {
          console.log("Duplicate course notification prevented");
          return;
        }

        const notification = {
          id: Date.now(),
          message: `New course added: ${data.course.title}`,
          course: data.course,
          time: new Date(),
          read: false,
          userId: localStorage.getItem("userId"),
          synced: !this.isOffline,
        };

        this.addNotification(notification);
      });

      socket.on("courseUpdated", (data) => {
        console.log("Course updated notification received:", data);
        const notification = {
          id: Date.now(),
          message: `Course updated: ${data.course.title}`,
          course: data.course,
          time: new Date(),
          read: false,
          userId: localStorage.getItem("userId"),
        };

        this.notifications.unshift(notification);
        this.forcePersistNotifications();
        this.notifyListeners(this.notifications);
      });
    }
  }

  async syncMissedNotifications() {
    const socket = socketService.getSocket();
    if (socket && socket.connected) {
      socket.emit("sync_notifications", {
        userId: localStorage.getItem("userId"),
        lastSync: this.lastSyncTimestamp,
      });
    }
  }

  reconnect() {
    const socket = socketService.getSocket();
    if (socket) {
      socket.connect();
    }
  }

  getUnreadCount() {
    return Array.isArray(this.notifications)
      ? this.notifications.filter((n) => !n.read).length
      : 0;
  }

  getNotifications() {
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (!storedData) return [];

      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData.notifications)
        ? parsedData.notifications
        : [];
    } catch (error) {
      console.error("Error reading notifications:", error);
      return [];
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    // Call immediately with current notifications
    const currentNotifications = this.getNotifications();
    callback(currentNotifications);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.notifications));
  }

  forcePersistNotifications() {
    try {
      const notificationsToStore = {
        notifications: this.notifications,
        offlineQueue: this.offlineQueue,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(notificationsToStore)
      );
      this.hasPendingNotifications = this.notifications.some((n) => !n.read);
      localStorage.setItem(
        this.hasPendingKey,
        JSON.stringify(this.hasPendingNotifications)
      );
    } catch (error) {
      console.error("Storage error:", error);
    }
  }

  verifyAndInitStorage() {
    console.log("Current storage state:", {
      notifications: localStorage.getItem(this.storageKey),
      hasPending: localStorage.getItem(this.hasPendingKey),
      userId: localStorage.getItem("userId"),
    });
  }

  persistNotifications() {
    try {
      const notificationsString = JSON.stringify(this.notifications);
      localStorage.setItem(this.storageKey, notificationsString);
      localStorage.setItem(this.hasPendingKey, "true");
      console.log("Notifications saved to localStorage:", notificationsString);
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  }

  clearNotifications() {
    this.hasPendingNotifications = false;
    this.notifications = [];
    this.persistNotifications();
    this.notifyListeners();
  }

  isSocketConnected() {
    return this.isConnected;
  }

  removeNotification(notificationId) {
    try {
      // Remove from notifications array
      this.notifications = this.notifications.filter(
        (n) => n.id !== notificationId
      );

      // Update storage and state
      this.forcePersistNotifications();
      this.notifyListeners();

      console.log("Notification removed:", notificationId);
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  }

  markAsRead(notificationId) {
    try {
      // Mark as read then remove
      this.notifications = this.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      );
      this.forcePersistNotifications();

      // Remove after a short delay to show the read state
      setTimeout(() => {
        this.removeNotification(notificationId);
      }, 500);
    } catch (error) {
      console.error("Error in markAsRead:", error);
    }
  }
}

export default new NotificationService();
