import React from 'react';

const PopularCoursesSection = ({courses}) => {
  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Popular Courses</h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover rounded-t-lg mb-6"/>
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">{course.title}</h3>
            <p className="text-yellow-500 text-lg mb-3">⭐⭐⭐⭐☆</p>
            <p className="text-gray-700">{course.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCoursesSection;