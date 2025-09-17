import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Step1EnterID from "../pages/employee/Step1EnterID";
import Step2TakePhoto from "../pages/employee/Step2TakePhoto";
import Step3Confirmation from "../pages/employee/Step3Confirmation";
import Login from "../pages/admin/Login";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/empleado" element={<Step1EnterID />} />
        <Route path="/empleado/foto" element={<Step2TakePhoto />} />
        <Route path="/empleado/confirmacion" element={<Step3Confirmation />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/" element={<Navigate to="/empleado" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
