import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUpload, FaPlus } from "react-icons/fa";

const CoursesPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Course Management
          </h2>
          <p className="text-gray-600">
            Manage your course content and settings
          </p>
        </div>

        {/* Course Management Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ManagementCard
            icon={<FaEdit />}
            title="Edit Courses"
            description="Modify existing course content"
            link="/admin/courses/edit"
            bgColor="bg-blue-600"
          />

          <ManagementCard
            icon={<FaTrash />}
            title="Delete Courses"
            description="Remove unwanted courses"
            link="/admin/courses/delete"
            bgColor="bg-red-600"
          />

          <ManagementCard
            icon={<FaPlus />}
            title="Add Course"
            description="Create a new course"
            link="/admin/courses/upload"
            bgColor="bg-green-600"
          />

          <ManagementCard
            icon={<FaUpload />}
            title="Bulk Upload"
            description="Upload multiple courses"
            link="/admin/courses/upload-multiple"
            bgColor="bg-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

const ManagementCard = ({ icon, title, description, link, bgColor }) => (
  <Link
    to={link}
    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
  >
    <div
      className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center text-white text-xl mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
    <div className={`mt-4 w-full h-1 ${bgColor} rounded-full opacity-20`}></div>
  </Link>
);

export default CoursesPanel;
