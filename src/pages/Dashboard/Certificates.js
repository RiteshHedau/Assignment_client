import React from "react";
import { FaCertificate, FaDownload } from "react-icons/fa";

const Certificates = ({ certificates }) => {
  return (
    <div className="w-full p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCertificate className="text-blue-600 text-xl" />
        <h2 className="text-lg sm:text-xl font-semibold">Certificates</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="p-3 sm:p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-1">
              {certificate.courseTitle}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3">
              Completed on: {certificate.date}
            </p>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <FaDownload className="text-sm" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
