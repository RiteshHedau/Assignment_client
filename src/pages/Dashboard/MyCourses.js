import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCourses = ({ courses }) => {
  if (!courses?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
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
    <div className="w-full p-2 sm:p-4 lg:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-0">
        My Learning
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
        {courses?.map((course) => (
          <div key={course?.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 mx-2 sm:mx-0">
            <div className="flex flex-row sm:block gap-3">
              <img
                src={course?.image}
                alt={course?.title}
                className="w-24 sm:w-full h-20 sm:h-32 md:h-36 lg:h-40 object-cover rounded-lg"
              />
              <div className="flex-1 sm:mt-3">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold line-clamp-2 sm:line-clamp-1">
                  {course?.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 mb-2">
                  Instructor: {course?.instructor}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 my-3">
              <div
                className="bg-blue-600 rounded-full h-1.5 sm:h-2 transition-all duration-300"
                style={{ width: `${course?.progress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row">
              <button className="bg-blue-600 text-white px-2 sm:px-3 py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors sm:flex-1">
                Resume
              </button>
              <button className="bg-gray-200 text-gray-700 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm hover:bg-gray-300 transition-colors sm:flex-1">
                Details
              </button>
              <button className="bg-red-600 text-white px-2 sm:px-3 py-2 rounded text-xs sm:text-sm hover:bg-red-700 transition-colors sm:flex-1">
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
