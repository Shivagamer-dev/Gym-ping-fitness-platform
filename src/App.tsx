import Header from "./components/Header";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Footer from "./components/Footer";

export default function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  // Allow access to the Home page ("/") without requiring authentication
  const isAuthRequired = location.pathname !== "/";

  if (isAuthRequired && !isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
