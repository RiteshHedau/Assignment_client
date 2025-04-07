import React from 'react';

const RecommendedCourses = ({ recommendedCourses }) => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCourses?.map(course => (
          <div key={course.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{course?.title}</h3>
            <p className="text-gray-600 mb-2">{course?.description}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-2">Enroll Now</button>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>{course?.rating}</span>
              <span>{course?.tags?.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCourses;