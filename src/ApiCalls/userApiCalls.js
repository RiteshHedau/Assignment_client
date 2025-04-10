import { axiosInstance, url } from "./index";

export const getLoggedUser = async () => {
  try {
    const response = await axiosInstance.get(url + "/users/get-logged-user");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(url + "/users/get-all-users");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserData = async (user) => {
  try {
    const response = await axiosInstance.post(
      url + "/users/update-user",
      user,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCourses = async (page, limit) => {
  try {
    const response = await axiosInstance.get(
      `${url}/courses/get-all-courses?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(
      `${url}/users/delete-user/${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

