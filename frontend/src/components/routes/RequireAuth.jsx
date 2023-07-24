import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import AdminNavBar from "../admin/AdminNavBar";
import NavBar from "../user/NavBar";
import { InterventionContextProvider } from "../../contexts/InterventionContext";

export default function RequireAuth({ allowedRoles }) {
  const { user } = useUserContext();
  const location = useLocation();

  function verifyUserRole() {
    if (user?.roles === "admin") {
      return (
        <>
          <AdminNavBar />
          <Outlet />
          <ToastContainer limit={1} />
        </>
      );
    }
    return (
      <InterventionContextProvider>
        <NavBar />
        <Outlet />
        <ToastContainer limit={1} />
      </InterventionContextProvider>
    );
  }

  return user?.roles === allowedRoles ? (
    verifyUserRole()
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.string.isRequired,
};
