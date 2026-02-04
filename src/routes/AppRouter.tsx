import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Step1EnterID from "../pages/employee/Step1EnterID";
import Step2TakePhoto from "../pages/employee/Step2TakePhoto";
import Step3Confirmation from "../pages/employee/Step3Confirmation";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/admin/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AttendancesPage from "../pages/admin/AttendancesPage";
import EmployeesPage from "../pages/admin/EmployeesPage";
import BranchesPage from "../pages/admin/BranchesPage";
import AttendanceDashboardPage from "../pages/admin/AttendanceDashboardPage";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- FLUJO PÚBLICO EMPLEADO --- */}
          <Route path="/empleado" element={<Step1EnterID />} />
          <Route path="/empleado/foto" element={<Step2TakePhoto />} />
          <Route
            path="/empleado/confirmacion"
            element={<Step3Confirmation />}
          />

          {/* --- LOGIN ADMIN (Público) --- */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* --- ZONA PRIVADA ADMIN --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/sucursales" element={<BranchesPage />} />
            <Route path="/admin/empleados" element={<EmployeesPage />} />
            <Route path="/admin/asistencias" element={<AttendancesPage />} />
            <Route
              path="/admin/reporte"
              element={<AttendanceDashboardPage />}
            />
          </Route>

          {/* Redirecciones */}
          <Route path="/" element={<Navigate to="/empleado" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
