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
