import React from "react";

const WelcomeHeader = ({ user }) => {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Continue your learning journey below.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">{currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
