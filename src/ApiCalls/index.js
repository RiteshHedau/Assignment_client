
import axios from "axios";

export const url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

//export const url = 'http://localhost:4000'; // Update this to your backend URL

export const axiosInstance = axios.create({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      credentials: "include",
    },
  });