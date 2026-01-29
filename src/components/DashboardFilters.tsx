import { useState } from "react";
import { useBranches } from "../hooks/useBranches";
import { useEmployees } from "../hooks/useEmployees";

interface DashboardFiltersProps {
  onApplyFilters: (filters: any) => void;
  loading: boolean;
}

export default function DashboardFilters({
  onApplyFilters,
  loading,
}: DashboardFiltersProps) {
  const { branches } = useBranches();
  const { employees } = useEmployees();

  const [branchId, setBranchId] = useState("");
  const [employeeCarnet, setEmployeeCarnet] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    const filters: any = {};
    if (branchId) filters.branchId = branchId;
    if (employeeCarnet) filters.employeeCarnet = employeeCarnet;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    onApplyFilters(filters);
  };

  const handleReset = () => {
    setBranchId("");
    setEmployeeCarnet("");
    setStartDate("");
    setEndDate("");
    onApplyFilters({});
  };

  // Establecer fechas por defecto (mes actual)
  const setCurrentMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setStartDate(firstDay.toISOString().split("T")[0]);
    setEndDate(lastDay.toISOString().split("T")[0]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-[#036133]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtros
        </h3>
        <button
          onClick={setCurrentMonth}
          className="text-sm text-[#036133] hover:text-[#F7941F] font-medium transition-colors"
        >
          Mes actual
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sucursal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sucursal
          </label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all"
            disabled={loading}
          >
            <option value="">Todas las sucursales</option>
            {branches.map((branch: any) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        {/* Empleado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Empleado
          </label>
          <select
            value={employeeCarnet}
            onChange={(e) => setEmployeeCarnet(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all"
            disabled={loading}
          >
            <option value="">Todos los empleados</option>
            {employees.map((emp: any) => (
              <option key={emp.carnet} value={emp.carnet}>
                {emp.firstName} {emp.lastName} - {emp.carnet}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha Inicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha desde
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all"
            disabled={loading}
          />
        </div>

        {/* Fecha Fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha hasta
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036133] focus:border-transparent transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleApply}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-[#036133] to-[#036133]/90 text-white px-6 py-3 rounded-lg font-semibold hover:from-[#036133]/90 hover:to-[#036133] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Buscar
        </button>
        <button
          onClick={handleReset}
          disabled={loading}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Limpiar
        </button>
      </div>
    </div>
  );
}
