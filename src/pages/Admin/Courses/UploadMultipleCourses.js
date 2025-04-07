import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileExcel } from "react-icons/fa";
import { createAllCourses } from "../../../ApiCalls/courseApiCalls";
import { toast } from "react-hot-toast";

const UploadMultipleCourses = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await createAllCourses(formData);
      if (response.success) {
        toast.success("Courses uploaded successfully");
        setFile(null);
      }
    } catch (error) {
      toast.error("Failed to upload courses");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaCloudUploadAlt className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold">Bulk Upload Courses</h2>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <FaFileExcel className="mx-auto text-4xl text-gray-400 mb-4" />
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-700"
          >
            Click to upload Excel/CSV file
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: .xlsx, .xls, .csv
          </p>
        </div>

        {file && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">Selected file: {file.name}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload Courses
        </button>
      </div>
    </div>
  );
};

export default UploadMultipleCourses;
