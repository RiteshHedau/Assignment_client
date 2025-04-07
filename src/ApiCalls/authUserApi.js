import { axiosInstance, url } from "./index";

export const registerUser = async (user) => {
  try {
    const response = await axiosInstance.post(url + "/users/register", user);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user) =>{
    try {
        const response = await axiosInstance.post(url + "/users/login", user);
        return response.data;
      } catch (error) {
        return error;
      }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.get(url + "/users/logout");
        return response.data;
      } catch (error) {
        return error;
      }
}