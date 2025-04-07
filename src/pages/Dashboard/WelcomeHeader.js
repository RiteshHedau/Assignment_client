import React from 'react';

const WelcomeHeader = ({user}) => {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <img src={user.profilePic} alt="Profile" className="w-16 h-16 rounded-full"/>
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Continue your learning journey below.</p>
          <p className="text-gray-500 mt-2">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeHeader;