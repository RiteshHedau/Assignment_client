import React, { useState } from "react";
import { updateUserData } from "./../ApiCalls/userApiCalls";
import { FaUser, FaEnvelope, FaCamera, FaTimes, FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Redux/loaderSlice";
import { toast } from "react-hot-toast";

const EditProfileForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    profilePic: user?.profilePic || null,
  });

  const [profilePicFile, setProfilePicFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    dispatch(showLoader());
    e.preventDefault();

    let fileFormData = new FormData();
    fileFormData.append("profilePic", profilePicFile);
    Object.keys(formData).forEach((key) => {
      fileFormData.append(key, formData[key]);
    });

    try {
      const response = await updateUserData(fileFormData);
      if (response.statusCode === 200) {
        console.log("User Data:", response.data);
        toast.success("Profile updated successfully!");
        onClose();
        // Close the popup only after successful submission
      }
      dispatch(hideLoader());
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleClose = () => {
    onClose();
    // setIsProfileOpen(true); // Reopen profile popup when edit form closes
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                {profilePicFile ? (
                  <img
                    src={URL.createObjectURL(profilePicFile)}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Current Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser size={40} className="text-blue-500" />
                )}
              </div>
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <FaCamera className="text-white" size={14} />
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <span className="text-sm text-gray-500">
              Click icon to change profile picture
            </span>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
