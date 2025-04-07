import React from 'react';

const Certificates = ({ certificates }) => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map(certificate => (
          <div key={certificate.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{certificate.courseTitle}</h3>
            <p className="text-gray-600 mb-2">Completed on: {certificate.date}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Download/View Certificate</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;