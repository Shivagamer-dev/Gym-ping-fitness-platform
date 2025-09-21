import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home/index.tsx'
import About from './FillIn/about.tsx'
import Privacy from './FillIn/privacyPolicy.tsx'
import Support from './FillIn/support.tsx'
import Tutorial from './FillIn/tutorial.tsx'
import Pricing from './FillIn/pricing.tsx'
import Career from './FillIn/career.tsx'
import Terms from './FillIn/terms.tsx'

import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
      },
      {
        path: "/tutorial",
        element: <Tutorial />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/terms",
        element: <Terms />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)