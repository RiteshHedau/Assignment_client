import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPencilAlt, FaEye, FaTimes, FaSave, FaBook, FaClock, FaDollarSign, FaUser, FaLanguage, FaGraduationCap } from "react-icons/fa";
import { MdTitle, MdDescription } from "react-icons/md";
import { toast } from "react-hot-toast";
import { updateCourse } from "../../../ApiCalls/courseApiCalls";

const EditCourse = () => {
  const courses = useSelector((state) => state.courseReducer.allCourses);
  const dispatch = useDispatch();
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleEdit = (course) => {
    setViewingCourse(null);
    setEditingCourse({ ...course });
  };

  const handleView = (course) => {
    setEditingCourse(null);
    setViewingCourse(course);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditingCourse({
          ...editingCourse,
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    // Validate required fields
    if (!editingCourse.title || !editingCourse.price || !editingCourse.duration) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // Create FormData instance
      const formData = new FormData();
      
      // Append all course data
      Object.keys(editingCourse).forEach(key => {
        if (key === 'image' && typeof editingCourse[key] === 'object') {
          formData.append('image', editingCourse[key]);
        } else {
          formData.append(key, editingCourse[key]);
        }
      });

      const response = await updateCourse(editingCourse.id, formData);
      
      if (response.success) {
        // Update the course in Redux store with the response data
        dispatch({
          type: "UPDATE_COURSE",
          payload: response.data // Assuming the API returns the updated course
        });
        
        toast.success("Course updated successfully");
        setEditingCourse(null);
        setImagePreview(null);
      } else {
        toast.error(response.message || "Failed to update course");
      }
    } catch (error) {
      console.error('Update course error:', error);
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaPencilAlt className="text-blue-600" />
        Edit Courses
      </h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses?.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.level}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.duration}h</td>
                <td className="px-6 py-4 whitespace-nowrap">${course.price}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-100"
                    title="Edit Course"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleView(course)}
                    className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Course Details</h3>
              <button
                onClick={() => setViewingCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FaBook className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-medium">{viewingCourse.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">${viewingCourse.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{viewingCourse.duration}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-medium">{viewingCourse.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-medium">{viewingCourse.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaLanguage className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">{viewingCourse.language}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">{viewingCourse.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white w-full sm:rounded-xl p-4 sm:p-6 h-full sm:h-auto sm:w-full sm:max-w-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white flex justify-between items-center mb-4 sm:mb-6 pb-2 border-b sm:border-none">
              <h3 className="text-lg sm:text-xl font-bold">Edit Course</h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="relative w-full sm:w-32 h-48 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    {(imagePreview || editingCourse.image) && (
                      <img
                        src={imagePreview || editingCourse.image}
                        alt="Course preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <p className="text-sm text-gray-500 mb-1">
                      Upload a new course image
                    </p>
                    <p className="text-xs text-gray-400">
                      Recommended size: 1280x720px. Max size: 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdTitle className="inline mr-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" />
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingCourse.author}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        author: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaDollarSign className="inline mr-2" />
                    Price
                  </label>
                  <input
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        price: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline mr-2" />
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    value={editingCourse.duration}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        duration: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGraduationCap className="inline mr-2" />
                    Level
                  </label>
                  <select
                    value={editingCourse.level}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        level: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLanguage className="inline mr-2" />
                    Language
                  </label>
                  <select
                    value={editingCourse.language}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        language: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MdDescription className="inline mr-2" />
                  Description
                </label>
                <textarea
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 pt-3 border-t">
              <button
                onClick={() => setEditingCourse(null)}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaSave />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
