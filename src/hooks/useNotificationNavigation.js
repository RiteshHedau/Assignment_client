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
      await new Promise(resolve => setTimeout(resolve, 300)); // Add delay for loader visibility
      
      const response = await getCourseById(courseId);
      
      if (response?.success) {
              dispatch(setAllCourses([response.data]));
              dispatch(setSearchTermValue(null));
               dispatch(setSearchTermCourses(null));
        
        // Ensure state updates are complete before navigation
        await new Promise(resolve => setTimeout(resolve, 200));
        navigate("/courses?fromNotification=true");
      } else {
        toast.error("Course not found");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Error loading course");
    } finally {
      setTimeout(() => {
        dispatch(hideLoader());
      }, 500); // Delay hiding loader
    }
  };

  return { handleCourseClick };
};
