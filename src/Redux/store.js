import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice";

const store = configureStore({
  reducer: {
    userReducer,
    courseReducer,
    loaderReducer: loaderReducer,
  },
});

export default store;
