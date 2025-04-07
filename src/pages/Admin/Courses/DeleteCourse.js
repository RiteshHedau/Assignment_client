import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaTrash,
  FaExclamationTriangle,
  FaBook,
  FaClock,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import { deleteCourse } from "../../../ApiCalls/courseApiCalls";
import { toast } from "react-hot-toast";

const DeleteCourse = () => {
  const courses = useSelector((state) => state.courseReducer.allCourses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setLoading(true);
      setDeletingId(courseId);
      try {
        const response = await deleteCourse(courseId);
        if (response.success) {
          toast.success("Course deleted successfully");
          // Update your Redux state here to remove the course
          dispatch({ type: "REMOVE_COURSE", payload: courseId });
        }
      } catch (error) {
        toast.error("Failed to delete course");
        console.error(error);
      }
      setLoading(false);
      setDeletingId(null);
    }
  };

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
                deletingId === course.id
                  ? "bg-gray-400"
                  : "bg-red-500 hover:bg-red-600"
              } text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                deletingId === course.id ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handleDelete(course.id)}
              disabled={deletingId === course.id}
            >
              <FaTrash
                className={deletingId === course.id ? "animate-spin" : ""}
              />
              {deletingId === course.id ? "Deleting..." : "Delete Course"}
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
    </div>
  );
};

export default DeleteCourse;
