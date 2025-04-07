import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";
import { RxAvatar } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setAllCourses, setAllCoursesTitle } from "./../Redux/courseSlice";
import {
  getAllCoursesBasedOnQuery,
  getAllCoursesTitle,
} from "./../ApiCalls/courseApiCalls";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchClick, setSearchClick] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const user = useSelector((state) => state.userReducer.user);
  const allCoursesTitle = useSelector(
    (state) => state.courseReducer.allCoursesTitle
  );
  const dispatch = useDispatch();

  const closedNav = useRef(null);
  const debounceTimeout = useRef(null);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsOpen(false);
  };

  const closePopups = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
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
        const filteredSuggestions = allCoursesTitle
          .filter((course) =>
            course.title.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5); // Limit to 5 suggestions
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchInput(suggestion);
    setSearchClick(suggestion);
    setSuggestions([]);
    setInputFocused(false);

    const response = await getAllCoursesBasedOnQuery(suggestion);
    if (response?.success) {
      dispatch(setAllCourses(response?.data));
    }
  };

  const fetchAllCoursesTitle = async () => {
    const response = await getAllCoursesTitle();
    if (response?.success) {
      dispatch(setAllCoursesTitle(response?.data.titles));
    }
  };

  useEffect(() => {
    fetchAllCoursesTitle();
  }, [user]);

  const handleSearch = async () => {
    const searchTerm = searchClick || searchInput;
    if (!searchTerm.trim()) return;

    const response = await getAllCoursesBasedOnQuery(searchTerm);
    if (response?.success) {
      dispatch(setAllCourses(response?.data));
    }
    setSuggestions([]);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, isOpen, user]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold order-1">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            MySite
          </Link>
        </div>
        <div className="hidden lg:flex space-x-6 order-2">
          <Link
            to="/"
            className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/courses"
            className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="flex-1 w-full lg:w-auto lg:max-w-[400px] px-2 order-3 lg:order-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchInput}
              onChange={handleSearchInputChange}
              onFocus={() => setInputFocused(true)}
              className="w-full px-4 py-2 rounded-l-full text-black focus:outline-none border-2 border-r-0 border-blue-300 focus:border-blue-500 text-sm md:text-base"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-4 md:px-6 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <IoSearch className="text-lg" />
            </button>

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                {suggestions.map((course, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-0"
                    onClick={() => handleSuggestionClick(course.title)}
                  >
                    {course.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 order-2 lg:order-3">
          {localStorage.getItem("token") ? (
            <div className="relative hidden sm:block">
              <button
                onClick={toggleProfilePopup}
                className="px-4 py-2 rounded transition duration-300 flex items-center space-x-2"
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full ml-2"
                  />
                ) : (
                  <RxAvatar className="size-14 ml-2" />
                )}
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
            >
              Register
            </Link>
          )}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={closedNav}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden mt-4 space-y-2"
        >
          <Link
            to="/"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/courses"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
          >
            Contact
          </Link>
          {localStorage.getItem("token") !== null ? (
            <button
              onClick={toggleProfilePopup}
              className="block mx-auto hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
            >
              Profile
            </button>
          ) : (
            <Link
              to="/register"
              className="block mx-auto hover:bg-blue-800 px-4 py-2 rounded transition duration-300"
            >
              Register
            </Link>
          )}
        </div>
      )}
      <div className="absolute top-4 right-4 mt-20 mr-4">
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
