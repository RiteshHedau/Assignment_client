import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">
          {course.description}
        </p>
        <div className="mt-4">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{course.level}</span>
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">{course.language}</span>
          <span className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2 mb-2">{course.category}</span>
        </div>
        <p className="text-gray-900 font-bold text-lg mt-4">${course.price}</p>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enroll Now</button>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-600">Author: {course.author}</p>
        <p className="text-gray-600">Duration: {course.duration} minutes</p>
      </div>
    </div>
  );
}

export default CourseCard;