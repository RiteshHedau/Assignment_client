import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserEdit,
  FaTrash,
  FaEnvelope,
  FaUserShield,
  FaSearch,
  FaUsersCog,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import EditUserForm from "./../EditUserForm";
import { deleteUser } from "../../../ApiCalls/userApiCalls";
import { setAllUsers } from "../../../Redux/userSlice";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../../Redux/loaderSlice";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  // Search and filter functions
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterUsers(term, filterRole);
  };

  const handleRoleFilter = (role) => {
    setFilterRole(role);
    filterUsers(searchTerm, role);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        dispatch(showLoader());
        const response = await deleteUser(userId);
        if (response.success) {
          // Update both local and Redux state
          const updatedUsers = allUsers.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
          dispatch(setAllUsers(updatedUsers));
          toast.success("User deleted successfully");
        } else {
          throw new Error(response.message || "Failed to delete user");
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      } finally {
        dispatch(hideLoader());
      }
    }
  };

  const filterUsers = (term, role) => {
    let filtered = [...allUsers];
    if (term) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }
    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }
    setUsers(filtered);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...users].sort((a, b) => {
      return newOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setUsers(sorted);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setSelectedUser(null);
    setShowEditForm(false);
  };

  const handleImageClick = (profilePic) => {
    if (profilePic) {
      setSelectedImage(profilePic);
      setShowLargeImage(true);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <FaUsersCog className="text-3xl sm:text-4xl text-blue-600" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Manage Users
              </h2>
              <p className="text-gray-500">Total Users: {users.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => handleRoleFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              <button
                onClick={handleSort}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                {sortOrder === "asc" ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )}
                <span className="hidden sm:inline">Sort</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.map((user) => (
            <motion.div
              key={user.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(user.profilePic)}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <RxAvatar className="w-8 h-8 text-blue-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-sm" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <FaUserShield className="text-sm" />
                    <span
                      className={`text-sm capitalize ${
                        user.role === "admin"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditClick(user)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <FaUserEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Large Image Modal */}
        <AnimatePresence>
          {showLargeImage && selectedImage && (
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
                className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-auto"
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

        {/* Edit Form */}
        {showEditForm && selectedUser && (
          <EditUserForm user={selectedUser} onClose={handleCloseEditForm} />
        )}

        {/* Empty State */}
        {users.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaUsersCog className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
