import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";
import { RxAvatar } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCourses,
  setSearchTermCourses,
  setSearchTermValue,
} from "./../Redux/courseSlice";
import { getAllCoursesBasedOnQuery } from "./../ApiCalls/courseApiCalls";
import {
  FaHome,
  FaGraduationCap,
  FaBook,
  FaInfoCircle,
  FaEnvelope,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { showLoader,hideLoader } from "../Redux/loaderSlice";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchClick, setSearchClick] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isTabletSearchOpen, setIsTabletSearchOpen] = useState(false);

  const user = useSelector((state) => state.userReducer.user);

  const allCoursesTitle = useSelector(
    (state) => state.courseReducer.allCoursesTitle
  );
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const closedNav = useRef(null);
  const debounceTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/dashboard", name: "Dashboard", icon: <FaGraduationCap /> },
    { path: "/courses", name: "Courses", icon: <FaBook /> },
    { path: "/about", name: "About", icon: <FaInfoCircle /> },
    { path: "/contact", name: "Contact", icon: <FaEnvelope /> },
  ];

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsOpen(false);
  };

  const closePopups = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  const toggleMobileSearch = (course) => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if(isMobileSearchOpen){
      handleSuggestionClick(course);
      handleSearch();
      navigate("/courses");
      setSearchInput("");
      setSuggestions([]);
    }
  };

  const toggleTabletSearch = (course) => {
    setIsTabletSearchOpen(!isTabletSearchOpen);
    if(isTabletSearchOpen){
      handleSuggestionClick(course);
      handleSearch();
      navigate("/courses");
      setSearchInput("");
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setSuggestions([]);
        setInputFocused(false);
      }
      if (closedNav.current && !closedNav.current.contains(event.target)) {
        closePopups();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchClick("");

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) {
        if (Array.isArray(allCoursesTitle)) {
          const filteredSuggestions = allCoursesTitle
            .filter((course) =>
              course.title.toLowerCase().includes(value.toLowerCase())
            )
            .map((course) => ({
              //id: course._id,
              title: course.title,
              //description: course.description,
            }));
          setSuggestions(filteredSuggestions.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = async (course) => {
    dispatch(showLoader())
    setSearchInput(course?.title);
    setSearchClick(course?.title);
    setSuggestions([]);
    setInputFocused(false);
    let search = course.title==undefined?searchInputRef?.current?.value:course?.title;

    const response = await getAllCoursesBasedOnQuery(search);
    if (response?.success) {
      dispatch(setSearchTermCourses(response?.data));
      //console.log("suggestion Click Response", response?.data);
      //console.log("course Title", course.title);
      dispatch(setSearchTermValue(course?.title));
      navigate("/courses");
    }
    dispatch(hideLoader())
  };

  const handleSearch = async () => {
    dispatch(showLoader())
    const searchTerm =
      searchClick || searchInput || searchInputRef.current.value;
    if (!searchTerm.trim()) return;
    //console.log("searchTerm", searchTerm);
    const response = await getAllCoursesBasedOnQuery(searchTerm);
    if (response?.success) {
      dispatch(setSearchTermCourses(response?.data));
      //console.log("handle search response", response?.data);
      navigate("/courses");
      setIsMobileSearchOpen(false);
      setIsTabletSearchOpen(false);
      setSuggestions([]);
      setInputFocused(false);
      
    }
    dispatch(hideLoader())
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    
  }, [isLoggedIn, isOpen, user]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <FaGraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TechLearn
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 group ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                <span className="mr-2 text-lg group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search Button - Visible on tablet */}
            <button
              onClick={toggleTabletSearch}
              className="hidden md:block lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSearch size={20} />
            </button>

            {/* Desktop Search - Visible only on large screens */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchInput}
                  ref={searchInputRef}
                  onChange={handleSearchInputChange}
                  onFocus={() => setInputFocused(true)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-gray-100"
                >
                  <FaSearch className="text-gray-400 hover:text-blue-500" />
                </button>
              </div>

              <AnimatePresence>
                {inputFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    {suggestions.length > 0
                      ? suggestions.map((course, index) => (
                          <div
                            key={course.id || index}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-0"
                            onClick={() => handleSuggestionClick(course)}
                          >
                            <div className="font-medium">{course.title}</div>
                            {course.description && (
                              <div className="text-xs text-gray-500 truncate">
                                {course.description}
                              </div>
                            )}
                          </div>
                        ))
                      : searchInput && (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            No courses found
                          </div>
                        )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={toggleMobileSearch}
              className="sm:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSearch size={20} />
            </button>

            {/* Profile/Register Button */}
            {localStorage.getItem("token") ? (
              <div className="relative">
                <button
                  onClick={toggleProfilePopup}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <RxAvatar className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm p-4"
          >
            <div className="max-w-md mx-auto pt-4">
              {/* Close button */}
              <button
                onClick={toggleMobileSearch}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500"
              >
                <FaTimes size={24} />
              </button>

              {/* Search input */}
              <div className="relative mt-8">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchInput}
                  ref={searchInputRef}
                  onChange={handleSearchInputChange}
                  onFocus={() => setInputFocused(true)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  autoFocus
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Mobile Search Suggestions */}
              <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200">
                {suggestions.length > 0
                  ? suggestions.map((course, index) => (
                      <div
                        key={course.id || index}
                        onClick={() => {
                          handleSuggestionClick(course);
                          toggleMobileSearch(course);
                        }}
                        className="px-4 py-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer flex items-center space-x-3"
                      >
                        <FaBook className="text-gray-400" />
                        <div>
                          <div className="text-gray-700">{course.title}</div>
                          {course.description && (
                            <div className="text-xs text-gray-500 truncate">
                              {course.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : searchInput && (
                      <div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center space-x-2">
                        <FaSearch className="text-gray-400" />
                        <span>No courses found</span>
                      </div>
                    )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tablet Search Overlay */}
      <AnimatePresence>
        {isTabletSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm p-4 hidden md:block lg:hidden"
          >
            <div className="max-w-2xl mx-auto pt-4">
              {/* Close button */}
              <button
                onClick={toggleTabletSearch}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500"
              >
                <FaTimes size={24} />
              </button>

              {/* Search input */}
              <div className="relative mt-8">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchInput}
                  ref={searchInputRef}
                  onChange={handleSearchInputChange}
                  onFocus={() => setInputFocused(true)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  autoFocus
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Tablet Search Suggestions */}
              <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200">
                {suggestions.length > 0
                  ? suggestions.map((course, index) => (
                      <div
                        key={course.id || index}
                        onClick={() => {
                          handleSuggestionClick(course);
                          toggleTabletSearch(course);
                        }}
                        className="px-4 py-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer flex items-center space-x-3"
                      >
                        <FaBook className="text-gray-400" />
                        <div>
                          <div className="text-gray-700">{course.title}</div>
                          {course.description && (
                            <div className="text-xs text-gray-500 truncate">
                              {course.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : searchInput && (
                      <div className="px-4 py-3 text-gray-500 text-center flex items-center justify-center space-x-2">
                        <FaSearch className="text-gray-400" />
                        <span>No courses found</span>
                      </div>
                    )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Popup */}
      <div className="absolute top-16 right-4">
        <ProfilePopup
          isOpen={isProfileOpen}
          onClose={closePopups}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navigation;
