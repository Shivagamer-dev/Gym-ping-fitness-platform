import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import { handleError } from './lib/errorHandler'; // Import handleError

// Disable the default React error overlay in development
// This allows our custom ErrorBoundary to be the primary error display
if (import.meta.env.DEV) {
  (window as any).__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = {
    isDisabled: true,
  };
}

import { HelmetProvider } from "react-helmet-async";

const Home = lazy(() => import('./Home/index.tsx'));
const About = lazy(() => import('./FillIn/about.tsx'));
const Privacy = lazy(() => import('./FillIn/privacyPolicy.tsx'));
const Support = lazy(() => import('./FillIn/support.tsx'));
const Tutorial = lazy(() => import('./FillIn/tutorial.tsx'));
const Pricing = lazy(() => import('./FillIn/pricing.tsx'));
const Career = lazy(() => import('./FillIn/career.tsx'));
const Terms = lazy(() => import('./FillIn/terms.tsx'));
const TestError = lazy(() => import('./components/TestError.tsx'));
const NotFound = lazy(() => import('./components/NotFound.tsx'));

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorBoundary />, // Add ErrorBoundary as the errorElement for this route
    children: [
      {
        path: "/",
        element: <Suspense fallback={<LoadingOverlay />}><Home /></Suspense>,
      },
      {
        path: "/about",
        element: <Suspense fallback={<LoadingOverlay />}><About /></Suspense>,
      },
      {
        path: "/privacy-policy",
        element: <Suspense fallback={<LoadingOverlay />}><Privacy /></Suspense>,
      },
      {
        path: "/support",
        element: <Suspense fallback={<LoadingOverlay />}><Support /></Suspense>,
      },
      {
        path: "/tutorial",
        element: <Suspense fallback={<LoadingOverlay />}><Tutorial /></Suspense>,
      },
      {
        path: "/pricing",
        element: <Suspense fallback={<LoadingOverlay />}><Pricing /></Suspense>,
      },
      {
        path: "/career",
        element: <Suspense fallback={<LoadingOverlay />}><Career /></Suspense>,
      },
      {
        path: "/terms",
        element: <Suspense fallback={<LoadingOverlay />}><Terms /></Suspense>,
      },
      {
        path: "/testerror",
        element: <Suspense fallback={<LoadingOverlay />}><TestError /></Suspense>,
      },
      {
        path: "*", // Catch-all route for 404
        element: <Suspense fallback={<LoadingOverlay />}><NotFound /></Suspense>,
      }
    ],
  },
]);

// Global error handling for uncaught JavaScript errors
window.onerror = (message, _source, _lineno, _colno, error) => {
  handleError(error || new Error(message as string), 'TechnicalError');
  return true; // Prevent default error handling
};

// Global error handling for unhandled promise rejections
window.onunhandledrejection = (event) => {
  handleError(event.reason, 'TechnicalError');
  return true; // Prevent default error handling
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* ErrorBoundary is now handled by React Router's errorElement */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
