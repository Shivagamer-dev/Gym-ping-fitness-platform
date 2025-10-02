import { useState, useEffect, useRef } from 'react'; // Import useRef
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import { handleError, ErrorType } from '../lib/errorHandler';

function ErrorBoundary() {
  const error = useRouteError();
  const [showErrorPopup, setShowErrorPopup] = useState(true);
  const [errorMessage, setErrorMessage] = useState('An unexpected error occurred.');
  const [errorType, setErrorType] = useState<ErrorType>('TechnicalError');
  const loggedErrorRef = useRef<unknown | null>(null); // Ref to track the last logged error

  useEffect(() => {
    console.log("ErrorBoundary useEffect: START", { error, loggedErrorRefCurrent: loggedErrorRef.current });

    if (error) {
      console.error("ErrorBoundary (functional): Error caught by useRouteError", error);

      // Generate a unique key for the error to prevent duplicate logging in React StrictMode development
      const errorKey = JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      console.log("ErrorBoundary useEffect: Generated errorKey", errorKey);

      if (loggedErrorRef.current === errorKey) {
        console.log("ErrorBoundary useEffect: Skipping duplicate error log for (key match):", error);
        return;
      }
      loggedErrorRef.current = errorKey; // Mark this error as logged

      let displayMessage = 'An unexpected error occurred.';
      let currentErrorType: ErrorType = 'TechnicalError';

      if (isRouteErrorResponse(error)) {
        // Handle React Router specific errors
        if (error.status === 404) {
          displayMessage = 'Page Not Found.';
          currentErrorType = 'NetworkError'; // Or a specific 'NotFoundError' if defined
        } else if (error.status === 401) {
          displayMessage = 'You are not authorized to view this page.';
          currentErrorType = 'ValidationError'; // Or 'AuthError'
        } else {
          displayMessage = error.statusText || error.data || 'An unexpected routing error occurred.';
        }
      } else if (error instanceof Error) {
        displayMessage = error.message;
      } else if (typeof error === 'string') {
        displayMessage = error;
      }

      setErrorMessage(displayMessage);
      setErrorType(currentErrorType);
      setShowErrorPopup(true);

      // Log the error using our consolidated handler
      console.log("ErrorBoundary useEffect: Calling handleError", { error, currentErrorType });
      handleError(error, currentErrorType);
    }

    return () => {
      console.log("ErrorBoundary useEffect: CLEANUP", { error, loggedErrorRefCurrent: loggedErrorRef.current });
      // Optionally reset loggedErrorRef.current here if you want to allow re-logging after unmount/remount
      // loggedErrorRef.current = null;
    };
  }, [error]);

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  if (!error) {
    // If there's no error, render nothing (or children if this were a traditional ErrorBoundary)
    return null;
  }

  // If there's an error and the popup should be shown
  if (showErrorPopup) {
    return (
      <ErrorPopup
        isOpen={showErrorPopup}
        onClose={closeErrorPopup}
        errorType={errorType}
        message={errorMessage}
      />
    );
  }

  // Fallback if popup is closed or not meant to be shown (e.g., after closing)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 text-white">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-500">Error</h2>
        <p className="mb-6">Something went wrong. Please try again later.</p>
        <button
          onClick={closeErrorPopup}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-semibold transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
