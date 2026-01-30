import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm";
import EmployeeList from "../../components/EmployeeList";
import { useEmployees } from "../../hooks/useEmployees";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { employees, addEmployee } = useEmployees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Botón Volver */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 flex items-center text-gray-600 hover:text-[#F7941F] transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Panel
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 bg-clip-text text-transparent">
                Gestión de Empleados
              </h1>
              <p className="text-gray-600 mt-2">
                Administra el personal de tu organización
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 p-6">
            <h2 className="text-2xl font-bold text-white">Empleados</h2>
            <p className="text-white/80 mt-1">
              Registra y gestiona tu personal
            </p>
          </div>
          <div className="p-6 space-y-6">
            <EmployeeForm onSubmit={addEmployee} />
            <EmployeeList employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
