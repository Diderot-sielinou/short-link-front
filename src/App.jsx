import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/ Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateShortLink from "./pages/CreateShortLink";
import MyLinks from "./pages/MyLinks.jsx";
import LinkStats from "./pages/LinkStats.jsx";
import Profile from "./pages/Profile.jsx";
import LandingPage from "./pages/LandingPage";
import HomeRedirect from "./pages/HomeRedirect";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateShortLink />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-links"
          element={
            <ProtectedRoute>
              <MyLinks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats/:shortCode"
          element={
            <ProtectedRoute>
              <LinkStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={true}
        draggable
        theme="light"
      />

      <Footer />
    </AuthProvider>
  );
}
