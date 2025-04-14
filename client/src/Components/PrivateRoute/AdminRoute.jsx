import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/sign-in" />;
  if (!currentUser.isAdmin) return <Navigate to="/unauthorized" />; // optional

  return <Outlet />;
};
