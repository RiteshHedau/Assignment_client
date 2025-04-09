import { axiosInstance, url } from "./index";

export const getAllCourses = async (page, limit) => {
  try {
    const response = await axiosInstance.get(
      url + `/courses/get-all-courses?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCoursesBasedOnQuery = async (title) => {
  try {
    const response = await axiosInstance.get(
      url + `/courses/get-courses-based-on-query?title=${title}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCoursesTitle = async () => {
  try {
    const response = await axiosInstance.get(
      url + `/courses/get-all-courses-title`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCourse = async (course) => {
  try {
    const response = await axiosInstance.post(
      url + "/courses/create-course",
      course,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createAllCourses = async (courses) => {
  try {
    const response = await axiosInstance.post(
      url + "/courses/create-all-courses",
      courses
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axiosInstance.delete(
      url + `/courses/delete-course/${courseId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCourse = async (courseId, course) => {
  try {
    const response = await axiosInstance.put(
      url + `/courses/update-course/${courseId}`,
      course,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getCourseById = async (courseId) => {
  try {
    const response = await axiosInstance.get(
      url + `/courses/get-course/${courseId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCoursesThroughCsvFile = async (file) => {
  try {
    const response = await axiosInstance.post(
      url + "/courses/create-courses-from-csv",
      file,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV file:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
