import React, { useState } from 'react';
import { updateUserData } from '../ApiCalls/userApiCalls';

const EditProfileForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePic: null,
  });

  const[profilePicFile,setProfilePicFile]=useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0])
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    let fileFormData = new FormData();
    fileFormData.append('profilePic', profilePicFile);
    Object.keys(formData).forEach((key) => {
      fileFormData.append(key, formData[key]);
    });

    try {
          const response = await updateUserData(fileFormData);
          if (response.status === 200) {
            console.log('Course Data:', response.data);
          }
        } catch (error) {
          console.error('Error uploading course:', error);
        }
    


  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 md:p-8 rounded-md shadow-lg w-full max-w-md mx-4 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form  onSubmit={handleFormSubmit} encType='multipart/form-data' className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;