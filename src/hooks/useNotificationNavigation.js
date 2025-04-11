import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCourseById } from "../ApiCalls/courseApiCalls";
import {
  setAllCourses,
  setSearchTermCourses,
  setSearchTermValue,
} from "../Redux/courseSlice";
import { hideLoader, showLoader } from "../Redux/loaderSlice";
import { toast } from "react-hot-toast";

export const useNotificationNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCourseClick = async (courseId) => {
    try {
      dispatch(showLoader());
      const response = await getCourseById(courseId);
      if (response?.success) {
        dispatch(setAllCourses([response.data]));
        dispatch(setSearchTermValue(null));
        dispatch(setSearchTermCourses(null));
        navigate("/courses?fromNotification=true");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Error loading course");
    } finally {
      dispatch(hideLoader());
    }
  };

  return { handleCourseClick };
};
