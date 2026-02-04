// src/components/DashboardTable.tsx
interface DashboardTableProps {
  data: any[];
  loading: boolean;
}

export default function DashboardTable({ data, loading }: DashboardTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#036133]"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500 text-lg">No hay registros para mostrar</p>
        <p className="text-gray-400 text-sm mt-2">
          Intenta ajustar los filtros o seleccionar otro rango de fechas
        </p>
      </div>
    );
  }

  // Función para formatear hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-BO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para formatear fecha
  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    // Parsear como fecha local, NO como UTC
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatHoursMinutes = (totalHoras: number): string => {
    const horas = Math.floor(totalHoras);
    const minutos = Math.round((totalHoras - horas) * 60);

    if (horas === 0) {
      return `${minutos} min`;
    }

    if (minutos === 0) {
      return `${horas}h`;
    }

    return `${horas}h ${minutos}min`;
  };

  const MobileView = () => (
    <div className="md:hidden space-y-4">
      {data.map((record, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
        >
          {/* Header con fecha */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-300">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#036133]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                {formatDate(record.date)}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                record.totalHoras >= 8
                  ? "bg-green-100 text-green-700"
                  : record.totalHoras >= 4
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {formatHoursMinutes(record.totalHoras)}
            </span>
          </div>

          {/* Empleado */}
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs text-gray-500 uppercase">Empleado</span>
            </div>
            <p className="font-semibold text-gray-800 ml-6">
              {record.employee.firstName} {record.employee.lastName}
            </p>
            <p className="text-xs text-gray-500 ml-6">
              Carnet: {record.employee.carnet}
            </p>
          </div>

          {/* Horarios */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-xs text-gray-500 font-medium">
                  Entrada
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">
                {formatTime(record.entrada)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-xs text-gray-500 font-medium">
                  Salida
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">
                {formatTime(record.salida)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Empleado
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Carnet
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Entrada
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Salida
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Total Horas
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((record, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(record.date)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">
                  {record.employee.firstName} {record.employee.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">
                  {record.employee.carnet}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(record.entrada)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(record.salida)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col items-start">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                      record.totalHoras >= 8
                        ? "bg-green-100 text-green-700"
                        : record.totalHoras >= 4
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formatHoursMinutes(record.totalHoras)}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    ({record.totalHoras.toFixed(2)}h)
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
