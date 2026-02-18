import React from 'react';
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="ml-4 text-xl text-indigo-700 font-medium">Generating your curriculum...</p>
    </div>
  );
};
export default LoadingSpinner;