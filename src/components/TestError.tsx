import React, { useEffect } from 'react';

const TestError: React.FC = () => {
  useEffect(() => {
    // Simulate a component error
    throw new Error('This is a simulated component error!');
  }, []);

  return (
    <div className="text-white p-4">
      This component is designed to throw an error.
    </div>
  );
};

export default TestError;
