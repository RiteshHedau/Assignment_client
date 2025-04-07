import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getAllCourses } from './../../ApiCalls/courseApiCalls';
import { setAllCourses } from './../../Redux/courseSlice';
import { useDispatch, useSelector } from 'react-redux';

const Courses = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { allCourses } = useSelector((state) => state.courseReducer);
  const dispatch = useDispatch();
console.log("showing courses",allCourses)
  const fetchCourses = async (page) => {
    setLoading(true);
    try {
      const response = await getAllCourses(page, 6);
      if (response?.success) {
        dispatch(setAllCourses(response?.data.courses));
        console.log("response", response?.data.courses);
        setTotalPages(response?.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container w-full mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8">Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:ml-14 place-content-evenly grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
          {allCourses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4 sm:mt-6 lg:mt-8">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">Page {page} of {totalPages}</span>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;