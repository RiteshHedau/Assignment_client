import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileExcel, FaTimes } from "react-icons/fa";
import { createAllCourses } from "../../../ApiCalls/courseApiCalls";
import { toast } from "react-hot-toast";

const UploadMultipleCourses = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid Excel or CSV file");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
    
    e.target.value = '';
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await createAllCourses(formData);
      if (response.success) {
        toast.success(`Successfully uploaded ${response.data?.length || 'multiple'} courses`);
        clearFile();
      } else {
        throw new Error(response.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload courses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaCloudUploadAlt className={`text-3xl text-blue-600 ${loading ? 'animate-bounce' : ''}`} />
        <h2 className="text-2xl font-bold">Bulk Upload Courses</h2>
      </div>

      <div className="max-w-xl mx-auto">
        <div className={`border-2 border-dashed ${file ? 'border-blue-300 bg-blue-50' : 'border-gray-300'} rounded-xl p-8 text-center transition-all duration-300`}>
          <FaFileExcel className="mx-auto text-4xl text-gray-400 mb-4" />
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={loading}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer text-blue-600 hover:text-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Click to upload Excel/CSV file
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: .xlsx, .xls, .csv (max 5MB)
          </p>
        </div>

        {file && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
            <p className="text-sm text-blue-700">Selected file: {file.name}</p>
            <button
              onClick={clearFile}
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={loading}
            >
              <FaTimes />
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? (
            <>
              <FaCloudUploadAlt className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FaCloudUploadAlt />
              Upload Courses
            </>
          )}
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Make sure your Excel/CSV file follows the required format with columns: 
          title, description, level, language, duration, price, author, category, type
        </p>
      </div>
    </div>
  );
};

export default UploadMultipleCourses;
