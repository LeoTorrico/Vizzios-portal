import { useNavigate } from "react-router-dom";
import { useAttendanceDashboard } from "../../hooks/useAttendanceDashboard";
import DashboardFilters from "../../components/DashboardFilters";
import DashboardTable from "../../components/DashboardTable";
import DashboardPagination from "../../components/DashboardPagination";

export default function AttendanceDashboardPage() {
  const navigate = useNavigate();
  const {
    data,
    meta,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    applyFilters,
  } = useAttendanceDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
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
          Volver atras
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent">
                Reporte de Horas Trabajadas
              </h1>
              <p className="text-gray-600 mt-2">
                Consulta detallada de entradas, salidas y horas trabajadas
              </p>
            </div>
            <div className="hidden sm:block">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <DashboardFilters onApplyFilters={applyFilters} loading={loading} />

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
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
              <div>
                <h3 className="text-red-800 font-semibold">
                  Error al cargar el reporte
                </h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#036133] to-[#F7941F] p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-white">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Registros Detallados
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {meta.total} registros encontrados
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <DashboardTable data={data} loading={loading} />
          </div>
        </div>

        {/* Paginación */}
        <DashboardPagination
          meta={meta}
          onNext={nextPage}
          onPrev={prevPage}
          onGoToPage={goToPage}
        />
      </div>
    </div>
  );
}
