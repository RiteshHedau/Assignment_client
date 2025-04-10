import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./features";
import PopularCoursesSection from "./PopularCoursesSection";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";
import { getAllCourses } from "../../ApiCalls/courseApiCalls";






const Home = () => {
  const [courses, setCourses] = React.useState([]);
  //console.log("course",courses)

  const getAllCoursesFromDb = async () => {
    let response = null;
    try {
      response = await getAllCourses(1, 6);
      if (response.success) {
        setCourses(response.data.courses);
        //console.log("response", response.data.courses);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getLoggedUser=async()=>{
    let response = null;
    try {
      response = await getLoggedUser();
      if (response.success) {
        //console.log("response", response.data.user);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  

  useEffect(()=>{
   if( localStorage.getItem("token")){
     getAllCoursesFromDb();
     getLoggedUser();
   }
  },[])
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection courses={courses} />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
