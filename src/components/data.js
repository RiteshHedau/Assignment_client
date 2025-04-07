const dummyCourses = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'React Basics',
      instructor: 'John Doe',
      progress: 60,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Advanced JavaScript',
      instructor: 'Jane Smith',
      progress: 80,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'CSS Flexbox and Grid',
      instructor: 'Bob Johnson',
      progress: 40,
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      title: 'Node.js for Beginners',
      instructor: 'Alice Davis',
      progress: 20,
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      title: 'Python Programming',
      instructor: 'Chris Lee',
      progress: 70,
    },
  ];
  
  const dummyRecommendedCourses = [
    {
      id: 1,
      title: 'Machine Learning with Python',
      description: 'Learn the basics of machine learning with Python.',
      rating: '4.5',
      tags: ['Beginner', 'Free', 'Trending'],
    },
    {
      id: 2,
      title: 'Full-Stack Web Development',
      description: 'Become a full-stack web developer with this comprehensive course.',
      rating: '4.7',
      tags: ['Intermediate', 'Paid', 'Popular'],
    },
    {
      id: 3,
      title: 'Data Structures and Algorithms',
      description: 'Master data structures and algorithms for technical interviews.',
      rating: '4.8',
      tags: ['Advanced', 'Free', 'Trending'],
    },
  ];
  
  const dummyRecentActivity = [
    'Completed lesson 3 of React Basics',
    'Visited Advanced JavaScript course',
    'Earned certificate for CSS Flexbox and Grid',
    'You spent 3 hours learning this week',
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
  ];
  
  const dummyNotifications = [
    'New course added in Java',
    'Your certificate for "React Basics" is ready',
    'Update: New lesson added to your course',
  ];
  
  export { dummyCourses, dummyRecommendedCourses, dummyRecentActivity, dummyCertificates, dummyNotifications };