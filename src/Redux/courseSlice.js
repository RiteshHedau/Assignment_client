import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "course",
  initialState: {
    course: {
      id: null,
      title: null,
      description: null,
      level: null,
      language: null,
      duration: null,
      price: null,
      author: null,
      category: null,
      type: null,
      thumbnailUrl: null,
      isPublished: true,
      rating: null,
    },
    allCourses: [],
    allCoursesTitle: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.user = action.payload;
    },
    setAllCourses: (state, action) => {
        if (Array.isArray(action.payload)) {
            state.allCourses = [...action.payload];
          } else {
            console.error('Payload is not an array:', action.payload);
          }
        },
        
    setAllCoursesTitle: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.allCoursesTitle = [...action.payload];
      } else {
        console.error('Payload is not an array:', action.payload);
      }
    },
  },
});

export const { setCourses, setAllCourses,setAllCoursesTitle } = coursesSlice.actions;
export default coursesSlice.reducer;
