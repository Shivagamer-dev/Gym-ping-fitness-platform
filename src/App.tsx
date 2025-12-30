// src/App.tsx
import { Outlet } from "react-router-dom";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bb-app">
      {/* NAVBAR */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="bb-main">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
