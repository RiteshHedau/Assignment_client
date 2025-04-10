import React, { useState, useCallback } from "react";
import { updateUserData } from "../../ApiCalls/userApiCalls";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../Redux/loaderSlice";

const EditUserForm = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleClose = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onClose();
    },
    [onClose]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(showLoader());
    try {
      await updateUserData(formData);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    } finally {
      setIsLoading(false);
      dispatch(hideLoader());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden border border-gray-100"
      >
        {/* Header with gradient animation */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_100%] animate-gradient p-6 rounded-t-xl relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Edit User Details
              </h2>
            </div>
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close modal"
              className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-all duration-200 
                       flex items-center justify-center focus:outline-none focus:ring-2 
                       focus:ring-white/50 cursor-pointer group"
            >
              <FaTimes
                className="text-white text-xl transform group-hover:scale-110 
                                transition-transform duration-200"
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div className="space-y-2 group">
            <label className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Name
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          hover:border-blue-400 transition-all duration-200
                          bg-gray-50 focus:bg-white"
                placeholder="Enter user's name"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2 group">
            <label className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Email
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          hover:border-blue-400 transition-all duration-200
                          bg-gray-50 focus:bg-white"
                placeholder="Enter user's email"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2 group">
            <label className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Role
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserShield className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:border-blue-400 transition-all duration-200
                          bg-gray-50 focus:bg-white appearance-none
                          cursor-pointer"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-[0.98] active:scale-[0.97] disabled:opacity-50"
            >
              <FaTimes className="text-red-500" /> Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-[0.98] active:scale-[0.97] disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-white" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* Decorative elements with enhanced styling */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl" />
      </motion.div>
    </motion.div>
  );
};

export default EditUserForm;
