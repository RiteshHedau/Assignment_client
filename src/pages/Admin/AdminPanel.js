import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import EditProfileForm from '../../components/EditProfileForm';

const AdminPanel = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditFormOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditFormOpen(false);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Users List</h3>
          <Link to="/admin/users" className="text-blue-500 hover:underline">
            View Users
          </Link>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Courses List</h3>
          <Link to="/admin/coursesAdmin" className="text-blue-500 hover:underline">
            View Courses
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;