import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import MyCourses from './MyCourses';
import RecommendedCourses from './RecommendedCourses';
import RecentActivity from './RecentActivity';
import Certificates from './Certificates';
import { useSelector } from 'react-redux';

const myCourses = [
  { image: 'path-to-js-image.jpg', title: 'JavaScript Fundamentals', instructor: 'Sarah Johnson', progress: 60 },
  { image: 'path-to-python-image.jpg', title: 'Python for Beginners', instructor: 'Amit Patel', progress: 45 },
  { image: 'path-to-react-image.jpg', title: 'React Development', instructor: 'Priya Menon', progress: 0 }
];

const recommendedCourses = [
  { image: 'path-to-webdesign-image.jpg', title: 'Web Design Basics', action: 'Enroll' },
  { image: 'path-to-datascience-image.jpg', title: 'Data Science with R', action: 'Enroll' },
  { image: 'path-to-java-image.jpg', title: 'Advanced Java Programming', action: 'Enroll' }
];

const dummyRecentActivity = [
  'Completed lesson 3 of React Basics on 2025-04-05',
  'Visited Advanced JavaScript course on 2025-04-04',
  'Earned certificate for CSS Flexbox and Grid on 2025-04-02',
  'You spent 3 hours learning this week',
  'Started new course: Python Programming on 2025-04-01',
  'Reviewed lesson 2 of Node.js for Beginners on 2025-03-30',
];

const dummyCertificates = [
  {
    id: 1,
    courseTitle: 'React Basics',
    date: '2025-03-20',
  },
  {
    id: 2,
    courseTitle: 'Advanced JavaScript',
    date: '2025-03-25',
  },
  {
    id: 3,
    courseTitle: 'CSS Flexbox and Grid',
    date: '2025-03-30',
  },
  {
    id: 4,
    courseTitle: 'Node.js for Beginners',
    date: '2025-04-01',
  },
  {
    id: 5,
    courseTitle: 'Python Programming',
    date: '2025-04-05',
  },
];

const Dashboard = () => {

  const user=useSelector((state)=>state.userReducer.user)
  console.log("user Data",user)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
     <WelcomeHeader user={user}/>
     <MyCourses courses={myCourses}/>
     <RecommendedCourses recommendedCourses={recommendedCourses}/>
     <RecentActivity recentActivity={dummyRecentActivity}/>
     <Certificates certificates={dummyCertificates} />
    </div>
  );
};

export default Dashboard;