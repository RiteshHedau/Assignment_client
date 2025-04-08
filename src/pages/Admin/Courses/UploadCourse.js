import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaBook,
  FaUser,
  FaClock,
  FaDollarSign,
  FaLayerGroup,
  FaCode,
  FaGraduationCap,
  FaLanguage,
} from "react-icons/fa";
import { MdTitle, MdDescription } from "react-icons/md";
import { createCourse } from "../../../ApiCalls/courseApiCalls";
import { toast } from "react-hot-toast";

const UploadCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    language: "English",
    duration: "",
    price: "",
    author: "",
    category: "",
    type: "JavaScript",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileFormData = new FormData();
      if (thumbnailFile) {
        fileFormData.append("thumbnailUrl", thumbnailFile);
      }
      Object.keys(formData).forEach((key) => {
        fileFormData.append(key, formData[key]);
      });

      const response = await createCourse(fileFormData);
      if (response.success) {
        toast.success("Course created successfully");
        setFormData({
          title: "",
          description: "",
          level: "Beginner",
          language: "English",
          duration: "",
          price: "",
          author: "",
          category: "",
          type: "JavaScript",
        });
        setThumbnailFile(null);
      }
    } catch (error) {
      toast.error("Failed to create course");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <FaCloudUploadAlt className="text-4xl text-blue-600 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800">Upload New Course</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <MdTitle className="text-lg" />
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              required
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaUser className="text-lg" />
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              required
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaDollarSign className="text-lg" />
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              required
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaClock className="text-lg" />
              Duration (in hours)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              required
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaLayerGroup className="text-lg" />
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              required
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaCode className="text-lg" />
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="React">React</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaGraduationCap className="text-lg" />
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
              <FaLanguage className="text-lg" />
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
            <MdDescription className="text-lg" />
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
            required
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600">
            <FaBook className="text-lg" />
            Thumbnail
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-all duration-200">
            <div className="space-y-1 text-center">
              <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    onChange={(e) => setThumbnailFile(e.target.files[0])}
                    accept="image/*"
                    className="sr-only"
                    required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-xl" />
              Upload Course
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadCourse;
