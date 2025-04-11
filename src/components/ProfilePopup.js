import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { logoutUser } from "../ApiCalls/authUserApi";
import EditProfileForm from "./EditProfileForm";
import Notifications from "./Notifications";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaCog,
  FaUserCog,
  FaChartLine,
  FaCertificate,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import socketService from "../services/socketService";

const ProfilePopup = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const isAdmin = user?.role === "admin";
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);

  const handleSignOut = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    onClose();
    navigate("/login");
  };

  const handleAdminPanelClick = () => {
    navigate("/admin");
    onClose();
  };

  const handleEditProfileClick = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  useEffect(() => {
    // Ensure socket stays connected when popup opens
    if (isOpen) {
      socketService.getSocket();
    }

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={popupRef}
        className={`absolute right-0 w-80 bg-white rounded-xl shadow-2xl z-50 transform transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div
                onClick={() => user?.profilePic && setShowLargeImage(true)}
                className="cursor-pointer transform transition-transform hover:scale-105"
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shadow-md hover:border-blue-300"
                    alt={user?.name}
                  />
                ) : (
                  <RxAvatar className="w-16 h-16 text-blue-600" />
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0 gap-2">
              <h4 className="text-lg mx-auto font-semibold text-gray-800 truncate">
                {user?.name}
              </h4>
              <div className="flex justify-center items-center text-gray-500 text-sm gap-2">
                <FaEnvelope className="text-blue-500" size={14} />
                <span className="truncate me-4">{user?.email}</span>
              </div>
            </div>
            <Notifications />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <FaChartLine className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm font-medium text-gray-600">5 Courses</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <FaCertificate className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm font-medium text-gray-600">
                2 Certificates
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <MenuItem
              icon={<FaUserEdit />}
              label="Edit Profile"
              onClick={handleEditProfileClick}
            />
            {isAdmin && (
              <MenuItem
                icon={<FaUserCog />}
                label="Admin Panel"
                onClick={handleAdminPanelClick}
              />
            )}
            <MenuItem
              icon={<FaCog />}
              label="Settings"
              onClick={() => {
                navigate("/settings");
              }}
            />
            <div className="my-2 border-t border-gray-100"></div>
            <MenuItem
              icon={<FaSignOutAlt />}
              label="Sign Out"
              onClick={handleSignOut}
              className="text-red-600 hover:bg-red-50"
            />
          </div>
        </div>
      </div>

      {/* Large Profile Image Modal */}
      <AnimatePresence>
        {showLargeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLargeImage(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowLargeImage(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditFormOpen && (
        <EditProfileForm user={user} onClose={handleCloseEditForm} />
      )}
    </>
  );
};

// MenuItem Component
const MenuItem = ({
  icon,
  label,
  onClick,
  className = "text-gray-700 hover:bg-blue-50",
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-colors duration-150 ${className}`}
  >
    <span className="text-lg mr-3">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default ProfilePopup;
