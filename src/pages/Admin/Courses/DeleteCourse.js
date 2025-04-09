import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrash,
  FaExclamationTriangle,
  FaBook,
  FaClock,
  FaDollarSign,
  FaUser,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { deleteCourse } from "./../../../ApiCalls/courseApiCalls";
import { toast } from "react-hot-toast";
import { hideLoader, showLoader } from "../../../Redux/loaderSlice";
import { removeSearchTermCourses } from "../../../Redux/courseSlice";

const DeleteCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courseReducer.getAllCoursesForEditAndDelete);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
 

  const handleDelete = async (courseId) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      dispatch(showLoader());
      setDeletingId(courseId);
      try {
        const response = await deleteCourse(courseId);
        if (response.success) {
          toast.success("Course deleted successfully");
          //fetchCourses(currentPage); // Refresh courses after deletion
        } else {
          throw new Error(response.message || "Failed to delete course");
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete course");
      } finally {
        dispatch(hideLoader());
        setDeletingId(null);
      }
    }
  };

  // const changePage = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //     fetchCourses(newPage); // Fetch courses for the new page
  //   }
  // };

  useEffect(() => {
    //fetchCourses(currentPage);
  }, [courses]);

  return (
    <div className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <FaExclamationTriangle className="text-4xl text-red-500 animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-800">Delete Courses</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="bg-white border rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative group">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
            </div>

            <h3 className="font-bold text-xl mb-2 text-gray-800">
              {course.title}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FaBook className="text-blue-500" />
                <span className="text-sm">Category: {course.category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaClock className="text-green-500" />
                <span className="text-sm">Duration: {course.duration}h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaDollarSign className="text-yellow-500" />
                <span className="text-sm">Price: ${course.price}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUser className="text-purple-500" />
                <span className="text-sm">Author: {course.author}</span>
              </div>
            </div>

            <button
              className={`w-full ${
                loading && deletingId === course.id
                  ? "bg-gray-400"
                  : "bg-red-500 hover:bg-red-600"
              } text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                loading && deletingId === course.id ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handleDelete(course.id)}
              disabled={loading && deletingId === course.id}
            >
              {loading && deletingId === course.id ? (
                <>
                  <FaTrash className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <FaTrash />
                  <span>Delete Course</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {courses?.length === 0 && (
        <div className="text-center py-10">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl">No courses available</p>
        </div>
      )}

      {/* Pagination Controls */}
      {/* <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 border rounded transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105"
          }`}
        >
          <FaArrowLeft className="text-lg" />
          <span>Previous</span>
        </button>
        <span className="flex items-center px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 border rounded transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105"
          }`}
        >
          <span>Next</span>
          <FaArrowRight className="text-lg" />
        </button>
      </div> */}
    </div>
  );
};

export default DeleteCourse;
