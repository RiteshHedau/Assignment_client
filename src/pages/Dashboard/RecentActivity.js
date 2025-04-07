import React from 'react';

const RecentActivity = ({ recentActivity }) => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {recentActivity?.map((activity, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l2 2m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-600">{activity}</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;