import React, { useEffect, useState } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 5000); // 3-second delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (!showLoader) return null; // Hide loader after 3 seconds

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loader;
