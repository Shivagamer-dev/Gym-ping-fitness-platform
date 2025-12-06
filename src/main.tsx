import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import ErrorBoundary from "./components/ErrorBoundary";
import { handleError } from "./lib/errorHandler";

import { HelmetProvider } from "react-helmet-async";

// Disable default React error overlay in dev so our ErrorBoundary is primary
if (import.meta.env.DEV) {
  (window as any).__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = { isDisabled: true };
}

/* ------------ Lazy route components (PAGES) ------------ */
const Home = lazy(() => import("./Home/HomePage.tsx"));
const About = lazy(() => import("./Home/AboutPage.tsx"));
const Privacy = lazy(() => import("./Home/PrivacyPolicyPage.tsx"));
const Support = lazy(() => import("./Home/HelpCenterPage.tsx"));
const Tutorial = lazy(() => import("./Home/TutorialPage.tsx"));
const Pricing = lazy(() => import("./Home/PricingPage.tsx"));
const Career = lazy(() => import("./Home/CareersPage.tsx"));
const Terms = lazy(() => import("./Home/TermsPage.tsx"));
const Download = lazy(() => import("./Home/DownloadPage.tsx")); // ⬅️ NEW

/* ------------ Other components ------------ */
const TestError = lazy(() => import("./components/TestError.tsx"));
const NotFound = lazy(() => import("./components/NotFound.tsx"));

// Gym form page (backend/logic as before)
const GymForm = lazy(() => import("./gymData/GymForm.tsx"));

const router = createBrowserRouter([
  {
    element: <App />, // layout with navbar + footer + <Outlet />
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Privacy />
          </Suspense>
        ),
      },
      {
        path: "/support",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Support />
          </Suspense>
        ),
      },
      {
        path: "/tutorial",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Tutorial />
          </Suspense>
        ),
      },
      {
        path: "/pricing",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "/career",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Career />
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: "/app-download", // ⬅️ new app-download status page
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <Download />
          </Suspense>
        ),
      },

      // ✅ Gym form route (logic untouched)
      {
        path: "/gym/form",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <GymForm />
          </Suspense>
        ),
      },

      {
        path: "/testerror",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <TestError />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingOverlay />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

// Global error handling for uncaught JS errors
window.onerror = (message, _source, _lineno, _colno, error) => {
  handleError(error || new Error(message as string), "TechnicalError");
  return true; // prevent default handler
};

// Global error handling for unhandled promise rejections
window.onunhandledrejection = (event) => {
  handleError(event.reason, "TechnicalError");
  return true; // prevent default handler
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
