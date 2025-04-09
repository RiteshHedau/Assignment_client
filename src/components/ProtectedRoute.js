import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../ApiCalls/userApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../Redux/loaderSlice";
import { setAllUsers, setUser } from "../Redux/userSlice";
import { setAllCourses, setAllCoursesTitle } from "./../Redux/courseSlice";
import {
  getAllCourses,
  getAllCoursesTitle,
} from "./../ApiCalls/courseApiCalls";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getloggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
        window.location.href = "/login";
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllUsersFromDb = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllUsers();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setAllUsers(response.data));
      } else {
        toast.error(response.message);
        window.location.href = "/login";
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllCoursesFromDb = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllCourses();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setAllCourses(response.data.courses));
      } else {
        toast.error(response.message);
        window.location.href = "/login";
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllCoursesTitleFromDb = async () => {
    let response = null;
    try {
      response = await getAllCoursesTitle();
      if (response.success) {
        dispatch(setAllCoursesTitle(response.data));
        console.log("All courses title", response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching course titles:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getloggedInUser();
      getAllUsersFromDb();
      getAllCoursesFromDb();
      getAllCoursesTitleFromDb();
      console.log("In ProtectedRoute");
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
