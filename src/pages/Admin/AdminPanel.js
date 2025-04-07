import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaGraduationCap,
  FaChartBar,
  FaCog,
  FaUsersCog,
  FaBook,
} from "react-icons/fa";
import EditUserForm from "../../components/EditUserForm";

const AdminPanel = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditProfileClick = () => {
    setIsEditFormOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditFormOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleUserFormSubmit = async (formData) => {
    try {
      // Add your API call to update user here
      console.log("Updating user:", formData);
      setSelectedUser(null); // Close the form after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <FaUsersCog className="text-3xl sm:text-4xl text-blue-600" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h2>
              <p className="text-gray-500">
                Manage your platform content and users
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<FaUsers />} title="Total Users" value="1,234" />
          <StatCard
            icon={<FaGraduationCap />}
            title="Active Courses"
            value="45"
          />
          <StatCard icon={<FaChartBar />} title="Revenue" value="$12,345" />
          <StatCard icon={<FaBook />} title="Enrollments" value="2,456" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard
            icon={<FaUsers className="text-blue-600" />}
            title="Users Management"
            description="View and manage user accounts, roles, and permissions"
            link="/admin/users"
            linkText="Manage Users"
          />
          <AdminCard
            icon={<FaGraduationCap className="text-blue-600" />}
            title="Courses Management"
            description="Add, edit, and manage course content and settings"
            link="/admin/courses-admin"
            linkText="Manage Courses"
          />
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>

      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSubmit={handleUserFormSubmit}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// Admin Card Component
const AdminCard = ({ icon, title, description, link, linkText }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-50 rounded-lg text-2xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <Link
      to={link}
      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {linkText}
      <FaCog className="text-sm" />
    </Link>
  </div>
);

export default AdminPanel;
