import { useNavigate } from "react-router-dom";
import { getCourseById } from "../ApiCalls/courseApiCalls";
import { useDispatch } from "react-redux";
import {
  setAllCourses,
  setSearchTermCourses,
  setSearchTermValue,
} from "../Redux/courseSlice";
import { showLoader, hideLoader } from "../Redux/loaderSlice";
import { toast } from "react-hot-toast";

export const useNotificationNavigation = (
  setNotifications,
  closeNotifications
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCourseNotification = async (notification) => {
    try {
      dispatch(showLoader());
      const response = await getCourseById(notification.course.id);

      if (response?.success) {
        // Update notifications first
        setNotifications((prev) => {
          const updated = prev.filter((n) => n.id !== notification.id);
          localStorage.setItem("notifications", JSON.stringify(updated));
          return updated;
        });

        // Handle navigation and state updates
        await Promise.all([
          dispatch(setAllCourses([response.data])),
          dispatch(setSearchTermValue(null)),
          dispatch(setSearchTermCourses(null)),
        ]);

        // Close notifications panel
        closeNotifications();

      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Error loading course");
    } finally {
      dispatch(hideLoader());
    }
  };

  return { handleCourseNotification };
};
