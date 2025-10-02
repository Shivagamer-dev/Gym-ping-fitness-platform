import React from 'react';
import LoadingGif from '../assets/Loading.gif';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <img src={LoadingGif} alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default LoadingOverlay;
