import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Pas connecté
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Connecté mais pas admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin autorisé
  return children;
}

export default AdminRoute;