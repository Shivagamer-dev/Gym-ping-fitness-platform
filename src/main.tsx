import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.tsx'
import Home from './Home/index.tsx'
import Dashboard from './Dashboard/index.tsx'
import Locator from './Locator/index.tsx'
import Spotter from './Spotter/index.tsx'
import About from './FillIn/about.tsx'
import Privacy from './FillIn/privacyPolicy.tsx'
import Support from './FillIn/support.tsx'
import ExerciseDetail from './Spotter/ExerciseDetail.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/locator",
        element: <Locator />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/spotter",
        element: <Spotter />,
      },
      {
        path: "/spotter/exercise/:id",
        element: <ExerciseDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/support",
        element: <Support />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
