import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Step1EnterID from "../pages/employee/Step1EnterID";
import Step2TakePhoto from "../pages/employee/Step2TakePhoto";
import Step3Confirmation from "../pages/employee/Step3Confirmation";

import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AttendancesPage from "../pages/admin/AttendancesPage";
import EmployeesPage from "../pages/admin/EmployeesPage";
import BranchesPage from "../pages/admin/BranchesPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/empleado" element={<Step1EnterID />} />
        <Route path="/empleado/foto" element={<Step2TakePhoto />} />
        <Route path="/empleado/confirmacion" element={<Step3Confirmation />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/sucursales" element={<BranchesPage />} />
        <Route path="/admin/empleados" element={<EmployeesPage />} />
        <Route path="/admin/asistencias" element={<AttendancesPage />} />

        <Route path="/" element={<Navigate to="/empleado" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
