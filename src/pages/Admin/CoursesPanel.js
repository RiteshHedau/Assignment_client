import React, { useState } from 'react';
import { createCourse } from './../../ApiCalls/courseApiCalls';

const CoursesPanel = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    language: '',
    duration: '',
    price: '',
    author: '',
    category: '',
    type: '',
    thumbnailUrl: '',
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to include both form data and the file
    let fileFormData = new FormData();
    fileFormData.append('thumbnailUrl', thumbnailFile);
    Object.keys(formData).forEach((key) => {
      fileFormData.append(key, formData[key]);
    });

    try {
      const response = await createCourse(fileFormData);
      if (response.status === 200) {
        console.log('Course Data:', response.data);
      }
    } catch (error) {
      console.error('Error uploading course:', error);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Courses Panel</h2>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Upload Course
      </button>
      {isFormOpen && (
        <div className="fixed inset-0 h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-md mx-4 overflow-y-auto max-h-screen">
            <h3 className="text-xl font-semibold mb-4">Upload Course</h3>
            <form encType="multipart/form-data" onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Level</label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Language</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Thumbnail Image</label>
                <input
                  type="file"
                  name="thumbnailUrl"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPanel;