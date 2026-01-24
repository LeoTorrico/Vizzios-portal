import { useNavigate } from "react-router-dom";
import { useBranches } from "../../hooks/useBranches";
import { useAttendance } from "../../hooks/useAttendance";
import AttendanceList from "../../components/AttendanceList";

export default function AttendancesPage() {
  const navigate = useNavigate();
  const { branches } = useBranches();
  const {
    attendances,
    meta,
    nextPage,
    prevPage,
    filterByBranch,
    selectedBranchId,
    loadingFetch,
    error,
  } = useAttendance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Botón Volver */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 flex items-center text-gray-600 hover:text-[#036133] transition-colors"
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
                Gestión de Asistencias
              </h1>
              <p className="text-gray-600 mt-2">
                Monitorea la asistencia del personal
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-gradient-to-r from-[#036133] to-[#F7941F] rounded-2xl flex items-center justify-center">
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#036133] to-[#F7941F] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Asistencias</h2>
              <p className="text-white/80 mt-1">
                Filtra y revisa los registros de asistencia
              </p>
            </div>

            <div className="min-w-[250px]">
              <select
                value={selectedBranchId}
                onChange={(e) => filterByBranch(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              >
                <option value="" className="text-gray-900">
                  Todas las sucursales
                </option>
                {branches.map((branch: any) => (
                  <option
                    key={branch.id}
                    value={branch.id}
                    className="text-gray-900"
                  >
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6">
            {loadingFetch && (
              <div className="flex justify-center p-8 text-gray-500">
                Cargando...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                Error al cargar asistencias: {error}
              </div>
            )}

            {!loadingFetch && !error && (
              <AttendanceList
                attendances={attendances}
                meta={meta}
                onNext={nextPage}
                onPrev={prevPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
