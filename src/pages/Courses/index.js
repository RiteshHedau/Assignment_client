import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { getAllCourses } from "./../../ApiCalls/courseApiCalls";
import {
  setAllCourses,
  setSearchTermCourses,
  setSearchTermValue,
} from "./../../Redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../Redux/loaderSlice";

const Courses = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const { allCourses } = useSelector((state) => state.courseReducer);
  const title = useSelector((state) => state.courseReducer.allCoursesTitle);
  const searchTerm = useSelector(
    (state) => state.courseReducer.searchTermValue
  );
  const searchTermCourses = useSelector(
    (state) => state.courseReducer.searchTermCourses
  );

  const dispatch = useDispatch();
  console.log("showing courses", allCourses);
  console.log("showing title", title);

  const fetchCourses = async (page) => {
    //setLoading(true);
    dispatch(showLoader());
    try {
      const response = await getAllCourses(page, 6);
      if (response?.success) {
        dispatch(setAllCourses(response?.data.courses));
        //console.log("response", response?.data.courses);
        setTotalPages(response?.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    //setLoading(false);
    dispatch(hideLoader());
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handleNextPage = () => {
    dispatch(showLoader())
    dispatch(setSearchTermCourses(null));
    dispatch(setSearchTermValue(null));
    if (page < totalPages) {
      setPage(page + 1);
    }
    dispatch(hideLoader())
  };

  const handlePrevPage = () => {
    dispatch(showLoader())
    dispatch(setSearchTermCourses(null));
    dispatch(setSearchTermValue(null));
    if (page > 1) {
      setPage(page - 1);
    }
    dispatch(hideLoader())
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container w-full mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our Courses
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {searchTerm !== null
            ? searchTermCourses?.map((course) => (
                <div className="transform transition duration-300 hover:scale-105">
                  <CourseCard key={course.id} course={course} />
                </div>
              ))
            : allCourses?.map((course) => (
                <div className="transform transition duration-300 hover:scale-105">
                  <CourseCard key={course.id} course={course} />
                </div>
              ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-medium transition-all duration-300 
                       hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <div className="flex items-center px-4 bg-white rounded-full shadow">
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
          </div>
          <button
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-medium transition-all duration-300 
                       hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
