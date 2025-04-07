import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCourses = ({ courses }) => {
  if (!courses?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaGraduationCap className="text-blue-600" />
          My Learning
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No courses enrolled yet.</p>
          <Link
            to="/courses"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">My Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses?.map((course) => (
          <div key={course?.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <img
              src={course?.image}
              alt={course?.title}
              className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
              {course?.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Instructor: {course?.instructor}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${course?.progress}%` }}
              ></div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex-1 min-w-[80px] bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">
                Resume
              </button>
              <button className="flex-1 min-w-[80px] bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                Details
              </button>
              <button className="flex-1 min-w-[80px] bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm">
                Unenroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
