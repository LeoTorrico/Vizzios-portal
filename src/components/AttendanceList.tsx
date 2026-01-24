export default function AttendanceList({
  attendances,
  meta,
  onNext,
  onPrev,
}: {
  attendances: any[];
  meta?: any;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  if (attendances.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay registros de asistencia
        </h3>
        <p className="text-gray-600">
          Los registros de asistencia aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Historial de Asistencias {meta?.total ? `(${meta.total})` : ""}
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Entrada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Salida</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {attendances.map((attendance) => (
          <div
            key={attendance.id}
            className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div
              className={`h-1 ${
                attendance.type === "IN"
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : "bg-gradient-to-r from-red-400 to-red-600"
              }`}
            ></div>

            <div className="p-6">
              <div className="flex items-start space-x-4">
                {attendance.imageUrl && (
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={attendance.imageUrl}
                        alt="Registro de asistencia"
                        className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                      />
                      <div
                        className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                          attendance.type === "IN"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {attendance.type === "IN" ? (
                          <svg
                            className="w-3 h-3 text-white"
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
                        ) : (
                          <svg
                            className="w-3 h-3 text-white"
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
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#036133] transition-colors duration-200">
                        {attendance.employee.firstName}{" "}
                        {attendance.employee.lastName}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            attendance.type === "IN"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {attendance.type === "IN" ? (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
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
                              ENTRADA
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
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
                              SALIDA
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(attendance.recordedAt).toLocaleTimeString(
                          "es-ES",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(attendance.recordedAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Carnet</p>
                        <p className="font-semibold text-gray-900">
                          {attendance.employeeCarnet}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-600"
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
                      <div>
                        <p className="text-sm text-gray-500">Sucursal</p>
                        <p className="font-semibold text-gray-900">
                          {attendance.branch.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#036133]/3 to-[#F7941F]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {meta && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
          <div className="text-sm text-gray-500">
            Página{" "}
            <span className="font-medium text-gray-900">{meta.page}</span> de{" "}
            <span className="font-medium text-gray-900">{meta.lastPage}</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onPrev}
              disabled={Number(meta.page) === 1}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                ${
                  Number(meta.page) === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:text-[#036133]"
                }`}
            >
              Anterior
            </button>

            <button
              onClick={onNext}
              disabled={Number(meta.page) >= meta.lastPage}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                ${
                  Number(meta.page) >= meta.lastPage
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#036133] text-white hover:bg-[#024c28] shadow-sm"
                }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
