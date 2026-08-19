import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user)

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute