import React, { useState, useEffect } from "react";
import WelcomeHeader from "./WelcomeHeader";
import MyCourses from "./MyCourses";
import RecommendedCourses from "./RecommendedCourses";
import RecentActivity from "./RecentActivity";
import Certificates from "./Certificates";
import { useSelector } from "react-redux";
import {
  FaGraduationCap,
  FaBook,
  FaCertificate,
  FaClock,
} from "react-icons/fa";

const myCourses = [
  {
    image: "path-to-js-image.jpg",
    title: "JavaScript Fundamentals",
    instructor: "Sarah Johnson",
    progress: 60,
  },
  {
    image: "path-to-python-image.jpg",
    title: "Python for Beginners",
    instructor: "Amit Patel",
    progress: 45,
  },
  {
    image: "path-to-react-image.jpg",
    title: "React Development",
    instructor: "Priya Menon",
    progress: 0,
  },
];

const recommendedCourses = [
  {
    image: "path-to-webdesign-image.jpg",
    title: "Web Design Basics",
    action: "Enroll",
  },
  {
    image: "path-to-datascience-image.jpg",
    title: "Data Science with R",
    action: "Enroll",
  },
  {
    image: "path-to-java-image.jpg",
    title: "Advanced Java Programming",
    action: "Enroll",
  },
];

const dummyRecentActivity = [
  "Completed lesson 3 of React Basics on 2025-04-05",
  "Visited Advanced JavaScript course on 2025-04-04",
  "Earned certificate for CSS Flexbox and Grid on 2025-04-02",
  "You spent 3 hours learning this week",
  "Started new course: Python Programming on 2025-04-01",
  "Reviewed lesson 2 of Node.js for Beginners on 2025-03-30",
];

const dummyCertificates = [
  {
    id: 1,
    courseTitle: "React Basics",
    date: "2025-03-20",
  },
  {
    id: 2,
    courseTitle: "Advanced JavaScript",
    date: "2025-03-25",
  },
  {
    id: 3,
    courseTitle: "CSS Flexbox and Grid",
    date: "2025-03-30",
  },
  {
    id: 4,
    courseTitle: "Node.js for Beginners",
    date: "2025-04-01",
  },
  {
    id: 5,
    courseTitle: "Python Programming",
    date: "2025-04-05",
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">
          Please login to access dashboard
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-4 sm:gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatsCard
              icon={<FaBook />}
              title="Enrolled"
              value={myCourses.length}
            />
            <StatsCard
              icon={<FaCertificate />}
              title="Certificates"
              value={dummyCertificates.length}
            />
            <StatsCard icon={<FaClock />} title="Hours" value="24h" />
            <StatsCard icon={<FaGraduationCap />} title="Completed" value="5" />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <WelcomeHeader user={user} />
              <MyCourses courses={myCourses} />
              <RecommendedCourses recommendedCourses={recommendedCourses} />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <RecentActivity recentActivity={dummyRecentActivity} />
              <Certificates certificates={dummyCertificates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex items-center space-x-3 hover:shadow-md transition-shadow">
    <div className="p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm text-gray-600">{title}</p>
      <p className="text-lg sm:text-xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
