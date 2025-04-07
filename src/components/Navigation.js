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

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value) {
        const titles = allCoursesTitle.map((course) => course.title);
        const filteredSuggestions = titles.filter(
          (suggestion) =>
            typeof suggestion === "string" &&
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        console.log("allCoursesTitle", allCoursesTitle);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce time
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSearchClick(suggestion);
    setSuggestions([]);
  };

  const fetchAllCoursesTitle = async () => {
    const response = await getAllCoursesTitle();
    if (response?.success) {
      dispatch(setAllCoursesTitle(response?.data.titles));
      console.log("setSuggestionArray", response?.data.titles);
    }
  };

  useEffect(() => {
    fetchAllCoursesTitle();
  }, [user]);

  const handleSearch = async () => {
    const response = await getAllCoursesBasedOnQuery(
      searchClick || searchInput
    );
    if (response?.success) {
      dispatch(setAllCourses(response?.data));
    }
    console.log("Search input:", searchInput);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    const handleClickOutside = (event) => {
      if (closedNav.current && !closedNav.current.contains(event.target)) {
        closePopups();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoggedIn, isOpen, user]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            MySite
          </Link>
        </div>
        <div className="hidden lg:flex space-x-6">
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
        <div className="flex ml-3 items-center bg-white rounded-full overflow-hidden shadow-md relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className="w-full max-w-xs px-4 py-2 rounded-full text-black focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300"
          >
            <IoSearch className="text-lg" />
          </button>
          {inputFocused && suggestions.length > 0 && (
            <div className="bg-white absolute top-12 left-0 right-0 text-black rounded shadow-lg w-full">
              {allCoursesTitle.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(suggestion.title)}
                >
                  {suggestion.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
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
        <div ref={closedNav} className="lg:hidden mt-4 space-y-2">
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
          isOpen={!isProfileOpen}
          onClose={closePopups}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navigation;
