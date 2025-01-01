import React from "react";

const LoggingIn = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center mt-20">
        <div className="loader mb-4" />
        <p className="text-lg font-semibold">LoggingIn...</p>
        <p className="text-sm text-gray-500">Please wait</p>
      </div>
    </div>
  );
};

export default LoggingIn;
