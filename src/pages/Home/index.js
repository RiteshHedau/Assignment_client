import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./features";
import PopularCoursesSection from "./PopularCoursesSection";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";
import { useSelector } from "react-redux";


const Home = () => {
  const course=useSelector((state)=>state.courseReducer.allCourses)
  console.log("course",course)
  return (
    <div className="font-sans text-gray-800">
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection courses={course} />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
