import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../ApiCalls/authUserApi";
import EditProfileForm from "./EditProfileForm";

const ProfilePopup = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const isAdmin = user?.role === "admin";
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleSignOut = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    onClose(); // Close the popup after signing out
    navigate("/login"); // Redirect to login page after signing out
  };

  const handleAdminPanelClick = () => {
    navigate("/admin"); // Redirect to admin page
    onClose(); // Close the popup after clicking Admin Panel
  };

  const handleEditProfileClick = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={popupRef}
        className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50"
      >
        <div className="p-4">
          <div className="flex items-center space-x-3">
            
              <img src={user.profilePic} className="w-12 h-12 rounded-full"  alt="" srcset="" />
            <div>
              <div className="font-bold text-red-500 text-lg">{user?.name}</div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <button
              onClick={handleEditProfileClick}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
            >
              🔄 Edit Profile
            </button>
            {isAdmin && (
              <button
                onClick={handleAdminPanelClick}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
              >
                🛠️ Admin Panel
              </button>
            )}
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>
      {isEditFormOpen && <EditProfileForm onClose={handleCloseEditForm} />}
    </>
  );
};

export default ProfilePopup;