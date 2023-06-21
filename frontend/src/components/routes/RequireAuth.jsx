import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import AdminNavBar from "../admin/AdminNavBar";
import NavBar from "../user/NavBar";

export default function RequireAuth({ allowedRoles }) {
  const { user } = useUserContext();
  const location = useLocation();

  function verifyUserRole() {
    if (user?.roles === "admin") {
      return (
        <>
          <AdminNavBar />
          <Outlet />
        </>
      );
    }
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  }

  return user?.roles?.includes(allowedRoles) ? (
    verifyUserRole()
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.shape().isRequired,
};
