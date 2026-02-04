import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return <div className="p-4 text-center">Cargando sistema...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
