export default function AttendanceList({
  attendances,
}: {
  attendances: any[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {attendances.map((a) => (
        <div
          key={a.id}
          className="bg-white p-4 rounded-lg shadow border flex gap-4 items-start"
        >
          {/* Imagen */}
          {a.imageUrl && (
            <img
              src={a.imageUrl}
              alt="Asistencia"
              className="w-20 h-20 object-cover rounded-md border"
            />
          )}

          {/* Info */}
          <div>
            <h3 className="font-bold text-lg">
              {a.employee.firstName} {a.employee.lastName}
            </h3>
            <p className="text-gray-600">Carnet: {a.employeeCarnet}</p>
            <p className="text-gray-600">Sucursal: {a.branch.name}</p>
            <p
              className={`mt-1 font-semibold ${
                a.type === "IN" ? "text-green-600" : "text-red-600"
              }`}
            >
              {a.type === "IN" ? "Entrada" : "Salida"}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(a.recordedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
