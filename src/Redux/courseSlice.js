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
    searchTermValue: null,
    searchTermCourses:[],
    getAllCoursesForEditAndDelete:[],
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
    setSearchTermValue: (state, action) => {
      state.searchTermValue = action.payload;
    }, 
    
    setSearchTermCourses: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.searchTermCourses = [...action.payload];
      } else {
        console.error('Payload is not an array:', action.payload);
      }
    },
    setGetAllCoursesForEditAndDelete: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.getAllCoursesForEditAndDelete = [...action.payload];
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

export const { setCourses, setAllCourses,setAllCoursesTitle,setSearchTermCourses,setSearchTermValue,setGetAllCoursesForEditAndDelete } = coursesSlice.actions;
export default coursesSlice.reducer;
