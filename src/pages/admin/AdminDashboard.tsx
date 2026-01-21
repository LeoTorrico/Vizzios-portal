import BranchForm from "../../components/BranchForm";
import BranchList from "../../components/BranchList";
import EmployeeForm from "../..//components/EmployeeForm";
import EmployeeList from "../../components/EmployeeList";
import { useBranches } from "../../hooks/useBranches";
import { useEmployees } from "../../hooks/useEmployees";
import { useAttendance } from "../../hooks/useAttendance";
import AttendanceList from "../../components/AttendanceList";

export default function AdminDashboard() {
  const { branches, addBranch } = useBranches();
  const { employees, addEmployee } = useEmployees();
  const { attendances, loadingFetch, error } = useAttendance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Gestiona sucursales, empleados y asistencias
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#036133]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F7941F]"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Sucursales */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#036133] to-[#036133]/80 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                Sucursales
              </h2>
              <p className="text-white/80 mt-1">
                Administra las sucursales de tu empresa
              </p>
            </div>
            <div className="p-6 space-y-6">
              <BranchForm onSubmit={addBranch} />
              <BranchList branches={branches} />
            </div>
          </div>
        </section>

        {/* Empleados */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#F7941F] to-[#F7941F]/80 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
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
                Empleados
              </h2>
              <p className="text-white/80 mt-1">
                Gestiona el personal de tu organización
              </p>
            </div>
            <div className="p-6 space-y-6">
              <EmployeeForm onSubmit={addEmployee} branches={branches} />
              <EmployeeList employees={employees} branches={branches} />
            </div>
          </div>
        </section>

        {/* Asistencias */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-[#036133] to-[#F7941F] p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                Asistencias
              </h2>
              <p className="text-white/80 mt-1">
                Monitorea la asistencia del personal
              </p>
            </div>
            <div className="p-6">
              {loadingFetch && (
                <div className="flex items-center justify-center p-8">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#036133] border-t-transparent"></div>
                    <p className="text-gray-600 font-medium">
                      Cargando asistencias...
                    </p>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
              <AttendanceList attendances={attendances} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
