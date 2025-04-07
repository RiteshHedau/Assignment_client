import React from 'react';

const MyCourses = ({ courses }) => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">My Learning</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">You haven’t enrolled in any courses yet. Explore courses to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map(course => (
            <div key={course?.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img src={course?.image} alt={course?.title} className="w-full h-32 object-cover rounded-lg mb-4"/>
              <h3 className="text-lg font-semibold mb-2">{course?.title}</h3>
              <p className="text-gray-600 mb-2">Instructor: {course?.instructor}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course?.progress}%` }}></div>
              </div>
              <div className="flex justify-between">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Resume</button>
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">View Details</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Unenroll</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;