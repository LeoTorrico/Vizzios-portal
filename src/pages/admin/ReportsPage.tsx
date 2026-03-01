import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportsService } from "../../api/reportsService";
import {
  downloadWeeklyExcel,
  downloadMonthlyExcel,
} from "../../utils/excelUtils";
import { formatDecimalToHHMM } from "../../utils/formatUtils";
// Importamos los hooks para alimentar los selects
import { useEmployees } from "../../hooks/useEmployees";
import { useBranches } from "../../hooks/useBranches";

export default function ReportsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  // Traemos los datos de la base de datos
  const { employees, loading: loadingEmployees } = useEmployees();
  const { branches, loading: loadingBranches } = useBranches();

  // Estados del formulario Semanal
  const [carnet, setCarnet] = useState("");
  const [weekDate, setWeekDate] = useState("");

  // Estados del formulario Mensual
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [branchId, setBranchId] = useState(""); // Filtro opcional por sucursal

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      if (activeTab === "weekly") {
        if (!carnet || !weekDate)
          throw new Error("Complete todos los campos obligatorios");
        const res = await reportsService.getWeekly(carnet, weekDate);
        setData(res);
      } else {
        // Pasamos el branchId si el usuario seleccionó uno
        const res = await reportsService.getMonthly(
          year,
          month,
          branchId || undefined,
        );
        setData(res);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Error al generar reporte",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!data) return;
    if (activeTab === "weekly") downloadWeeklyExcel(data);
    else downloadMonthlyExcel(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-10">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header con botón de volver */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center w-fit text-gray-600 hover:text-[#036133] transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
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
            <span className="font-medium">Volver al Panel</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#036133] to-[#F7941F] bg-clip-text text-transparent text-center md:text-right">
            Reportes y Estadísticas
          </h1>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab("weekly");
                setData(null);
                setError("");
              }}
              className={`flex-1 py-4 px-2 text-sm md:text-base text-center font-semibold transition-all ${activeTab === "weekly"
                ? "text-[#036133] border-b-4 border-[#036133] bg-green-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              Reporte Semanal (Individual)
            </button>
            <button
              onClick={() => {
                setActiveTab("monthly");
                setData(null);
                setError("");
              }}
              className={`flex-1 py-4 px-2 text-sm md:text-base text-center font-semibold transition-all ${activeTab === "monthly"
                ? "text-[#F7941F] border-b-4 border-[#F7941F] bg-orange-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              Reporte Mensual (General)
            </button>
          </div>

          <div className="p-4 md:p-8">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 items-end bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100">
              {activeTab === "weekly" ? (
                <>
                  <div className="space-y-2 lg:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Empleado <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={carnet}
                      onChange={(e) => setCarnet(e.target.value)}
                      disabled={loadingEmployees || loading}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#036133]/20 focus:border-[#036133] outline-none transition-all bg-white disabled:bg-gray-100"
                    >
                      <option value="">-- Seleccionar Empleado --</option>
                      {employees.map((emp: any) => (
                        <option key={emp.carnet} value={emp.carnet}>
                          {emp.firstName} {emp.lastName} ({emp.carnet})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 lg:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Semana del <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#036133]/20 focus:border-[#036133] outline-none transition-all"
                      value={weekDate}
                      onChange={(e) => setWeekDate(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 lg:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Año
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F7941F]/20 focus:border-[#F7941F] outline-none transition-all"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Mes
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F7941F]/20 focus:border-[#F7941F] outline-none transition-all bg-white"
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      disabled={loading}
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {new Date(0, i)
                            .toLocaleString("es", { month: "long" })
                            .toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Filtro Opcional de Sucursal para el reporte mensual */}
                  <div className="space-y-2 lg:col-span-2 xl:col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Sucursal (Opcional)
                    </label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      disabled={loadingBranches || loading}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F7941F]/20 focus:border-[#F7941F] outline-none transition-all bg-white"
                    >
                      <option value="">Todas las sucursales</option>
                      {branches.map((branch: any) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <button
                onClick={handleSearch}
                disabled={loading}
                className={`w-full lg:col-span-1 xl:col-span-1 h-[46px] rounded-lg text-white font-medium shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${activeTab === "weekly"
                  ? "bg-[#036133] hover:bg-[#024c28]"
                  : "bg-[#F7941F] hover:bg-[#d97f17]"
                  } disabled:opacity-50 disabled:cursor-not-allowed mt-auto`}
              >
                {loading ? (
                  <span className="animate-pulse">Generando...</span>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Buscar Reporte
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2 text-sm md:text-base">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            {data && (
              <div className="animate-fade-in">
                {/* Header Resultados + Exportar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-gray-100 pb-4">
                  <div>
                    {activeTab === "weekly" ? (
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {data.employee.firstName} {data.employee.lastName}
                        <span className="block text-sm font-normal text-gray-500 mt-1">
                          Semana del {data.week.startDate} • CI:{" "}
                          {data.employee.carnet}
                        </span>
                      </h3>
                    ) : (
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
                        Reporte General
                        <span className="block text-sm font-normal text-gray-500 mt-1 uppercase">
                          {data.period.monthName} {data.period.year}
                        </span>
                      </h3>
                    )}
                  </div>

                  <button
                    onClick={handleExport}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors active:scale-95"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Exportar Excel
                  </button>
                </div>

                {/* VISTA SEMANAL */}
                {activeTab === "weekly" && (
                  <>
                    {/* Resumen Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center sm:text-left">
                        <p className="text-blue-600 text-xs md:text-sm font-semibold uppercase">
                          Total Horas
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-blue-800 mt-1">
                          {formatDecimalToHHMM(data.summary.totalHoras)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center sm:text-left">
                        <p className="text-green-600 text-xs md:text-sm font-semibold uppercase">
                          Promedio Diario
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-green-800 mt-1">
                          {formatDecimalToHHMM(data.summary.promedioDiario)}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center sm:text-left">
                        <p className="text-purple-600 text-xs md:text-sm font-semibold uppercase">
                          Días Trabajados
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-purple-800 mt-1">
                          {data.summary.diasTrabajados}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                      <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                          <tr>
                            <th className="p-3 md:p-4">Fecha</th>
                            <th className="p-3 md:p-4">Día</th>
                            <th className="p-3 md:p-4 text-center">Entrada</th>
                            <th className="p-3 md:p-4 text-center">Salida</th>
                            <th className="p-3 md:p-4 text-center">Horas</th>
                            <th className="p-3 md:p-4 text-center">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {data.desglose.map((day: any, idx: number) => (
                            <tr
                              key={idx}
                              className={`hover:bg-gray-50 transition-colors ${day.status === "VACACIONES"
                                ? "bg-blue-50/50"
                                : day.status === "AUSENCIA"
                                  ? "bg-gray-50/50 opacity-75"
                                  : day.status === "INCOMPLETO"
                                    ? "bg-red-50/40"
                                    : ""
                                }`}
                            >
                              <td className="p-3 md:p-4 text-gray-800 text-sm md:text-base">
                                {day.fecha}
                              </td>
                              <td className="p-3 md:p-4 capitalize text-gray-600 text-sm md:text-base">
                                {day.diaSemana}
                              </td>
                              <td className="p-3 md:p-4 font-mono text-xs md:text-sm text-center">
                                {day.entrada || (
                                  <span className="text-gray-400">
                                    --:--:--
                                  </span>
                                )}
                              </td>
                              <td className="p-3 md:p-4 font-mono text-xs md:text-sm text-center">
                                {day.salida || (
                                  <span className="text-gray-400">
                                    --:--:--
                                  </span>
                                )}
                              </td>
                              <td className="p-3 md:p-4 font-bold text-[#036133] text-center">
                                {formatDecimalToHHMM(day.horas)}
                              </td>
                              <td className="p-3 md:p-4 text-center">
                                {day.status === "VACACIONES" ? (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase tracking-wide">
                                    Vacaciones
                                  </span>
                                ) : day.status === "AUSENCIA" ? (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 uppercase tracking-wide">
                                    Falta
                                  </span>
                                ) : day.status === "INCOMPLETO" ? (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Revisar
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                    Correcto
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* VISTA MENSUAL */}
                {activeTab === "monthly" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.branches.map((branch: any) => (
                      <div
                        key={branch.branchId}
                        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <h4 className="font-bold text-gray-800 text-lg">
                            {branch.branchName}
                          </h4>
                          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                            <span className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">
                              Total:{" "}
                              <strong className="text-[#F7941F]">
                                {formatDecimalToHHMM(branch.totalHoras)}
                              </strong>
                            </span>
                            <span className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">
                              Empl: <strong>{branch.empleadosActivos}</strong>
                            </span>
                          </div>
                        </div>
                        {branch.topEmpleados.length > 0 ? (
                          <div className="p-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
                              Top Empleados (Horas)
                            </p>
                            <div className="space-y-2">
                              {branch.topEmpleados.map(
                                (emp: any, i: number) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${i === 0
                                          ? "bg-gradient-to-br from-yellow-400 to-[#F7941F]"
                                          : i === 1
                                            ? "bg-gradient-to-br from-gray-300 to-gray-500"
                                            : i === 2
                                              ? "bg-gradient-to-br from-amber-600 to-amber-800"
                                              : "bg-[#036133]/60"
                                          }`}
                                      >
                                        {i + 1}
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-800 text-sm leading-tight">
                                          {emp.nombre}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5">
                                          CI: {emp.carnet}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-bold text-[#036133] text-sm bg-green-50 px-2 py-1 rounded block">
                                        {formatDecimalToHHMM(emp.horas)}
                                      </span>
                                      {emp.diasVacacion > 0 && (
                                        <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mt-1 block">
                                          {emp.diasVacacion} d. vacación
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                            <svg
                              className="w-10 h-10 mb-2 opacity-50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              Sin registros este mes
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
