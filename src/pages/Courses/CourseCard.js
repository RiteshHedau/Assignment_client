import React from "react";
import { FaUser, FaClock, FaStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={course.thumbnailUrl}
          alt={course.title}
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
          <span className="font-bold text-blue-600">${course.price}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            {course.level}
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {course.language}
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
            {course.category}
          </span>
        </div>

        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaUser className="text-blue-500" />
            <span>{course.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-blue-500" />
            <span>{course.duration}m</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span>4.5</span>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg 
                         transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Enroll Now
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
